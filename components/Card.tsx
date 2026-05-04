import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const hoverClass = hover ? 'hover:border-olive-400' : '';

  return (
    <div
      className={`
        p-7
        border border-olive-200/60
        bg-cream-50
        transition-colors
        duration-200
        ${hoverClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
