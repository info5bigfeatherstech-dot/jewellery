import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const items = [
    'Handcrafted in 18K Solid Gold',
    'Certified Natural Diamonds',
    'Lifetime Atelier Care',
    'White-Glove Armored Shipping',
    'Haute Joaillerie Atelier Paris & New York',
    'Recycled Precious Metals & Conflict-Free Stones',
  ];

  return (
    <div className="bg-ivory-200/80 border-y border-hairline-medium py-3.5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {/* Repeating blocks to ensure continuous infinite loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-8 shrink-0 px-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-8">
                <span className="text-[11px] uppercase tracking-widest-lux text-espresso-800 font-sans font-medium">
                  {item}
                </span>
                <span className="text-champagne-500 font-serif text-sm">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
