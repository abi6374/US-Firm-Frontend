import { Link } from 'react-router-dom';
import { 
  FaLaptopCode, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaCloud, 
  FaMobile, 
  FaRobot, 
  FaShieldAlt,
  FaGlobe,
  FaFileContract,
  FaCog,
  FaDatabase,
  FaUserShield
} from 'react-icons/fa';

export default function TechnologyLawPage() {
  const techAreas = [
    {
      title: "Software Licensing",
      desc: "Navigate complex software licensing agreements, open source compliance, and intellectual property protection",
      icon: <FaCog className="text-3xl text-purple-600" />,
      topics: ["Open Source Licenses", "Commercial Licensing", "SaaS Agreements", "End User License Agreements"]
    },
    {
      title: "Cloud Computing",
      desc: "Understand legal implications of cloud services, data sovereignty, and service level agreements",
      icon: <FaCloud className="text-3xl text-purple-600" />,
      topics: ["Data Residency", "Service Level Agreements", "Vendor Lock-in", "Multi-tenant Security"]
    },
    {
      title: "Artificial Intelligence",
      desc: "Legal frameworks for AI development, deployment, and ethical considerations",
      icon: <FaRobot className="text-3xl text-purple-600" />,
      topics: ["AI Ethics", "Algorithmic Bias", "Liability Issues", "Regulatory Compliance"]
    },
    {
      title: "Cybersecurity",
      desc: "Legal requirements for cybersecurity, incident response, and data breach notifications",
      icon: <FaShieldAlt className="text-3xl text-purple-600" />,
      topics: ["Breach Notification", "Security Standards", "Incident Response", "Risk Assessment"]
    },
    {
      title: "E-commerce",
      desc: "Legal considerations for online business, digital payments, and consumer protection",
      icon: <FaGlobe className="text-3xl text-purple-600" />,
      topics: ["Terms of Service", "Payment Processing", "Consumer Rights", "Cross-border Trade"]
    },
    {
      title: "Mobile Apps",
      desc: "Legal requirements for mobile applications, app store compliance, and user agreements",
      icon: <FaMobile className="text-3xl text-purple-600" />,
      topics: ["App Store Policies", "Privacy Policies", "In-app Purchases", "User Consent"]
    }
  ];

  const regulations = [
    {
      name: "GDPR",
      region: "European Union",
      focus: "Data Protection & Privacy",
      penalty: "Up to €20M or 4% of revenue"
    },
    {
      name: "CCPA/CPRA",
      region: "California, USA", 
      focus: "Consumer Privacy Rights",
      penalty: "Up to $7,500 per violation"
    },
    {
      name: "SOX",
      region: "United States",
      focus: "Financial Reporting & IT Controls",
      penalty: "Criminal penalties & fines"
    },
    {
      name: "HIPAA",
      region: "United States",
      focus: "Healthcare Data Security",
      penalty: "Up to $1.5M per violation"
    }
  ];

  const complianceChecklist = [
    "Conduct regular legal reviews of technology agreements",
    "Implement privacy by design in product development",
    "Establish clear data governance policies",
    "Maintain up-to-date terms of service and privacy policies",
    "Monitor regulatory changes and compliance requirements",
    "Implement robust cybersecurity measures",
    "Train development teams on legal requirements",
    "Document all technology-related legal decisions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-purple-100 hover:text-white transition-colors duration-300 mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <FaLaptopCode className="text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Technology Laws
              </h1>
              <p className="text-xl text-purple-100 max-w-3xl">
                Navigate complex IT regulations, software licensing, and digital transformation legal requirements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Overview Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technology Law Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Technology law encompasses the legal issues surrounding the development, use, and regulation of technology. 
              As digital transformation accelerates, understanding these legal frameworks becomes crucial for businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <FaDatabase className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data Governance</h3>
              <p className="text-gray-600">Legal frameworks for data collection, processing, and storage</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <FaFileContract className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Contracts</h3>
              <p className="text-gray-600">Electronic signatures, terms of service, and online agreements</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <FaUserShield className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">User Rights</h3>
              <p className="text-gray-600">Privacy rights, consumer protection, and digital accessibility</p>
            </div>
          </div>
        </section>

        {/* Technology Areas */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Technology Law Areas
            </h2>
            <p className="text-xl text-gray-600">
              Specialized legal domains within technology law
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                    {area.icon}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{area.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{area.desc}</p>
                <div className="space-y-2">
                  {area.topics.map((topic, topicIdx) => (
                    <div key={topicIdx} className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      <span className="text-sm text-gray-600">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regulations */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Technology Regulations</h2>
              <p className="text-xl text-blue-100">
                Major regulations affecting technology companies worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {regulations.map((reg, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{reg.name}</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{reg.region}</span>
                  </div>
                  <p className="text-blue-100 mb-4">{reg.focus}</p>
                  <div className="bg-red-500/20 border border-red-300/30 rounded-lg p-4">
                    <p className="text-sm font-semibold">Maximum Penalty:</p>
                    <p className="text-lg">{reg.penalty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Checklist */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Technology Compliance Checklist
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Essential steps to ensure your technology operations comply with relevant legal requirements 
                and industry standards.
              </p>
              <div className="space-y-4">
                {complianceChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Legal Risk Assessment</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-700">High Risk</h4>
                  <p className="text-sm text-gray-600">Personal data processing, AI algorithms, financial transactions</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-700">Medium Risk</h4>
                  <p className="text-sm text-gray-600">Software licensing, cloud services, mobile applications</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700">Lower Risk</h4>
                  <p className="text-sm text-gray-600">Static websites, internal tools, documentation platforms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Technology Legal Consultation</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Get expert guidance on technology law matters, from software licensing to AI ethics. 
              Our AI assistant can help you navigate complex tech regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Ask Our AI Assistant
              </Link>
              <Link 
                to="/analyzer" 
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Analyze Tech Contracts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
