import { FaPlayCircle, FaArrowRight, FaCheckCircle, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FaBalanceScale,
  FaGavel,
  FaShieldAlt,
  FaCopyright,
  FaTrademark,
  FaUsers,
  FaAward,
  FaClock,
} from "react-icons/fa";

const industries = [
  {
    icon: <FaShieldAlt className="text-4xl text-blue-600 mb-4" />,
    title: "Data Protection Laws",
    desc: "Comprehensive guidance on GDPR, CCPA, and privacy regulations to protect your data and ensure compliance.",
    link: "/data-protection"
  },
  {
    icon: <FaBalanceScale className="text-4xl text-blue-600 mb-4" />,
    title: "Technology Laws",
    desc: "Navigate complex IT regulations, software licensing, and digital transformation legal requirements.",
    link: "/technology-law"
  },
  {
    icon: <FaGavel className="text-4xl text-blue-600 mb-4" />,
    title: "Copyright Laws",
    desc: "Protect your intellectual property with expert guidance on copyright registration and enforcement.",
    link: "/copyright"
  },
  {
    icon: <FaBalanceScale className="text-4xl text-blue-600 mb-4" />,
    title: "Distribution Laws",
    desc: "Understanding distribution agreements, channel partnerships, and commercial law compliance.",
    link: "/distribution-law"
  },
  {
    icon: <FaTrademark className="text-4xl text-blue-600 mb-4" />,
    title: "Trademark Laws",
    desc: "Secure your brand identity with trademark registration, protection, and enforcement strategies.",
    link: "/trademark"
  },
  {
    icon: <FaCopyright className="text-4xl text-blue-600 mb-4" />,
    title: "Contract Law",
    desc: "Expert contract analysis, negotiation support, and dispute resolution for all business needs.",
    link: "/contract-law"
  },
];

const stats = [
  { icon: <FaUsers className="text-3xl text-blue-600" />, value: "10K+", label: "Clients Served" },
  { icon: <FaAward className="text-3xl text-blue-600" />, value: "98%", label: "Success Rate" },
  { icon: <FaClock className="text-3xl text-blue-600" />, value: "24/7", label: "Support" },
  { icon: <FaStar className="text-3xl text-blue-600" />, value: "4.9", label: "Rating" },
];

const features = [
  "AI-powered legal analysis",
  "Instant document processing",
  "24/7 availability",
  "Secure & confidential",
];

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen" id="home">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in">
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-100">
                <FaCheckCircle className="mr-2" />
                Trusted by 10,000+ professionals
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Legal Solutions
                <span className="gradient-text block">Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get instant legal guidance powered by AI. Ask questions, analyze documents, 
                and receive professional legal insights anytime, anywhere.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  Get Started Now
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="group border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center">
                  <FaPlayCircle className="mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Content - Video/Image */}
            <div className="slide-up lg:justify-self-end">
              <div className="relative">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                    <img
                      src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80"
                      alt="Legal Professional"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <button className="absolute inset-0 flex items-center justify-center group">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <FaPlayCircle className="text-blue-600 text-4xl" />
                      </div>
                    </button>
                  </div>
                  
                  {/* Floating Stats Cards */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                    <div className="flex items-center space-x-2">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold text-gray-900">4.9/5</span>
                    </div>
                    <p className="text-sm text-gray-600">Client Rating</p>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-blue-600" />
                      <span className="font-bold text-gray-900">10K+</span>
                    </div>
                    <p className="text-sm text-gray-600">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Legal Areas We
              <span className="gradient-text"> Specialize In</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides expert guidance across multiple legal domains, 
              ensuring you get the right advice for your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 block"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">{item.desc}</p>
                
                <div className="mt-6 text-center">
                  <span className="text-blue-600 hover:text-blue-700 font-semibold flex items-center justify-center mx-auto group-hover:gap-2 transition-all duration-300">
                    Learn More
                    <FaArrowRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Explore All Practice Areas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
