
import React from 'react';

type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

const colorClasses: Record<ChipColor, string> = {
  default: 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:border-gray-400',
  primary: 'bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 hover:border-blue-400',
  secondary: 'bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200 hover:border-purple-400',
  success: 'bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 hover:border-green-400',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200 hover:border-yellow-400',
  danger: 'bg-red-100 text-red-800 border border-red-300 hover:bg-red-200 hover:border-red-400',
};

interface ChipProps {
  color?: ChipColor;
  children: React.ReactNode;
  className?: string;
}

export const Chip = ({ color = 'default', children, className = '' }: ChipProps) => {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${colorClasses[color]} ${className}`}
    >
      {children}
    </div>
  );
};