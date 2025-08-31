import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaGoogle,
  FaLinkedin,
  FaMicrosoft,
  FaShieldAlt,
  FaArrowLeft,
  FaGavel,
  FaCheckCircle,
  FaUserShield,
  FaFingerprint,
  FaKey,
} from "react-icons/fa";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0],
        loginTime: new Date().toISOString()
      }));
      
      // Navigate to dashboard
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center px-4 py-8">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-3xl shadow-2xl">
                <FaGavel className="text-4xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Legal Query AI
                </h1>
                <p className="text-gray-600 text-lg">Professional Legal Assistant</p>
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome Back to Your
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Legal Command Center
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Access powerful AI-driven legal tools, manage your case history, and get instant legal insights with enterprise-grade security.
            </p>
            
            {/* Feature Highlights */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaCheckCircle className="text-green-600" />
                </div>
                <span className="font-medium">Advanced AI Legal Analysis</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaUserShield className="text-blue-600" />
                </div>
                <span className="font-medium">Enterprise Security & Privacy</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="bg-purple-100 p-2 rounded-full">
                  <FaFingerprint className="text-purple-600" />
                </div>
                <span className="font-medium">Secure Document Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-10">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <FaGavel className="text-2xl text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Legal Query AI
                </h1>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
              >
                <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your legal dashboard</p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <FaGoogle className="text-red-500 text-lg" />
                <span>Continue with Google</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin('microsoft')}
                  className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FaMicrosoft className="text-blue-500" />
                  <span className="text-sm">Microsoft</span>
                </button>
                
                <button
                  onClick={() => handleSocialLogin('linkedin')}
                  className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FaLinkedin className="text-blue-600" />
                  <span className="text-sm">LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                      errors.email ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                      errors.password ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    disabled={loading}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    Remember me
                  </span>
                </label>
                
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <FaKey className="text-lg" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-gray-500">
              <FaShieldAlt className="text-green-500" />
              <span>Secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
