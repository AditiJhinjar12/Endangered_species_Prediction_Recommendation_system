import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
  onClick,
}) => {
  // Simple, clean white card styling with 12px (rounded-xl) corners and soft shadow
  const baseStyles = `bg-white border border-gray-100 rounded-xl p-6 transition-all duration-300 relative overflow-hidden ${
    onClick ? 'cursor-pointer' : ''
  } shadow-sm`;

  if (hoverable) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ 
          y: -4, 
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
          borderColor: 'rgba(46, 125, 50, 0.25)' // Soft brand green border on hover
        }}
        transition={{ duration: 0.2 }}
        className={`${baseStyles} ${className}`}
      >
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
