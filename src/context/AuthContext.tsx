import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface UserOrder {
  id: string;
  date: string;
  items: {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    selectedSize?: string;
  }[];
  total: number;
  status: 'In Atelier Crafting' | 'Armored Courier Transit' | 'Delivered';
  trackingCode: string;
}

export interface UserAppointment {
  id: string;
  boutique: string;
  date: string;
  time: string;
  type: string;
  status: 'Confirmed' | 'Completed';
}

export interface User {
  id: string;
  title: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: 'Haute Joaillerie Patron' | 'Gold Connoisseur' | 'Circle Member';
  memberSince: string;
  addresses: UserAddress[];
  orders: UserOrder[];
  appointments: UserAppointment[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: 'login' | 'register') => void;
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, password?: string, phone?: string, title?: string) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  addOrder: (order: Omit<UserOrder, 'id' | 'date' | 'trackingCode'>) => string;
}

const AUTH_STORAGE_KEY = 'aurelia_auth_user_v2';

const DEMO_USER: User = {
  id: 'usr-8921',
  title: 'Lady',
  name: 'Vivienne Montgomery',
  email: 'vivienne.montgomery@salon.aurelia.com',
  phone: '+1 (212) 555-0198',
  membershipTier: 'Haute Joaillerie Patron',
  memberSince: 'October 2024',
  addresses: [
    {
      id: 'addr-1',
      label: 'Primary Residence',
      street: '820 Fifth Avenue, Penthouse B',
      city: 'New York',
      state: 'NY',
      zip: '10065',
      country: 'United States',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Summer Estate',
      street: '14 Dune Road',
      city: 'East Hampton',
      state: 'NY',
      zip: '11937',
      country: 'United States',
      isDefault: false,
    },
  ],
  orders: [
    {
      id: 'AUR-2025-9182',
      date: 'December 18, 2025',
      items: [
        {
          productId: 'aur-rng-001',
          name: 'Solstice Radiant Diamond Solitaire',
          price: 6850,
          quantity: 1,
          selectedSize: 'US 6.5',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
        },
      ],
      total: 6850,
      status: 'Delivered',
      trackingCode: 'MALCA-AMIT-99218-US',
    },
    {
      id: 'AUR-2026-1049',
      date: 'February 14, 2026',
      items: [
        {
          productId: 'aur-ear-003',
          name: 'Seraphine Baroque Pearl Drops',
          price: 3450,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop',
        },
      ],
      total: 3450,
      status: 'Delivered',
      trackingCode: 'BRINKS-EXP-44012-US',
    },
  ],
  appointments: [
    {
      id: 'apt-01',
      boutique: 'Madison Avenue Flagship (New York)',
      date: 'April 15, 2026',
      time: '2:30 PM EST',
      type: 'Private Vault Solitaire Viewing',
      status: 'Confirmed',
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear stale demo title if user is not demo user Vivienne Montgomery
        if (parsed && parsed.title === 'Lady' && !parsed.email?.includes('montgomery')) {
          parsed.title = '';
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  const login = (email: string) => {
    // If logging in with demo email or any email, authenticate user
    if (email.toLowerCase().includes('montgomery')) {
      setUser(DEMO_USER);
    } else {
      setUser({
        ...DEMO_USER,
        id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
        title: '',
        name: email.split('@')[0].replace('.', ' '),
        email: email,
        membershipTier: 'Circle Member',
        memberSince: 'Today',
      });
    }
    setIsAuthModalOpen(false);
    return true;
  };

  const register = (name: string, email: string, _password?: string, phone = '', title = '') => {
    const newUser: User = {
      id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      name,
      email,
      phone,
      membershipTier: 'Circle Member',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      addresses: [],
      orders: [],
      appointments: [],
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthModalOpen(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem('aurelia_auth_user_v1');
    } catch {
      // ignore
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...updatedData } : null));
  };

  const addOrder = (orderData: Omit<UserOrder, 'id' | 'date' | 'trackingCode'>): string => {
    const orderId = `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const tracking = `MALCA-AMIT-${Math.floor(10000 + Math.random() * 90000)}-US`;
    const newOrder: UserOrder = {
      ...orderData,
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      trackingCode: tracking,
    };

    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: [newOrder, ...prev.orders],
      };
    });

    return orderId;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        login,
        register,
        logout,
        updateProfile,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
