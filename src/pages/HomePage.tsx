import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { MarqueeStrip } from '../sections/MarqueeStrip';
import { CategorySection } from '../sections/CategorySection';
import { NewArrivalsSection } from '../sections/NewArrivalsSection';
import { SeasonalFeatureSection } from '../sections/SeasonalFeatureSection';
import { BestSellersSection } from '../sections/BestSellersSection';
import { OccasionGiftingSection } from '../sections/OccasionGiftingSection';
// import { MaterialGemstoneSection } from '../sections/MaterialGemstoneSection';
// import { CraftsmanshipStorySection } from '../sections/CraftsmanshipStorySection';
// import { LookbookSection } from '../sections/LookbookSection';
import { WhyChooseUsSection } from '../sections/WhyChooseUsSection';
// import { TestimonialsSection } from '../sections/TestimonialsSection';
// import { SocialGallerySection } from '../sections/SocialGallerySection';
import { NewsletterSection } from '../sections/NewsletterSection';


export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 3. Hero: full-viewport editorial hero */}
      <HeroSection />

      {/* 4. Marquee strip */}
      <MarqueeStrip />

      {/* 5. Shop by Category */}
      <CategorySection />

      {/* 6. New Arrivals */}
      <NewArrivalsSection />

      {/* 7. Seasonal / Fashion Season Collection */}
      <SeasonalFeatureSection />

      {/* 8. Best Sellers */}
      <BestSellersSection />

      {/* 9. Shop by Occasion or Gifting */}
      <OccasionGiftingSection />

      {/* 10. Shop by Material/Gemstone */}
      {/* <MaterialGemstoneSection /> */}

      {/* 11. Craftsmanship / Brand Story */}
      {/* <CraftsmanshipStorySection /> */}

      {/* 12. Featured Lookbook */}
      {/* <LookbookSection /> */}

      {/* 13. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 14. Testimonials */}
      {/* <TestimonialsSection /> */}

      {/* 15. Instagram / Social Gallery */}
      {/* <SocialGallerySection /> */}

      {/* 16. Newsletter */}
      <NewsletterSection />
    </div>
  );
};
