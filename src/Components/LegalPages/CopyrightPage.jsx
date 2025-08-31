import { Link } from 'react-router-dom';
import { 
  FaCopyright, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaMusic, 
  FaImage, 
  FaBook, 
  FaFilm,
  FaCode,
  FaGavel,
  FaClock,
  FaGlobe,
  FaExclamationTriangle
} from 'react-icons/fa';

export default function CopyrightPage() {
  const copyrightTypes = [
    {
      title: "Literary Works",
      desc: "Books, articles, poems, software code, and written content",
      icon: <FaBook className="text-3xl text-green-600" />,
      duration: "Life + 70 years",
      examples: ["Novels", "Blog posts", "Technical manuals", "Scripts"]
    },
    {
      title: "Musical Works",
      desc: "Songs, compositions, lyrics, and musical recordings",
      icon: <FaMusic className="text-3xl text-green-600" />,
      duration: "Life + 70 years",
      examples: ["Songs", "Compositions", "Sound recordings", "Jingles"]
    },
    {
      title: "Visual Arts",
      desc: "Paintings, photographs, graphics, sculptures, and digital art",
      icon: <FaImage className="text-3xl text-green-600" />,
      duration: "Life + 70 years",
      examples: ["Photographs", "Illustrations", "Logos", "Digital art"]
    },
    {
      title: "Audiovisual Works",
      desc: "Movies, TV shows, videos, documentaries, and multimedia content",
      icon: <FaFilm className="text-3xl text-green-600" />,
      duration: "95 years from publication",
      examples: ["Movies", "TV shows", "Documentaries", "Video games"]
    },
    {
      title: "Software & Code",
      desc: "Computer programs, mobile apps, websites, and digital tools",
      icon: <FaCode className="text-3xl text-green-600" />,
      duration: "Life + 70 years",
      examples: ["Source code", "Mobile apps", "Websites", "Databases"]
    },
    {
      title: "Dramatic Works",
      desc: "Plays, screenplays, choreographic works, and performances",
      icon: <FaGavel className="text-3xl text-green-600" />,
      duration: "Life + 70 years",
      examples: ["Plays", "Screenplays", "Choreography", "Pantomimes"]
    }
  ];

  const copyrightRights = [
    {
      right: "Reproduction",
      desc: "The right to make copies of the work"
    },
    {
      right: "Distribution",
      desc: "The right to distribute copies to the public"
    },
    {
      right: "Public Performance",
      desc: "The right to perform the work publicly"
    },
    {
      right: "Public Display",
      desc: "The right to display the work publicly"
    },
    {
      right: "Derivative Works",
      desc: "The right to create adaptations or modifications"
    },
    {
      right: "Digital Transmission",
      desc: "The right to transmit sound recordings digitally"
    }
  ];

  const fairUseFactors = [
    {
      factor: "Purpose and Character",
      desc: "Commercial vs. educational, transformative nature of use",
      considerations: ["Educational use", "Criticism/commentary", "Parody", "News reporting"]
    },
    {
      factor: "Nature of Work",
      desc: "Published vs. unpublished, factual vs. creative",
      considerations: ["Published works", "Factual content", "Creative expression", "Unpublished materials"]
    },
    {
      factor: "Amount Used",
      desc: "Quantity and substantiality of portion used",
      considerations: ["Small excerpts", "Heart of the work", "Entire work", "Substantial portions"]
    },
    {
      factor: "Market Effect",
      desc: "Effect on the market value of the original work",
      considerations: ["Lost sales", "Market substitution", "Licensing opportunities", "Commercial harm"]
    }
  ];

  const protectionSteps = [
    {
      step: "1",
      title: "Create Original Work",
      desc: "Work must be original and fixed in a tangible medium"
    },
    {
      step: "2",
      title: "Automatic Protection",
      desc: "Copyright exists automatically upon creation and fixation"
    },
    {
      step: "3",
      title: "Registration (Optional)",
      desc: "Register with copyright office for enhanced protection"
    },
    {
      step: "4",
      title: "Use Copyright Notice",
      desc: "Add © symbol, year, and owner name (recommended)"
    },
    {
      step: "5",
      title: "Monitor Usage",
      desc: "Regularly monitor for unauthorized use of your work"
    },
    {
      step: "6",
      title: "Enforce Rights",
      desc: "Take action against infringement when necessary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-green-100 hover:text-white transition-colors duration-300 mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <FaCopyright className="text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Copyright Laws
              </h1>
              <p className="text-xl text-green-100 max-w-3xl">
                Protect your intellectual property with expert guidance on copyright registration and enforcement
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
                Understanding Copyright Protection
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Copyright law protects original works of authorship, giving creators exclusive rights to 
                control how their works are used, distributed, and monetized. This protection encourages 
                creativity and innovation while balancing public access to knowledge and culture.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaClock className="text-green-600 text-xl" />
                  <span className="text-gray-700">Protection lasts for decades (typically life + 70 years)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGlobe className="text-green-600 text-xl" />
                  <span className="text-gray-700">International protection through treaties and agreements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaExclamationTriangle className="text-green-600 text-xl" />
                  <span className="text-gray-700">Automatic protection upon creation and fixation</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Copyright Basics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Requirements</span>
                  <span className="text-green-600 font-bold">Original + Fixed</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Duration (Individual)</span>
                  <span className="text-blue-600 font-bold">Life + 70 years</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Duration (Corporate)</span>
                  <span className="text-purple-600 font-bold">95 years</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Copyrightable Works */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Copyrightable Works
            </h2>
            <p className="text-xl text-gray-600">
              Different categories of creative works protected by copyright law
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copyrightTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-full group-hover:bg-green-100 transition-colors duration-300">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{type.title}</h3>
                    <p className="text-sm text-green-600 font-semibold">{type.duration}</p>
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

        {/* Copyright Rights */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Exclusive Rights of Copyright Owners</h2>
              <p className="text-xl text-emerald-100">
                Copyright grants owners several exclusive rights to control their works
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {copyrightRights.map((right, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">{right.right}</h3>
                  <p className="text-emerald-100">{right.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fair Use */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fair Use Doctrine
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Fair use allows limited use of copyrighted material without permission for purposes 
              such as criticism, comment, news reporting, teaching, scholarship, or research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {fairUseFactors.map((factor, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Factor {idx + 1}: {factor.factor}
                </h3>
                <p className="text-gray-600 mb-6">{factor.desc}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Considerations:</p>
                  {factor.considerations.map((consideration, considIdx) => (
                    <div key={considIdx} className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      <span className="text-sm text-gray-600">{consideration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Protection Steps */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Protect Your Copyright
            </h2>
            <p className="text-xl text-gray-600">
              Steps to secure and enforce your copyright protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {protectionSteps.map((item, idx) => (
              <div key={idx} className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-4 -left-4 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
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
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Protect Your Creative Work</h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Whether you're an artist, writer, developer, or business owner, understanding copyright law 
              is essential for protecting your intellectual property and avoiding infringement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Ask About Copyright
              </Link>
              <Link 
                to="/analyzer" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Analyze Your Content
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
