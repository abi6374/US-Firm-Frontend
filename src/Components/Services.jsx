import { useState } from "react";
import { Link } from "react-router-dom";
import { FaComments, FaFilePdf, FaSearch, FaQuoteRight, FaArrowRight, FaRocket } from "react-icons/fa";

const services = [
  {
    icon: <FaComments className="text-5xl text-blue-600 mb-6" />,
    title: "AI Legal Chat",
    desc: "Ask legal questions in natural language and get instant, accurate answers from our AI-powered legal assistant.",
    features: ["Instant responses", "24/7 availability", "Multi-language support"],
    color: "from-blue-500 to-blue-600",
    link: "/chat",
  },
  {
    icon: <FaFilePdf className="text-5xl text-emerald-600 mb-6" />,
    title: "Document Summarization",
    desc: "Upload legal documents or PDFs and receive concise, professional summaries highlighting key points.",
    features: ["PDF processing", "Key point extraction", "Multiple formats"],
    color: "from-emerald-500 to-emerald-600",
    link: "/summarization",
  },
  {
    icon: <FaSearch className="text-5xl text-purple-600 mb-6" />,
    title: "Contract Analysis",
    desc: "Analyze contracts and agreements with detailed breakdowns, risk assessment, and recommendations.",
    features: ["Risk analysis", "Clause detection", "Compliance check"],
    color: "from-purple-500 to-purple-600",
    link: "/analyzer",
  },
  {
    icon: <FaQuoteRight className="text-5xl text-orange-600 mb-6" />,
    title: "Citation Extraction",
    desc: "Extract legal citations from any text and get instant access to referenced laws, cases, and regulations.",
    features: ["Auto-detection", "Case lookup", "Legal references"],
    color: "from-orange-500 to-orange-600",
    link: "/citation",
  },
];

export default function Services() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-100">
            <FaRocket className="mr-2" />
            Powered by Advanced AI
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our AI-Powered
            <span className="gradient-text"> Legal Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of legal assistance with our comprehensive suite of AI tools 
            designed to streamline your legal workflows and provide instant insights.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 p-8 transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Service Icon */}
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full bg-gradient-to-r ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {service.desc}
              </p>

              {/* Features List */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-center text-sm text-gray-500">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3`}></div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Link
                to={service.link}
                className={`block w-full bg-gradient-to-r ${service.color} hover:shadow-lg text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center text-center`}
              >
                Try Now
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center fade-in">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Legal Workflow?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of legal professionals who trust our AI-powered platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/chat"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Start Free Trial
                </Link>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
