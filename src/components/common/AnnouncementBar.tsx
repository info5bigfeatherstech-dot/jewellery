import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-espresso-950 text-ivory-100 text-[11px] py-2 px-4 border-b border-champagne-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center tracking-widest-lux uppercase font-light">
        <span className="hidden sm:inline-block mr-2 text-champagne-400">
          <Sparkles size={12} />
        </span>
        <span className="truncate">
          {BRAND_CONFIG.announcementText}
        </span>
        <span className="hidden md:inline-block mx-3 text-champagne-500/50">•</span>
        <span className="hidden md:inline-block text-champagne-300">
          Concierge Inquiries: {BRAND_CONFIG.contact.phone}
        </span>
      </div>
    </div>
  );
};
