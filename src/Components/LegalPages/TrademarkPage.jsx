import { Link } from 'react-router-dom';
import { 
  FaTrademark, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaSearch, 
  FaFileAlt, 
  FaShieldAlt, 
  FaGavel,
  FaGlobe,
  FaExclamationTriangle,
  FaClock,
  FaDollarSign,
  FaEye,
  FaCog,
  FaUsers
} from 'react-icons/fa';

export default function TrademarkPage() {
  const trademarkTypes = [
    {
      title: "Word Marks",
      desc: "Text-based trademarks including brand names, slogans, and taglines",
      icon: <FaFileAlt className="text-3xl text-red-600" />,
      examples: ["Brand names", "Slogans", "Taglines", "Product names"],
      protection: "Words, phrases, and text elements"
    },
    {
      title: "Design Marks",
      desc: "Visual elements including logos, symbols, and graphic designs",
      icon: <FaEye className="text-3xl text-red-600" />,
      examples: ["Logos", "Symbols", "Graphics", "Stylized text"],
      protection: "Visual design and appearance"
    },
    {
      title: "Service Marks",
      desc: "Marks that identify and distinguish services rather than products",
      icon: <FaCog className="text-3xl text-red-600" />,
      examples: ["Service brands", "Professional services", "Entertainment", "Hospitality"],
      protection: "Service identification and source"
    },
    {
      title: "Collective Marks",
      desc: "Marks used by members of a collective group or organization",
      icon: <FaUsers className="text-3xl text-red-600" />,
      examples: ["Trade associations", "Cooperatives", "Certification marks", "Geographic indicators"],
      protection: "Group membership and standards"
    }
  ];

  const registrationSteps = [
    {
      step: "1",
      title: "Trademark Search",
      desc: "Conduct comprehensive search to ensure mark availability",
      timeframe: "1-2 weeks",
      cost: "$500-2,000"
    },
    {
      step: "2",
      title: "Application Filing",
      desc: "Submit application with USPTO or relevant trademark office",
      timeframe: "1 day",
      cost: "$225-400 per class"
    },
    {
      step: "3",
      title: "Examination",
      desc: "Trademark office reviews application for compliance",
      timeframe: "3-6 months",
      cost: "Included in filing fee"
    },
    {
      step: "4",
      title: "Publication",
      desc: "Mark published for opposition period if approved",
      timeframe: "30 days",
      cost: "Included in filing fee"
    },
    {
      step: "5",
      title: "Registration",
      desc: "Certificate issued if no opposition or after resolution",
      timeframe: "1-3 months",
      cost: "Included in filing fee"
    },
    {
      step: "6",
      title: "Maintenance",
      desc: "File required maintenance documents to keep registration active",
      timeframe: "Ongoing",
      cost: "$300-500 per renewal"
    }
  ];

  const trademarkClasses = [
    { class: "1-5", category: "Chemicals, Paints, Pharmaceuticals", examples: "Industrial chemicals, Medicines, Cosmetics" },
    { class: "6-11", category: "Metals, Machinery, Vehicles", examples: "Hardware, Tools, Automobiles" },
    { class: "12-17", category: "Vehicles, Firearms, Musical Instruments", examples: "Cars, Weapons, Instruments" },
    { class: "18-25", category: "Leather, Textiles, Clothing", examples: "Bags, Fabrics, Apparel" },
    { class: "26-34", category: "Lace, Carpets, Games, Food", examples: "Toys, Carpets, Food products" },
    { class: "35-45", category: "Services", examples: "Business services, Legal services, Personal services" }
  ];

  const enforcementOptions = [
    {
      option: "Cease and Desist Letter",
      description: "Formal notice demanding infringement to stop",
      cost: "$500-2,000",
      timeframe: "Immediate",
      effectiveness: "Often effective for clear cases"
    },
    {
      option: "Opposition/Cancellation",
      description: "Challenge trademark applications or registrations",
      cost: "$2,000-10,000",
      timeframe: "6-12 months",
      effectiveness: "Good for preventing registration"
    },
    {
      option: "Federal Court Litigation",
      description: "File lawsuit in federal court for infringement",
      cost: "$50,000-200,000+",
      timeframe: "1-3 years",
      effectiveness: "Most comprehensive but expensive"
    },
    {
      option: "Domain Name Disputes",
      description: "UDRP proceedings for cybersquatting",
      cost: "$1,500-5,000",
      timeframe: "2-4 months",
      effectiveness: "Effective for clear cybersquatting"
    }
  ];

  const protectionTips = [
    "Use trademark symbols (™ for unregistered, ® for registered)",
    "Monitor the market for potential infringement regularly",
    "Register in all relevant jurisdictions and classes",
    "Maintain proper trademark usage guidelines",
    "File maintenance documents on time to keep registration active",
    "Consider international registration through Madrid Protocol",
    "Document first use dates and maintain evidence of use",
    "Educate employees and partners on proper trademark usage"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-red-100 hover:text-white transition-colors duration-300 mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <FaTrademark className="text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Trademark Laws
              </h1>
              <p className="text-xl text-red-100 max-w-3xl">
                Secure your brand identity with trademark registration, protection, and enforcement strategies
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
                Understanding Trademark Protection
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A trademark is a word, phrase, symbol, design, or combination that identifies and 
                distinguishes the source of goods or services. Trademark protection helps prevent 
                consumer confusion and protects your brand's reputation and market position.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaShieldAlt className="text-red-600 text-xl" />
                  <span className="text-gray-700">Exclusive rights to use the mark in your industry</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGlobe className="text-red-600 text-xl" />
                  <span className="text-gray-700">Protection in jurisdictions where registered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaClock className="text-red-600 text-xl" />
                  <span className="text-gray-700">Indefinite protection with proper maintenance</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Trademark Benefits</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Brand Protection</span>
                  <FaShieldAlt className="text-red-600 text-xl" />
                </div>
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Market Exclusivity</span>
                  <FaGavel className="text-orange-600 text-xl" />
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Asset Value</span>
                  <FaDollarSign className="text-yellow-600 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Trademarks */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Trademarks
            </h2>
            <p className="text-xl text-gray-600">
              Different categories of trademarks and what they protect
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {trademarkTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-full">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{type.title}</h3>
                    <p className="text-sm text-red-600 font-semibold">{type.protection}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{type.desc}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Examples:</p>
                  {type.examples.map((example, exampleIdx) => (
                    <div key={exampleIdx} className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      <span className="text-sm text-gray-600">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Process */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trademark Registration Process
            </h2>
            <p className="text-xl text-gray-600">
              Step-by-step guide to registering your trademark
            </p>
          </div>

          <div className="space-y-8">
            {registrationSteps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm font-semibold text-blue-700 mb-1">Timeframe</p>
                          <p className="text-blue-600">{step.timeframe}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm font-semibold text-green-700 mb-1">Typical Cost</p>
                          <p className="text-green-600">{step.cost}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trademark Classes */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">International Trademark Classes</h2>
              <p className="text-xl text-orange-100">
                Goods and services are categorized into 45 international classes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trademarkClasses.map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold mb-2">Classes {item.class}</h3>
                  <h4 className="text-orange-100 font-semibold mb-3">{item.category}</h4>
                  <p className="text-sm text-orange-100">{item.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enforcement Options */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trademark Enforcement Options
            </h2>
            <p className="text-xl text-gray-600">
              Available remedies when your trademark rights are violated
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {enforcementOptions.map((option, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-xl text-gray-900 mb-4">{option.option}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-semibold text-green-700 mb-1">Cost Range</p>
                    <p className="text-green-600">{option.cost}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-semibold text-blue-700 mb-1">Timeframe</p>
                    <p className="text-blue-600">{option.timeframe}</p>
                  </div>
                </div>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Effectiveness</p>
                  <p className="text-xs text-gray-600">{option.effectiveness}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Protection Tips */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trademark Protection Best Practices
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Follow these best practices to maximize your trademark protection and maintain 
                your rights over time. Proper management is crucial for long-term brand security.
              </p>
              <div className="space-y-4">
                {protectionTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Renewal Schedule</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">Years 5-6</h4>
                  <p className="text-sm text-gray-600">Section 8 Declaration of Continued Use</p>
                  <p className="text-xs text-gray-500">Due between 5th and 6th year</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700">Years 9-10</h4>
                  <p className="text-sm text-gray-600">Section 8 & 9 Renewal Application</p>
                  <p className="text-xs text-gray-500">Due between 9th and 10th year</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-700">Every 10 Years</h4>
                  <p className="text-sm text-gray-600">Ongoing renewal required</p>
                  <p className="text-xs text-gray-500">Continues indefinitely if maintained</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-red-600 to-orange-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Protect Your Brand Today</h2>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              Don't let competitors steal your brand identity. Start the trademark registration process 
              and secure your exclusive rights to your brand name, logo, and other identifying marks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Ask About Trademarks
              </Link>
              <Link 
                to="/analyzer" 
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Analyze Trademark Documents
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
