import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-sand-50 hover:bg-sea-900 border border-ink',
  secondary:
    'bg-coral-500 text-sand-50 hover:bg-coral-600 border border-coral-500',
  outline:
    'bg-transparent text-ink border border-ink hover:bg-ink hover:text-sand-50',
  ghost:
    'bg-transparent text-ink hover:text-coral-600 border border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs tracking-wider',
  md: 'px-7 py-3.5 text-sm tracking-wider',
  lg: 'px-9 py-4 text-sm tracking-[0.18em]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium uppercase transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
