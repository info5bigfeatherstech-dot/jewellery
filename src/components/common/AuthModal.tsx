import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight, Lock, Mail, User as UserIcon, Phone, Gem, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BRAND_CONFIG } from '../../config/brand';
import { getLenis } from '../../hooks/useLenis';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login, register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Synchronize Lenis and background scroll lock for lag-free modal performance
  useEffect(() => {
    const lenis = getLenis() || (window as any).lenis;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };

    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      login(emailOrPhone || 'vivienne.montgomery@aurelia.com', password || 'Aurelia2026!');
      setSubmitting(false);
      closeAuthModal();
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      register(name || 'Patron', emailOrPhone || 'patron@aurelia.com', password || 'Aurelia2026!', phone, 'M.');
      setSubmitting(false);
      closeAuthModal();
    }, 400);
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      login('google.patron@aurelia.com', 'google_authenticated');
      setGoogleLoading(false);
      closeAuthModal();
    }, 450);
  };

  const fillDemoAccount = () => {
    setEmailOrPhone('vivienne.montgomery@aurelia.com');
    setPassword('Aurelia2026!');
  };

  const isLogin = authModalMode === 'login';

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto no-scrollbar">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={closeAuthModal}
            className="fixed inset-0 bg-espresso-950/70 cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container: Architectural Luxury Salon Portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-ivory-50 rounded-2xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 my-auto will-change-transform transform-gpu border border-hairline-gold/50 max-h-[94vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Top Champagne Gold Accent Stripe */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-champagne-500 to-transparent z-30" />

            {/* Close Button Top Right */}
            <button
              type="button"
              onClick={closeAuthModal}
              aria-label="Close dialog"
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-hairline-medium bg-ivory-100 hover:bg-champagne-50 hover:border-champagne-500 flex items-center justify-center text-espresso-700 hover:text-espresso-950 transition-all z-30 cursor-pointer shadow-xs"
            >
              <X size={16} />
            </button>

            {/* LEFT COLUMN: The Maison Heritage Window */}
            <div className="hidden md:flex md:col-span-5 relative bg-espresso-950 flex-col justify-between p-8 lg:p-10 text-white min-h-[580px] overflow-hidden">
              {/* Background Editorial Visual */}
              <img
                src="/images/auth/salon_editorial.jpg"
                alt="Maison Aurelia Editorial"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-55 mix-blend-luminosity scale-105"
              />
              {/* Radial Vignette & Gold Tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/70 to-espresso-950/50 pointer-events-none" />

              {/* Top Branding Section */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Crown size={15} className="text-champagne-400" />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-champagne-400 font-sans font-medium">
                    Private Client Portal
                  </span>
                </div>

                <h3 className="font-serif text-3xl lg:text-4xl text-white font-normal tracking-wide">
                  {BRAND_CONFIG.name}
                </h3>
                <span className="text-[10px] tracking-[0.22em] text-white/70 uppercase font-sans block mt-1">
                  Haute Joaillerie Atelier
                </span>
              </div>

              {/* Center Patron Privileges */}
              <div className="relative z-10 py-6 border-y border-white/10 space-y-3.5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-champagne-400 font-sans font-medium block">
                  Exclusive Patron Privileges
                </span>

                <div className="flex items-start gap-3">
                  <Gem size={14} className="text-champagne-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-serif text-xs text-white font-medium">Private Vault Allocations</h5>
                    <p className="text-[11px] text-white/70 font-sans font-light">Early access to rare stones and limited archival releases.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles size={14} className="text-champagne-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-serif text-xs text-white font-medium">Bespoke Concierge</h5>
                    <p className="text-[11px] text-white/70 font-sans font-light">Direct consultation with master gemologists & setters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck size={14} className="text-champagne-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-serif text-xs text-white font-medium">Armored White-Glove Transit</h5>
                    <p className="text-[11px] text-white/70 font-sans font-light">Complimentary fully insured worldwide courier delivery.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Archival Guarantee */}
              <div className="relative z-10 flex items-center justify-between text-[10px] text-white/60 uppercase tracking-widest font-sans">
                <span>Certified Origin</span>
                <span className="text-champagne-400">•</span>
                <span>GIA & BIS Hallmarked</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Bespoke Authentication Form */}
            <div className="col-span-1 md:col-span-7 p-4 sm:p-8 lg:p-10 flex flex-col justify-center bg-ivory-50">
              {/* Header Title */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-sans font-medium block mb-1">
                  Maison Salon Access
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-espresso-950 font-normal">
                  {isLogin ? 'Enter the Private Salon' : 'Become an Aurelia Patron'}
                </h2>
                <p className="text-xs text-espresso-500 font-sans mt-1">
                  {isLogin
                    ? 'Access your private vault, acquisitions, and bespoke wishlists.'
                    : 'Create your private account to unlock bespoke jewelry allocations.'}
                </p>
              </div>

              {/* Segmented Tab Switcher */}
              <div className="flex items-center border-b border-hairline-light mb-6">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className={`flex-1 pb-3 text-xs uppercase tracking-widest-lux font-sans transition-all cursor-pointer relative ${
                    isLogin
                      ? 'text-espresso-950 font-semibold border-b-2 border-champagne-600 -mb-[1px]'
                      : 'text-espresso-400 hover:text-espresso-800 font-medium'
                  }`}
                >
                  Patron Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className={`flex-1 pb-3 text-xs uppercase tracking-widest-lux font-sans transition-all cursor-pointer relative ${
                    !isLogin
                      ? 'text-espresso-950 font-semibold border-b-2 border-champagne-600 -mb-[1px]'
                      : 'text-espresso-400 hover:text-espresso-800 font-medium'
                  }`}
                >
                  Create Patron Profile
                </button>
              </div>

              {/* Demo Auto-Fill Pill */}
              {isLogin && (
                <div className="mb-4 py-2 px-3.5 bg-champagne-50/70 border border-champagne-200/80 rounded-md flex items-center justify-between">
                  <div className="text-[11px] text-espresso-900 flex items-center gap-2 font-sans">
                    <Sparkles size={13} className="text-champagne-600 flex-shrink-0" />
                    <span>Explore as Patron Vivienne Montgomery</span>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemoAccount}
                    className="text-[10px] uppercase tracking-wider font-sans text-champagne-700 font-semibold hover:text-espresso-950 underline cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>
              )}

              {/* Form Body */}
              <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-[10px] font-sans font-medium uppercase tracking-wider text-espresso-700 mb-1.5">
                      Full Legal Name
                    </label>
                    <div className="relative flex items-center">
                      <UserIcon size={14} className="absolute left-3.5 text-espresso-400 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Vivienne Montgomery"
                        className="w-full bg-white border border-hairline-medium focus:border-champagne-600 focus:ring-1 focus:ring-champagne-500 pl-10 pr-3.5 py-2.5 text-xs text-espresso-950 rounded-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-sans font-medium uppercase tracking-wider text-espresso-700 mb-1.5">
                    Email Address or Patron Mobile
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={14} className="absolute left-3.5 text-espresso-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={emailOrPhone}
                      onChange={e => setEmailOrPhone(e.target.value)}
                      placeholder="patron@aurelia.com or +91 98765 43210"
                      className="w-full bg-white border border-hairline-medium focus:border-champagne-600 focus:ring-1 focus:ring-champagne-500 pl-10 pr-3.5 py-2.5 text-xs text-espresso-950 rounded-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-[10px] font-sans font-medium uppercase tracking-wider text-espresso-700 mb-1.5">
                      Courier Telephone (For Armored Dispatch)
                    </label>
                    <div className="relative flex items-center">
                      <Phone size={14} className="absolute left-3.5 text-espresso-400 pointer-events-none" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-hairline-medium focus:border-champagne-600 focus:ring-1 focus:ring-champagne-500 pl-10 pr-3.5 py-2.5 text-xs text-espresso-950 rounded-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[10px] font-sans font-medium uppercase tracking-wider text-espresso-700">
                      Confidential Password
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => alert("A secure password restoration link has been dispatched to your email.")}
                        className="text-[10px] text-champagne-700 hover:text-espresso-950 underline font-sans cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <Lock size={14} className="absolute left-3.5 text-espresso-400 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-white border border-hairline-medium focus:border-champagne-600 focus:ring-1 focus:ring-champagne-500 pl-10 pr-10 py-2.5 text-xs text-espresso-950 rounded-sm focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-espresso-400 hover:text-espresso-800 cursor-pointer"
                      aria-label="Toggle password view"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Primary Gold & Charcoal Action Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-espresso-950 hover:bg-champagne-600 text-ivory-50 uppercase tracking-[0.22em] text-xs font-semibold transition-all shadow-md mt-5 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {submitting ? (
                    <span>Opening Vault...</span>
                  ) : (
                    <>
                      <span>{isLogin ? 'Enter The Salon' : 'Complete Patron Registration'}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* OR Line Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-hairline-light" />
                </div>
                <span className="relative bg-ivory-50 px-3 text-[9px] uppercase tracking-widest text-espresso-400 font-sans font-medium">
                  Alternative Patron Sign-In
                </span>
              </div>

              {/* Social Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full py-2.5 px-4 bg-white hover:bg-ivory-100 text-espresso-900 border border-hairline-medium rounded-sm flex items-center justify-center gap-2.5 text-xs font-sans font-medium transition-all shadow-xs cursor-pointer disabled:opacity-75"
              >
                {googleLoading ? (
                  <span className="tracking-wider">Verifying credentials...</span>
                ) : (
                  <>
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Bottom Security Footer */}
              <div className="mt-5 pt-3.5 border-t border-hairline-light flex items-center justify-center gap-2 text-[10px] text-espresso-500 uppercase tracking-wider font-sans">
                <ShieldCheck size={13} className="text-champagne-600 flex-shrink-0" />
                <span>256-Bit Encrypted Patron Confidentiality</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
