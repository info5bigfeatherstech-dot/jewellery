import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Mail, User as UserIcon, Phone, ArrowRight, ShieldCheck, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BRAND_CONFIG } from '../config/brand';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const [searchParams] = useSearchParams();
  const urlMode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState<boolean>(urlMode ? urlMode === 'login' : initialMode === 'login');
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('M.');
  const [rememberMe, setRememberMe] = useState(true);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/profile');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password, phone, title);
    navigate('/profile');
  };

  const fillDemoCredentials = () => {
    setEmail('vivienne.montgomery@salon.aurelia.com');
    setPassword('••••••••••••');
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-ivory-50 border border-hairline shadow-elevated overflow-hidden">
        
        {/* Left Column: Atmospheric Editorial Story (5 cols) */}
        <div className="lg:col-span-5 relative bg-espresso-950 text-ivory-100 hidden lg:flex flex-col justify-between p-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop"
              alt="Aurelia Private Salon"
              className="w-full h-full object-cover opacity-40 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/70 to-espresso-950/40" />
          </div>

          <div className="relative z-10">
            <span className="font-script text-3xl text-champagne-300 block mb-1">
              The Circle of Aurelia
            </span>
            <span className="text-[10px] uppercase tracking-super-lux text-ivory-300/80 font-sans block">
              Private Patron Portal
            </span>
          </div>

          <div className="relative z-10 space-y-6">
            <blockquote className="font-serif text-2xl font-light italic leading-relaxed text-ivory-100">
              “True luxury is not merely an acquisition; it is an enduring relationship with the masters of the craft.”
            </blockquote>

            <div className="space-y-3 pt-6 border-t border-hairline-white/20 text-xs text-ivory-300/80 font-sans">
              <div className="flex items-center gap-2.5">
                <Sparkles size={14} className="text-champagne-400" />
                <span>Privileged salon previews & archival creations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={14} className="text-champagne-400" />
                <span>Lifetime digital certificates of origin & appraisal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <UserIcon size={14} className="text-champagne-400" />
                <span>Dedicated personal jewelry concierge</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[10px] uppercase tracking-widest text-champagne-400 font-sans">
            Maison Fondée en {BRAND_CONFIG.established}
          </div>
        </div>

        {/* Right Column: Interactive Login / Register Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-center bg-ivory-100/60">
          
          {/* Brand Wordmark & Mode Switcher */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-3">
              <span className="font-serif text-3xl tracking-[0.2em] font-normal text-espresso-950 uppercase">
                {BRAND_CONFIG.name}
              </span>
            </Link>
            
            {/* Tabs */}
            <div className="flex items-center justify-center gap-8 border-b border-hairline-light pb-2 mt-4">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`relative pb-2 text-xs uppercase tracking-widest-lux font-medium transition-colors cursor-pointer ${
                  isLogin ? 'text-espresso-950 font-semibold' : 'text-espresso-500 hover:text-espresso-800'
                }`}
              >
                Sign In
                {isLogin && (
                  <motion.div
                    layoutId="authTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne-600"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`relative pb-2 text-xs uppercase tracking-widest-lux font-medium transition-colors cursor-pointer ${
                  !isLogin ? 'text-espresso-950 font-semibold' : 'text-espresso-500 hover:text-espresso-800'
                }`}
              >
                Join the Circle
                {!isLogin && (
                  <motion.div
                    layoutId="authTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne-600"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Quick Demo Fill Button */}
          <div className="mb-6 p-3 bg-ivory-200/80 border border-hairline-gold flex items-center justify-between">
            <div className="text-[11px] text-espresso-700">
              <span className="font-medium text-espresso-950">Patron Demo:</span> Sign in with pre-filled test profile
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[10px] uppercase tracking-widest font-sans text-champagne-700 font-semibold underline hover:text-espresso-950 cursor-pointer"
            >
              Fill Demo Info
            </button>
          </div>

          {/* Sign In Form */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1.5 font-sans">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3.5 text-espresso-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-ivory-50 border border-hairline-medium pl-10 pr-3.5 py-3 text-xs text-espresso-950 focus:outline-none focus:border-champagne-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] uppercase tracking-widest text-espresso-700 font-sans">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("A secure password reset link has been dispatched to your email address.")}
                    className="text-[10px] text-champagne-700 hover:text-espresso-950 font-sans uppercase tracking-wider underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-3.5 text-espresso-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-ivory-50 border border-hairline-medium pl-10 pr-10 py-3 text-xs text-espresso-950 focus:outline-none focus:border-champagne-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-espresso-400 hover:text-espresso-800"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-espresso-700">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="accent-champagne-600 rounded-sm"
                  />
                  <span>Remember my concierge session</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-espresso-900 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest-lux text-xs font-medium cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <span>Enter the Salon</span>
                <ArrowRight size={14} />
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1.5 font-sans">
                    Title
                  </label>
                  <select
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-950 focus:outline-none focus:border-champagne-500"
                  >
                    <option value="M.">M.</option>
                    <option value="Mme.">Mme.</option>
                    <option value="Lady">Lady</option>
                    <option value="Lord">Lord</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1.5 font-sans">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Vivienne Montgomery"
                    className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-950 focus:outline-none focus:border-champagne-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1.5 font-sans">
                  Email Address *
                </label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3.5 text-espresso-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-ivory-50 border border-hairline-medium pl-10 pr-3.5 py-3 text-xs text-espresso-950 focus:outline-none focus:border-champagne-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1.5 font-sans">
                  Telephone (For Private Courier Confirmation)
                </label>
                <div className="relative flex items-center">
                  <Phone size={16} className="absolute left-3.5 text-espresso-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (212) 555-0198"
                    className="w-full bg-ivory-50 border border-hairline-medium pl-10 pr-3.5 py-3 text-xs text-espresso-950 focus:outline-none focus:border-champagne-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1.5 font-sans">
                  Create Confidential Password *
                </label>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-3.5 text-espresso-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full bg-ivory-50 border border-hairline-medium pl-10 pr-10 py-3 text-xs text-espresso-950 focus:outline-none focus:border-champagne-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-espresso-400 hover:text-espresso-800"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-espresso-600 space-y-2">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="accent-champagne-600 mt-0.5" />
                  <span>Receive confidential salon invitations & private archival dispatches.</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-espresso-900 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest-lux text-xs font-medium cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <span>Complete Maison Registration</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* Bottom Security Note */}
          <div className="mt-8 pt-6 border-t border-hairline-light flex items-center justify-center gap-2 text-[11px] text-espresso-500">
            <ShieldCheck size={14} className="text-champagne-600" />
            <span>256-Bit Encrypted Confidential Patron Security</span>
          </div>

        </div>
      </div>
    </div>
  );
};
