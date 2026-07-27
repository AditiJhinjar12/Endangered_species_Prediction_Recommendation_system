import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
  glow = false,
  onClick,
}) => {
  // Premium glassmorphism base styles
  const baseStyles = `bg-glass border-glass rounded-2xl p-6 transition-all duration-500 relative overflow-hidden ${
    onClick ? 'cursor-pointer' : ''
  } ${
    glow 
      ? 'shadow-[0_0_25px_rgba(34,197,94,0.12)] border-brand-green/30' 
      : 'shadow-[0_8px_32px_rgba(0,0,0,0.37)]'
  }`;

  if (hoverable) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ 
          y: -8, 
          scale: 1.01,
          borderColor: 'rgba(34, 197, 94, 0.3)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.08)'
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`${baseStyles} ${className}`}
      >
        {/* Abstract subtle glowing aura background for hovered cards */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-brand-green/5 blur-3xl pointer-events-none transition-opacity group-hover:opacity-100" />
        {children}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
};
