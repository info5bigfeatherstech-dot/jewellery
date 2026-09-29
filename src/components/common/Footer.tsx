import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../../config/brand';
import { Shield, Award, Clock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso-950 text-ivory-100 pt-20 pb-12 border-t border-champagne-500/20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Maison Value Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 pb-10 sm:pb-16 border-b border-hairline-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Shield size={20} className="text-champagne-400 flex-shrink-0" strokeWidth={1.3} />
            <div>
              <h5 className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest-lux text-ivory-100 font-sans">
                BIS Hallmarked 18K & 950 Pt
              </h5>
              <p className="text-[10px] sm:text-[11px] text-ivory-300/60 font-light mt-0.5">
                Certified pure precious metals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Award size={20} className="text-champagne-400 flex-shrink-0" strokeWidth={1.3} />
            <div>
              <h5 className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest-lux text-ivory-100 font-sans">
                GIA & IGI Certified
              </h5>
              <p className="text-[10px] sm:text-[11px] text-ivory-300/60 font-light mt-0.5">
                Ethically mined natural stones
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Clock size={20} className="text-champagne-400 flex-shrink-0" strokeWidth={1.3} />
            <div>
              <h5 className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest-lux text-ivory-100 font-sans">
                Lifetime Atelier Care
              </h5>
              <p className="text-[10px] sm:text-[11px] text-ivory-300/60 font-light mt-0.5">
                Cleansing, polishing & warranty
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Sparkles size={20} className="text-champagne-400 flex-shrink-0" strokeWidth={1.3} />
            <div>
              <h5 className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest-lux text-ivory-100 font-sans">
                White-Glove Delivery
              </h5>
              <p className="text-[10px] sm:text-[11px] text-ivory-300/60 font-light mt-0.5">
                Fully insured armored transport
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Link Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 py-10 sm:py-16 border-b border-hairline-white/10">
          {/* Brand Intro & Concierge */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <span className="font-serif text-3xl tracking-[0.25em] text-ivory-100 block uppercase">
              {BRAND_CONFIG.name}
            </span>
            <p className="text-xs text-ivory-300/70 font-light leading-relaxed max-w-sm">
              Since {BRAND_CONFIG.established}, the Maison has sculpted timeless high jewelry objects, bridal heirlooms, and exceptional conflict-free solitaires rooted in quiet European artistry.
            </p>
            <div className="pt-2 text-xs text-champagne-300/90 space-y-1">
              <p>{BRAND_CONFIG.contact.boutiqueAddress}</p>
              <p>{BRAND_CONFIG.contact.phone} • {BRAND_CONFIG.contact.conciergeEmail}</p>
              <p className="text-[11px] text-ivory-300/50">{BRAND_CONFIG.contact.hours}</p>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h5 className="text-[10px] uppercase tracking-super-lux text-champagne-400 font-sans mb-5 font-semibold">
              The Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-ivory-300/75">
              <li>
                <Link to="/shop?category=rings" className="hover:text-champagne-300 transition-colors">
                  Solitaire & Band Rings
                </Link>
              </li>
              <li>
                <Link to="/shop?category=necklaces" className="hover:text-champagne-300 transition-colors">
                  Diamond Rivières
                </Link>
              </li>
              <li>
                <Link to="/shop?category=earrings" className="hover:text-champagne-300 transition-colors">
                  Baroque Pearl Earrings
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bracelets" className="hover:text-champagne-300 transition-colors">
                  Solid Gold Cuffs
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bridal" className="hover:text-champagne-300 transition-colors">
                  High Bridal & Vows
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mens" className="hover:text-champagne-300 transition-colors">
                  Men’s Signets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Care */}
          <div>
            <h5 className="text-[10px] uppercase tracking-super-lux text-champagne-400 font-sans mb-5 font-semibold">
              Client Concierge
            </h5>
            <ul className="space-y-2.5 text-xs text-ivory-300/75">
              <li>
                <Link to="/contact" className="hover:text-champagne-300 transition-colors">
                  Bespoke Commissions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-champagne-300 transition-colors">
                  Book Boutique Appointment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-champagne-300 transition-colors">
                  Worldwide Flagships & Salons
                </Link>
              </li>

              <li>
                <span className="hover:text-champagne-300 transition-colors cursor-pointer" onClick={() => alert("Complimentary ring sizer shipped worldwide upon request.")}>
                  Request Sizing Guide
                </span>
              </li>
              <li>
                <span className="hover:text-champagne-300 transition-colors cursor-pointer" onClick={() => alert("White-glove armored insured delivery policy.")}>
                  Shipping & Armored Transit
                </span>
              </li>
              <li>
                <span className="hover:text-champagne-300 transition-colors cursor-pointer" onClick={() => alert("30-Day unconditional returns on non-customized creations.")}>
                  Complimentary 30-Day Returns
                </span>
              </li>
              <li>
                <span className="hover:text-champagne-300 transition-colors cursor-pointer" onClick={() => alert("Lifetime warranty and annual restoration service.")}>
                  Lifetime Warranty & Restoration
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: The Maison */}
          <div>
            <h5 className="text-[10px] uppercase tracking-super-lux text-champagne-400 font-sans mb-5 font-semibold">
              The Maison
            </h5>
            <ul className="space-y-2.5 text-xs text-ivory-300/75">
              <li>
                <Link to="/about" className="hover:text-champagne-300 transition-colors">
                  Our Heritage & Ateliers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-champagne-300 transition-colors">
                  Ethical Diamond Sourcing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-champagne-300 transition-colors">
                  Recycled Gold & Sustainability
                </Link>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-champagne-300 transition-colors">
                  Instagram Editorial
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-champagne-300 transition-colors">
                  Pinterest Moodboards
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip with Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-[11px] text-ivory-300/50 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.name} Haute Joaillerie S.A. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 text-[10px] tracking-wider sm:tracking-widest-lux uppercase">
            <span>Privilege Privacy</span>
            <span>•</span>
            <span>Terms of Acquisition</span>
            <span>•</span>
            <span>Kimberley Process</span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs text-champagne-400/80 font-mono tracking-wider">
            <span className="border border-champagne-500/30 px-2 py-0.5 rounded-sm">AMEX</span>
            <span className="border border-champagne-500/30 px-2 py-0.5 rounded-sm">VISA</span>
            <span className="border border-champagne-500/30 px-2 py-0.5 rounded-sm">MASTERCARD</span>
            <span className="border border-champagne-500/30 px-2 py-0.5 rounded-sm">APPLE PAY</span>
          </div>
        </div>
      </div>

      {/* Large faint background wordmark at the bottom */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.035] overflow-hidden whitespace-nowrap max-w-full">
        <span className="font-serif text-[18vw] leading-none tracking-[0.25em] text-ivory-50 uppercase font-light">
          {BRAND_CONFIG.name}
        </span>
      </div>
    </footer>
  );
};
