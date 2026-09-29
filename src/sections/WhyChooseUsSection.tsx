import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'BIS Hallmarked & GIA Graded',
    description: 'Every diamond is certified conflict-free with laser inscription; each precious metal mount bears government hallmarked assay stamps.',
  },
  {
    icon: Truck,
    title: 'Insured White-Glove Delivery',
    description: 'Discreet armored transit with full transit insurance, delivered directly to your door in our bespoke silk presentation casing.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Complimentary Returns',
    description: 'Experience your chosen piece in the privacy of your home with our effortless, prepaid return and sizing exchange guarantee.',
  },
  {
    icon: Sparkles,
    title: 'Lifetime Atelier Maintenance',
    description: 'Enjoy lifetime complimentary prong tightenings, ultrasonic spa cleansing, and annual surface repolishing at all our boutiques.',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-ivory-100 border-t border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          scriptAccent="The Aurelia Promise"
          label="Maison Commitments"
          title={
            <>
              An uncompromising standard of <span className="italic">service</span>.
            </>
          }
          subtitle="Acquiring an Aurelia creation marks the start of a enduring relationship backed by comprehensive lifetime guardianship."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10 mt-10 sm:mt-14">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative p-5 sm:p-8 bg-ivory-200/40 border border-hairline hover:border-champagne-400 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Thin line icon in gold container */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-champagne-400/40 flex items-center justify-center text-champagne-600 mb-4 sm:mb-6 group-hover:bg-champagne-500 group-hover:text-ivory-50 group-hover:border-champagne-500 transition-all duration-500">
                  <Icon size={20} strokeWidth={1.4} />
                </div>

                <h3 className="font-serif text-lg text-espresso-950 font-normal mb-3">
                  {pillar.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-espresso-600 font-light leading-relaxed">
                  {pillar.description}
                </p>

                <div className="w-8 h-[1px] bg-hairline-gold mt-6 group-hover:w-16 group-hover:bg-champagne-500 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
