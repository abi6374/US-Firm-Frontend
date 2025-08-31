import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaUsers, 
  FaGlobe, 
  FaFileAlt,
  FaLock,
  FaUserShield,
  FaClipboardCheck
} from 'react-icons/fa';

export default function DataProtectionPage() {
  const gdprPrinciples = [
    {
      title: "Lawfulness, Fairness & Transparency",
      desc: "Processing must be lawful, fair, and transparent to the data subject",
      icon: <FaClipboardCheck className="text-2xl text-blue-600" />
    },
    {
      title: "Purpose Limitation",
      desc: "Data collected for specified, explicit and legitimate purposes",
      icon: <FaFileAlt className="text-2xl text-blue-600" />
    },
    {
      title: "Data Minimisation",
      desc: "Data should be adequate, relevant and limited to what is necessary",
      icon: <FaUserShield className="text-2xl text-blue-600" />
    },
    {
      title: "Accuracy",
      desc: "Data must be accurate and kept up to date",
      icon: <FaCheckCircle className="text-2xl text-blue-600" />
    },
    {
      title: "Storage Limitation",
      desc: "Data kept only for as long as necessary for the purposes",
      icon: <FaLock className="text-2xl text-blue-600" />
    },
    {
      title: "Integrity & Confidentiality",
      desc: "Data processed in a secure manner with appropriate security measures",
      icon: <FaShieldAlt className="text-2xl text-blue-600" />
    }
  ];

  const keyRights = [
    "Right to be informed",
    "Right of access",
    "Right to rectification",
    "Right to erasure",
    "Right to restrict processing",
    "Right to data portability",
    "Right to object",
    "Rights related to automated decision making"
  ];

  const complianceSteps = [
    {
      step: "1",
      title: "Data Audit",
      desc: "Conduct comprehensive audit of all personal data processing activities"
    },
    {
      step: "2", 
      title: "Legal Basis",
      desc: "Identify and document lawful basis for each processing activity"
    },
    {
      step: "3",
      title: "Privacy Policies",
      desc: "Update privacy notices to be clear, concise and transparent"
    },
    {
      step: "4",
      title: "Data Security",
      desc: "Implement appropriate technical and organizational measures"
    },
    {
      step: "5",
      title: "Staff Training",
      desc: "Train staff on GDPR requirements and data protection principles"
    },
    {
      step: "6",
      title: "Ongoing Monitoring",
      desc: "Establish processes for ongoing compliance monitoring and review"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-100 hover:text-white transition-colors duration-300 mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <FaShieldAlt className="text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Data Protection Laws
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Comprehensive guidance on GDPR, CCPA, and privacy regulations to protect your data and ensure compliance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Overview Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Understanding Data Protection
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Data protection laws like GDPR and CCPA have fundamentally changed how organizations 
                handle personal data. These regulations aim to give individuals control over their 
                personal information while requiring businesses to implement robust privacy protections.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaGlobe className="text-blue-600 text-xl" />
                  <span className="text-gray-700">Global reach - applies regardless of location</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-blue-600 text-xl" />
                  <span className="text-gray-700">Covers all EU residents and California consumers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaExclamationTriangle className="text-blue-600 text-xl" />
                  <span className="text-gray-700">Severe penalties for non-compliance</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-800">GDPR Max Fine</span>
                  <span className="text-blue-600 font-bold">€20M or 4% revenue</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-800">CCPA Max Fine</span>
                  <span className="text-green-600 font-bold">$7,500 per violation</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Breach Notification</span>
                  <span className="text-purple-600 font-bold">72 hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GDPR Principles */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              GDPR Core Principles
            </h2>
            <p className="text-xl text-gray-600">
              Six fundamental principles that govern data processing under GDPR
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gdprPrinciples.map((principle, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    {principle.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{principle.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Individual Rights */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Individual Rights Under GDPR</h2>
                <p className="text-lg text-indigo-100 mb-8">
                  GDPR grants individuals comprehensive rights over their personal data. 
                  Organizations must have processes in place to handle these requests.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {keyRights.map((right, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <FaCheckCircle className="text-green-300" />
                      <span className="text-indigo-100">{right}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Response Timeframes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Data Subject Requests</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">1 month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Breach Notification (Authority)</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">72 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Breach Notification (Individual)</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">Without delay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Steps */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Steps to Compliance
            </h2>
            <p className="text-xl text-gray-600">
              A practical roadmap to achieve GDPR compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceSteps.map((item, idx) => (
              <div key={idx} className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-4 mt-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Need Help with Data Protection Compliance?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Our AI-powered legal assistant can help you navigate complex data protection requirements 
              and ensure your organization stays compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Ask Our AI Assistant
              </Link>
              <Link 
                to="/analyzer" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Analyze Your Documents
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
