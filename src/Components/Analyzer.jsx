import { useState } from "react";
import api from "../axios";
import { FaSearch } from "react-icons/fa";

export default function Analyzer() {
  const [text, setText] = useState("");
  const [objective, setObjective] = useState("");
  const [analysis, setAnalysis] = useState("");

  // Professional API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnalysis("");
    try {
      const res = await api.post("/clause_detection", {
        task: "contract_clause_detection",
        text,
        objective,
      });
      console.log(res.data);
      if (res.data.error) {
        setAnalysis(`Error: ${res.data.error}`);
      } else {
        setAnalysis(JSON.stringify(res.data, null, 2));
      }
    } catch (err) {
      console.error(err)
      setAnalysis("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-green-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl border border-green-100 p-10 w-full max-w-xl">
        <div className="flex items-center mb-6">
          <FaSearch className="text-4xl text-green-700 mr-3" />
          <h1 className="text-3xl font-bold text-green-900">
            Contract Analyzer
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Analyze contracts and agreements. Receive detailed breakdowns and risk
          analysis.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={4}
            placeholder="Paste contract or agreement text..."
            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Objective (e.g. risk, summary)"
            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition w-full">
            Analyze
          </button>
        </form>
        {analysis && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4 text-green-900 font-medium shadow">
            {analysis}
          </div>
        )}
      </div>
    </div>
  );
}
