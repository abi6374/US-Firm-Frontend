import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaQuoteRight,
  FaSearch,
  FaArrowLeft,
  FaSpinner,
  FaCheckCircle,
  FaCopy,
  FaTrash,
  FaExternalLinkAlt,
  FaBook,
  FaGavel,
  FaFileAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHistory,
  FaPaperPlane,
  FaRobot,
  FaUserCircle,
  FaBookmark,
  FaDownload,
  FaStar,
  FaClock,
  FaThumbsUp,
  FaTimes,
  FaLightbulb,
  FaChartLine,
  FaHeart,
} from "react-icons/fa";
import api from "../axios";

export default function CitationPage() {
  const [text, setText] = useState("");
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("lookup");
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const [selectedCitations, setSelectedCitations] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const isFirstMount = useRef(true);

  // Auto-scroll on new history items (skip initial load)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (chatHistory.length) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("citationChatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("citationChatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const addToChatHistory = (userText, extractedCitations) => {
    const newMessage = {
      id: Date.now(),
      timestamp: new Date(),
      userInput: userText,
      citations: extractedCitations,
      type: searchType,
      liked: null,
      bookmarked: false,
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const toggleLike = (messageId, liked) => {
    setChatHistory(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, liked } : msg
    ));
  };

  const toggleBookmark = (messageId) => {
    setChatHistory(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, bookmarked: !msg.bookmarked } : msg
    ));
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("citationChatHistory");
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(chatHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'citation-history.json';
    link.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    
    try {
      const endpoint = searchType === "lookup" ? "/citation/lookup/" : "/citation/batch/";
      const response = await api.post(endpoint, { text });
      
      const extractedCitations = response.data.citations || [];
      setCitations(extractedCitations);
      
      // Add to chat history
      addToChatHistory(text, extractedCitations);
      
      // Clear input
      setText("");
    } catch (error) {
      console.error("Citation extraction failed:", error);
      setCitations([]);
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

  const copyCitation = (citation) => {
    navigator.clipboard.writeText(citation.text || citation);
  };

  const useSampleText = () => {
    const sampleText = `"In Brown v. Board of Education, 347 U.S. 483 (1954), the Supreme Court held that racial segregation in public schools was unconstitutional. This decision overturned Plessy v. Ferguson, 163 U.S. 537 (1896), and established new precedent under the Equal Protection Clause of the Fourteenth Amendment."`;
    setText(sampleText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const filteredHistory = chatHistory.filter(msg => {
    if (filterType === "all") return true;
    if (filterType === "bookmarked") return msg.bookmarked;
    if (filterType === "liked") return msg.liked === true;
    return true;
  }).sort((a, b) => {
    if (sortBy === "date") return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === "citations") return b.citations.length - a.citations.length;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-orange-100 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
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
                    onClick={clearHistory}
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
              <FaQuoteRight className="text-6xl drop-shadow-lg" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-orange-100 to-pink-100 bg-clip-text text-transparent drop-shadow-lg">
                Citation Extraction
              </h1>
              <p className="text-xl text-orange-100 leading-relaxed drop-shadow-md">
                AI-powered legal citation extraction with chat-like interface and comprehensive history tracking
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2 text-orange-200">
                  <FaChartLine />
                  <span className="text-sm">Real-time Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-orange-200">
                  <FaHistory />
                  <span className="text-sm">Session History</span>
                </div>
                <div className="flex items-center space-x-2 text-orange-200">
                  <FaBookmark />
                  <span className="text-sm">Smart Bookmarks</span>
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
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <FaHistory className="mr-3" />
                      Citation History
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
                  
                  {chatHistory.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                      >
                        <option value="all" className="text-gray-800">All Messages</option>
                        <option value="bookmarked" className="text-gray-800">Bookmarked</option>
                        <option value="liked" className="text-gray-800">Liked</option>
                      </select>
                      
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-white/50"
                      >
                        <option value="date" className="text-gray-800">Latest</option>
                        <option value="citations" className="text-gray-800">Most Citations</option>
                      </select>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
                  {filteredHistory.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="bg-gradient-to-r from-orange-400 to-red-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <FaQuoteRight className="text-white text-3xl" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">No Citation History</h4>
                      <p className="text-gray-600 mb-4">Start extracting citations to see your history here</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FaHistory />
                          <span>Track extractions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaBookmark />
                          <span>Save favorites</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    filteredHistory.map((message) => (
                      <div key={message.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-orange-400 to-red-400 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                              <FaUserCircle className="text-white" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <FaClock className="text-gray-400 text-sm" />
                                <span className="text-sm text-gray-500 font-medium">
                                  {formatTime(new Date(message.timestamp))}
                                </span>
                              </div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                                message.type === 'lookup' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                              }`}>
                                {message.type === 'lookup' ? 'Single Lookup' : 'Batch Process'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={() => toggleLike(message.id, message.liked === true ? null : true)}
                              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                message.liked === true ? 'text-green-500 bg-green-100 shadow-md' : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
                              }`}
                            >
                              <FaThumbsUp className="text-sm" />
                            </button>
                            
                            <button
                              onClick={() => toggleBookmark(message.id)}
                              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                message.bookmarked ? 'text-yellow-500 bg-yellow-100 shadow-md' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                              }`}
                            >
                              <FaBookmark className="text-sm" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                          {message.userInput.substring(0, 120)}...
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-gray-200/50 pt-4">
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                              {message.citations.length} citations
                            </span>
                            {message.liked === true && (
                              <span className="text-green-500 flex items-center space-x-1">
                                <FaHeart className="text-xs" />
                                <span className="text-xs">Liked</span>
                              </span>
                            )}
                            {message.bookmarked && (
                              <span className="text-yellow-500 flex items-center space-x-1">
                                <FaStar className="text-xs" />
                                <span className="text-xs">Saved</span>
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => {
                              setText(message.userInput);
                              setCitations(message.citations);
                            }}
                            className="text-orange-600 hover:text-orange-700 font-semibold text-sm bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full transition-all duration-300"
                          >
                            Load
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          )}
          
          {/* Enhanced Main Content */}
          <div className={showHistory ? "lg:col-span-8" : "lg:col-span-12"}>
            <div className="space-y-8">
              
              {/* Enhanced Input Section */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200/50">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Extract Legal Citations</h2>
                    <p className="text-gray-600">Paste legal text and let AI find all citations instantly</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-1.5 shadow-lg">
                    <button
                      onClick={() => setSearchType("lookup")}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
                        searchType === "lookup"
                          ? "bg-white text-orange-600 shadow-md scale-105"
                          : "text-gray-600 hover:text-orange-600 hover:scale-105"
                      }`}
                    >
                      <FaSearch className="inline mr-2" />
                      Single Lookup
                    </button>
                    <button
                      onClick={() => setSearchType("batch")}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
                        searchType === "batch"
                          ? "bg-white text-orange-600 shadow-md scale-105"
                          : "text-gray-600 hover:text-orange-600 hover:scale-105"
                      }`}
                    >
                      <FaFileAlt className="inline mr-2" />
                      Batch Process
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Legal Text Content
                    </label>
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Paste your legal text containing citations here... Our AI will automatically detect court cases, statutes, regulations, and other legal references."
                        className="w-full h-40 p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 resize-none text-gray-700 placeholder-gray-400 bg-white/50 backdrop-blur-sm transition-all duration-300"
                        disabled={loading}
                      />
                      <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                        <span className="text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full">
                          {text.length} chars
                        </span>
                        <button
                          type="button"
                          onClick={useSampleText}
                          className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center space-x-2 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full transition-all duration-300"
                        >
                          <FaLightbulb />
                          <span>Try Sample</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500" />
                        <span>Auto-detection enabled</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaHistory className="text-blue-500" />
                        <span>History tracking</span>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!text.trim() || loading}
                      className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-orange-600 hover:via-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-xl hover:shadow-2xl"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin text-lg" />
                          <span>Extracting Citations...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-lg" />
                          <span>Extract Citations</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Enhanced Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-gray-600 group cursor-pointer">
                    <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-200 transition-colors duration-300">
                      <FaCheckCircle className="text-orange-500" />
                    </div>
                    <span className="font-medium">Auto-detection</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 group cursor-pointer">
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                      <FaSearch className="text-blue-500" />
                    </div>
                    <span className="font-medium">Case lookup</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 group cursor-pointer">
                    <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                      <FaBook className="text-green-500" />
                    </div>
                    <span className="font-medium">Legal references</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 group cursor-pointer">
                    <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                      <FaFileAlt className="text-purple-500" />
                    </div>
                    <span className="font-medium">Batch processing</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Results Section */}
              {citations.length > 0 && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200/50">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 flex items-center mb-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl mr-4 shadow-lg">
                          <FaQuoteRight className="text-white text-xl" />
                        </div>
                        Extracted Citations
                      </h3>
                      <p className="text-gray-600">Found {citations.length} legal references in your text</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-6 py-3 rounded-2xl font-bold text-lg shadow-lg">
                      {citations.length} Citations
                    </div>
                  </div>

                  <div className="space-y-6">
                    {citations.map((citation, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-orange-50/50 rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-xl text-gray-900 mb-2">
                                {citation.case_name || citation.title || "Legal Citation"}
                              </h4>
                              {citation.citation && (
                                <p className="text-sm text-gray-600 font-mono bg-white/80 px-4 py-2 rounded-lg border border-gray-200/50 mb-3">
                                  {citation.citation}
                                </p>
                              )}
                              {citation.description && (
                                <p className="text-gray-700 leading-relaxed">
                                  {citation.description}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={() => copyCitation(citation)}
                              className="p-3 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-300 transform hover:scale-110"
                              title="Copy Citation"
                            >
                              <FaCopy className="text-lg" />
                            </button>
                            
                            {citation.url && (
                              <a
                                href={citation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:scale-110"
                                title="View Full Text"
                              >
                                <FaExternalLinkAlt className="text-lg" />
                              </a>
                            )}
                            
                            <button
                              onClick={() => setSelectedCitations(prev => 
                                prev.includes(index) 
                                  ? prev.filter(i => i !== index)
                                  : [...prev, index]
                              )}
                              className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                                selectedCitations.includes(index)
                                  ? 'text-yellow-500 bg-yellow-100 shadow-md'
                                  : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                              }`}
                              title="Bookmark Citation"
                            >
                              <FaBookmark className="text-lg" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm border-t border-gray-200/50 pt-6">
                          {citation.court && (
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 p-2 rounded-lg">
                                <FaGavel className="text-blue-500" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-700">Court</p>
                                <p className="text-gray-600">{citation.court}</p>
                              </div>
                            </div>
                          )}
                          
                          {citation.year && (
                            <div className="flex items-center space-x-3">
                              <div className="bg-green-100 p-2 rounded-lg">
                                <FaCalendarAlt className="text-green-500" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-700">Year</p>
                                <p className="text-gray-600">{citation.year}</p>
                              </div>
                            </div>
                          )}
                          
                          {citation.jurisdiction && (
                            <div className="flex items-center space-x-3">
                              <div className="bg-purple-100 p-2 rounded-lg">
                                <FaMapMarkerAlt className="text-purple-500" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-700">Jurisdiction</p>
                                <p className="text-gray-600">{citation.jurisdiction}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Sample Text Section */}
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-300/20 rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">Ready to Extract Citations?</h3>
                  <p className="text-xl text-orange-100 leading-relaxed max-w-3xl mx-auto">
                    Paste legal text containing citations and references. Our advanced AI will automatically detect 
                    and provide detailed information about each citation, tracking everything in your personal history.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl relative">
                  <h4 className="font-bold text-xl mb-6 flex items-center justify-center">
                    <FaLightbulb className="mr-3 text-yellow-300" />
                    Sample Text to Try
                  </h4>
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-sm leading-relaxed mb-6 border border-white/30">
                    "In Brown v. Board of Education, 347 U.S. 483 (1954), the Supreme Court held that racial segregation in public schools was unconstitutional. This decision overturned Plessy v. Ferguson, 163 U.S. 537 (1896), and established new precedent under the Equal Protection Clause of the Fourteenth Amendment."
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={useSampleText}
                      className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
                    >
                      <FaRobot />
                      <span>Try This Sample Text</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
