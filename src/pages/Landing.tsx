import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import {
  FaChartLine,
  FaLightbulb,
  FaLeaf,
  FaFileAlt,
  FaArrowRight,
  FaDatabase,
  FaBrain,
  FaCheckCircle,
} from "react-icons/fa";

export default function Landing() {
  const stats = [
    { value: "120+", label: "Species Monitored" },
    { value: "95%", label: "Prediction Accuracy" },
    { value: "40+", label: "Protected Regions" },
    { value: "500+", label: "Research Records" },
  ];

  const features = [
    {
      icon: <FaChartLine className="text-3xl text-brand-green" />,
      title: "Population Prediction",
      description: "Predict future population trends.",
    },
    {
      icon: <FaLightbulb className="text-3xl text-brand-green" />,
      title: "AI Recommendation",
      description: "Suggest conservation strategies.",
    },
    {
      icon: <FaLeaf className="text-3xl text-brand-green" />,
      title: "Species Monitoring",
      description: "Track endangered species.",
    },
    {
      icon: <FaFileAlt className="text-3xl text-brand-green" />,
      title: "Reports",
      description: "Generate conservation reports.",
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Collect Wildlife Data",
      description: "Gather satellite GIS telemetry, climate patterns, and field records.",
      icon: <FaDatabase className="text-lg text-brand-green" />,
    },
    {
      num: "2",
      title: "AI Analysis",
      description: "Train time-series forecasting models on environmental covariates.",
      icon: <FaBrain className="text-lg text-brand-green" />,
    },
    {
      num: "3",
      title: "Population Prediction",
      description: "Calculate 10-year risk levels and population dynamics.",
      icon: <FaChartLine className="text-lg text-brand-green" />,
    },
    {
      num: "4",
      title: "Recommendations",
      description: "Generate optimal policy corridors and habitat buffers.",
      icon: <FaCheckCircle className="text-lg text-brand-green" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020905] flex flex-col text-emerald-100/90 font-['Poppins',sans-serif] relative overflow-hidden">
      
      {/* Ambient background decoration blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Soft glowing ambient circle 1 (top-right) */}
        <div 
          className="absolute -top-[10%] -right-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-emerald-800/15 to-emerald-950/5 blur-[130px] opacity-75 animate-pulse" 
          style={{ animationDuration: '9s' }} 
        />
        {/* Soft glowing ambient circle 2 (middle-left) */}
        <div 
          className="absolute top-[30%] -left-[10%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-emerald-700/15 to-teal-900/10 blur-[120px] opacity-70 animate-pulse" 
          style={{ animationDuration: '13s' }} 
        />
        {/* Soft glowing ambient circle 3 (bottom-right) */}
        <div 
          className="absolute -bottom-[5%] right-[5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-lime-800/15 to-emerald-900/10 blur-[110px] opacity-75 animate-pulse" 
          style={{ animationDuration: '11s' }} 
        />
        
        {/* Modern engineering dot-grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.12]" 
          style={{ 
            backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', 
            backgroundSize: '28px 28px' 
          }} 
        />
      </div>

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-transparent z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-12 items-center relative">
          {/* Hero Left Side */}
          <div className="text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Protect Endangered <br className="hidden sm:inline" />
              Species with <span className="text-brand-green font-black">AI</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/75 leading-relaxed max-w-xl">
              Predict wildlife populations and receive conservation recommendations using Artificial Intelligence and environmental data.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/register">
                <Button variant="primary" size="lg" className="flex items-center gap-2">
                  Get Started
                  <FaArrowRight className="text-sm" />
                </Button>
              </Link>
              <button 
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none px-8 py-3.5 text-base md:text-lg bg-transparent text-brand-green hover:underline border border-transparent cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Right Side */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative minimal back-plate */}
              <div className="absolute -inset-1.5 bg-emerald-950/50 rounded-2xl blur-xs opacity-60"></div>
              <img
                src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=600"
                alt="Wildlife Conservation Forest and Leopard"
                className="relative rounded-xl shadow-md w-full h-80 object-cover border border-emerald-900/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-transparent border-y border-emerald-950/40 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} hoverable={false} className="text-center p-6 border-emerald-900/10">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-green mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-emerald-100/50 font-medium">
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-transparent z-10 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">Platform Features</h2>
            <p className="text-emerald-100/60 mt-3 text-sm sm:text-base">
              Everything required for intelligent wildlife conservation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, index) => (
              <Card key={index} className="text-left flex flex-col justify-between h-full p-6 border-emerald-900/10">
                <div>
                  <div className="p-3 bg-emerald-950/40 w-fit rounded-lg mb-6 border border-emerald-900/30">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-emerald-100/60 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-transparent border-t border-emerald-950/40 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">How It Works</h2>
            <p className="text-emerald-100/60 mt-3 text-sm sm:text-base">
              Simplifying ecosystem intelligence into actionable policies.
            </p>
          </div>

          {/* Timeline - Horizontal on Large Screens, Vertical on Mobile */}
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-950/40 -translate-y-1/2 z-0" />
            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-950 border border-emerald-900/50 text-brand-green font-bold text-lg mb-4 shadow-sm relative">
                    {step.num}
                    <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-900/40 rounded-full border border-emerald-800/30 shadow-xs">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-white mb-2 text-base">{step.title}</h4>
                  <p className="text-xs text-emerald-100/60 max-w-xs leading-relaxed">{step.description}</p>
                  
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden my-4 text-brand-green flex justify-center text-lg animate-bounce">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-transparent border-t border-emerald-950/40 z-10 relative">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">About the Project</h2>
          <p className="text-base sm:text-lg text-emerald-100/75 leading-relaxed font-normal">
            This platform helps wildlife researchers and conservation organizations predict endangered species populations and make informed conservation decisions using Artificial Intelligence.
          </p>
        </div>
      </section>

      {/* Call To Action */}
      <section id="contact" className="py-16 bg-transparent border-t border-emerald-950/40 z-10 relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="bg-emerald-950/20 backdrop-blur-md border border-emerald-900/30 rounded-2xl p-8 md:p-12 shadow-xs">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Together We Can Protect Wildlife
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/60 mb-8 max-w-lg mx-auto leading-relaxed">
              Equip your organization with machine learning predictive dashboards for biome preservation.
            </p>
            <Link to="/dashboard">
              <Button variant="primary" size="lg">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}