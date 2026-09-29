import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Shield, Sparkles, Gem } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-ivory-100 min-h-screen pb-28">
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-espresso-950 text-ivory-100 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2000&auto=format&fit=crop"
            alt="Atelier Aurelia Heritage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
          <span className="font-script text-3xl sm:text-4xl text-champagne-400 block mb-2 font-normal">
            haute joaillerie depuis {BRAND_CONFIG.established}
          </span>
          <span className="text-[10px] uppercase tracking-super-lux text-ivory-300 font-sans block mb-4">
            The Philosophy of Light
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-ivory-50 tracking-tight leading-tight mb-6">
            A Century of Unhurried <span className="italic font-serif text-champagne-300">Quiet Luxury</span>.
          </h1>
          <p className="text-xs sm:text-sm text-ivory-200/80 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Founded with a solemn reverence for timeless proportions, {BRAND_CONFIG.name} unites century-old Parisian bench technique with conflict-free geological rarities.
          </p>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans block mb-2 font-semibold">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso-950 mb-6 font-normal">
              Sculpting light into tangible heirlooms.
            </h2>
            <p className="text-xs sm:text-sm text-espresso-700 font-sans font-light leading-relaxed mb-4">
              In 1924, master lapidary Julian Aurelius established his first private salon on the Place Vendôme. His foundational belief was simple yet radical: high jewelry should be an intimate contour of the human form, never an ostentatious mask.
            </p>
            <p className="text-xs sm:text-sm text-espresso-600 font-sans font-light leading-relaxed">
              Today, that ethos remains sovereign across our Madison Avenue flagship and European ateliers. Each creation requires between 40 and 120 bench hours of uninterrupted dedication.
            </p>
          </div>
          <div className="aspect-[4/5] bg-ivory-200 border border-hairline-medium overflow-hidden shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1611591475878-a28d54238e83?q=80&w=1200&auto=format&fit=crop"
              alt="Hand carving gold"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Ethical Sourcing & Sustainability */}
      <section className="py-24 bg-ivory-200/50 border-y border-hairline-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            scriptAccent="Ethical Guardianship"
            label="Responsible Sourcing"
            title={
              <>
                Respecting the Earth from <span className="italic">quarry to vault</span>.
              </>
            }
            subtitle="We hold ourselves to the most rigorous environmental and humanitarian benchmarks in haute joaillerie."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-ivory-100 p-8 border border-hairline-medium">
              <Gem size={28} className="text-champagne-600 mb-4" strokeWidth={1.2} />
              <h3 className="font-serif text-xl text-espresso-950 mb-2">100% Conflict-Free Stones</h3>
              <p className="text-xs text-espresso-600 font-sans font-light leading-relaxed">
                Every natural diamond is verified under the Kimberley Process Certification Scheme (KPCS) and documented with provenance guarantees.
              </p>
            </div>

            <div className="bg-ivory-100 p-8 border border-hairline-medium">
              <Sparkles size={28} className="text-champagne-600 mb-4" strokeWidth={1.2} />
              <h3 className="font-serif text-xl text-espresso-950 mb-2">100% Recycled Precious Metals</h3>
              <p className="text-xs text-espresso-600 font-sans font-light leading-relaxed">
                Our solid 18k gold and 950 platinum are refined exclusively from certified recycled origins, avoiding mining impact without sacrificing molecular perfection.
              </p>
            </div>

            <div className="bg-ivory-100 p-8 border border-hairline-medium">
              <Shield size={28} className="text-champagne-600 mb-4" strokeWidth={1.2} />
              <h3 className="font-serif text-xl text-espresso-950 mb-2">Bespoke Heirloom Remodeling</h3>
              <p className="text-xs text-espresso-600 font-sans font-light leading-relaxed">
                Bring family heirloom stones to our master jewelers for contemporary resets, preserving ancestral emotion in modern architectural settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Boutique Visit */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-script text-3xl text-champagne-600 block mb-2">
          private salon appointments
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-950 mb-4 font-normal">
          Visit Our Madison Avenue Salon
        </h2>
        <p className="text-xs sm:text-sm text-espresso-600 font-sans font-light max-w-md mx-auto mb-6">
          {BRAND_CONFIG.contact.boutiqueAddress}
          <br />
          {BRAND_CONFIG.contact.hours}
        </p>
        <Button to="/shop" variant="primary" size="md">
          Explore The Vault
        </Button>
      </section>
    </div>
  );
};
