import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSpinner, FaShieldAlt } from "react-icons/fa";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200/50">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FaSpinner className="animate-spin text-blue-600 text-xl" />
              <span className="text-lg font-semibold text-gray-700">Verifying Access...</span>
            </div>
            <p className="text-gray-500">Checking your authentication status</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return children;
}