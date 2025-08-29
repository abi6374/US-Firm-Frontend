import { useState } from "react";
import api from "../axios";
import { FaQuoteRight, FaCopy, FaHistory } from "react-icons/fa";

export default function Citation() {
  const [text, setText] = useState("");
  const [citations, setCitations] = useState([]);
  const [history, setHistory] = useState([]);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [loading, setLoading] = useState(false);

  const normalizeCitations = (raw) => {
    if (!raw) return [];
    // Accept a single object or an array of results
    const items = Array.isArray(raw) ? raw : [raw];
    // Accept: ["410 U.S. 113 (1973)", ...] OR [{ citation, valid, source_url }, ...] OR CourtListener meta objects
    return items.map((c) => {
      if (typeof c === "string") {
        return { citation: c, valid: undefined, source_url: "" };
      }
      return {
        citation: c.citation || c.text || c.query || c.case_name || (c.url ? c.url : "") || "",
        valid: typeof c.valid === "boolean" ? c.valid : undefined,
        source_url: c.source_url || c.url || "",
        case_name: c.case_name || "",
        court: c.court || "",
        year: c.year || "",
        date: c.date || "",
        plain_text: c.plain_text || c.summary || "",
        summary: c.summary || "",
        query: c.query || "",
        url: c.url || c.source_url || "",
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCitations([]);
    setLoading(true);
    try {
      // Step 1: extract citations from free text
      const res = await api.post("/courtlistener/lookup", {
        citation_text: text,
      });
      console.log("Extraction response:", res);
      // support responses where the server returns either { data: [...] } or a single object at `res.data`
      const raw = res.data?.data ?? res.data;
      const extracted = normalizeCitations(raw);
      if (!extracted.length) {
        setCitations([{ citation: "No citations found.", valid: undefined, source_url: "" }]);
        setHistory([{ text, citations: [], time: new Date().toLocaleString() }, ...history]);
        setLoading(false);
        return;
      }

      // OPTIONAL Step 2: lookup metadata for each citation (batch)
      // Comment this block out if you only want extraction results.
      const lookups = await api.post("/courtlistener/lookup_batch", {
        citations: extracted.map((c) => c.citation),
      });
      const enriched = (lookups.data?.results || []).map((r) => {
        const base = extracted.find((c) => c.citation === r.citation) || { citation: r.citation };
        const meta = r.result || {};
        return {
          citation: base.citation,
          valid: base.valid,
          source_url: meta.url ? `https://www.courtlistener.com${meta.url}`.replace(/\/+$/, "") : base.source_url || "",
          court: meta.court || base.court || "",
          year: meta.year || base.year || "",
          date: meta.date || base.date || "",
          case_name: meta.case_name || base.case_name || "",
          plain_text: meta.plain_text || base.plain_text || "",
          summary: meta.summary || base.summary || "",
          query: meta.query || base.query || "",
          url: meta.url ? `https://www.courtlistener.com${meta.url}`.replace(/\/+$/, "") : base.url || "",
        };
      });

      setCitations(enriched.length ? enriched : extracted);
      setHistory([
        { text, citations: enriched.length ? enriched : extracted, time: new Date().toLocaleString() },
        ...history,
      ]);
    } catch (err) {
      setCitations([{ citation: "Server error. Please try again later.", valid: undefined, source_url: "" }]);
    }
    setLoading(false);
  };

  const handleCopy = (citation, idx) => {
    navigator.clipboard.writeText(citation);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-green-50 to-green-200 flex flex-col font-sans transition-all">
      <header className="w-full flex items-center justify-between px-10 py-6 bg-white/60 backdrop-blur-lg sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <FaQuoteRight className="text-4xl text-green-700" />
          <span className="text-2xl font-extrabold text-green-900 tracking-wide">
            Citation Extractor
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-700 font-semibold">Powered by AI</span>
        </div>
      </header>

      <main className="w-full flex flex-row gap-8 px-8 py-10">
        <section className="flex-[0.6] bg-white/80 rounded-3xl shadow-2xl border border-green-100 p-10 flex flex-col transition-all min-h-[70vh]">
          <p className="text-gray-600 mb-6">
            Extract legal citations from any text. Instantly get all referenced laws and cases.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows={4}
              placeholder="Paste text to extract citations..."
              className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <button
              className="bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white px-6 py-2 rounded-full font-semibold shadow transition w-full"
              disabled={loading}
            >
              {loading ? "Extracting..." : "Extract Citations"}
            </button>
          </form>

          {citations.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold mb-4 text-green-900 text-lg">Citations Found:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {citations.map((c, idx) => {
                  return (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 shadow-lg flex items-start gap-4 transition-all hover:scale-[1.02]"
                    >
                      <FaQuoteRight className="text-2xl text-green-700 mt-1" />
                      <div className="flex-1 text-green-900">
                        {c.case_name ? <div className="font-semibold text-lg">{c.case_name}</div> : null}
                        <div className="text-sm">
                          {c.citation || ""}{c.year ? ` (${c.year})` : ""}{c.date ? ` — ${c.date}` : ""}
                        </div>
                        {c.court ? <div className="text-xs text-green-700 mt-1">{c.court}</div> : null}
                        {c.summary ? <div className="mt-2 text-sm text-gray-700">{c.summary}</div> : null}
                        {!c.summary && c.plain_text ? <div className="mt-2 text-sm text-gray-700">{c.plain_text}</div> : null}
                        {c.query ? <div className="mt-2 text-xs text-gray-500">Query: <code className="text-xs">{c.query}</code></div> : null}
                        {c.url || c.source_url ? (
                          <a
                            href={c.url || c.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-green-700 underline mt-2 inline-block"
                          >
                            Source
                          </a>
                        ) : null}
                      </div>
                      <button
                        className="text-green-700 hover:text-green-900 transition relative"
                        onClick={() => handleCopy((c.case_name ? `${c.case_name} — ${c.citation}` : c.citation) || c.date || c.query || c.url, idx)}
                        title="Copy citation"
                      >
                        <FaCopy />
                        {copiedIdx === idx && (
                          <span className="absolute -top-7 left-0 bg-green-900 text-white text-xs rounded px-2 py-1 shadow-lg z-20">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <aside className="flex-[0.3] bg-white/70 rounded-3xl shadow-xl border border-green-100 p-8 flex flex-col gap-4 transition-all min-h-[70vh]">
          <div className="flex items-center gap-2 mb-4">
            <FaHistory className="text-xl text-green-700" />
            <span className="font-bold text-green-900">History</span>
          </div>
          {history.length === 0 ? (
            <span className="text-gray-400">No extractions yet.</span>
          ) : (
            <ul className="space-y-4">
              {history.map((item, idx) => (
                <li key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3 shadow hover:shadow-md transition">
                  <div className="text-xs text-gray-500 mb-1">{item.time}</div>
                  <div className="text-green-900 font-semibold mb-1">Text:</div>
                  <div className="text-green-800 text-sm mb-2">{item.text}</div>
                  <div className="text-green-900 font-semibold mb-1">Citations:</div>
                  <ul className="list-disc pl-6 text-green-900">
                    {item.citations.map((c, i) => (
                      <li key={i}>{typeof c === "string" ? c : (c.citation || "")}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>
    </div>
  );
}