import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFileContract,
  FaUpload,
  FaFileAlt,
  FaArrowLeft,
  FaDownload,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCopy,
  FaEye,
  FaTrash,
  FaHistory,
  FaBookmark,
  FaTimes,
  FaHeart,
  FaStar,
  FaSearch,
  FaFilter,
  FaClock,
  FaFileWord,
  FaFilePdf,
  FaShieldAlt,
  FaExclamationCircle,
  FaInfoCircle,
  FaBalanceScale,
  FaGavel,
  FaHandshake,
  FaClipboardCheck,
  FaRobot,
  FaMagic,
  FaLightbulb,
  FaChartLine,
  FaListAlt,
  FaPrint,
  FaQuoteLeft,
  FaEdit,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaFileSignature,
} from "react-icons/fa";
import api from "../axios";

export default function AnalyzerPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("text");
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [analysisType, setAnalysisType] = useState("comprehensive");
  const fileInputRef = useRef(null);

  // Load analysis history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("contractAnalysisHistory");
    if (savedHistory) {
      setAnalysisHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save analysis history to localStorage
  useEffect(() => {
    if (analysisHistory.length > 0) {
      localStorage.setItem("contractAnalysisHistory", JSON.stringify(analysisHistory));
    }
  }, [analysisHistory]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const addToHistory = (input, analysisData, inputType) => {
    const historyItem = {
      id: Date.now(),
      timestamp: new Date(),
      inputText: input,
      analysis: analysisData,
      inputType: inputType,
      analysisType: analysisType,
      liked: false,
      bookmarked: false,
      wordCount: input.length,
      riskScore: analysisData?.risk_assessment?.overall_risk_score || 0,
    };
    setAnalysisHistory(prev => [historyItem, ...prev]);
  };

  const toggleLike = (analysisId) => {
    setAnalysisHistory(prev => prev.map(item => 
      item.id === analysisId ? { ...item, liked: !item.liked } : item
    ));
  };

  const toggleBookmark = (analysisId) => {
    setAnalysisHistory(prev => prev.map(item => 
      item.id === analysisId ? { ...item, bookmarked: !item.bookmarked } : item
    ));
  };

  const deleteAnalysis = (analysisId) => {
    setAnalysisHistory(prev => prev.filter(item => item.id !== analysisId));
  };

  const clearAllHistory = () => {
    setAnalysisHistory([]);
    localStorage.removeItem("contractAnalysisHistory");
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(analysisHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contract-analysis-history.json';
    link.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    setLoading(true);
    
    try {
      const formData = new FormData();
      
      if (uploadMethod === "file" && file) {
        formData.append("file", file);
        formData.append("analysis_type", analysisType);
      } else {
        formData.append("text", text);
        formData.append("analysis_type", analysisType);
      }

      const response = await api.post("/analyze/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const analysisData = response.data;
      setAnalysis(analysisData);
      
      // Add to history
      addToHistory(
        uploadMethod === "file" ? file.name : text,
        analysisData,
        uploadMethod
      );

      // Clear inputs
      setText("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis({
        error: "Failed to analyze contract. Please try again.",
        risk_assessment: { overall_risk_score: 0 },
        key_clauses: [],
        recommendations: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        alert('Please select a PDF, Word document, or text file.');
        e.target.value = "";
      }
    }
  };

  const copyAnalysis = () => {
    const content = `CONTRACT ANALYSIS REPORT\n\n${analysis.summary || 'No summary available'}\n\nRISK ASSESSMENT:\nOverall Risk Score: ${analysis.risk_assessment?.overall_risk_score || 0}/10\n\nKEY CLAUSES:\n${analysis.key_clauses?.map((clause, index) => `${index + 1}. ${clause}`).join('\n') || 'No key clauses identified'}\n\nRECOMMENDATIONS:\n${analysis.recommendations?.map((rec, index) => `${index + 1}. ${rec}`).join('\n') || 'No recommendations available'}`;
    navigator.clipboard.writeText(content);
  };

  const downloadAnalysis = () => {
    const content = `CONTRACT ANALYSIS REPORT\n\n${analysis.summary || 'No summary available'}\n\nRISK ASSESSMENT:\nOverall Risk Score: ${analysis.risk_assessment?.overall_risk_score || 0}/10\n\nKEY CLAUSES:\n${analysis.key_clauses?.map((clause, index) => `${index + 1}. ${clause}`).join('\n') || 'No key clauses identified'}\n\nRECOMMENDATIONS:\n${analysis.recommendations?.map((rec, index) => `${index + 1}. ${rec}`).join('\n') || 'No recommendations available'}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contract-analysis-report.txt';
    link.click();
  };

  const loadAnalysis = (historyItem) => {
    setAnalysis(historyItem.analysis);
    setSelectedAnalysis(historyItem.id);
    if (historyItem.inputType === "text") {
      setText(historyItem.inputText);
      setUploadMethod("text");
    }
  };

  const getRiskColor = (score) => {
    if (score <= 3) return "text-green-600 bg-green-100";
    if (score <= 6) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getRiskIcon = (score) => {
    if (score <= 3) return <FaCheckCircle className="text-green-500" />;
    if (score <= 6) return <FaExclamationTriangle className="text-yellow-500" />;
    return <FaExclamationCircle className="text-red-500" />;
  };

  const filteredHistory = analysisHistory.filter(item => {
    const matchesFilter = 
      filterType === "all" ? true :
      filterType === "bookmarked" ? item.bookmarked :
      filterType === "liked" ? item.liked :
      filterType === "high-risk" ? item.riskScore > 6 :
      filterType === "low-risk" ? item.riskScore <= 3 : true;
    
    const matchesSearch = searchQuery === "" || 
      item.inputText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.analysis.summary && item.analysis.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "date") return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === "risk") return b.riskScore - a.riskScore;
    if (sortBy === "size") return b.wordCount - a.wordCount;
    return 0;
  });

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf': return <FaFilePdf className="text-red-500" />;
      case 'doc':
      case 'docx': return <FaFileWord className="text-blue-500" />;
      default: return <FaFileContract className="text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-purple-100 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
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
                <span className="hidden sm:inline">Analysis History</span>
                {analysisHistory.length > 0 && (
                  <span className="bg-white/30 px-2 py-1 rounded-full text-xs font-bold ml-2">
                    {analysisHistory.length}
                  </span>
                )}
              </button>
              
              {analysisHistory.length > 0 && (
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
              <FaFileContract className="text-6xl drop-shadow-lg" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-indigo-100 bg-clip-text text-transparent drop-shadow-lg">
                Contract Analysis
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed drop-shadow-md">
                AI-powered legal document analysis with risk assessment and intelligent recommendations
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2 text-purple-200">
                  <FaShieldAlt />
                  <span className="text-sm">Risk Assessment</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-200">
                  <FaGavel />
                  <span className="text-sm">Legal Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-200">
                  <FaHistory />
                  <span className="text-sm">Analysis History</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Enhanced Analysis History Sidebar */}
          {showHistory && (
            <div className="lg:col-span-4">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 h-full max-h-[900px] flex flex-col overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <FaHistory className="mr-3" />
                      Analysis History
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold border border-white/30">
                        {analysisHistory.length}
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
                        placeholder="Search analyses..."
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
                        <option value="all" className="text-gray-800">All Analyses</option>
                        <option value="bookmarked" className="text-gray-800">Bookmarked</option>
                        <option value="liked" className="text-gray-800">Liked</option>
                        <option value="high-risk" className="text-gray-800">High Risk</option>
                        <option value="low-risk" className="text-gray-800">Low Risk</option>
                      </select>
                      
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-white/50"
                      >
                        <option value="date" className="text-gray-800">Latest</option>
                        <option value="risk" className="text-gray-800">Risk Level</option>
                        <option value="size" className="text-gray-800">Document Size</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
                  {filteredHistory.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="bg-gradient-to-r from-purple-400 to-indigo-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <FaFileContract className="text-white text-3xl" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">No Analyses Yet</h4>
                      <p className="text-gray-600 mb-4">Start analyzing contracts to see your history here</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FaShieldAlt />
                          <span>Risk assessment</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaBookmark />
                          <span>Save reports</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    filteredHistory.map((item) => (
                      <div 
                        key={item.id} 
                        className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-1 ${
                          selectedAnalysis === item.id ? 'ring-2 ring-purple-500 bg-purple-50/80' : ''
                        }`}
                        onClick={() => loadAnalysis(item)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="bg-gradient-to-r from-purple-400 to-indigo-400 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                              {item.inputType === 'file' ? getFileIcon(item.inputText) : <FaFileContract className="text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">
                                {item.inputType === 'file' ? item.inputText : `${item.inputText.substring(0, 30)}...`}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <FaClock />
                                <span>{formatTime(new Date(item.timestamp))}</span>
                                <span>•</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(item.riskScore)}`}>
                                  Risk: {item.riskScore}/10
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(item.id);
                              }}
                              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                item.liked ? 'text-red-500 bg-red-100 shadow-md' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                              }`}
                            >
                              <FaHeart className="text-sm" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(item.id);
                              }}
                              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                item.bookmarked ? 'text-yellow-500 bg-yellow-100 shadow-md' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                              }`}
                            >
                              <FaBookmark className="text-sm" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAnalysis(item.id);
                              }}
                              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                          {item.analysis.summary ? item.analysis.summary.substring(0, 120) + '...' : 'Contract analysis completed'}
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-gray-200/50 pt-4">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              {getRiskIcon(item.riskScore)}
                              <span className="font-semibold">Risk: {item.riskScore}/10</span>
                            </div>
                            {item.liked && (
                              <span className="text-red-500 flex items-center space-x-1">
                                <FaHeart className="text-xs" />
                                <span className="text-xs">Liked</span>
                              </span>
                            )}
                            {item.bookmarked && (
                              <span className="text-yellow-500 flex items-center space-x-1">
                                <FaStar className="text-xs" />
                                <span className="text-xs">Saved</span>
                              </span>
                            )}
                          </div>
                          
                          <span className="text-xs text-purple-600 font-semibold">
                            Load Analysis
                          </span>
                        </div>
                      </div>
                    ))
                  )}
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Contract Analysis</h2>
                    <p className="text-gray-600">Upload legal documents for comprehensive AI analysis and risk assessment</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-1.5 shadow-lg">
                    <button
                      onClick={() => setUploadMethod("text")}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
                        uploadMethod === "text"
                          ? "bg-white text-purple-600 shadow-md scale-105"
                          : "text-gray-600 hover:text-purple-600 hover:scale-105"
                      }`}
                    >
                      <FaFileAlt className="inline mr-2" />
                      Text Input
                    </button>
                    <button
                      onClick={() => setUploadMethod("file")}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
                        uploadMethod === "file"
                          ? "bg-white text-purple-600 shadow-md scale-105"
                          : "text-gray-600 hover:text-purple-600 hover:scale-105"
                      }`}
                    >
                      <FaUpload className="inline mr-2" />
                      File Upload
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Analysis Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Analysis Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setAnalysisType("risk-focused")}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          analysisType === "risk-focused"
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-600"
                        }`}
                      >
                        <FaShieldAlt className="text-2xl mb-2 mx-auto" />
                        <div className="font-semibold">Risk Focused</div>
                        <div className="text-sm">Identify potential risks</div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setAnalysisType("comprehensive")}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          analysisType === "comprehensive"
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-600"
                        }`}
                      >
                        <FaBalanceScale className="text-2xl mb-2 mx-auto" />
                        <div className="font-semibold">Comprehensive</div>
                        <div className="text-sm">Full legal analysis</div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setAnalysisType("clause-review")}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          analysisType === "clause-review"
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-600"
                        }`}
                      >
                        <FaClipboardCheck className="text-2xl mb-2 mx-auto" />
                        <div className="font-semibold">Clause Review</div>
                        <div className="text-sm">Focus on key terms</div>
                      </button>
                    </div>
                  </div>

                  {uploadMethod === "text" ? (
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Contract Text
                      </label>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your contract or legal document text here for analysis..."
                        className="w-full h-40 p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 resize-none text-gray-700 placeholder-gray-400 bg-white/50 backdrop-blur-sm transition-all duration-300"
                        disabled={loading}
                      />
                      <div className="absolute bottom-4 right-4 text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full">
                        {text.length} chars
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Upload Contract
                      </label>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors duration-300 bg-white/50 backdrop-blur-sm cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          disabled={loading}
                        />
                        
                        {file ? (
                          <div className="space-y-4">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                              {getFileIcon(file.name)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{file.name}</p>
                              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                fileInputRef.current.value = "";
                              }}
                              className="text-red-500 hover:text-red-700 text-sm font-semibold"
                            >
                              Remove file
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <FaUpload className="text-4xl text-gray-400 mx-auto" />
                            <div>
                              <p className="text-lg font-semibold text-gray-700">Click to upload contract</p>
                              <p className="text-sm text-gray-500">Supports PDF, Word, and text files</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaShieldAlt className="text-purple-500" />
                        <span>Risk assessment</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaGavel className="text-blue-500" />
                        <span>Legal analysis</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaLightbulb className="text-yellow-500" />
                        <span>AI recommendations</span>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={(!text.trim() && !file) || loading}
                      className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-xl hover:shadow-2xl"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin text-lg" />
                          <span>Analyzing Contract...</span>
                        </>
                      ) : (
                        <>
                          <FaMagic className="text-lg" />
                          <span>Analyze Contract</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Enhanced Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-gray-600 group cursor-pointer">
                    <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                      <FaRobot className="text-purple-500" />
                    </div>
                    <span className="font-medium">AI Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 group cursor-pointer">
                    <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors duration-300">
                      <FaShieldAlt className="text-red-500" />
                    </div>
                    <span className="font-medium">Risk Assessment</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 group cursor-pointer">
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                      <FaGavel className="text-blue-500" />
                    </div>
                    <span className="font-medium">Legal Insights</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 group cursor-pointer">
                    <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                      <FaHistory className="text-green-500" />
                    </div>
                    <span className="font-medium">History Tracking</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Results Section */}
              {analysis && !analysis.error && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200/50">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 flex items-center mb-2">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-2xl mr-4 shadow-lg">
                          <FaFileContract className="text-white text-xl" />
                        </div>
                        Analysis Report
                      </h3>
                      <p className="text-gray-600">Comprehensive contract analysis with risk assessment</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={copyAnalysis}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2"
                      >
                        <FaCopy />
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={downloadAnalysis}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-600 px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2"
                      >
                        <FaDownload />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    
                    {/* Risk Assessment */}
                    {analysis.risk_assessment && (
                      <div className="bg-gradient-to-r from-red-50 to-orange-50/50 rounded-2xl p-6 border border-red-200/50">
                        <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                          <FaShieldAlt className="text-red-500 mr-2" />
                          Risk Assessment
                        </h4>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            {getRiskIcon(analysis.risk_assessment.overall_risk_score)}
                            <span className="text-2xl font-bold text-gray-900">
                              {analysis.risk_assessment.overall_risk_score}/10
                            </span>
                          </div>
                          <div className={`px-4 py-2 rounded-full font-semibold ${getRiskColor(analysis.risk_assessment.overall_risk_score)}`}>
                            {analysis.risk_assessment.overall_risk_score <= 3 ? 'Low Risk' :
                             analysis.risk_assessment.overall_risk_score <= 6 ? 'Medium Risk' : 'High Risk'}
                          </div>
                        </div>
                        {analysis.risk_assessment.risk_factors && analysis.risk_assessment.risk_factors.length > 0 && (
                          <div className="space-y-2">
                            <p className="font-semibold text-gray-700">Risk Factors:</p>
                            <ul className="space-y-1">
                              {analysis.risk_assessment.risk_factors.map((factor, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <FaExclamationTriangle className="text-orange-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{factor}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Summary */}
                    {analysis.summary && (
                      <div className="bg-gradient-to-r from-gray-50 to-purple-50/50 rounded-2xl p-6 border border-gray-200/50">
                        <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                          <FaQuoteLeft className="text-purple-500 mr-2" />
                          Contract Summary
                        </h4>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{analysis.summary}</p>
                      </div>
                    )}

                    {/* Key Clauses */}
                    {analysis.key_clauses && analysis.key_clauses.length > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl p-6 border border-blue-200/50">
                        <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                          <FaFileSignature className="text-blue-500 mr-2" />
                          Key Clauses ({analysis.key_clauses.length})
                        </h4>
                        <div className="space-y-3">
                          {analysis.key_clauses.map((clause, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shadow-md flex-shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <p className="text-gray-700 leading-relaxed">{clause}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {analysis.recommendations && analysis.recommendations.length > 0 && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-2xl p-6 border border-green-200/50">
                        <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                          <FaLightbulb className="text-green-500 mr-2" />
                          Recommendations ({analysis.recommendations.length})
                        </h4>
                        <div className="space-y-3">
                          {analysis.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shadow-md flex-shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <p className="text-gray-700 leading-relaxed">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Display */}
              {analysis && analysis.error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-center space-x-3">
                    <FaExclamationCircle className="text-red-500 text-xl" />
                    <div>
                      <h4 className="font-bold text-red-800">Analysis Failed</h4>
                      <p className="text-red-600">{analysis.error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
