import { useState, useRef, useEffect } from "react";
import {
  FaComments,
  FaPaperPlane,
  FaUserTie,
  FaRegCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaRedo,
  FaTrash,
  FaShareAlt,
  FaUserCircle,
  FaSpinner,
} from "react-icons/fa";
import api from "../axios";

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Add this function for demo messages
function getDemoChat() {
  return [
    {
      sender: "user",
      text: "What is GDPR?",
      context: "",
      time: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      sender: "ai",
      text: "GDPR stands for General Data Protection Regulation, a law on data protection and privacy in the EU.",
      time: new Date(Date.now() - 1000 * 60 * 9),
      feedback: "up",
    },
    {
      sender: "user",
      text: "Who does it apply to?",
      context: "",
      time: new Date(Date.now() - 1000 * 60 * 8),
    },
    {
      sender: "ai",
      text: "It applies to all organizations processing personal data of EU residents, regardless of location.",
      time: new Date(Date.now() - 1000 * 60 * 7),
      feedback: null,
    },
  ];
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [chat, setChat] = useState(getDemoChat());
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  // Professional API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const userMsg = {
      sender: "user",
      text: message,
      context,
      time: new Date(),
    };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setContext("");
    setTyping(true);
    setLoading(true);
    try {
      const res = await api.post("/analyze", {
        task: "faq_chat",
        text: userMsg.text,
        context: userMsg.context,
      });
      console.log(res)
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.response || "No response received.",
          time: new Date(),
          feedback: null,
        },
      ]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Server error. Please try again later.",
          time: new Date(),
          feedback: null,
        },
      ]);
    }
    setTyping(false);
    setLoading(false);
  };

  const handleRegenerate = async () => {
    const lastUser = [...chat].reverse().find((m) => m.sender === "user");
    if (!lastUser) return;
    setTyping(true);
    setLoading(true);
    const aiText = await getAIReply(lastUser.text, lastUser.context);
    setChat((prev) => [
      ...prev,
      {
        sender: "ai",
        text: aiText + " (Regenerated)",
        time: new Date(),
        feedback: null,
      },
    ]);
    setTyping(false);
    setLoading(false);
  };

  const handleClear = () => setChat([]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleFeedback = (idx, value) => {
    setChat((prev) =>
      prev.map((msg, i) => (i === idx ? { ...msg, feedback: value } : msg))
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-green-50 to-green-100 flex flex-col">
      <div className="w-full max-w-3xl mx-auto flex flex-col h-[90vh]">
        <div className="flex items-center gap-3 py-8">
          <FaComments className="text-4xl text-green-700" />
          <h1 className="text-3xl font-bold text-green-900">
            Legal Chat Assistant
          </h1>
          <button
            className="ml-auto bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold shadow transition flex items-center gap-2"
            onClick={handleClear}
            title="Clear Chat"
          >
            <FaTrash />
            Clear
          </button>
          <button
            className="ml-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold shadow transition flex items-center gap-2"
            onClick={handleRegenerate}
            title="Regenerate"
          >
            <FaRedo />
            Regenerate
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 md:px-0">
          <div className="flex flex-col gap-6">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end gap-2 max-w-[80%]">
                  {msg.sender === "ai" && (
                    <FaUserTie className="text-2xl text-green-700 mb-1" />
                  )}
                  {msg.sender === "user" && (
                    <FaUserCircle className="text-2xl text-gray-400 mb-1" />
                  )}
                  <div
                    className={`rounded-2xl px-5 py-4 shadow ${
                      msg.sender === "user"
                        ? "bg-green-700 text-white"
                        : "bg-green-50 border border-green-200 text-green-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{msg.text}</span>
                      {msg.sender === "ai" && (
                        <>
                          <button
                            className="ml-2 text-green-700 hover:text-green-900"
                            title="Copy"
                            onClick={() => handleCopy(msg.text)}
                          >
                            <FaRegCopy />
                          </button>
                          <button
                            className="ml-2 text-green-700 hover:text-green-900"
                            title="Share"
                            onClick={() => alert("Share feature coming soon!")}
                          >
                            <FaShareAlt />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">
                        {formatTime(msg.time)}
                      </span>
                      {msg.sender === "ai" && (
                        <span className="ml-2 flex gap-1">
                          <button
                            className={`${
                              msg.feedback === "up"
                                ? "text-green-700"
                                : "text-gray-400"
                            } hover:text-green-700`}
                            onClick={() => handleFeedback(idx, "up")}
                            title="Helpful"
                          >
                            <FaThumbsUp />
                          </button>
                          <button
                            className={`${
                              msg.feedback === "down"
                                ? "text-red-500"
                                : "text-gray-400"
                            } hover:text-red-500`}
                            onClick={() => handleFeedback(idx, "down")}
                            title="Not Helpful"
                          >
                            <FaThumbsDown />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start items-center gap-2">
                <FaUserTie className="text-2xl text-green-700 mb-1" />
                <div className="rounded-2xl px-5 py-4 shadow bg-green-50 border border-green-200 text-green-900 flex items-center gap-2">
                  <FaSpinner className="animate-spin text-green-700" />
                  <span>AI is typing…</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 mt-8 bg-white rounded-2xl shadow border border-green-100 px-6 py-4"
        >
          <input
            type="text"
            placeholder="Your legal question…"
            className="flex-1 px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Context (optional)"
            className="w-1/3 px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
          <button
            className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold shadow transition text-lg"
            type="submit"
            disabled={loading}
          >
            <FaPaperPlane className="text-xl" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
