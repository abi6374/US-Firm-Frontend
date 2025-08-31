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
  FaRobot,
  FaMicrophone,
  FaStop,
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
      text: "What is GDPR and how does it affect my business?",
      context: "",
      time: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      sender: "ai",
      text: "GDPR (General Data Protection Regulation) is a comprehensive data protection law that applies to all organizations processing personal data of EU residents. It requires businesses to implement privacy by design, obtain explicit consent for data processing, and provides individuals with rights like data portability and erasure. Non-compliance can result in fines up to 4% of annual revenue or €20 million.",
      time: new Date(Date.now() - 1000 * 60 * 9),
      feedback: "up",
    },
    {
      sender: "user",
      text: "What are the key compliance requirements?",
      context: "EU business operations",
      time: new Date(Date.now() - 1000 * 60 * 8),
    },
    {
      sender: "ai",
      text: "Key GDPR compliance requirements include: 1) Appointing a Data Protection Officer (DPO) if required, 2) Conducting Privacy Impact Assessments, 3) Implementing data breach notification procedures (72-hour rule), 4) Ensuring lawful basis for data processing, 5) Maintaining detailed records of processing activities, and 6) Implementing appropriate technical and organizational security measures.",
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
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

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
    setTyping(true);
    setLoading(true);
    
    try {
      const res = await api.post("/faq_chat", {
        task: "faq_chat",
        text: userMsg.text,
        context: userMsg.context,
      });
      
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.response || "I apologize, but I couldn't generate a response. Please try again.",
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
          text: "I'm experiencing technical difficulties. Please try again in a moment.",
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
    
    try {
      const res = await api.post("/faq_chat", {
        task: "faq_chat",
        text: lastUser.text,
        context: lastUser.context,
      });
      
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: (res.data.response || "No response received.") + " (Regenerated)",
          time: new Date(),
          feedback: null,
        },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Unable to regenerate response. Please try again.",
          time: new Date(),
          feedback: null,
        },
      ]);
    }
    
    setTyping(false);
    setLoading(false);
  };

  const handleClear = () => setChat([]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const handleFeedback = (idx, value) => {
    setChat((prev) =>
      prev.map((msg, i) => (i === idx ? { ...msg, feedback: value } : msg))
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2">
              <FaRobot className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Legal AI Assistant</h3>
              <p className="text-blue-100 text-sm">Ask me anything about law</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm"
              onClick={handleRegenerate}
              disabled={loading}
              title="Regenerate last response"
            >
              <FaRedo className={loading ? "animate-spin" : ""} />
              Retry
            </button>
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm"
              onClick={handleClear}
              title="Clear conversation"
            >
              <FaTrash />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
        {chat.length === 0 && (
          <div className="text-center py-12">
            <FaComments className="text-6xl text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-600 mb-2">Start a Conversation</h4>
            <p className="text-gray-500">Ask me any legal question to get started</p>
          </div>
        )}

        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div className={`flex items-start space-x-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.sender === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border-2 border-blue-200 text-blue-600"
              }`}>
                {msg.sender === "user" ? <FaUserCircle /> : <FaRobot />}
              </div>

              {/* Message Bubble */}
              <div className={`rounded-2xl px-4 py-3 shadow-sm relative ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                
                {/* Timestamp */}
                <div className={`flex items-center justify-between mt-2 text-xs ${
                  msg.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}>
                  <span>{formatTime(msg.time)}</span>
                  
                  {/* Action Buttons for AI messages */}
                  {msg.sender === "ai" && (
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => handleCopy(msg.text)}
                        title="Copy message"
                      >
                        <FaRegCopy />
                      </button>
                      <button
                        className={`transition-colors duration-200 ${
                          msg.feedback === "up" ? "text-green-500" : "text-gray-400 hover:text-green-500"
                        }`}
                        onClick={() => handleFeedback(idx, msg.feedback === "up" ? null : "up")}
                        title="Helpful"
                      >
                        <FaThumbsUp />
                      </button>
                      <button
                        className={`transition-colors duration-200 ${
                          msg.feedback === "down" ? "text-red-500" : "text-gray-400 hover:text-red-500"
                        }`}
                        onClick={() => handleFeedback(idx, msg.feedback === "down" ? null : "down")}
                        title="Not helpful"
                      >
                        <FaThumbsDown />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-blue-200 text-blue-600 flex items-center justify-center">
                <FaRobot />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <FaSpinner className="animate-spin text-blue-600" />
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        {/* Context Input */}
        {context && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-700">Context:</span>
                <span className="text-sm text-blue-600">{context}</span>
              </div>
              <button
                onClick={() => setContext("")}
                className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Context Input Field */}
          <input
            type="text"
            placeholder="Add context (optional) - e.g., 'contract law', 'EU regulations'"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />

          {/* Message Input */}
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                placeholder="Type your legal question here..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[48px] max-h-32"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
                required
              />
              
              {/* Voice Input Button */}
              <button
                type="button"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
                  isRecording 
                    ? "text-red-500 bg-red-50 hover:bg-red-100" 
                    : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsRecording(!isRecording)}
                title={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </button>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-lg" />
              ) : (
                <FaPaperPlane className="text-lg" />
              )}
            </button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => setMessage("What are the key principles of contract law?")}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
          >
            Contract Law
          </button>
          <button
            onClick={() => setMessage("Explain GDPR compliance requirements")}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
          >
            GDPR
          </button>
          <button
            onClick={() => setMessage("What is intellectual property protection?")}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
          >
            IP Rights
          </button>
        </div>
      </div>
    </div>
  );
}
