import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';
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
    { name: 'Features', action: () => scrollIntoView('features') },
    { name: 'About', action: () => scrollIntoView('about') },
    { name: 'Contact', action: () => scrollIntoView('contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-emerald-950/40 bg-[#020905]/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaLeaf className="h-6 w-6 text-brand-green" />
              <span className="text-xl font-bold tracking-tight text-white">
                EcoPredict<span className="text-brand-green">AI</span>
              </span>
            </Link>
          </div>
          
          {/* Center Side: Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="text-sm font-medium text-emerald-100/70 hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <Link to="/dashboard" className="text-sm font-medium text-emerald-100/70 hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
 
          {/* Right Side: Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="text" size="sm" className="text-emerald-100/80 hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="sm">
                Register
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
 
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-100/80 hover:text-white p-2 focus:outline-none transition-colors"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-emerald-950/40 bg-[#020905]">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-emerald-100/70 hover:bg-emerald-950/30 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-emerald-100/70 hover:bg-emerald-950/30 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <div className="pt-4 flex flex-col space-y-2 border-t border-emerald-950/40">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="text" className="w-full text-emerald-100/80" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full" size="sm">
                  Register
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="primary" className="w-full" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
