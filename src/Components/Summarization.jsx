import { useState } from "react";
import {
  FaFilePdf,
  FaDownload,
  FaHistory,
  FaRegLightbulb,
} from "react-icons/fa";
import { MdOutlineSummarize } from "react-icons/md";

export default function Summarization() {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState("");
  const [summary, setSummary] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [length, setLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);

  // Dummy handler, replace with API call
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const newSummary = `Summary (${length}): "${text.slice(
        0,
        60
      )}..." (focus: "${focus}")`;
      setSummary(newSummary);
      setHistory([
        { summary: newSummary, time: new Date().toLocaleString() },
        ...history,
      ]);
      setLoading(false);
    }, 1200);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfName(file.name);
      setSummary(`PDF "${file.name}" uploaded. (Summary would appear here)`);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    setAnswerLoading(true);
    setTimeout(() => {
      setAnswer(`AI Answer: "${question}" (based on PDF "${pdfName}")`);
      setAnswerLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-full flex flex-col  transition-all">
      {/* Custom Branding */}
      <header className="w-full flex items-center justify-between px-10 py-6 bg-white/60 backdrop-blur-lg sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <MdOutlineSummarize className="text-4xl text-green-700" />
          <span className="text-2xl font-extrabold text-green-900 tracking-wide">
            LexiSummarizer
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-700 font-semibold">Powered by AI</span>
        </div>
      </header>

      <main className="w-full flex flex-row gap-8 py-10">
        {/* Left Panel: Summarization (60%) */}
        <section className="flex-[7] bg-white/80 rounded-3xl shadow-2xl border border-green-100 p-10 flex flex-col transition-all min-h-[70vh]">
          <div>
            <div className="flex items-center mb-6">
              <FaFilePdf className="text-4xl text-green-700 mr-3" />
              <h1 className="text-3xl font-bold text-green-900 font-serif tracking-tight">
                Legal Summarizer
              </h1>
              <span
                className="ml-2 text-gray-400 cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <FaRegLightbulb />
                {showTooltip && (
                  <span className="absolute bg-green-900 text-white text-xs rounded px-2 py-1 ml-6 mt-2 shadow-lg z-20">
                    Paste text or upload PDF. Choose summary length. Download or
                    view history.
                  </span>
                )}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Summarize legal documents or upload PDFs. Get concise summaries
              focused on what matters.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                rows={4}
                placeholder="Paste legal text here..."
                className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <input
                type="text"
                placeholder="Focus (optional)"
                className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
              />
              <div className="flex items-center gap-4">
                <label className="font-semibold text-green-700">
                  Summary Length:
                </label>
                <select
                  className="px-3 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
              <button
                className="bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white px-6 py-2 rounded-full font-semibold shadow transition w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-green-700 rounded-full"></span>
                ) : (
                  <MdOutlineSummarize className="text-xl" />
                )}
                Summarize
              </button>
            </form>
            {/* PDF Upload */}
            <div className="mt-6 flex items-center gap-4">
              <label className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full font-semibold shadow cursor-pointer transition">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handlePdfUpload}
                />
                Upload PDF
              </label>
              {pdfName && (
                <span className="text-green-700 font-medium">{pdfName}</span>
              )}
            </div>

            {/* Ask Question about PDF */}
            {pdfName && (
              <div className="mt-8">
                <form
                  onSubmit={handleAskQuestion}
                  className="flex flex-col gap-3"
                >
                  <label className="font-semibold text-green-700">
                    Ask a question about this PDF:
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    placeholder="Type your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <button
                    className="bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white px-6 py-2 rounded-full font-semibold shadow transition w-full"
                    disabled={answerLoading || !question}
                  >
                    {answerLoading ? (
                      <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-green-700 rounded-full"></span>
                    ) : (
                      "Ask"
                    )}
                  </button>
                </form>
                {answer && (
                  <div className="mt-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 text-green-900 font-medium shadow-lg transition-all animate-fade-in">
                    <span className="font-bold">Answer:</span> {answer}
                  </div>
                )}
              </div>
            )}
          </div>
          {summary && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6 text-green-900 font-medium shadow-lg transition-all animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span>Summary</span>
                <button
                  className="flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold transition"
                  onClick={handleDownload}
                  title="Download summary as text"
                >
                  <FaDownload />
                  Download
                </button>
              </div>
              <div>{summary}</div>
            </div>
          )}
        </section>

        {/* Right Panel: History (30%) */}
        <aside className="flex-[4] bg-white/70 rounded-3xl shadow-xl border border-green-100 p-8 flex flex-col gap-4 transition-all min-h-[70vh]">
          <div className="flex items-center gap-2 mb-4">
            <FaHistory className="text-xl text-green-700" />
            <span className="font-bold text-green-900">History</span>
          </div>
          {history.length === 0 ? (
            <span className="text-gray-400">No summaries yet.</span>
          ) : (
            <ul className="space-y-4">
              {history.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 shadow hover:shadow-md transition"
                >
                  <div className="text-xs text-gray-500 mb-1">{item.time}</div>
                  <div className="text-green-900">{item.summary}</div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>
    </div>
  );
}
