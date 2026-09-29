export interface BrandConfig {
  name: string;
  tagline: string;
  established: string;
  currency: string;
  currencySymbol: string;
  announcementText: string;
  freeShippingThreshold: number;
  contact: {
    conciergeEmail: string;
    phone: string;
    boutiqueAddress: string;
    hours: string;
  };
  socials: {
    instagram: string;
    pinterest: string;
    facebook: string;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  name: "AURELIA",
  tagline: "High Fine Jewelry & Haute Joaillerie",
  established: "1924",
  currency: "INR",
  currencySymbol: "₹",
  announcementText: "Complimentary Worldwide White-Glove Delivery & Bespoke Gift Wrapping",
  freeShippingThreshold: 500,
  contact: {
    conciergeEmail: "concierge@aureliajewels.com",
    phone: "+1 (800) 482-9020",
    boutiqueAddress: "740 Madison Avenue, New York, NY 10065",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM EST",
  },
  socials: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    facebook: "https://facebook.com",
  },
};
