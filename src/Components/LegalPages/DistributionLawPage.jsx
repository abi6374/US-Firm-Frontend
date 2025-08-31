import { Link } from 'react-router-dom';
import { 
  FaTruck, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaHandshake, 
  FaGlobe, 
  FaWarehouse, 
  FaShoppingCart,
  FaFileContract,
  FaExclamationTriangle,
  FaDollarSign,
  FaShieldAlt,
  FaCog
} from 'react-icons/fa';

export default function DistributionLawPage() {
  const distributionTypes = [
    {
      title: "Exclusive Distribution",
      desc: "Single distributor has exclusive rights to sell in a specific territory or market",
      icon: <FaShieldAlt className="text-3xl text-indigo-600" />,
      benefits: ["Higher commitment", "Better market focus", "Stronger partnership"],
      risks: ["Limited market reach", "Dependency on single partner", "Channel conflicts"]
    },
    {
      title: "Selective Distribution",
      desc: "Limited number of distributors chosen based on specific criteria",
      icon: <FaHandshake className="text-3xl text-indigo-600" />,
      benefits: ["Quality control", "Brand protection", "Balanced coverage"],
      risks: ["Complex management", "Selection criteria challenges", "Legal compliance"]
    },
    {
      title: "Intensive Distribution",
      desc: "Maximum market coverage through multiple distribution channels",
      icon: <FaGlobe className="text-3xl text-indigo-600" />,
      benefits: ["Wide market reach", "High availability", "Increased sales volume"],
      risks: ["Price competition", "Brand dilution", "Channel conflicts"]
    },
    {
      title: "Direct Distribution",
      desc: "Manufacturer sells directly to end customers without intermediaries",
      icon: <FaShoppingCart className="text-3xl text-indigo-600" />,
      benefits: ["Higher margins", "Customer control", "Direct feedback"],
      risks: ["Higher costs", "Logistics complexity", "Market expertise needs"]
    }
  ];

  const keyTerms = [
    {
      term: "Territory Rights",
      definition: "Geographical areas where distributor has rights to sell products",
      importance: "Prevents conflicts and ensures market coverage"
    },
    {
      term: "Minimum Purchase Requirements",
      definition: "Minimum quantity or value of products distributor must purchase",
      importance: "Ensures commitment and protects supplier interests"
    },
    {
      term: "Performance Standards",
      definition: "Sales targets, marketing efforts, and service levels required",
      importance: "Maintains brand standards and market presence"
    },
    {
      term: "Termination Clauses",
      definition: "Conditions and procedures for ending the distribution relationship",
      importance: "Protects both parties and ensures smooth transitions"
    },
    {
      term: "Intellectual Property Rights",
      definition: "Use of trademarks, patents, and proprietary information",
      importance: "Protects brand integrity and prevents misuse"
    },
    {
      term: "Pricing and Payment Terms",
      definition: "Pricing structure, payment methods, and credit arrangements",
      importance: "Ensures profitability and manages financial risk"
    }
  ];

  const complianceAreas = [
    {
      area: "Antitrust/Competition Law",
      desc: "Prevent anti-competitive practices and maintain fair competition",
      regulations: ["Price fixing prohibitions", "Market allocation restrictions", "Exclusive dealing limits", "Tying arrangements"]
    },
    {
      area: "Consumer Protection",
      desc: "Ensure consumer rights and product safety standards",
      regulations: ["Product liability", "Warranty obligations", "Return policies", "Safety standards"]
    },
    {
      area: "International Trade",
      desc: "Comply with import/export regulations and trade agreements",
      regulations: ["Customs regulations", "Trade sanctions", "Free trade agreements", "Origin requirements"]
    },
    {
      area: "Data Protection",
      desc: "Protect customer and business data in distribution networks",
      regulations: ["GDPR compliance", "Data sharing agreements", "Privacy policies", "Security measures"]
    }
  ];

  const bestPractices = [
    "Clearly define territorial boundaries and exclusivity rights",
    "Establish performance metrics and regular review processes",
    "Include comprehensive intellectual property protection clauses",
    "Define pricing policies and avoid anti-competitive practices",
    "Implement robust dispute resolution mechanisms",
    "Ensure compliance with local laws and regulations",
    "Regular training for distribution partners",
    "Monitor and enforce brand standards consistently"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-indigo-100 hover:text-white transition-colors duration-300 mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <FaTruck className="text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Distribution Laws
              </h1>
              <p className="text-xl text-indigo-100 max-w-3xl">
                Understanding distribution agreements, channel partnerships, and commercial law compliance
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
                Distribution Law Overview
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Distribution law governs the legal relationships between manufacturers, distributors, and retailers. 
                It encompasses contract law, competition law, and commercial regulations that ensure fair and 
                efficient distribution of goods and services in the marketplace.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaFileContract className="text-indigo-600 text-xl" />
                  <span className="text-gray-700">Contract terms and performance obligations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCog className="text-indigo-600 text-xl" />
                  <span className="text-gray-700">Operational and logistical requirements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaExclamationTriangle className="text-indigo-600 text-xl" />
                  <span className="text-gray-700">Compliance with competition and consumer laws</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Global Distribution</span>
                  <span className="text-indigo-600 font-bold">$50T+ Market</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Legal Disputes</span>
                  <span className="text-purple-600 font-bold">15% of Contracts</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Compliance Cost</span>
                  <span className="text-blue-600 font-bold">5-10% Revenue</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Distribution Types */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Distribution Strategies
            </h2>
            <p className="text-xl text-gray-600">
              Different approaches to product distribution with unique legal considerations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {distributionTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-indigo-50 p-4 rounded-full">
                    {type.icon}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{type.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{type.desc}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3">Benefits</h4>
                    <div className="space-y-2">
                      {type.benefits.map((benefit, benefitIdx) => (
                        <div key={benefitIdx} className="flex items-center space-x-2">
                          <FaCheckCircle className="text-green-500 text-sm" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3">Risks</h4>
                    <div className="space-y-2">
                      {type.risks.map((risk, riskIdx) => (
                        <div key={riskIdx} className="flex items-center space-x-2">
                          <FaExclamationTriangle className="text-red-500 text-sm" />
                          <span className="text-sm text-gray-600">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Contract Terms */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Essential Contract Terms
            </h2>
            <p className="text-xl text-gray-600">
              Critical elements that should be included in distribution agreements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyTerms.map((term, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{term.term}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{term.definition}</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs font-semibold text-indigo-600 mb-2">Why It Matters:</p>
                  <p className="text-xs text-gray-500">{term.importance}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance Areas */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Legal Compliance Areas</h2>
              <p className="text-xl text-purple-100">
                Key regulatory areas that impact distribution agreements and operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {complianceAreas.map((area, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">{area.area}</h3>
                  <p className="text-purple-100 mb-6">{area.desc}</p>
                  <div className="space-y-2">
                    {area.regulations.map((regulation, regIdx) => (
                      <div key={regIdx} className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-300 text-sm" />
                        <span className="text-sm text-purple-100">{regulation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Distribution Agreement Best Practices
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Follow these best practices to create effective distribution agreements that protect 
                your interests while maintaining compliance with applicable laws and regulations.
              </p>
              <div className="space-y-4">
                {bestPractices.map((practice, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{practice}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Issues</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-700">High Risk</h4>
                  <p className="text-sm text-gray-600">Territorial disputes, performance failures, IP violations</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-700">Medium Risk</h4>
                  <p className="text-sm text-gray-600">Pricing conflicts, marketing disagreements, payment delays</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700">Lower Risk</h4>
                  <p className="text-sm text-gray-600">Administrative issues, minor policy changes, reporting delays</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Distribution Legal Support</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Navigate complex distribution agreements and ensure compliance with commercial law requirements. 
              Get expert guidance on structuring and managing your distribution relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Ask About Distribution Law
              </Link>
              <Link 
                to="/analyzer" 
                className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Analyze Distribution Contracts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
