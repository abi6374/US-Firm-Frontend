import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaSpinner,
  FaArrowLeft,
  FaGavel,
  FaShieldAlt,
  FaCheckCircle,
  FaPaperPlane
} from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TODO: Implement forgot password API call
      // For now, simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200/50 text-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              <FaArrowLeft />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/login" 
              className="inline-flex items-center text-indigo-100 hover:text-white transition-all duration-300 transform hover:scale-105 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
            >
              <FaArrowLeft className="mr-2" />
              Back to Sign In
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-2xl">
              <FaPaperPlane className="text-6xl drop-shadow-lg" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-100 to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                Reset Password
              </h1>
              <p className="text-xl text-indigo-100 leading-relaxed drop-shadow-md">
                Enter your email to receive password reset instructions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200/50">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">No worries, we'll help you reset it</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Sending Reset Email...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Send Reset Email</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-600">
              <span>Remember your password? </span>
              <Link 
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Secure Password Recovery</p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <FaShieldAlt />
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaGavel />
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
