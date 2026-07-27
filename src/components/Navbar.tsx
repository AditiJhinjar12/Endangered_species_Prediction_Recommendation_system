import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const scrollIntoView = (id: string) => {
    setIsOpen(false);
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const navLinks = [
    { name: 'Home', action: () => scrollIntoView('home') },
    { name: 'Species', action: () => scrollIntoView('species') },
    { name: 'Prediction', action: () => scrollIntoView('prediction') },
    { name: 'Recommendation', action: () => scrollIntoView('recommendation') },
    { name: 'Analytics', action: () => scrollIntoView('analytics') },
    { name: 'Reports', action: () => scrollIntoView('research') },
    { name: 'About', action: () => scrollIntoView('about') },
    { name: 'Contact', action: () => scrollIntoView('contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-border/60 bg-brand-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaLeaf className="h-8 w-8 text-emerald-500 animate-pulse" />
              <span className="text-xl font-bold tracking-wider text-white">
                EcoPredict<span className="text-emerald-400">AI</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="px-1 py-2 text-xs font-semibold text-gray-300 hover:text-emerald-400 transition-colors focus:outline-none cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            
            <Link to="/dashboard" className="text-xs font-semibold text-gray-300 hover:text-emerald-400 transition-colors px-1 py-2">
              Dashboard
            </Link>
          </div>

          <div className="hidden xl:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none transition-colors"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden border-t border-brand-border/60 bg-brand-bg/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-gray-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-semibold text-gray-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <div className="pt-4 flex flex-col space-y-3 px-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
