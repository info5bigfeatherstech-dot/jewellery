import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Gift, 
  CreditCard, 
  Lock, 
  Check, 
  ArrowRight, 
  ChevronLeft, 
  Sparkles, 
  ShoppingBag,
  Building,
  Printer
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { BRAND_CONFIG } from '../config/brand';

type CheckoutStep = 'shipping' | 'presentation' | 'payment';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();


  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    title: user?.title || 'M.',
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.addresses[0]?.street || '',
    apartment: '',
    city: user?.addresses[0]?.city || '',
    state: user?.addresses[0]?.state || 'NY',
    zip: user?.addresses[0]?.zip || '',
    country: 'United States',
    deliveryMethod: 'armored-courier',
    boutiquePickup: 'new-york',
    giftBox: true,
    giftMessage: '',
    discreetPackaging: true,
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••',
    promoCode: '',
  });

  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.promoCode.trim().toUpperCase() === 'AURELIA10') {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else {
      alert("Please enter a valid salon invitation code (e.g., AURELIA10 for 10% privilege).");
    }
  };

  const finalTotal = Math.max(0, subtotal - discount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.primaryImage,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
      }));

      const orderId = addOrder({
        items: orderItems,
        total: finalTotal,
        status: 'In Atelier Crafting',
      });

      clearCart();
      setIsProcessing(false);
      setCompletedOrderId(orderId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  // If order is completed successfully, render celebration receipt screen
  if (completedOrderId) {
    return (
      <div className="min-h-screen bg-ivory-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-ivory-50 border border-hairline shadow-elevated p-8 sm:p-14 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-champagne-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Check size={32} />
            </div>

            <span className="font-script text-3xl sm:text-4xl text-champagne-600 italic block mb-2">
              Compliments of the Maison
            </span>
            <span className="text-[10px] uppercase tracking-super-lux text-espresso-600 font-sans block mb-3">
              Acquisition Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso-950 font-light mb-4">
              Thank You for Your Trust
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600 font-sans max-w-lg mx-auto leading-relaxed mb-8">
              Your acquisition has been entered into the Aurelia registry under reference <span className="font-semibold text-espresso-950">{completedOrderId}</span>. A master goldsmith will inspect your pieces before armored dispatch.
            </p>

            <div className="bg-ivory-200/50 p-6 border border-hairline text-left space-y-3 mb-8 text-xs font-sans text-espresso-800">
              <div className="flex justify-between border-b border-hairline-light pb-2">
                <span className="text-espresso-500">Registry Reference:</span>
                <span className="font-mono font-medium text-espresso-950">{completedOrderId}</span>
              </div>
              <div className="flex justify-between border-b border-hairline-light pb-2">
                <span className="text-espresso-500">Delivery Status:</span>
                <span className="text-emerald-800 font-medium">In Atelier Crafting & Cleansing</span>
              </div>
              <div className="flex justify-between border-b border-hairline-light pb-2">
                <span className="text-espresso-500">Courier Transit:</span>
                <span>Armored White Glove (Malca-Amit Insured)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso-500">Total Settled:</span>
                <span className="font-serif text-base text-champagne-700 font-semibold">{BRAND_CONFIG.currencySymbol}{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/profile"
                className="w-full sm:w-auto py-3.5 px-8 bg-espresso-900 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest text-xs font-medium"
              >
                View in Patron Dossier
              </Link>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto py-3.5 px-8 bg-ivory-200 text-espresso-900 border border-hairline-medium hover:border-champagne-500 transition-colors uppercase tracking-widest text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Official Receipt</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-ivory-100 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center bg-ivory-50 p-10 border border-hairline shadow-subtle">
          <ShoppingBag size={36} className="mx-auto text-champagne-500 mb-4" />
          <span className="font-script text-3xl text-champagne-600 block mb-2 italic">
            Your Salon Bag
          </span>
          <h2 className="font-serif text-3xl text-espresso-950 mb-3 font-light">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-espresso-600 font-sans mb-8 leading-relaxed">
            You have not selected any fine jewelry creations yet. Discover our iconic solitaires, rivières, and cuffs.
          </p>
          <Link
            to="/shop"
            className="w-full py-3.5 bg-espresso-900 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest text-xs font-medium inline-block"
          >
            Explore Fine Creations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory-100 min-h-screen pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Checkout Header */}
        <div className="text-center pt-6 pb-10 border-b border-hairline-light">
          <span className="font-script text-3xl text-champagne-600 italic block mb-1">
            Private Acquisition
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso-950 font-light">
            Maison Checkout
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs text-espresso-500 mt-2 font-sans">
            <Lock size={12} className="text-champagne-600" />
            <span>256-Bit SSL Armored Encryption</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-6 sm:gap-12 my-8 text-xs font-sans uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setStep('shipping')}
            className={`flex items-center gap-2 pb-1 border-b-2 transition-colors cursor-pointer ${
              step === 'shipping' ? 'border-champagne-600 text-espresso-950 font-medium' : 'border-transparent text-espresso-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">1</span>
            <span>Delivery</span>
          </button>

          <span className="text-espresso-300">•</span>

          <button
            type="button"
            onClick={() => setStep('presentation')}
            className={`flex items-center gap-2 pb-1 border-b-2 transition-colors cursor-pointer ${
              step === 'presentation' ? 'border-champagne-600 text-espresso-950 font-medium' : 'border-transparent text-espresso-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">2</span>
            <span>Presentation</span>
          </button>

          <span className="text-espresso-300">•</span>

          <button
            type="button"
            onClick={() => setStep('payment')}
            className={`flex items-center gap-2 pb-1 border-b-2 transition-colors cursor-pointer ${
              step === 'payment' ? 'border-champagne-600 text-espresso-950 font-medium' : 'border-transparent text-espresso-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">3</span>
            <span>Settlement</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-ivory-50 p-4 sm:p-8 lg:p-10 border border-hairline shadow-subtle">
            
            {/* STEP 1: SHIPPING */}
            {step === 'shipping' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-espresso-950 font-normal mb-1">
                    Delivery Destination
                  </h3>
                  <p className="text-xs text-espresso-600 font-sans">
                    Insured armored transit requiring recipient confirmation.
                  </p>
                </div>

                {/* Delivery Method Choice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.deliveryMethod === 'armored-courier'
                        ? 'border-champagne-500 bg-champagne-50/50'
                        : 'border-hairline bg-ivory-100 hover:border-champagne-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="armored-courier"
                        checked={formData.deliveryMethod === 'armored-courier'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'armored-courier' })}
                        className="accent-champagne-600"
                      />
                      <Truck size={16} className="text-champagne-600" />
                      <span className="font-serif text-sm text-espresso-950">Armored Courier</span>
                    </div>
                    <p className="text-[11px] text-espresso-600 pl-6">
                      Direct to your private residence. Fully insured.
                    </p>
                    <span className="text-[10px] text-emerald-800 uppercase tracking-widest pl-6 mt-2 font-medium">
                      Complimentary ($0.00)
                    </span>
                  </label>

                  <label
                    className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.deliveryMethod === 'boutique-pickup'
                        ? 'border-champagne-500 bg-champagne-50/50'
                        : 'border-hairline bg-ivory-100 hover:border-champagne-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="boutique-pickup"
                        checked={formData.deliveryMethod === 'boutique-pickup'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'boutique-pickup' })}
                        className="accent-champagne-600"
                      />
                      <Building size={16} className="text-champagne-600" />
                      <span className="font-serif text-sm text-espresso-950">Boutique Salon Pickup</span>
                    </div>
                    <p className="text-[11px] text-espresso-600 pl-6">
                      Private vault reception with champagne service.
                    </p>
                    <span className="text-[10px] text-emerald-800 uppercase tracking-widest pl-6 mt-2 font-medium">
                      Complimentary ($0.00)
                    </span>
                  </label>
                </div>

                {formData.deliveryMethod === 'boutique-pickup' ? (
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1.5 font-sans">
                      Select Flagship Boutique
                    </label>
                    <select
                      value={formData.boutiquePickup}
                      onChange={e => setFormData({ ...formData, boutiquePickup: e.target.value })}
                      className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-950 focus:outline-none focus:border-champagne-500"
                    >
                      <option value="new-york">Madison Avenue Flagship (New York, NY)</option>
                      <option value="paris">Place Vendôme Salon (Paris, France)</option>
                      <option value="london">New Bond Street Mansion (London, UK)</option>
                    </select>
                  </div>
                ) : (
                  /* Address Fields */
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          Email (For Tracking & Dossier) *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          Direct Phone (Required for Courier) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. 740 Park Avenue"
                        className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={e => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.zip}
                          onChange={e => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep('presentation')}
                  className="w-full py-4 bg-espresso-900 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest-lux text-xs font-medium cursor-pointer shadow-md flex items-center justify-center gap-2 mt-6"
                >
                  <span>Continue to Bespoke Presentation</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {/* STEP 2: PRESENTATION */}
            {step === 'presentation' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-espresso-950 font-normal mb-1">
                    Bespoke Presentation & Gift Wrap
                  </h3>
                  <p className="text-xs text-espresso-600 font-sans">
                    Each creation is hand-bound with silk ribbon and velvet casing.
                  </p>
                </div>

                <div className="p-6 bg-ivory-200/50 border border-hairline space-y-4">
                  <div className="flex items-start gap-4">
                    <Gift size={22} className="text-champagne-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif text-lg text-espresso-950 font-normal">
                        Signature Midnight Velvet & Silk Ribbon
                      </h4>
                      <p className="text-xs text-espresso-600 font-light mt-0.5">
                        Delivered in our signature heavy wooden lacquer box lined with cream velvet, sealed with hand-tied golden silk ribbon.
                      </p>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-medium block mt-1">
                        Complimentary Gift Presentation Included
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1.5 font-sans">
                    Personal Calligraphed Parchment Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.giftMessage}
                    onChange={e => setFormData({ ...formData, giftMessage: e.target.value })}
                    placeholder="Enter your personal sentiment to be inscribed by our resident calligrapher on handmade French cotton cardstock..."
                    className="w-full bg-ivory-100 border border-hairline-medium p-3 text-xs text-espresso-900 focus:outline-none focus:border-champagne-500"
                  />
                </div>

                <div className="p-4 bg-ivory-100 border border-hairline-light">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.discreetPackaging}
                      onChange={e => setFormData({ ...formData, discreetPackaging: e.target.checked })}
                      className="accent-champagne-600"
                    />
                    <div>
                      <span className="font-serif text-sm text-espresso-950 block">Discreet Armored Packaging</span>
                      <span className="text-[11px] text-espresso-600">No logos or brand hallmarks on the outer carton for complete transit security.</span>
                    </div>
                  </label>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="py-3.5 sm:py-4 px-6 border border-hairline-medium text-espresso-700 hover:text-espresso-950 text-xs uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="flex-1 py-3.5 sm:py-4 bg-espresso-900 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest-lux text-xs font-medium cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Settlement</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PAYMENT & SETTLEMENT */}
            {step === 'payment' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-espresso-950 font-normal mb-1">
                    Settlement & Security
                  </h3>
                  <p className="text-xs text-espresso-600 font-sans">
                    All transactions are protected by bank-grade 256-bit encryption.
                  </p>
                </div>

                {/* Payment Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`p-4 border cursor-pointer flex items-center gap-3 ${
                      formData.paymentMethod === 'card'
                        ? 'border-champagne-500 bg-champagne-50/50'
                        : 'border-hairline bg-ivory-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-champagne-600"
                    />
                    <CreditCard size={18} className="text-champagne-600" />
                    <span className="font-serif text-sm text-espresso-950">Payment Card</span>
                  </label>

                  <label
                    className={`p-4 border cursor-pointer flex items-center gap-3 ${
                      formData.paymentMethod === 'wire'
                        ? 'border-champagne-500 bg-champagne-50/50'
                        : 'border-hairline bg-ivory-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wire"
                      checked={formData.paymentMethod === 'wire'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                      className="accent-champagne-600"
                    />
                    <Building size={18} className="text-champagne-600" />
                    <span className="font-serif text-sm text-espresso-950">Private Wire</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' ? (
                  <div className="space-y-4 p-5 bg-ivory-100 border border-hairline">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={e => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-espresso-700 mb-1 font-sans">
                          Security Code (CVC)
                        </label>
                        <input
                          type="password"
                          value={formData.cardCvc}
                          onChange={e => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-ivory-50 border border-hairline-medium p-3 text-xs text-espresso-900 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-ivory-100 border border-hairline-gold text-xs text-espresso-700 space-y-2">
                    <p className="font-serif text-base text-espresso-950">High Jewelry Wire Instructions</p>
                    <p>Our client treasury department will transmit official authenticated SWIFT/IBAN wire instructions upon order placement. Your piece will be reserved in the atelier vault for five business days.</p>
                  </div>
                )}

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('presentation')}
                    className="py-3.5 sm:py-4 px-6 border border-hairline-medium text-espresso-700 hover:text-espresso-950 text-xs uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-3.5 sm:py-4 bg-espresso-900 text-white hover:bg-champagne-600 transition-colors uppercase tracking-widest-lux text-xs font-medium cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles size={14} className="animate-spin text-champagne-400" />
                        <span>Securing Acquisition...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span>Authorize Acquisition ({BRAND_CONFIG.currencySymbol}{finalTotal.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-ivory-50 p-6 sm:p-8 border border-hairline shadow-subtle sticky top-24">
            <h3 className="font-serif text-xl text-espresso-950 font-normal pb-4 border-b border-hairline-light mb-4">
              Acquisition Summary ({cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'})
            </h3>

            {/* Items list */}
            <div className="divide-y divide-hairline-light max-h-80 overflow-y-auto pr-2 no-scrollbar">
              {cart.map(item => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="py-3 flex items-center gap-3.5">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-14 h-16 object-cover border border-hairline-light bg-ivory-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-sm text-espresso-950 truncate">
                      {item.product.name}
                    </h5>
                    {item.selectedSize && (
                      <p className="text-[10px] text-espresso-500 font-sans">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-xs text-espresso-600 font-sans mt-0.5">
                      Qty: {item.quantity} • {BRAND_CONFIG.currencySymbol}{item.product.price.toLocaleString()}
                    </p>
                  </div>
                  <span className="font-serif text-sm text-espresso-950 font-medium">
                    {BRAND_CONFIG.currencySymbol}{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Voucher Code Form */}
            <form onSubmit={handleApplyPromo} className="pt-4 border-t border-hairline-light mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Privilege Code (try AURELIA10)"
                  value={formData.promoCode}
                  onChange={e => setFormData({ ...formData, promoCode: e.target.value })}
                  className="flex-1 bg-ivory-100 border border-hairline-medium p-2 text-xs text-espresso-900 focus:outline-none uppercase"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-espresso-900 text-white hover:bg-champagne-600 text-[10px] uppercase tracking-widest cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[10px] text-emerald-800 mt-1 font-sans">
                  ✓ 10% Inaugural Privilege Applied
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 text-xs font-sans text-espresso-700 border-t border-hairline-light mt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{BRAND_CONFIG.currencySymbol}{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Concession</span>
                  <span>-{BRAND_CONFIG.currencySymbol}{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>White-Glove Armored Courier</span>
                <span className="text-emerald-800 uppercase font-medium tracking-wider">Complimentary</span>
              </div>

              <div className="flex justify-between">
                <span>Silk Ribbon Gift Box</span>
                <span className="text-emerald-800 uppercase font-medium tracking-wider">Included</span>
              </div>

              <div className="flex justify-between border-t border-hairline pt-3 font-serif text-lg text-espresso-950 font-semibold">
                <span>Total Settlement</span>
                <span className="text-champagne-700">{BRAND_CONFIG.currencySymbol}{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="mt-6 pt-4 border-t border-hairline-light text-[10px] text-espresso-500 space-y-1">
              <div className="flex items-center gap-1.5 text-champagne-700">
                <ShieldCheck size={14} />
                <span className="uppercase tracking-widest font-medium">GIA Certified • Conflict Free</span>
              </div>
              <p>Each acquisition includes official GIA Diamond Dossier & Aurelia Certificate of Origin.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
