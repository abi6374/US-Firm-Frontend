import { FaPlayCircle } from "react-icons/fa";
import {
  FaBalanceScale,
  FaGavel,
  FaShieldAlt,
  FaCopyright,
  FaTrademark,
} from "react-icons/fa";

const industries = [
  {
    icon: <FaShieldAlt className="text-4xl text-green-700 mb-2" />,
    title: "Data Protection law's",
    desc: "Ask a legal question and get an answer from a professional lawyer your problem and move on.",
  },
  {
    icon: <FaBalanceScale className="text-4xl text-green-700 mb-2" />,
    title: "Internet Technology law's",
    desc: "Ask a legal question and get an answer from a professional lawyer your problem and move on.",
  },
  {
    icon: <FaGavel className="text-4xl text-green-700 mb-2" />,
    title: "Copy Right Law's",
    desc: "Ask a legal question and get an answer from a professional lawyer your problem and move on.",
  },
  {
    icon: <FaBalanceScale className="text-4xl text-green-700 mb-2" />,
    title: "Distribution law's",
    desc: "Ask a legal question and get an answer from a professional lawyer your problem and move on.",
  },
  {
    icon: <FaTrademark className="text-4xl text-green-700 mb-2" />,
    title: "Trademark law's",
    desc: "Ask a legal question and get an answer from a professional lawyer your problem and move on.",
  },
];

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-gradient-to-r from-white to-green-100">
        <div className="flex-1">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-medium mb-4">
            Your legal procedures have never been so easy
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            The legal service you need, At what time, <br /> and anywhere!
          </h1>
          <p className="text-gray-700 mb-6">
            Ask a legal question and get an answer from a professional lawyer
            <br />
            Solve your problem and move on.
          </p>
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition">
            Find my lawyer's
          </button>
        </div>
        <div className="flex-1 flex justify-center mt-8 md:mt-0">
          <div className="relative w-72 h-44 rounded-lg overflow-hidden shadow-lg border border-green-200 bg-white">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
              alt="Lawyer"
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <FaPlayCircle className="text-green-700 text-6xl opacity-90 hover:scale-105 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-gradient-to-r from-green-50 to-white py-14 px-6 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-2 uppercase tracking-wide">
          WHAT INDUSTRIES WE LEGALY SERVE,
        </h2>
        <p className="text-gray-700 mb-10">
          Ask a legal question and get an answer from a professional lawyer
          <br />
          Solve your problem and move on.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {industries.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center border border-green-100 hover:shadow-lg transition"
            >
              {item.icon}
              <h3 className="font-semibold text-lg text-green-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition">
            See All Law's we Provide
          </button>
        </div>
      </section>
    </div>
  );
}
