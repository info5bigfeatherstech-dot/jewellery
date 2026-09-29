import React from 'react';
import { INSTAGRAM_POSTS } from '../data/lookbook';
import { BRAND_CONFIG } from '../config/brand';
import { SectionHeading } from '../components/common/SectionHeading';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const SocialGallerySection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-ivory-200/40 border-t border-hairline-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          scriptAccent="The Curated Feed"
          label="@AureliaFineJewelry"
          title={
            <>
              Moments of light, shared by <span className="italic">our muses</span>.
            </>
          }
          subtitle="Tag #AureliaAtelier on Instagram to be featured across our global maison channels."
        />

        {/* 6 Square Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map(post => (
            <a
              key={post.id}
              href={BRAND_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden bg-ivory-300 border border-hairline-light block"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-luxury"
              />

              {/* Hover Dark Overlay with Icon & Caption */}
              <div className="absolute inset-0 bg-espresso-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center p-4 text-center">
                <InstagramIcon className="w-5 h-5 text-champagne-400 mb-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                <span className="text-[10px] uppercase tracking-widest-lux text-champagne-300 font-sans block mb-1">
                  {post.tag}
                </span>
                <p className="text-[11px] text-ivory-100 font-serif line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
