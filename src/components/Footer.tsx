import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaDatabase, FaGlobe, FaFileAlt } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="w-full bg-[#070c17] border-t border-brand-border/60 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Project Info */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2">
            <FaLeaf className="h-6 w-6 text-emerald-500" />
            <span className="text-lg font-bold tracking-wider text-white">
              EcoPredict<span className="text-emerald-400">AI</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 max-w-sm">
            Leveraging artificial intelligence, time-series forecasting, and satellite GIS telemetry to predict endangered species populations and recommend habitat conservation strategies.
          </p>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/20 px-3 py-1.5 rounded-xl w-fit border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>AI Platform: Online & Operational (v2.1.0)</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button onClick={() => scrollIntoView('home')} className="hover:text-emerald-400 transition-colors focus:outline-none cursor-pointer">Home</button>
            </li>
            <li>
              <button onClick={() => scrollIntoView('species')} className="hover:text-emerald-400 transition-colors focus:outline-none cursor-pointer">Species Catalog</button>
            </li>
            <li>
              <button onClick={() => scrollIntoView('prediction')} className="hover:text-emerald-400 transition-colors focus:outline-none cursor-pointer">AI Predictions</button>
            </li>
            <li>
              <button onClick={() => scrollIntoView('recommendation')} className="hover:text-emerald-400 transition-colors focus:outline-none cursor-pointer">Interventions</button>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Analytics Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Resources & Legal */}
        <div>
          <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Resources & Policies</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center space-x-2">
              <FaDatabase className="text-emerald-600 h-3.5 w-3.5" />
              <span>IUCN Red List Registry</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaGlobe className="text-emerald-600 h-3.5 w-3.5" />
              <span>GIS Telemetry Network</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaFileAlt className="text-emerald-600 h-3.5 w-3.5" />
              <Link to="/" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            </li>
            <li className="flex items-center space-x-2">
              <FaFileAlt className="text-emerald-600 h-3.5 w-3.5" />
              <Link to="/" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-brand-border/30 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 EcoPredictAI Conservation Research. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Artificial Intelligence for Global Biosphere Stewardship</p>
      </div>
    </footer>
  );
};
