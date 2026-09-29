import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  scriptAccent?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  scriptAccent,
  title,
  subtitle,
  align = 'center',
  className = '',
  dark = false,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col mb-12 md:mb-16 ${alignmentClasses[align]} ${className}`}
    >
      {/* Script flourish accent if present */}
      {scriptAccent && (
        <span className="font-script text-2xl md:text-3xl text-champagne-600 mb-1 tracking-wide font-normal italic">
          {scriptAccent}
        </span>
      )}


      {/* Small uppercase label */}
      {label && (
        <span
          className={`text-[10px] md:text-[11px] font-sans tracking-super-lux uppercase mb-3 ${
            dark ? 'text-champagne-300' : 'text-champagne-600'
          }`}
        >
          {label}
        </span>
      )}

      {/* High-contrast serif heading */}
      <h2
        className={`font-serif text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.18] max-w-3xl ${
          dark ? 'text-ivory-100' : 'text-espresso-900'
        }`}
      >
        {title}
      </h2>

      {/* Delicate hairline decorative divider */}
      <div
        className={`w-12 h-[1px] my-5 ${
          dark ? 'bg-champagne-500/40' : 'bg-champagne-500/50'
        } ${align === 'center' ? 'mx-auto' : ''}`}
      />

      {/* Editorial subtitle */}
      {subtitle && (
        <p
          className={`font-sans text-xs md:text-sm font-light leading-relaxed max-w-xl ${
            dark ? 'text-ivory-300/80' : 'text-espresso-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
