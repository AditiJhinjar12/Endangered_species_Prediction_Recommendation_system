import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaEnvelope, FaLock, FaUser, FaUniversity, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('Researcher');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !institution) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-brand-bg flex items-center justify-center px-4 py-12 overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-emerald-700/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-emerald-600/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center space-x-2 text-xs text-gray-400 hover:text-emerald-400 mb-6 transition-colors">
          <FaArrowLeft />
          <span>Back to Landing Page</span>
        </Link>

        <Card hoverable={false} className="p-8 border-emerald-950/60 bg-brand-card/95">
          <div className="flex flex-col items-center text-center space-y-2 mb-6">
            <FaLeaf className="h-10 w-10 text-emerald-500 animate-pulse" />
            <h2 className="text-2xl font-extrabold text-white tracking-wide">Get Started</h2>
            <p className="text-gray-400 text-xs sm:text-sm">Create your EcoPredictAI Research Account</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/50 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Name field */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Full Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaUser />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full pl-10 pr-3 py-2 bg-brand-bg/50 border border-emerald-950/60 focus:border-emerald-500 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Email Address *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="block w-full pl-10 pr-3 py-2 bg-brand-bg/50 border border-emerald-950/60 focus:border-emerald-500 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Institution field */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Institution / University *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaUniversity />
                </div>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="State Technological University"
                  className="block w-full pl-10 pr-3 py-2 bg-brand-bg/50 border border-emerald-950/60 focus:border-emerald-500 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Role dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Primary Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-2 bg-brand-card border border-emerald-950/60 focus:border-emerald-500 rounded-lg text-sm text-white focus:outline-none transition-colors"
              >
                <option value="Researcher">Academic Researcher / Ecologist</option>
                <option value="Student">Student (B.Tech / Research)</option>
                <option value="Officer">Wildlife Officer / Ranger</option>
                <option value="Other">General Enthusiast</option>
              </select>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Password *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaLock />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2 bg-brand-bg/50 border border-emerald-950/60 focus:border-emerald-500 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full py-3" variant="primary">
              Register Credentials
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-emerald-950/40 text-center text-xs text-gray-400">
            <span>Already registered? </span>
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Sign in here
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
