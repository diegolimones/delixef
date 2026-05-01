import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const hoverClass = hover ? 'hover:shadow-lg hover:border-gold' : '';

  return (
    <div
      className={`
        p-6
        border border-gray-200
        rounded-lg
        bg-white
        transition-all
        duration-200
        ${hoverClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
