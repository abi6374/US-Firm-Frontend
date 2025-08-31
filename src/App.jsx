import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navigation from './Components/Navigation'
import Home from './Components/Home'
import Services from './Components/Services'
import Footer from './Components/Footer'
import ChatPage from './Components/ChatPage'
import SummarizationPage from './Components/SummarizationPage'
import AnalyzerPage from './Components/AnalyzerPage'
import CitationPage from './Components/CitationPage'
import LoginPage from './Components/Auth/LoginPage'
import SignUpPage from './Components/Auth/SignUpPage'
import ForgotPasswordPage from './Components/Auth/ForgotPasswordPage'
import ProtectedRoute from './Components/ProtectedRoute'
import DataProtectionPage from './Components/LegalPages/DataProtectionPage'
import TechnologyLawPage from './Components/LegalPages/TechnologyLawPage'
import CopyrightPage from './Components/LegalPages/CopyrightPage'
import DistributionLawPage from './Components/LegalPages/DistributionLawPage'
import TrademarkPage from './Components/LegalPages/TrademarkPage'
import ContractLawPage from './Components/LegalPages/ContractLawPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='font-[var(--font-poppins)] bg-gray-50'>
          <Navigation />
          <main className="pt-16 min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Home />
                  <Services />
                </>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              
              {/* Legal Information Pages (Public) */}
              <Route path="/data-protection" element={<DataProtectionPage />} />
              <Route path="/technology-law" element={<TechnologyLawPage />} />
              <Route path="/copyright" element={<CopyrightPage />} />
              <Route path="/distribution-law" element={<DistributionLawPage />} />
              <Route path="/trademark" element={<TrademarkPage />} />
              <Route path="/contract-law" element={<ContractLawPage />} />
              
              {/* Protected AI Tool Routes */}
              <Route path="/chat" element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } />
              <Route path="/summarization" element={
                <ProtectedRoute>
                  <SummarizationPage />
                </ProtectedRoute>
              } />
              <Route path="/analyzer" element={
                <ProtectedRoute>
                  <AnalyzerPage />
                </ProtectedRoute>
              } />
              <Route path="/citation" element={
                <ProtectedRoute>
                  <CitationPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
