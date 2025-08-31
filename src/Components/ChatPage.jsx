import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaComments,
  FaPaperPlane,
  FaUserTie,
  FaRegCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaRedo,
  FaTrash,
  FaUserCircle,
  FaSpinner,
  FaRobot,
  FaMicrophone,
  FaStop,
  FaArrowLeft,
  FaLightbulb,
  FaHistory,
  FaBookmark,
  FaDownload,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaHeart,
  FaStar,
  FaShare,
  FaFilter,
  FaSearch,
  FaVolumeUp,
  FaEdit,
  FaExclamationCircle,
  FaChartLine,
  FaGraduationCap,
  FaPlay,
  FaPause,
  FaFileAlt,
} from "react-icons/fa";
import api from "../axios";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstMount = useRef(true);
  const recognitionRef = useRef(null);

  // Auto-scroll on new messages (skip initial load)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (messages.length) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("legalChatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("legalChatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const createNewChat = () => {
    if (messages.length > 0) {
      // Save current chat to history
      const chatSession = {
        id: currentChatId || Date.now(),
        title: messages[0]?.text.substring(0, 50) + "..." || "New Conversation",
        messages: [...messages],
        timestamp: new Date(),
        liked: false,
        bookmarked: false,
        messageCount: messages.length,
      };
      setChatHistory(prev => [chatSession, ...prev.filter(chat => chat.id !== chatSession.id)]);
    }
    
    setMessages([]);
    setCurrentChatId(Date.now());
    setInput("");
    setContext("");
  };

  const loadChat = (chat) => {
    setMessages([...chat.messages]);
    setCurrentChatId(chat.id);
    setSelectedConversation(chat.id);
    setInput("");
    setContext("");
  };

  const toggleLike = (chatId) => {
    setChatHistory(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, liked: !chat.liked } : chat
    ));
  };

  const toggleBookmark = (chatId) => {
    setChatHistory(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, bookmarked: !chat.bookmarked } : chat
    ));
  };

  const deleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setMessages([]);
      setCurrentChatId(null);
    }
  };

  const clearAllHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("legalChatHistory");
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(chatHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'legal-chat-history.json';
    link.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      context: context,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setContext("");
    setLoading(true);
    setTyping(true);

    try {
      const response = await api.post("/chat/", {
        message: userMessage.text,
        context: userMessage.context,
      });

      setTyping(false);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.response || "I'm sorry, I couldn't process your request at the moment.",
        sender: "ai",
        timestamp: new Date(),
        confidence: response.data.confidence || 0.95,
        sources: response.data.sources || [],
        feedback: null,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setTyping(false);
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
        isError: true,
        feedback: null,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const giveFeedback = (messageId, feedback) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const startVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const filteredHistory = chatHistory.filter(chat => {
    const matchesFilter = 
      filterType === "all" ? true :
      filterType === "bookmarked" ? chat.bookmarked :
      filterType === "liked" ? chat.liked : true;
    
    const matchesSearch = searchQuery === "" || 
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages.some(msg => msg.text.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "date") return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === "messages") return b.messageCount - a.messageCount;
    return 0;
  });

  const quickPrompts = [
    "What are the key provisions of contract law?",
    "Explain intellectual property rights",
    "How does GDPR affect my business?",
    "What is the process for filing a trademark?",
    "Explain employment law basics",
    "What are the requirements for a valid contract?"
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-100 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
            >
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 border border-white/30"
              >
                <FaHistory />
                <span className="hidden sm:inline">Chat History</span>
                {chatHistory.length > 0 && (
                  <span className="bg-white/30 px-2 py-1 rounded-full text-xs font-bold ml-2">
                    {chatHistory.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={createNewChat}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 border border-white/30"
              >
                <FaComments />
                <span className="hidden sm:inline">New Chat</span>
              </button>
              
              {chatHistory.length > 0 && (
                <>
                  <button
                    onClick={exportHistory}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 border border-white/30"
                  >
                    <FaDownload />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  
                  <button
                    onClick={clearAllHistory}
                    className="bg-red-500/30 hover:bg-red-500/50 backdrop-blur-md px-4 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 border border-red-300/50"
                  >
                    <FaTrash />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-2xl">
              <FaComments className="text-6xl drop-shadow-lg" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
                AI Legal Chat
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed drop-shadow-md">
                Your intelligent legal assistant with comprehensive chat history and advanced conversation management
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2 text-blue-200">
                  <FaChartLine />
                  <span className="text-sm">Real-time Responses</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <FaHistory />
                  <span className="text-sm">Conversation History</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <FaMicrophone />
                  <span className="text-sm">Voice Input</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Enhanced Chat History Sidebar */}
          {showHistory && (
            <div className="lg:col-span-4">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 h-full max-h-[900px] flex flex-col overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <FaHistory className="mr-3" />
                      Conversation History
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold border border-white/30">
                        {chatHistory.length}
                      </span>
                      <button
                        onClick={() => setShowHistory(false)}
                        className="text-white/80 hover:text-white transition-colors duration-300 lg:hidden"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                  
                  {/* Search and Filter */}
                  <div className="space-y-3">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-white/50"
                      >
                        <option value="all" className="text-gray-800">All Chats</option>
                        <option value="bookmarked" className="text-gray-800">Bookmarked</option>
                        <option value="liked" className="text-gray-800">Liked</option>
                      </select>
                      
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-white/50"
                      >
                        <option value="date" className="text-gray-800">Latest</option>
                        <option value="messages" className="text-gray-800">Most Active</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
                  {filteredHistory.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="bg-gradient-to-r from-blue-400 to-indigo-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <FaComments className="text-white text-3xl" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">No Conversations Yet</h4>
                      <p className="text-gray-600 mb-4">Start a conversation to see your chat history here</p>
                      <button
                        onClick={createNewChat}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Start First Chat
                      </button>
                    </div>
                  ) : (
                    filteredHistory.map((chat) => (
                      <div 
                        key={chat.id} 
                        className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-1 ${
                          selectedConversation === chat.id ? 'ring-2 ring-blue-500 bg-blue-50/80' : ''
                        }`}
                        onClick={() => loadChat(chat)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="bg-gradient-to-r from-blue-400 to-indigo-400 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                              <FaComments className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">{chat.title}</h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <FaClock />
                                <span>{formatTime(new Date(chat.timestamp))}</span>
                                <span>•</span>
                                <span>{chat.messageCount} messages</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(chat.id);
                              }}
                              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                chat.liked ? 'text-red-500 bg-red-100 shadow-md' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                              }`}
                            >
                              <FaHeart className="text-sm" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(chat.id);
                              }}
                              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                chat.bookmarked ? 'text-yellow-500 bg-yellow-100 shadow-md' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                              }`}
                            >
                              <FaBookmark className="text-sm" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChat(chat.id);
                              }}
                              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between border-t border-gray-200/50 pt-4">
                          <div className="flex items-center space-x-4 text-sm">
                            {chat.liked && (
                              <span className="text-red-500 flex items-center space-x-1">
                                <FaHeart className="text-xs" />
                                <span className="text-xs">Liked</span>
                              </span>
                            )}
                            {chat.bookmarked && (
                              <span className="text-yellow-500 flex items-center space-x-1">
                                <FaStar className="text-xs" />
                                <span className="text-xs">Saved</span>
                              </span>
                            )}
                          </div>
                          
                          <span className="text-xs text-blue-600 font-semibold">
                            Load Chat
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Enhanced Main Chat Area */}
          <div className={showHistory ? "lg:col-span-8" : "lg:col-span-12"}>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 h-[900px] flex flex-col overflow-hidden">
              
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Legal AI Assistant</h2>
                  <p className="text-blue-100">Ask me anything about law and legal matters</p>
                </div>
                <div className="flex items-center space-x-3">
                  {messages.length > 0 && (
                    <button
                      onClick={createNewChat}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2"
                    >
                      <FaComments />
                      <span className="hidden sm:inline">New Chat</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/30 to-white/30">
                {messages.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-400 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <FaRobot className="text-white text-4xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Legal AI Chat</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      I'm your AI legal assistant. Ask me about contracts, intellectual property, compliance, or any legal question.
                    </p>
                    
                    {/* Quick Prompt Suggestions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                      {quickPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(prompt)}
                          className="bg-white/80 backdrop-blur-md p-4 rounded-xl border border-gray-200/50 text-left hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                          <div className="flex items-center space-x-3">
                            <FaLightbulb className="text-yellow-500 group-hover:text-yellow-600" />
                            <span className="text-gray-700 font-medium">{prompt}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-3xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className="flex items-start space-x-3">
                          {message.sender === 'ai' && (
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                              <FaRobot className="text-white" />
                            </div>
                          )}
                          
                          <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                            <div className={`inline-block p-6 rounded-2xl shadow-lg backdrop-blur-md border ${
                              message.sender === 'user' 
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-300/50' 
                                : message.isError 
                                  ? 'bg-red-50/80 text-red-800 border-red-200/50'
                                  : 'bg-white/80 text-gray-800 border-gray-200/50'
                            }`}>
                              <p className="leading-relaxed">{message.text}</p>
                              
                              {message.context && (
                                <div className="mt-3 pt-3 border-t border-white/20">
                                  <p className="text-sm opacity-75">
                                    <strong>Context:</strong> {message.context}
                                  </p>
                                </div>
                              )}
                              
                              {message.confidence && (
                                <div className="mt-3 pt-3 border-t border-gray-200/30">
                                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <FaCheckCircle className="text-green-500" />
                                    <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-3 mt-3">
                              <span className="text-xs text-gray-500">
                                {formatTime(new Date(message.timestamp))}
                              </span>
                              
                              {message.sender === 'ai' && (
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => copyMessage(message.text)}
                                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    title="Copy message"
                                  >
                                    <FaRegCopy />
                                  </button>
                                  
                                  <button
                                    onClick={() => giveFeedback(message.id, message.feedback === 'up' ? null : 'up')}
                                    className={`p-1 transition-colors duration-300 ${
                                      message.feedback === 'up' ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                                    }`}
                                    title="Helpful"
                                  >
                                    <FaThumbsUp />
                                  </button>
                                  
                                  <button
                                    onClick={() => giveFeedback(message.id, message.feedback === 'down' ? null : 'down')}
                                    className={`p-1 transition-colors duration-300 ${
                                      message.feedback === 'down' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                    }`}
                                    title="Not helpful"
                                  >
                                    <FaThumbsDown />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {message.sender === 'user' && (
                            <div className="bg-gradient-to-r from-gray-400 to-gray-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                              <FaUserCircle className="text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {/* Typing Indicator */}
                {typing && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                        <FaRobot className="text-white" />
                      </div>
                      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200/50">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="border-t border-gray-200/50 p-6 bg-white/90 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Context Input */}
                  <div className="flex items-center space-x-3">
                    <FaFileAlt className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Add context (optional): e.g., 'for my startup', 'in California', etc."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  {/* Main Input */}
                  <div className="flex items-end space-x-4">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about law... (Press Enter to send, Shift+Enter for new line)"
                        className="w-full bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 pr-16 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 resize-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                        disabled={loading}
                        rows="1"
                        style={{ minHeight: '60px', maxHeight: '120px' }}
                      />
                      
                      {/* Character Count */}
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {input.length}
                      </div>
                    </div>
                    
                    {/* Voice Input Button */}
                    <button
                      type="button"
                      onClick={isListening ? stopVoiceRecording : startVoiceRecording}
                      className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        isListening 
                          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                      disabled={loading}
                    >
                      {isListening ? <FaStop /> : <FaMicrophone />}
                    </button>
                    
                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={!input.trim() || loading}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      {loading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaPaperPlane />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
