import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaEnvelope, FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden font-['Poppins',sans-serif]">
      {/* Back Link */}
      <div className="w-full max-w-md mb-6 text-left">
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-medium text-brand-blue hover:underline">
          <FaArrowLeft />
          <span>Back to Landing Page</span>
        </Link>
      </div>

      <Card hoverable={false} className="w-full max-w-md p-8 bg-white border border-gray-150 shadow-md">
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <FaLeaf className="h-8 w-8 text-brand-green" />
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-xs sm:text-sm">Register for Endangered Species AI</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-left">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          {/* Name field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaUser className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope className="h-3.5 w-3.5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock className="h-3.5 w-3.5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock className="h-3.5 w-3.5" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full py-3 mt-2" variant="primary">
            Register
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-500 font-medium">
          <span>Already have an account? </span>
          <Link to="/login" className="text-brand-blue hover:underline font-semibold">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
