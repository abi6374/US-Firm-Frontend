import { Link } from 'react-router-dom';
import { 
  FaFileContract, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaHandshake, 
  FaGavel, 
  FaExclamationTriangle, 
  FaShieldAlt,
  FaDollarSign,
  FaClock,
  FaUsers,
  FaBalanceScale,
  FaSearch,
  FaEdit,
  FaLock
} from 'react-icons/fa';

export default function ContractLawPage() {
  const contractTypes = [
    {
      title: "Employment Contracts",
      desc: "Agreements defining the relationship between employers and employees",
      icon: <FaUsers className="text-3xl text-blue-600" />,
      keyElements: ["Job responsibilities", "Compensation", "Benefits", "Termination clauses"],
      complexity: "Medium",
      riskLevel: "Medium"
    },
    {
      title: "Sales & Purchase Agreements",
      desc: "Contracts for buying and selling goods or services",
      icon: <FaDollarSign className="text-3xl text-blue-600" />,
      keyElements: ["Price terms", "Delivery conditions", "Warranties", "Payment terms"],
      complexity: "Low to High",
      riskLevel: "Medium"
    },
    {
      title: "Service Agreements",
      desc: "Contracts for provision of services between parties",
      icon: <FaHandshake className="text-3xl text-blue-600" />,
      keyElements: ["Scope of work", "Timeline", "Payment schedule", "Performance standards"],
      complexity: "Medium",
      riskLevel: "Medium to High"
    },
    {
      title: "Non-Disclosure Agreements",
      desc: "Contracts protecting confidential information and trade secrets",
      icon: <FaLock className="text-3xl text-blue-600" />,
      keyElements: ["Confidential information", "Permitted uses", "Duration", "Remedies"],
      complexity: "Low",
      riskLevel: "High"
    },
    {
      title: "Partnership Agreements",
      desc: "Agreements governing business partnerships and joint ventures",
      icon: <FaBalanceScale className="text-3xl text-blue-600" />,
      keyElements: ["Profit sharing", "Decision making", "Roles & responsibilities", "Exit provisions"],
      complexity: "High",
      riskLevel: "High"
    },
    {
      title: "Licensing Agreements",
      desc: "Contracts granting rights to use intellectual property",
      icon: <FaShieldAlt className="text-3xl text-blue-600" />,
      keyElements: ["License scope", "Royalties", "Territory", "Quality control"],
      complexity: "High",
      riskLevel: "High"
    }
  ];

  const essentialElements = [
    {
      element: "Offer",
      description: "Clear proposal of terms by one party to another",
      importance: "Forms the foundation of the contract",
      tips: ["Be specific and detailed", "Include all material terms", "Set expiration dates"]
    },
    {
      element: "Acceptance",
      description: "Unqualified agreement to the terms of the offer",
      importance: "Creates binding agreement between parties",
      tips: ["Must be communicated clearly", "Should be unconditional", "Timely response required"]
    },
    {
      element: "Consideration",
      description: "Something of value exchanged between parties",
      importance: "Makes the contract legally enforceable",
      tips: ["Must have legal value", "Can be money, services, or promises", "Should be adequate"]
    },
    {
      element: "Capacity",
      description: "Legal ability of parties to enter into contracts",
      importance: "Ensures contract validity and enforceability",
      tips: ["Verify age of majority", "Check mental competency", "Confirm authority to contract"]
    }
  ];

  const riskAreas = [
    {
      risk: "Ambiguous Terms",
      description: "Unclear or vague contract language that can lead to disputes",
      mitigation: "Use precise, defined terms and include detailed specifications",
      impact: "High"
    },
    {
      risk: "Missing Force Majeure",
      description: "No provisions for unforeseeable circumstances preventing performance",
      mitigation: "Include comprehensive force majeure clauses with specific examples",
      impact: "High"
    },
    {
      risk: "Inadequate Termination Clauses",
      description: "Poorly defined contract termination procedures and consequences",
      mitigation: "Clearly outline termination triggers, notice periods, and obligations",
      impact: "Medium to High"
    },
    {
      risk: "Intellectual Property Issues",
      description: "Unclear ownership or licensing of intellectual property rights",
      mitigation: "Explicitly define IP ownership, licenses, and usage rights",
      impact: "High"
    },
    {
      risk: "Dispute Resolution Gaps",
      description: "No clear process for resolving conflicts that may arise",
      mitigation: "Include mediation, arbitration, and jurisdiction clauses",
      impact: "Medium"
    },
    {
      risk: "Compliance Failures",
      description: "Contract terms that violate applicable laws or regulations",
      mitigation: "Regular legal review and compliance auditing",
      impact: "High"
    }
  ];

  const reviewChecklist = [
    "Verify all parties have legal capacity to contract",
    "Ensure consideration is adequate and legally sufficient",
    "Check that all material terms are clearly defined",
    "Review termination and renewal provisions",
    "Confirm compliance with applicable laws and regulations",
    "Examine liability and indemnification clauses",
    "Verify intellectual property rights and ownership",
    "Check dispute resolution and governing law provisions",
    "Review confidentiality and non-disclosure terms",
    "Ensure force majeure and unforeseen circumstances are covered"
  ];

  const negotiationTips = [
    {
      phase: "Preparation",
      tips: ["Research the other party", "Identify your priorities", "Prepare alternative proposals", "Set walk-away limits"]
    },
    {
      phase: "Opening",
      tips: ["Build rapport", "Clarify objectives", "Establish ground rules", "Share preliminary terms"]
    },
    {
      phase: "Bargaining",
      tips: ["Focus on interests, not positions", "Look for win-win solutions", "Use objective criteria", "Make conditional offers"]
    },
    {
      phase: "Closing",
      tips: ["Summarize agreements", "Document decisions", "Plan implementation", "Schedule follow-ups"]
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
              <FaFileContract className="text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Contract Law
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Expert contract analysis, negotiation support, and dispute resolution for all business needs
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
                Contract Law Fundamentals
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Contract law governs legally binding agreements between parties. It establishes the 
                framework for creating, interpreting, and enforcing contracts, ensuring that parties 
                fulfill their obligations and providing remedies when they don't.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaHandshake className="text-blue-600 text-xl" />
                  <span className="text-gray-700">Creates legally enforceable obligations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGavel className="text-blue-600 text-xl" />
                  <span className="text-gray-700">Provides legal remedies for breach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaShieldAlt className="text-blue-600 text-xl" />
                  <span className="text-gray-700">Protects parties' rights and interests</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contract Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Business Disputes</span>
                  <span className="text-blue-600 font-bold">60% Contract Related</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Poor Contracts</span>
                  <span className="text-red-600 font-bold">9% Revenue Loss</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Well-Drafted Contracts</span>
                  <span className="text-green-600 font-bold">15% Better Performance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contract Types */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Contract Types
            </h2>
            <p className="text-xl text-gray-600">
              Different types of contracts with varying complexity and risk levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contractTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                    {type.icon}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{type.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{type.desc}</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Key Elements:</p>
                    <div className="space-y-1">
                      {type.keyElements.map((element, elementIdx) => (
                        <div key={elementIdx} className="flex items-center space-x-2">
                          <FaCheckCircle className="text-green-500 text-sm" />
                          <span className="text-sm text-gray-600">{element}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold text-gray-700">Complexity:</p>
                      <p className="text-blue-600">{type.complexity}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Risk Level:</p>
                      <p className="text-red-600">{type.riskLevel}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Essential Elements */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Essential Contract Elements
            </h2>
            <p className="text-xl text-gray-600">
              Four fundamental elements required for a valid, enforceable contract
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {essentialElements.map((element, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-2xl text-gray-900 mb-4">{element.element}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{element.description}</p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm font-semibold text-blue-700 mb-2">Why It Matters:</p>
                  <p className="text-sm text-blue-600">{element.importance}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Best Practices:</p>
                  <div className="space-y-1">
                    {element.tips.map((tip, tipIdx) => (
                      <div key={tipIdx} className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-500 text-sm" />
                        <span className="text-sm text-gray-600">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Areas */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Common Contract Risk Areas</h2>
              <p className="text-xl text-red-100">
                Identify and mitigate these common contract pitfalls
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {riskAreas.map((risk, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <FaExclamationTriangle className="text-yellow-300 text-xl" />
                    <h3 className="text-lg font-bold">{risk.risk}</h3>
                  </div>
                  <p className="text-red-100 mb-4 text-sm">{risk.description}</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-xs font-semibold text-red-200 mb-2">Mitigation Strategy:</p>
                    <p className="text-xs text-red-100">{risk.mitigation}</p>
                  </div>
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      risk.impact === 'High' ? 'bg-red-500/30 text-red-200' :
                      risk.impact === 'Medium to High' ? 'bg-orange-500/30 text-orange-200' :
                      'bg-yellow-500/30 text-yellow-200'
                    }`}>
                      {risk.impact} Impact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review Checklist */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contract Review Checklist
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Use this comprehensive checklist to ensure your contracts are thorough, 
                compliant, and protect your interests effectively.
              </p>
              <div className="space-y-3">
                {reviewChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contract Lifecycle</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">1. Drafting</h4>
                  <p className="text-sm text-gray-600">Initial contract creation and terms definition</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-700">2. Negotiation</h4>
                  <p className="text-sm text-gray-600">Terms discussion and agreement modification</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700">3. Execution</h4>
                  <p className="text-sm text-gray-600">Contract signing and performance monitoring</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-700">4. Management</h4>
                  <p className="text-sm text-gray-600">Ongoing compliance and relationship management</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Negotiation Tips */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contract Negotiation Strategy
            </h2>
            <p className="text-xl text-gray-600">
              Effective negotiation techniques for better contract outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {negotiationTips.map((phase, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-lg text-gray-900 mb-4">{phase.phase}</h3>
                <div className="space-y-3">
                  {phase.tips.map((tip, tipIdx) => (
                    <div key={tipIdx} className="flex items-start space-x-2">
                      <FaCheckCircle className="text-blue-500 text-sm mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Expert Contract Legal Support</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Whether you're drafting, reviewing, or negotiating contracts, our AI-powered legal assistant 
              can help you identify risks, ensure compliance, and protect your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Ask About Contract Law
              </Link>
              <Link 
                to="/analyzer" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Analyze Your Contracts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
