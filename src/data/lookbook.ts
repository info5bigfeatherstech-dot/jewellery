import type { LookbookItem } from '../types';

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "lb-01",
    title: "The Golden Hour at Villa Medici",
    caption: "Layered 18k solid chains catching autumnal Tuscan light",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    size: "tall",
    hotspot: {
      x: 48,
      y: 38,
      productId: "aur-ear-003",
      productName: "Seraphine Baroque Pearl Drops",
      productPrice: 3450
    }
  },
  {
    id: "lb-02",
    title: "Midnight Salle des Fêtes",
    caption: "Platinum and diamond Rivière reflecting chandelier crystal",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    size: "standard",
    hotspot: {
      x: 52,
      y: 56,
      productId: "aur-nck-002",
      productName: "L’Aura Graduated Diamond Rivière",
      productPrice: 18200
    }
  },
  {
    id: "lb-03",
    title: "Architectural Hands",
    caption: "A harmony of Solstice Solitaire and Sovereign Fluted Cuff",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
    size: "tall",
    hotspot: {
      x: 54,
      y: 44,
      productId: "aur-rng-001",
      productName: "Solstice Radiant Diamond Solitaire",
      productPrice: 6850
    }
  },
  {
    id: "lb-04",
    title: "Atelier Quietude",
    caption: "Precision lapidary cutting at our Madison Avenue workbench",
    image: "https://images.unsplash.com/photo-1611591475878-a28d54238e83?q=80&w=1000&auto=format&fit=crop",
    size: "wide",
    hotspot: {
      x: 62,
      y: 65,
      productId: "aur-brc-004",
      productName: "Sovereign Fluted Gold Cuff",
      productPrice: 5200
    }
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: "ig-01",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    tag: "@aureliafinejewelry",
    caption: "Morning light over the Solstice Solitaire."
  },
  {
    id: "ig-02",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    tag: "@aureliafinejewelry",
    caption: "Diamonds calibrated to the micro-millimeter."
  },
  {
    id: "ig-03",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
    tag: "@aureliafinejewelry",
    caption: "Organic Australian South Sea baroque pearls."
  },
  {
    id: "ig-04",
    image: "https://images.unsplash.com/photo-1611591475878-a28d54238e83?q=80&w=800&auto=format&fit=crop",
    tag: "@aureliafinejewelry",
    caption: "Solid 18K gold hand-fluted cuff."
  },
  {
    id: "ig-05",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    tag: "@aureliafinejewelry",
    caption: "Bridal vows carved in everlasting platinum."
  },
  {
    id: "ig-06",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    tag: "@aureliafinejewelry",
    caption: "Colombian emerald medallion talisman."
  }
];
