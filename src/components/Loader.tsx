import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  label = 'Analyzing population data...',
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8 border-2',
    md: 'w-16 h-16 border-4',
    lg: 'w-24 h-24 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-6 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glow effect */}
        <div className={`absolute rounded-full bg-emerald-500/20 animate-ping ${
          size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-22 h-22' : 'w-32 h-32'
        }`} />
        
        {/* Spinning track */}
        <div className={`animate-spin rounded-full border-t-emerald-400 border-r-transparent border-b-emerald-800 border-l-transparent ${sizes[size]}`} />
        
        {/* Central pulse point */}
        <div className={`absolute rounded-full bg-emerald-500 animate-pulse ${
          size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'
        }`} />
      </div>
      {label && (
        <span className="text-emerald-400/90 text-sm font-semibold tracking-wider animate-pulse text-center">
          {label}
        </span>
      )}
    </div>
  );
};
