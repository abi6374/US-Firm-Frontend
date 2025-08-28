import { useState } from "react";
import { FaComments, FaFilePdf, FaSearch, FaQuoteRight } from "react-icons/fa";
import Chat from "./Chat";
import Summarization from "./Summarization";
import Analyzer from "./Analyzer";
import Citation from "./Citation";

const services = [
  {
    icon: <FaComments className="text-5xl text-green-700 mb-4" />,
    desc: "Ask legal questions in chat. Get instant answers from our AI-powered legal assistant.",
    component: <Chat />,
  },
  {
    icon: <FaFilePdf className="text-5xl text-green-700 mb-4" />,
    desc: "Summarize legal documents or upload PDFs. Get concise summaries focused on what matters.",
    component: <Summarization />,
  },
  {
    icon: <FaSearch className="text-5xl text-green-700 mb-4" />,
    desc: "Analyze contracts and agreements. Receive detailed breakdowns and risk analysis.",
    component: <Analyzer />,
  },
  {
    icon: <FaQuoteRight className="text-5xl text-green-700 mb-4" />,
    desc: "Extract legal citations from any text. Instantly get all referenced laws and cases.",
    component: <Citation />,
  },
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <div className="py-16 px-4">
      <h2 className="text-3xl font-extrabold text-center mb-12">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((s, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl shadow-xl border border-green-100 p-8 flex flex-col items-center text-center hover:shadow-2xl transition duration-300 ${
              activeIdx === idx ? "ring-2 ring-green-400" : ""
            }`}
          >
            {s.icon}
            <p className="text-gray-600 mb-4">{s.desc}</p>
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition"
              onClick={() => setActiveIdx(idx)}
            >
              Go
            </button>
          </div>
        ))}
      </div>
      <div className="mt-12 m-20 flex justify-center items-center">
        {activeIdx !== null && services[activeIdx].component}
      </div>
    </div>
  );
}
