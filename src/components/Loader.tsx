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
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-6 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Clean, green spinning track */}
        <div className={`animate-spin rounded-full border-t-brand-green border-r-transparent border-b-brand-green/20 border-l-transparent ${sizes[size]}`} />
      </div>
      {label && (
        <span className="text-brand-green text-sm font-medium tracking-wide text-center">
          {label}
        </span>
      )}
    </div>
  );
};
