import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  ShieldCheck, 
  Gem, 
  Sparkles, 
  ChevronDown 
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';


interface Boutique {
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  appointmentOnly?: boolean;
}

const BOUTIQUES: Boutique[] = [
  {
    city: 'New York',
    name: 'Madison Avenue Flagship & Atelier',
    address: '740 Madison Avenue, New York, NY 10065',
    phone: '+1 (800) 482-9020',
    hours: 'Monday – Saturday: 10:00 AM – 7:00 PM EST',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop',
    appointmentOnly: false,
  },
  {
    city: 'Paris',
    name: 'Place Vendôme Private Salon',
    address: '14 Place Vendôme, 75001 Paris, France',
    phone: '+33 1 42 68 00 00',
    hours: 'Tuesday – Saturday: 11:00 AM – 6:30 PM CET',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    appointmentOnly: true,
  },
  {
    city: 'London',
    name: 'New Bond Street Mansion',
    address: '42 New Bond Street, Mayfair, London W1S 2RY',
    phone: '+44 20 7946 0990',
    hours: 'Monday – Saturday: 10:30 AM – 6:30 PM GMT',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop',
    appointmentOnly: false,
  },
];

const FAQS = [
  {
    q: 'How do I book a private salon viewing?',
    a: 'You can submit an appointment request using our concierge form above or call our private client team directly. We will confirm your preferred boutique suite, prepare selected pieces for private viewing, and arrange private reception.',
  },
  {
    q: 'Can I arrange a virtual diamond consultation?',
    a: 'Yes. Our high-definition video salon enables real-time stone inspection alongside a certified GIA gemologist. We examine cut, light performance, and laser inscriptions under 40x magnification on camera.',
  },
  {
    q: 'How does the bespoke heirloom commission process work?',
    a: 'Bespoke commissions begin with an initial consultation with our head jeweler. Following hand-painted gouache renderings and 3D wax sculpting, the piece is hand-forged in solid 18k gold or platinum over six to eight weeks.',
  },
  {
    q: 'How are acquisitions shipped and insured?',
    a: 'Every Aurelia shipment travels via discreet, fully insured armored courier (Malca-Amit or Brinks) requiring adult signature upon delivery. Complimentary worldwide delivery and bespoke silk presentation wrapping are always included.',
  },
  {
    q: 'Can I request a complimentary physical ring sizer?',
    a: 'Certainly. Contact our concierge with your shipping address and we will dispatch a precision stainless steel ring sizing gauge with complimentary worldwide courier transit.',
  },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'private-salon',
    boutique: 'new-york',
    interest: 'solitaires',
    preferredDate: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-ivory-100 min-h-screen pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center pt-8 pb-14 border-b border-hairline-light">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-script text-3xl sm:text-4xl text-champagne-600 block mb-2 font-normal italic">
              Private Salon & Concierge
            </span>
            <span className="text-[10px] uppercase tracking-super-lux text-espresso-600 font-sans block mb-3">
              Maison Client Services
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-espresso-950 tracking-tight">
              At Your <span className="italic">Service</span>
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600 font-sans font-light max-w-xl mx-auto mt-4 leading-relaxed">
              Whether arranging a private viewing in our historic vaults, commissioning a bespoke creation, or seeking gemological guidance, our concierge team is dedicated to your complete care.
            </p>
          </motion.div>
        </div>

        {/* 3 Pillars of Client Service */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="p-8 bg-ivory-200/50 border border-hairline hover:border-champagne-400 transition-colors">
            <div className="w-10 h-10 rounded-full border border-champagne-500/40 flex items-center justify-center text-champagne-600 mb-5">
              <Sparkles size={18} strokeWidth={1.4} />
            </div>
            <h3 className="font-serif text-xl text-espresso-950 mb-2">Private Salon Viewing</h3>
            <p className="text-xs text-espresso-600 font-light leading-relaxed">
              Experience rare solitaires and high jewelry suites in the secluded privacy of our boutique salon suites with champagne service.
            </p>
          </div>

          <div className="p-8 bg-ivory-200/50 border border-hairline hover:border-champagne-400 transition-colors">
            <div className="w-10 h-10 rounded-full border border-champagne-500/40 flex items-center justify-center text-champagne-600 mb-5">
              <Gem size={18} strokeWidth={1.4} />
            </div>
            <h3 className="font-serif text-xl text-espresso-950 mb-2">Virtual Gemology Salon</h3>
            <p className="text-xs text-espresso-600 font-light leading-relaxed">
              Connect via live ultra-high-definition video with our resident gemologists to inspect fire, cut symmetry, and certifications.
            </p>
          </div>

          <div className="p-8 bg-ivory-200/50 border border-hairline hover:border-champagne-400 transition-colors">
            <div className="w-10 h-10 rounded-full border border-champagne-500/40 flex items-center justify-center text-champagne-600 mb-5">
              <ShieldCheck size={18} strokeWidth={1.4} />
            </div>
            <h3 className="font-serif text-xl text-espresso-950 mb-2">Bespoke Commission</h3>
            <p className="text-xs text-espresso-600 font-light leading-relaxed">
              Collaborate directly with master goldsmiths to sculpt custom engagement settings, anniversary bands, or restyle family stones.
            </p>
          </div>
        </div>

        {/* Appointment Booking & Direct Concierge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start my-16">
          
          {/* Left Column: Interactive Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-ivory-200/40 p-8 sm:p-12 border border-hairline shadow-subtle">
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 block mb-1">
                Concierge Request
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-espresso-950 font-normal">
                Reserve an Appointment
              </h2>
              <p className="text-xs text-espresso-600 font-light mt-1">
                Our client director will contact you within four business hours to confirm your private suite.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-champagne-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check size={26} />
                  </div>
                  <h3 className="font-serif text-2xl text-espresso-950">
                    Appointment Request Received
                  </h3>
                  <p className="text-xs text-espresso-600 font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-medium text-espresso-900">{formData.name}</span>. A senior client advisor has been assigned to your reservation and will contact you at <span className="font-medium text-espresso-900">{formData.email}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs uppercase tracking-widest font-sans text-champagne-700 underline cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-2 font-sans">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lady Vivienne Montgomery"
                        className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 focus:outline-none focus:border-champagne-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-2 font-sans">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. vivienne@domain.com"
                        className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 focus:outline-none focus:border-champagne-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-2 font-sans">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 focus:outline-none focus:border-champagne-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-2 font-sans">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 focus:outline-none focus:border-champagne-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Type & Boutique Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-2 font-sans">
                        Consultation Format
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 focus:outline-none focus:border-champagne-500 transition-colors cursor-pointer"
                      >
                        <option value="private-salon">Private Salon Appointment (In-Person)</option>
                        <option value="virtual">Virtual Diamond Consultation (Video)</option>
                        <option value="bespoke">Bespoke Heirloom Commission</option>
                        <option value="service">Sizing, Care & Restoration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-2 font-sans">
                        Preferred Location
                      </label>
                      <select
                        value={formData.boutique}
                        onChange={e => setFormData({ ...formData, boutique: e.target.value })}
                        className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 focus:outline-none focus:border-champagne-500 transition-colors cursor-pointer"
                      >
                        <option value="new-york">New York — 740 Madison Avenue</option>
                        <option value="paris">Paris — 14 Place Vendôme</option>
                        <option value="london">London — 42 New Bond Street</option>
                        <option value="virtual">Virtual Concierge (Worldwide)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-2 font-sans">
                      Specific Creations or Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention any specific diamond carats, metal preferences, or occasion dates..."
                      className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 focus:outline-none focus:border-champagne-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-espresso-900 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest-lux text-xs font-medium cursor-pointer shadow-md"
                  >
                    Confirm Appointment Request
                  </button>

                  <p className="text-[10px] text-espresso-400 font-sans text-center">
                    All consultations are strictly confidential. We observe the highest standards of discretion.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Direct Concierge & Immediate Assistance (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-ivory-50 p-8 border border-hairline shadow-subtle">
              <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 block mb-2">
                Immediate Concierge
              </span>
              <h3 className="font-serif text-2xl text-espresso-950 font-normal mb-4">
                Direct Line to the Maison
              </h3>
              
              <ul className="space-y-4 text-xs font-sans text-espresso-700">
                <li className="flex items-start gap-3.5">
                  <Phone size={16} className="text-champagne-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-medium text-espresso-900">Telephone</span>
                    <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="hover:text-champagne-600 transition-colors">
                      {BRAND_CONFIG.contact.phone}
                    </a>
                    <span className="block text-[11px] text-espresso-500 mt-0.5">Toll-free worldwide concierge</span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <Mail size={16} className="text-champagne-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-medium text-espresso-900">Electronic Mail</span>
                    <a href={`mailto:${BRAND_CONFIG.contact.conciergeEmail}`} className="hover:text-champagne-600 transition-colors">
                      {BRAND_CONFIG.contact.conciergeEmail}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <Clock size={16} className="text-champagne-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-medium text-espresso-900">Salon Hours</span>
                    <span>{BRAND_CONFIG.contact.hours}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Armored White Glove Delivery Badge */}
            <div className="bg-ivory-200/70 p-6 border border-hairline-gold">
              <div className="flex items-center gap-3 text-champagne-700 mb-2">
                <ShieldCheck size={18} />
                <span className="text-xs uppercase tracking-widest font-sans font-medium">
                  Guaranteed Armored Transit
                </span>
              </div>
              <p className="text-xs text-espresso-600 font-light leading-relaxed">
                Orders are hand-packaged in our signature midnight silk gift presentation and dispatched via armored carrier with direct recipient confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Global Flagship Boutiques Display */}
        <div className="my-24 pt-12 border-t border-hairline-light">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="font-script text-3xl text-champagne-600 block mb-2 italic">
              Worldwide Maisons
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso-950 font-normal">
              Flagship Boutiques
            </h2>
            <p className="text-xs sm:text-sm text-espresso-600 font-sans font-light mt-2">
              Visit our historic salons to discover the complete permanent repertoire in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BOUTIQUES.map(boutique => (
              <div
                key={boutique.name}
                className="group bg-ivory-50 border border-hairline overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory-200">
                  <img
                    src={boutique.image}
                    alt={boutique.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-ivory-100/90 backdrop-blur-sm px-3 py-1 border border-hairline text-[9px] uppercase tracking-widest text-champagne-700">
                    {boutique.city}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-lg text-espresso-950 font-normal">
                    {boutique.name}
                  </h3>

                  <p className="text-xs text-espresso-600 font-light">
                    {boutique.address}
                  </p>

                  <div className="pt-2 text-[11px] text-espresso-500 border-t border-hairline-light space-y-1">
                    <p>{boutique.hours}</p>
                    <p className="text-champagne-700 font-medium">{boutique.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concierge FAQs */}
        <div className="max-w-3xl mx-auto my-24 pt-12 border-t border-hairline-light">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans block mb-2">
              Inquiries & Guidance
            </span>
            <h2 className="font-serif text-3xl text-espresso-950 font-normal">
              Frequently Addressed Questions
            </h2>
          </div>

          <div className="divide-y divide-hairline-light border-y border-hairline-light">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-2 focus:outline-none cursor-pointer group"
                  >
                    <span className="font-serif text-lg text-espresso-950 group-hover:text-champagne-700 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-espresso-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-champagne-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-espresso-600 font-light leading-relaxed pt-2 pb-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
