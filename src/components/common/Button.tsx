import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  onClick,
  fullWidth = false,
  className = '',
  type = 'button',
  disabled = false,
  icon,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] py-2 px-5 tracking-widest-lux uppercase',
    md: 'text-xs py-3.5 px-8 tracking-widest-lux uppercase font-medium',
    lg: 'text-xs py-4 px-10 tracking-super-lux uppercase font-medium',
  };

  const variantStyles = {
    primary:
      'bg-espresso-900 text-ivory-100 hover:bg-champagne-600 transition-colors duration-500 border border-espresso-900 hover:border-champagne-600',
    gold:
      'bg-champagne-500 text-espresso-950 hover:bg-champagne-400 transition-colors duration-500 border border-champagne-400 shadow-sm',
    outline:
      'bg-transparent text-espresso-900 border border-espresso-900/30 hover:border-champagne-500 hover:text-champagne-600 transition-all duration-500',
    ghost:
      'bg-transparent text-espresso-900 hover:text-champagne-600 transition-colors duration-300',
    underline:
      'bg-transparent text-espresso-900 hover:text-champagne-600 link-underline py-1 px-0 tracking-widest-lux text-xs uppercase',
  };

  const combinedClass = `inline-flex items-center justify-center gap-2.5 transition-all duration-300 text-center select-none ${
    variant === 'underline' ? variantStyles.underline : `${sizeStyles[size]} ${variantStyles[variant]}`
  } ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        <span>{children}</span>
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClass}>
      <span>{children}</span>
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </button>
  );
};
