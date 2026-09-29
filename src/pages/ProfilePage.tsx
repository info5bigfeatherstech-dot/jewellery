import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  User as UserIcon, 
  Calendar, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Plus,
  Crown,
  Phone,
  MessageSquare,
  Gem,
  Award,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserAddress } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { BRAND_CONFIG } from '../config/brand';
import { PRODUCTS } from '../data/products';

type ProfileTab = 'orders' | 'appointments' | 'addresses' | 'details';

export const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { totalWishlistItems } = useWishlist();
  const navigate = useNavigate();

  // If user is not logged in, redirect cleanly to home page
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<ProfileTab>('details');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<UserAddress, 'id'>>({
    label: 'New Residence',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    isDefault: false,
  });

  const featuredPiece = PRODUCTS[0];

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: editedName, phone: editedPhone });
    setIsEditingInfo(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const addressWithId: UserAddress = {
      ...newAddress,
      id: `addr-${Date.now()}`,
    };
    updateProfile({
      addresses: [...user.addresses, addressWithId],
    });
    setIsAddingAddress(false);
    setNewAddress({
      label: 'New Residence',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      isDefault: false,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#F8F5F0] min-h-screen pt-6 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Patron Header with Deep Midnight Charcoal & Champagne Gold */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-espresso-950 via-[#1F1A17] to-espresso-950 text-white p-7 sm:p-10 shadow-2xl border border-champagne-500/40 mb-8">
          {/* Subtle Golden Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-champagne-500/10 blur-3xl pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent" />

          {/* Top Row: Patron Greeting & Quick Actions */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-7 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Crown size={15} className="text-champagne-400" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-champagne-400 font-sans font-medium">
                  {user.membershipTier} • Private Client Salon
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-wide">
                Bienvenue, {user.title ? `${user.title} ` : ''}{user.name}
              </h1>
              <p className="text-xs text-white/70 font-sans mt-1">
                Circle of Aurelia Member since <span className="font-medium text-champagne-300">{user.memberSince}</span> • Dossier Confidentiel
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/wishlist"
                className="py-2.5 px-4 bg-white/10 hover:bg-champagne-600 hover:text-white border border-white/20 hover:border-champagne-500 transition-all text-xs uppercase tracking-widest font-sans text-white flex items-center gap-2 rounded-sm shadow-sm backdrop-blur-sm"
              >
                <Heart size={14} className="text-champagne-400" />
                <span>Saved Vault ({totalWishlistItems})</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 px-4 text-xs uppercase tracking-widest font-sans text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-colors cursor-pointer rounded-sm border border-transparent hover:border-white/15"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Bottom Metrics Bar with Rich Glassmorphic Tiles */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 transition-all hover:border-champagne-400/40">
              <span className="text-[9px] uppercase tracking-[0.22em] text-champagne-400 font-sans block mb-1 font-medium">
                Total Acquisitions
              </span>
              <span className="font-serif text-2xl text-white font-normal">
                {user.orders.length} {user.orders.length === 1 ? 'Creation' : 'Creations'}
              </span>
            </div>

            <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 transition-all hover:border-champagne-400/40">
              <span className="text-[9px] uppercase tracking-[0.22em] text-champagne-400 font-sans block mb-1 font-medium">
                Dedicated Salon
              </span>
              <span className="font-serif text-base sm:text-lg text-white font-normal">
                Madison Ave. New York
              </span>
            </div>

            <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 transition-all hover:border-champagne-400/40">
              <span className="text-[9px] uppercase tracking-[0.22em] text-champagne-400 font-sans block mb-1 font-medium">
                White-Glove Delivery
              </span>
              <span className="font-serif text-base sm:text-lg text-emerald-400 font-normal flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Armored Transit Active
              </span>
            </div>

            <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 transition-all hover:border-champagne-400/40">
              <span className="text-[9px] uppercase tracking-[0.22em] text-champagne-400 font-sans block mb-1 font-medium">
                Concierge Contact
              </span>
              <span className="font-serif text-sm sm:text-base text-white font-normal">
                {BRAND_CONFIG.contact.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center gap-2 sm:gap-4 border-b border-hairline-medium mb-8 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'details', label: 'Personal Information', icon: UserIcon },
            { id: 'orders', label: 'Acquisitions & Orders', icon: Package },
            { id: 'appointments', label: 'Salon Appointments', icon: Calendar },
            { id: 'addresses', label: 'Private Residences', icon: MapPin },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                className={`relative pb-3 text-xs uppercase tracking-widest-lux font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 px-3 ${
                  isActive
                    ? 'text-espresso-950 font-semibold'
                    : 'text-espresso-500 hover:text-espresso-800'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-champagne-600' : 'text-espresso-400'} />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="profileTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-champagne-600"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Two-Column Responsive Grid: Main Content (8 cols) + Concierge & Privileges (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT / MAIN COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* TAB 1: Personal Information & Salon Dossier */}
            {activeTab === 'details' && (
              <div className="bg-white border border-hairline-medium rounded-xl shadow-xs p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-hairline-light">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-sans font-medium block mb-0.5">
                      Confidential Patron Record
                    </span>
                    <h3 className="font-serif text-2xl text-espresso-950 font-normal">
                      Personal Salon Dossier
                    </h3>
                    <p className="text-xs text-espresso-500 font-sans mt-0.5">
                      Your identity credentials, contact channels, and concierge verification.
                    </p>
                  </div>

                  {!isEditingInfo && (
                    <button
                      type="button"
                      onClick={() => setIsEditingInfo(true)}
                      className="text-xs uppercase tracking-widest text-champagne-700 hover:text-espresso-950 underline font-sans cursor-pointer font-medium"
                    >
                      Edit Dossier
                    </button>
                  )}
                </div>

                {isEditingInfo ? (
                  <form onSubmit={handleSaveInfo} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans font-medium">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editedName}
                        onChange={e => setEditedName(e.target.value)}
                        className="w-full bg-ivory-50 border border-hairline-medium focus:border-champagne-600 focus:outline-none p-3 text-xs text-espresso-900 rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans font-medium">
                        Direct Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editedPhone}
                        onChange={e => setEditedPhone(e.target.value)}
                        className="w-full bg-ivory-50 border border-hairline-medium focus:border-champagne-600 focus:outline-none p-3 text-xs text-espresso-900 rounded-sm"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                      <button
                        type="submit"
                        className="py-3 px-6 bg-espresso-950 hover:bg-champagne-600 text-white text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer rounded-sm"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingInfo(false)}
                        className="py-3 px-4 text-xs uppercase tracking-widest text-espresso-600 hover:text-espresso-950 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-5 text-xs text-espresso-800 font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-hairline-light">
                      <div className="p-3 bg-ivory-50/80 border border-hairline-light rounded-sm">
                        <span className="text-[10px] uppercase tracking-wider text-espresso-500 block mb-1 font-sans font-medium">
                          Full Patron Name
                        </span>
                        <span className="font-serif text-base text-espresso-950 font-normal">
                          {user.title ? `${user.title} ` : ''}{user.name}
                        </span>
                      </div>

                      <div className="p-3 bg-ivory-50/80 border border-hairline-light rounded-sm">
                        <span className="text-[10px] uppercase tracking-wider text-espresso-500 block mb-1 font-sans font-medium">
                          Maison Membership Tier
                        </span>
                        <span className="font-serif text-base text-champagne-700 font-medium flex items-center gap-1.5">
                          <Crown size={14} />
                          {user.membershipTier}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-hairline-light">
                      <div className="p-3 bg-ivory-50/80 border border-hairline-light rounded-sm">
                        <span className="text-[10px] uppercase tracking-wider text-espresso-500 block mb-1 font-sans font-medium">
                          Electronic Mail
                        </span>
                        <span className="font-mono text-espresso-900">{user.email}</span>
                      </div>

                      <div className="p-3 bg-ivory-50/80 border border-hairline-light rounded-sm">
                        <span className="text-[10px] uppercase tracking-wider text-espresso-500 block mb-1 font-sans font-medium">
                          Telephone Channel
                        </span>
                        <span className="font-mono text-espresso-900">{user.phone || '+1 (212) 555-0198'}</span>
                      </div>
                    </div>

                    {/* Security strip */}
                    <div className="p-4 bg-champagne-50/60 border border-hairline-gold/70 rounded-sm flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck size={18} className="text-champagne-600 flex-shrink-0" />
                        <div>
                          <h5 className="font-serif text-sm text-espresso-950 font-medium">Confidential Security Active</h5>
                          <p className="text-[11px] text-espresso-600">Password protected with biometric concierge verification.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert("Password reset instructions dispatched to your confidential email.")}
                        className="text-[10px] uppercase tracking-widest text-champagne-700 hover:text-espresso-950 underline cursor-pointer font-semibold"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Acquisitions & Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {user.orders.length === 0 ? (
                  <div className="bg-white p-12 text-center border border-hairline-medium rounded-xl">
                    <Package size={32} className="mx-auto text-champagne-500 mb-3" />
                    <h3 className="font-serif text-2xl text-espresso-950 mb-2 font-light">
                      No Past Acquisitions
                    </h3>
                    <p className="text-xs text-espresso-600 font-sans max-w-md mx-auto mb-6 leading-relaxed">
                      Your acquisitions vault is currently empty. Explore our iconic solitaires, diamond rivières, and sculpted cuffs.
                    </p>
                    <Link
                      to="/shop"
                      className="py-3 px-6 bg-espresso-950 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest text-xs inline-block rounded-sm"
                    >
                      Explore Current Repertoire
                    </Link>
                  </div>
                ) : (
                  user.orders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white border border-hairline-medium rounded-xl shadow-xs p-6 sm:p-8"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-hairline-light">
                        <div>
                          <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans block mb-1 font-medium">
                            Acquisition Reference: {order.id}
                          </span>
                          <h4 className="font-serif text-xl text-espresso-950 font-normal">
                            Ordered on {order.date}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] uppercase tracking-widest font-sans font-medium rounded-xs">
                            {order.status}
                          </span>
                          <span className="text-xs text-espresso-500 font-mono">
                            {order.trackingCode}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="divide-y divide-hairline-light py-4">
                        {order.items.map(item => (
                          <div key={item.productId} className="py-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-18 object-cover border border-hairline-light bg-ivory-200 rounded-sm"
                              />
                              <div>
                                <h5 className="font-serif text-base text-espresso-950 font-normal">
                                  {item.name}
                                </h5>
                                {item.selectedSize && (
                                  <p className="text-[11px] text-espresso-500 font-sans">
                                    Sizing: {item.selectedSize}
                                  </p>
                                )}
                                <p className="text-xs text-espresso-700 font-sans mt-0.5">
                                  Qty: {item.quantity} • {BRAND_CONFIG.currencySymbol}{item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <button
                                type="button"
                                onClick={() => alert(`Certificate of Origin for ${item.name} (GIA Certified Conflict-Free Diamond). Available for digital download.`)}
                                className="text-[11px] uppercase tracking-wider text-champagne-700 hover:text-espresso-950 underline font-sans flex items-center gap-1 cursor-pointer"
                              >
                                <span>Certificate of Origin</span>
                                <ExternalLink size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="pt-4 border-t border-hairline-light flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-espresso-600">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={16} className="text-champagne-600" />
                          <span>Complimentary White Glove Armored Transit Included</span>
                        </div>

                        <div className="font-serif text-lg text-espresso-950">
                          Total Acquisition: <span className="font-semibold text-champagne-700">{BRAND_CONFIG.currencySymbol}{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: Salon Appointments */}
            {activeTab === 'appointments' && (
              <div className="bg-white border border-hairline-medium rounded-xl shadow-xs p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-hairline-light">
                  <div>
                    <h3 className="font-serif text-2xl text-espresso-950 font-normal">
                      Private Salon Appointments
                    </h3>
                    <p className="text-xs text-espresso-600 font-sans mt-0.5">
                      Your confirmed viewings and consultation schedules with senior gemologists.
                    </p>
                  </div>

                  <Link
                    to="/contact"
                    className="py-2.5 px-4 bg-espresso-950 hover:bg-champagne-600 text-white transition-colors text-xs uppercase tracking-widest font-sans inline-flex items-center gap-1.5 rounded-sm"
                  >
                    <Plus size={14} />
                    <span>Reserve New Appointment</span>
                  </Link>
                </div>

                {user.appointments.map(apt => (
                  <div
                    key={apt.id}
                    className="p-5 bg-ivory-100/70 border border-hairline mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-sm"
                  >
                    <div>
                      <span className="px-2.5 py-0.5 bg-champagne-50 border border-hairline-gold text-[10px] uppercase tracking-widest text-champagne-700 font-sans mb-2 inline-block rounded-xs">
                        {apt.status}
                      </span>
                      <h4 className="font-serif text-lg text-espresso-950 font-normal">
                        {apt.type}
                      </h4>
                      <p className="text-xs text-espresso-700 font-sans mt-1">
                        {apt.boutique}
                      </p>
                      <p className="text-xs text-espresso-500 font-sans">
                        Date: <span className="font-medium text-espresso-900">{apt.date}</span> at <span className="font-medium text-espresso-900">{apt.time}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => alert("Your private client director will call you to modify your suite timing.")}
                        className="text-xs uppercase tracking-widest text-champagne-700 hover:text-espresso-950 underline font-sans cursor-pointer font-medium"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: Private Residences */}
            {activeTab === 'addresses' && (
              <div className="bg-white border border-hairline-medium rounded-xl shadow-xs p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-hairline-light">
                  <div>
                    <h3 className="font-serif text-2xl text-espresso-950 font-normal">
                      Registered Residences
                    </h3>
                    <p className="text-xs text-espresso-600 font-sans mt-0.5">
                      Verified delivery destinations for confidential armored transport.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="py-2.5 px-4 bg-espresso-950 hover:bg-champagne-600 text-white transition-colors text-xs uppercase tracking-widest font-sans inline-flex items-center gap-1.5 rounded-sm cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add Residence</span>
                  </button>
                </div>

                <AnimatePresence>
                  {isAddingAddress && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddAddress}
                      className="p-6 bg-ivory-50 border border-hairline-medium mb-6 space-y-4 rounded-sm"
                    >
                      <h4 className="font-serif text-lg text-espresso-950">Add Secure Residence</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-espresso-700 mb-1">
                            Residence Label
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Park Avenue Penthouse"
                            value={newAddress.label}
                            onChange={e => setNewAddress({ ...newAddress, label: e.target.value })}
                            className="w-full bg-white border border-hairline-medium p-2.5 text-xs text-espresso-900 rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-espresso-700 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.street}
                            onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                            className="w-full bg-white border border-hairline-medium p-2.5 text-xs text-espresso-900 rounded-sm"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingAddress(false)}
                          className="px-4 py-2 text-xs uppercase tracking-widest text-espresso-600 hover:text-espresso-950 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-espresso-950 text-white hover:bg-champagne-600 text-xs uppercase tracking-widest cursor-pointer rounded-sm"
                        >
                          Save Residence
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map(addr => (
                    <div
                      key={addr.id}
                      className="p-5 bg-ivory-50/70 border border-hairline rounded-sm relative"
                    >
                      {addr.isDefault && (
                        <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest bg-champagne-100 text-champagne-800 border border-champagne-300 px-2 py-0.5 rounded-xs">
                          Primary Destination
                        </span>
                      )}
                      <h4 className="font-serif text-base text-espresso-950 font-medium mb-1">
                        {addr.label}
                      </h4>
                      <p className="text-xs text-espresso-700 leading-relaxed font-sans">
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.zip}<br />
                        {addr.country}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Dedicated Concierge, Privilege Vault, & Reserved Piece (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* CARD 1: Dedicated Private Client Concierge */}
            <div className="bg-espresso-950 text-white rounded-xl p-6 sm:p-7 border border-champagne-500/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-champagne-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <Crown size={14} className="text-champagne-400" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-champagne-400 font-sans font-medium">
                  Exclusive Salon Advisor
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="w-14 h-14 rounded-full border-2 border-champagne-400/80 p-0.5 flex-shrink-0 bg-espresso-900">
                  <img
                    src="/images/auth/salon_editorial.jpg"
                    alt="Concierge Advisor"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-white font-normal">Hélène de Montmirail</h4>
                  <p className="text-[11px] text-champagne-300 font-sans">Senior Gemological Director</p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-sans mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available in Private Suite
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/75 font-sans leading-relaxed mb-4">
                "Directly overseeing your acquisitions, insured transit, and bespoke high-jewelry commissions."
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => alert("Connecting you directly to Senior Gemological Director Hélène de Montmirail: +1 (800) 482-9020")}
                  className="w-full py-2.5 px-3 bg-white/10 hover:bg-champagne-600 hover:text-white border border-white/15 text-white text-xs font-sans uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone size={13} className="text-champagne-400" />
                  <span>Direct Concierge Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("Opening secure encrypted client portal chat...")}
                  className="w-full py-2.5 px-3 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white text-xs font-sans uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare size={13} className="text-champagne-400" />
                  <span>Encrypted Salon Chat</span>
                </button>
              </div>
            </div>

            {/* CARD 2: Patron Privilege Vault Guarantees */}
            <div className="bg-white border border-hairline-medium rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-hairline-light">
                <Award size={15} className="text-champagne-600" />
                <h4 className="font-serif text-base text-espresso-950 font-normal">
                  Maison Patron Privileges
                </h4>
              </div>

              <ul className="space-y-3 text-xs text-espresso-700 font-sans">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck size={15} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                  <span><strong>100% Insured Armored Courier</strong> dispatched directly to registered residences.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles size={15} className="text-champagne-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Lifetime Ultrasonic Cleansing</strong> and annual claw retensioning at any salon.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Gem size={15} className="text-champagne-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Archival GIA & BIS Dossier</strong> with certified conflict-free ethical provenance.</span>
                </li>
              </ul>
            </div>

            {/* CARD 3: Specially Reserved Creation */}
            <div className="bg-white border border-hairline-medium rounded-xl p-5 shadow-xs">
              <span className="text-[9px] uppercase tracking-[0.24em] text-champagne-600 font-sans block mb-2 font-medium">
                Reserved For Your Collection
              </span>

              <Link to={`/product/${featuredPiece.id}`} className="group flex gap-3.5 items-center">
                <div className="w-16 h-16 rounded-sm overflow-hidden bg-ivory-200 border border-hairline-light flex-shrink-0">
                  <img
                    src={featuredPiece.primaryImage}
                    alt={featuredPiece.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-serif text-sm text-espresso-950 group-hover:text-champagne-600 transition-colors line-clamp-1">
                    {featuredPiece.name}
                  </h5>
                  <p className="text-[11px] text-espresso-500 font-sans line-clamp-1">
                    {featuredPiece.material}
                  </p>
                  <span className="font-serif text-xs text-espresso-950 font-medium">
                    {BRAND_CONFIG.currencySymbol}{featuredPiece.price.toLocaleString()}
                  </span>
                </div>
                <ChevronRight size={16} className="text-espresso-400 group-hover:text-champagne-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
