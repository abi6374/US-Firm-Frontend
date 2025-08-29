import { useState } from "react";
import api from "../axios";
import { FaQuoteRight, FaCopy, FaHistory } from "react-icons/fa";

export default function Citation() {
  const [text, setText] = useState("");
  const [citations, setCitations] = useState([]);
  const [history, setHistory] = useState([]);
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Professional API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCitations([]);
    try {
      const res = await api.post("/analyze", {
        task: "citation_verification",
        text,
      });
      if (res.data.error) {
        setCitations([`Error: ${res.data.error}`]);
      } else if (res.data.citations) {
        setCitations(res.data.citations.map(c => `${c.citation} (${c.valid ? 'Valid' : 'Invalid'}) ${c.source_url || ''}`));
      } else {
        setCitations(["No citations found."]);
      }
      setHistory([
        { text, citations: res.data.citations || [], time: new Date().toLocaleString() },
        ...history,
      ]);
    } catch (err) {
      setCitations(["Server error. Please try again later."]);
    }
  };

  const handleCopy = (citation, idx) => {
    navigator.clipboard.writeText(citation);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-green-50 to-green-200 flex flex-col font-sans transition-all">
      {/* Header */}
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
        {/* Left Panel: Extractor */}
        <section className="flex-[0.6] bg-white/80 rounded-3xl shadow-2xl border border-green-100 p-10 flex flex-col transition-all min-h-[70vh]">
          <p className="text-gray-600 mb-6">
            Extract legal citations from any text. Instantly get all referenced
            laws and cases.
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
            <button className="bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white px-6 py-2 rounded-full font-semibold shadow transition w-full">
              Extract Citations
            </button>
          </form>
          {citations.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold mb-4 text-green-900 text-lg">
                Citations Found:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {citations.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 shadow-lg flex items-center gap-4 transition-all hover:scale-[1.02]"
                  >
                    <FaQuoteRight className="text-2xl text-green-700" />
                    <span className="flex-1 text-green-900">{c}</span>
                    <button
                      className="text-green-700 hover:text-green-900 transition relative"
                      onClick={() => handleCopy(c, idx)}
                      title="Copy citation"
                    >
                      <FaCopy />
                      {copiedIdx === idx && (
                        <span className="absolute -top-7 left-0 bg-green-900 text-white text-xs rounded px-2 py-1 shadow-lg z-20 animate-fade-in">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Panel: History */}
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
                <li
                  key={idx}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 shadow hover:shadow-md transition"
                >
                  <div className="text-xs text-gray-500 mb-1">{item.time}</div>
                  <div className="text-green-900 font-semibold mb-1">Text:</div>
                  <div className="text-green-800 text-sm mb-2">{item.text}</div>
                  <div className="text-green-900 font-semibold mb-1">
                    Citations:
                  </div>
                  <ul className="list-disc pl-6 text-green-900">
                    {item.citations.map((c, i) => (
                      <li key={i}>{c}</li>
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
