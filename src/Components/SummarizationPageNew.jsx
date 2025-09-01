import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFilePdf,
  FaUpload,
  FaFileAlt,
  FaArrowLeft,
  FaDownload,
  FaSpinner,
  FaCheckCircle,
  FaCopy,
  FaEye,
  FaTrash,
  FaHistory,
  FaTimes,
  FaSearch,
  FaClock,
  FaFileWord,
  FaRobot,
  FaMagic,
  FaGraduationCap,
  FaListAlt,
  FaQuoteLeft,
  FaCloudUploadAlt,
  FaChartBar,
  FaLightbulb,
  FaFileContract,
  FaShieldAlt,
  FaCog,
  FaSave,
} from "react-icons/fa";
import api from "../axios";

export default function SummarizationPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("text");
  const [summaryHistory, setSummaryHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [summaryType, setSummaryType] = useState("comprehensive");
  const [ragMode, setRagMode] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [ragQuery, setRagQuery] = useState("");
  const [ragResponse, setRagResponse] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Load data from localStorage and server
  useEffect(() => {
    loadSummaryHistory();
    loadUserDocuments();
  }, []);

  const loadSummaryHistory = () => {
    const savedHistory = localStorage.getItem("summaryHistory");
    if (savedHistory) {
      setSummaryHistory(JSON.parse(savedHistory));
    }
  };

  const loadUserDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get("/api/v1/documents", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUploadedDocuments(response.data);
    } catch (error) {
      console.error("Error loading documents:", error);
    }
  };

  const addToHistory = (input, summaryData, inputType, docType) => {
    const historyItem = {
      id: Date.now(),
      timestamp: new Date(),
      inputText: input,
      summary: summaryData.summary || summaryData,
      keyPoints: summaryData.keyPoints || [],
      inputType: inputType,
      documentType: docType,
      summaryType: summaryType,
      liked: false,
      bookmarked: false,
      wordCount: input.length,
    };
    const newHistory = [historyItem, ...summaryHistory];
    setSummaryHistory(newHistory);
    localStorage.setItem("summaryHistory", JSON.stringify(newHistory));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploadMethod("file");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadMethod("file");
    }
  };

  const uploadDocument = async () => {
    if (!file) return;

    setLoading(true);
    setUploadProgress(0);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/api/v1/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      if (response.data) {
        setUploadedDocuments(prev => [response.data, ...prev]);
        setFile(null);
        setUploadProgress(0);
        
        // Show success message
        setSummary("Document uploaded successfully! You can now use it for Q&A or summarization.");
        
        // If in RAG mode, also upload to external server
        if (ragMode) {
          await uploadToRagServer();
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      setSummary(`Upload failed: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const uploadToRagServer = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await api.post("/api/v1/rag/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        setSummary(prev => prev + "\n\nDocument also uploaded to RAG server for Q&A capabilities.");
      }
    } catch (error) {
      console.error("RAG upload error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    setLoading(true);
    
    try {
      if (uploadMethod === "file" && file) {
        await uploadDocument();
      } else if (uploadMethod === "text" && text.trim()) {
        // Summarize text
        const response = await api.post("/api/v1/documents/summarize", {
          text: text,
          summary_type: summaryType
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.data.summary) {
          setSummary(response.data.summary);
          setKeyPoints(response.data.key_points || []);
          addToHistory(text, response.data, "text", "text");
        }
      }
    } catch (error) {
      console.error("Processing error:", error);
      setSummary(`Failed to process request. Please try again. Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRagQuery = async (e) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;

    setLoading(true);
    
    try {
      const response = await api.post("/api/v1/rag/query", {
        query: ragQuery
      });

      if (response.data.response) {
        setRagResponse(response.data.response);
      }
    } catch (error) {
      console.error("RAG query error:", error);
      setRagResponse(`Query failed: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (docId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/v1/documents/${docId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUploadedDocuments(prev => prev.filter(doc => doc.id !== docId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename) => {
    const ext = filename?.toLowerCase().split('.').pop();
    switch (ext) {
      case 'pdf': return <FaFilePdf className="text-red-500" />;
      case 'doc':
      case 'docx': return <FaFileWord className="text-blue-500" />;
      default: return <FaFileAlt className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Document Analyzer
              </h1>
              <div className="flex items-center space-x-2">
                <FaRobot className="text-purple-400" />
                <FaMagic className="text-blue-400" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/10"
              >
                <FaHistory />
              </button>
              <button
                onClick={() => setRagMode(!ragMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur-sm border ${
                  ragMode 
                    ? 'bg-purple-500/20 border-purple-400/50 text-purple-200' 
                    : 'bg-white/10 border-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {ragMode ? 'Q&A Mode' : 'Summary Mode'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Mode Selector */}
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <FaGraduationCap className="text-purple-400" />
                  <span>Analysis Mode</span>
                </h2>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setUploadMethod("text")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      uploadMethod === "text"
                        ? "bg-purple-500/30 text-purple-200 border border-purple-400/50"
                        : "bg-white/10 text-white/60 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <FaFileAlt className="inline mr-2" />
                    Text Input
                  </button>
                  <button
                    onClick={() => setUploadMethod("file")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      uploadMethod === "file"
                        ? "bg-blue-500/30 text-blue-200 border border-blue-400/50"
                        : "bg-white/10 text-white/60 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <FaUpload className="inline mr-2" />
                    File Upload
                  </button>
                </div>
              </div>

              {/* Summary Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-2">Analysis Type</label>
                <select
                  value={summaryType}
                  onChange={(e) => setSummaryType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="comprehensive">Comprehensive Analysis</option>
                  <option value="brief">Brief Summary</option>
                  <option value="key_points">Key Points Only</option>
                  <option value="legal_analysis">Legal Analysis</option>
                </select>
              </div>

              {/* Text Input Method */}
              {uploadMethod === "text" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Enter your text for analysis
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full h-40 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                      placeholder="Paste your legal document, contract, or text here..."
                      required
                    />
                    <div className="flex justify-between items-center mt-2 text-sm text-white/60">
                      <span>{text.length} characters</span>
                      <span>Max: 10,000 characters</span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !text.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <FaMagic />
                        <span>Analyze Text</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* File Upload Method */}
              {uploadMethod === "file" && (
                <div className="space-y-4">
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                      dragActive
                        ? "border-purple-400 bg-purple-500/10"
                        : "border-white/30 hover:border-white/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                    
                    {file ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-3 text-green-400">
                          <FaCheckCircle />
                          <span className="font-medium">File selected:</span>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.name)}
                            <div className="flex-1 text-left">
                              <p className="text-white font-medium">{file.name}</p>
                              <p className="text-white/60 text-sm">{formatFileSize(file.size)}</p>
                            </div>
                            <button
                              onClick={() => setFile(null)}
                              className="p-1 hover:bg-white/20 rounded text-white/60 hover:text-white"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                        
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        )}
                        
                        <button
                          onClick={handleSubmit}
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <FaCloudUploadAlt />
                              <span>Upload & Analyze</span>
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="cursor-pointer space-y-4"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex justify-center">
                          <FaCloudUploadAlt className="text-4xl text-white/60" />
                        </div>
                        <div>
                          <p className="text-white/80 font-medium">Drop your document here</p>
                          <p className="text-white/60 text-sm">or click to browse</p>
                        </div>
                        <div className="flex justify-center space-x-4 text-white/40">
                          <FaFilePdf />
                          <FaFileWord />
                          <FaFileAlt />
                        </div>
                        <p className="text-xs text-white/40">
                          Supports PDF, DOC, DOCX, TXT (Max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RAG Query Section */}
            {ragMode && (
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <FaQuoteLeft className="text-blue-400" />
                  <span>Document Q&A</span>
                </h3>
                
                <form onSubmit={handleRagQuery} className="space-y-4">
                  <div>
                    <textarea
                      value={ragQuery}
                      onChange={(e) => setRagQuery(e.target.value)}
                      className="w-full h-24 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      placeholder="Ask a question about your uploaded documents..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !ragQuery.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Querying...</span>
                      </>
                    ) : (
                      <>
                        <FaSearch />
                        <span>Ask Question</span>
                      </>
                    )}
                  </button>
                </form>

                {/* RAG Response */}
                {ragResponse && (
                  <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white flex items-center space-x-2">
                        <FaRobot className="text-blue-400" />
                        <span>AI Response</span>
                      </h4>
                      <button
                        onClick={() => copyToClipboard(ragResponse)}
                        className="p-2 hover:bg-white/20 rounded text-white/60 hover:text-white transition-colors"
                      >
                        <FaCopy />
                      </button>
                    </div>
                    <div className="text-white/90 whitespace-pre-wrap leading-relaxed">
                      {ragResponse}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Analysis Results */}
            {(summary || keyPoints.length > 0) && (
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <FaChartBar className="text-green-400" />
                    <span>Analysis Results</span>
                  </h3>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(summary)}
                      className="p-2 hover:bg-white/20 rounded text-white/60 hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([summary], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'analysis-result.txt';
                        a.click();
                      }}
                      className="p-2 hover:bg-white/20 rounded text-white/60 hover:text-white transition-colors"
                      title="Download as text"
                    >
                      <FaDownload />
                    </button>
                    <button
                      onClick={() => {
                        addToHistory(text || file?.name || "", { summary, keyPoints }, uploadMethod, file?.type || "text");
                      }}
                      className="p-2 hover:bg-white/20 rounded text-white/60 hover:text-white transition-colors"
                      title="Save to history"
                    >
                      <FaSave />
                    </button>
                  </div>
                </div>

                {/* Summary */}
                {summary && (
                  <div className="mb-6">
                    <h4 className="font-medium text-white/90 mb-3 flex items-center space-x-2">
                      <FaFileContract className="text-purple-400" />
                      <span>Summary</span>
                    </h4>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                      <div className="text-white/90 whitespace-pre-wrap leading-relaxed">
                        {summary}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Points */}
                {keyPoints.length > 0 && (
                  <div>
                    <h4 className="font-medium text-white/90 mb-3 flex items-center space-x-2">
                      <FaListAlt className="text-yellow-400" />
                      <span>Key Points</span>
                    </h4>
                    <div className="space-y-2">
                      {keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="text-white/90 leading-relaxed">{point}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Uploaded Documents */}
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <FaShieldAlt className="text-blue-400" />
                  <span>Your Documents</span>
                </h3>
                <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded">
                  {uploadedDocuments.length}
                </span>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {uploadedDocuments.length > 0 ? (
                  uploadedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="flex-shrink-0">
                        {getFileIcon(doc.filename)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{doc.filename}</p>
                        <p className="text-white/60 text-xs">{formatFileSize(doc.file_size)}</p>
                      </div>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-1 hover:bg-white/20 rounded text-white/60 hover:text-red-400 transition-colors"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-white/60">
                    <FaFileAlt className="mx-auto text-2xl mb-2 opacity-50" />
                    <p className="text-sm">No documents uploaded yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis History */}
            {showHistory && (
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <FaHistory className="text-purple-400" />
                    <span>History</span>
                  </h3>
                  <button
                    onClick={() => {
                      setSummaryHistory([]);
                      localStorage.removeItem("summaryHistory");
                    }}
                    className="text-sm text-white/60 hover:text-red-400 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {summaryHistory.length > 0 ? (
                    summaryHistory.slice(0, 5).map((item) => (
                      <div key={item.id} className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                           onClick={() => setSelectedSummary(item)}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-white/60">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                            {item.inputType}
                          </span>
                        </div>
                        <p className="text-white text-sm truncate">
                          {item.inputText || item.summary}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-white/60">
                      <FaClock className="mx-auto text-2xl mb-2 opacity-50" />
                      <p className="text-sm">No analysis history yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <FaCog className="text-indigo-400" />
                <span>Quick Actions</span>
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={loadUserDocuments}
                  className="w-full p-3 text-left bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white flex items-center space-x-3"
                >
                  <FaEye className="text-green-400" />
                  <span>Refresh Documents</span>
                </button>
                
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify(summaryHistory, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'analysis-history.json';
                    link.click();
                  }}
                  className="w-full p-3 text-left bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white flex items-center space-x-3"
                >
                  <FaDownload className="text-purple-400" />
                  <span>Export History</span>
                </button>
                
                <button
                  onClick={() => {
                    setText("");
                    setFile(null);
                    setSummary("");
                    setKeyPoints([]);
                    setRagQuery("");
                    setRagResponse("");
                  }}
                  className="w-full p-3 text-left bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white flex items-center space-x-3"
                >
                  <FaLightbulb className="text-yellow-400" />
                  <span>Clear All Fields</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Summary Modal */}
        {selectedSummary && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Analysis Details</h3>
                <button
                  onClick={() => setSelectedSummary(null)}
                  className="p-2 hover:bg-white/20 rounded text-white/60 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/60 mb-2">Date: {new Date(selectedSummary.timestamp).toLocaleString()}</p>
                  <p className="text-sm text-white/60 mb-2">Type: {selectedSummary.inputType}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Original Input:</h4>
                  <div className="bg-white/10 rounded-lg p-3 text-white/90 text-sm">
                    {selectedSummary.inputText}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Summary:</h4>
                  <div className="bg-white/10 rounded-lg p-3 text-white/90 text-sm whitespace-pre-wrap">
                    {selectedSummary.summary}
                  </div>
                </div>
                
                {selectedSummary.keyPoints && selectedSummary.keyPoints.length > 0 && (
                  <div>
                    <h4 className="font-medium text-white mb-2">Key Points:</h4>
                    <div className="space-y-2">
                      {selectedSummary.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start space-x-2 bg-white/10 rounded-lg p-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="text-white/90 text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
