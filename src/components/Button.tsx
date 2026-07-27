import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.35)] border border-transparent shadow-lg shadow-emerald-600/20',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 shadow-md',
    outline: 'bg-transparent text-emerald-400 hover:text-white hover:bg-emerald-600/10 border border-emerald-500/40',
    text: 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5 border border-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-5 py-2.5 text-sm md:text-base',
    lg: 'px-8 py-3.5 text-base md:text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
