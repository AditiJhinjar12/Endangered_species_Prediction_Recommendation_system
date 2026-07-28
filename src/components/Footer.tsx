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
    <footer className="w-full bg-white border-t border-gray-200 text-gray-600 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Project Info */}
        <div className="space-y-4 col-span-1 md:col-span-2 text-left">
          <div className="flex items-center space-x-2">
            <FaLeaf className="h-6 w-6 text-brand-green" />
            <span className="text-lg font-bold tracking-tight text-gray-900">
              EcoPredict<span className="text-brand-green">AI</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 max-w-sm">
            Predict wildlife populations and receive conservation recommendations using Artificial Intelligence and environmental data.
          </p>
          <div className="flex items-center space-x-2 text-xs text-brand-green bg-green-50 px-3 py-1.5 rounded-xl w-fit border border-green-100">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span>AI Platform: Operational (v2.1.0)</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-left">
          <h3 className="text-gray-900 font-semibold text-xs tracking-wider uppercase mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button onClick={() => scrollIntoView('home')} className="text-brand-blue hover:underline hover:text-brand-blue-hover transition-colors focus:outline-none cursor-pointer">Home</button>
            </li>
            <li>
              <button onClick={() => scrollIntoView('features')} className="text-brand-blue hover:underline hover:text-brand-blue-hover transition-colors focus:outline-none cursor-pointer">Features</button>
            </li>
            <li>
              <button onClick={() => scrollIntoView('about')} className="text-brand-blue hover:underline hover:text-brand-blue-hover transition-colors focus:outline-none cursor-pointer">About</button>
            </li>
            <li>
              <button onClick={() => scrollIntoView('contact')} className="text-brand-blue hover:underline hover:text-brand-blue-hover transition-colors focus:outline-none cursor-pointer">Contact</button>
            </li>
            <li>
              <Link to="/dashboard" className="text-brand-blue hover:underline hover:text-brand-blue-hover transition-colors">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Resources & Legal */}
        <div className="text-left">
          <h3 className="text-gray-900 font-semibold text-xs tracking-wider uppercase mb-4">Resources & Policies</h3>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center space-x-2">
              <FaDatabase className="text-brand-green h-3.5 w-3.5" />
              <span className="text-gray-600">IUCN Red List Registry</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaGlobe className="text-brand-green h-3.5 w-3.5" />
              <span className="text-gray-600">GIS Telemetry Network</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaFileAlt className="text-brand-green h-3.5 w-3.5" />
              <Link to="/" className="text-brand-blue hover:underline hover:text-brand-blue-hover transition-colors">Privacy Policy</Link>
            </li>
            <li className="flex items-center space-x-2">
              <FaFileAlt className="text-brand-green h-3.5 w-3.5" />
              <Link to="/" className="text-brand-blue hover:underline hover:text-brand-blue-hover transition-colors">Contact Support</Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-150 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
        <p>© 2026 EcoPredictAI. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Artificial Intelligence for Global Biosphere Stewardship</p>
      </div>
    </footer>
  );
};
