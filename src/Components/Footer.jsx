import { 
  FaBalanceScale, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook,
  FaArrowRight,
  FaShieldAlt,
  FaLock,
  FaCertificate
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Disclaimer', href: '#disclaimer' },
    ],
    services: [
      { name: 'Legal Chat', href: '#chat' },
      { name: 'Document Analysis', href: '#analysis' },
      { name: 'Contract Review', href: '#contracts' },
      { name: 'Citation Research', href: '#citations' },
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'API Documentation', href: '#api' },
      { name: 'System Status', href: '#status' },
    ],
  };

  const certifications = [
    { icon: <FaShieldAlt />, text: 'SOC 2 Compliant' },
    { icon: <FaLock />, text: 'GDPR Ready' },
    { icon: <FaCertificate />, text: 'ISO 27001' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white" id="contact">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Updated with Legal Insights</h3>
              <p className="text-gray-300 text-lg">
                Get the latest legal news, AI updates, and expert insights delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group">
                Subscribe
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
                <FaBalanceScale className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">LegalAI</h3>
                <p className="text-gray-400 text-sm">Legal Query Assistant</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering legal professionals and businesses with AI-driven legal assistance. 
              Get instant, accurate legal guidance anytime, anywhere.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-blue-400" />
                <span>support@legalai.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div>
              <h5 className="text-sm font-semibold mb-4 text-gray-400">SECURITY & COMPLIANCE</h5>
              <div className="space-y-2">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-gray-400 text-sm">
                    <span className="text-green-400">{cert.icon}</span>
                    <span>{cert.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} LegalAI. All rights reserved. | Made with ❤️ for legal professionals
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-4">Follow us:</span>
              <a
                href="#linkedin"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="#twitter"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#facebook"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
              >
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
