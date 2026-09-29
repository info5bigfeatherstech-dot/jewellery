import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 md:py-36 bg-ivory-200/60 border-t border-hairline overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Script flourish */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <span className="font-script text-3xl sm:text-4xl text-champagne-600">
            Privileged Dispatches
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-espresso-950 leading-tight mb-4"
        >
          Enter the <span className="italic">Circle of Aurelia</span>.
        </motion.h2>

        {/* Subtitle / Offer */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm text-espresso-600 font-light max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Receive private invitations to private salon previews, archival releases, and enjoy <span className="font-medium text-espresso-900">10% off your inaugural acquisition</span>.
        </motion.p>

        {/* Underline-style input form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 bg-ivory-100 border border-hairline-gold text-espresso-950 flex items-center justify-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-champagne-500 text-ivory-50 flex items-center justify-center">
                  <Check size={14} />
                </div>
                <div className="text-left">
                  <p className="font-serif text-sm">Welcome to our private circle.</p>
                  <p className="text-[11px] font-sans text-espresso-500">Your bespoke welcome code has been dispatched.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center border-b border-espresso-400 focus-within:border-champagne-600 transition-colors py-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent font-sans text-sm text-espresso-950 placeholder-espresso-400 focus:outline-none pr-12"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 w-11 h-11 flex items-center justify-center text-espresso-800 hover:text-champagne-600 transition-colors cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-espresso-400 font-sans mt-3">
                  <span>Confidentiality Guaranteed</span>
                  <span>Unsubscribe Anytime</span>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
