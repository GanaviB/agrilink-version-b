import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Trash2, ArrowLeft, ShieldCheck, Tag, CreditCard,
  Smartphone, Building, Truck, CheckCircle2, Loader2, AlertCircle, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { useCart } from '../hooks/useCart';
import { useToast } from '../components/ToastProvider';
import { useAuth } from '../hooks/useAuth';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart();
  const { addToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Payment modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking, cod
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Address
  const [deliveryAddress, setDeliveryAddress] = useState(
    'Plot 44, APMC Market Yard, Bengaluru, Karnataka - 560022'
  );

  const discountAmount = Math.round((total * discountPercent) / 100);
  const finalTotal = Math.max(0, total - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AGRI10' || promoCode.trim().toUpperCase() === 'FARM10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      addToast('Promo code applied! 10% discount on entire order.', 'success');
    } else {
      addToast('Invalid promo code. Try "AGRI10" for 10% off demo discount.', 'error');
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      addToast('Order placed successfully direct with farmers!', 'success');
      clearCart();
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/marketplace" className="hover:text-green-600 transition-colors">Marketplace</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Direct Farm Cart</h1>
            <p className="text-sm text-gray-500 mt-1">
              Your produce is sourced fresh from verified agricultural growers.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto my-12">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-sm text-gray-500 mb-6">
              Browse our farmer listings for grains, pulses, fresh vegetables and fruits.
            </p>
            <Link to="/marketplace" className="btn-primary inline-flex">
              Explore Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80'}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        Farmer: {item.farmer || 'Verified Farmer'} • {item.location || 'India'}
                      </p>
                      <p className="text-sm font-semibold text-green-700 mt-1">
                        ₹{item.price} / {item.unit || 'kg'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 self-end sm:self-center">
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 font-bold text-sm min-w-[36px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-base">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1.5 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Delivery Guarantee Info */}
              <div className="bg-green-50/70 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-green-900">
                  <p className="font-bold">AgriLink Direct-Trading Guarantee</p>
                  <p className="mt-0.5 text-green-800">
                    Payment is held in secure demo escrow until you inspect and approve produce quality on delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary & Checkout Card */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

                {/* Promo Code Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Have a promo coupon?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter AGRI10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-1 input-field py-2 text-sm uppercase"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !promoCode}
                      className="btn-secondary py-2 px-4 text-xs font-bold disabled:opacity-50"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm text-gray-600 border-t border-b border-gray-100 py-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-gray-900">₹{total}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700 font-medium">
                      <span>Promo Discount (10%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Farm Transport & Handling</span>
                    <span className="text-green-600 font-semibold">FREE (Demo)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Service Fee</span>
                    <span>₹0.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-bold text-gray-900">Total Payable</span>
                  <span className="text-2xl font-extrabold text-green-700">₹{finalTotal}</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="btn-primary w-full py-4 text-base font-bold shadow-md hover:shadow-xl transition"
                >
                  Proceed to Checkout (Demo)
                </button>

                <p className="text-center text-xs text-gray-400">
                  🔒 Demo mode. No real payment will be charged.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Demo Payment Modal */}
        <Modal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setPaymentSuccess(false);
          }}
          title="AgriLink Demo Checkout"
          size="lg"
        >
          {paymentSuccess ? (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h3>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Your direct farm order totaling <strong>₹{finalTotal}</strong> has been confirmed. Farmers have been notified to prepare the harvest.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    navigate('/orders');
                  }}
                  className="btn-primary py-2.5 px-6 text-sm"
                >
                  View Order Status
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    navigate('/marketplace');
                  }}
                  className="btn-secondary py-2.5 px-6 text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Delivery Address Review */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="input-field text-sm"
                />
              </div>

              {/* Payment Methods Tabs */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Select Demo Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                    { id: 'card', label: 'Cards', icon: CreditCard },
                    { id: 'netbanking', label: 'Net Banking', icon: Building },
                    { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                          paymentMethod === m.id
                            ? 'border-green-600 bg-green-50 text-green-800 font-bold'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method Details */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                {paymentMethod === 'upi' && (
                  <div className="space-y-3 text-center sm:text-left">
                    <p className="text-xs text-gray-500">Scan QR or enter UPI VPA ID:</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Placeholder QR */}
                      <div className="w-24 h-24 bg-white border border-gray-300 rounded-xl p-2 flex items-center justify-center text-center font-mono text-[10px] text-gray-400">
                        [DEMO QR CODE]
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          placeholder="e.g. username@okhdfcbank"
                          defaultValue="buyer@upi"
                          className="input-field text-sm"
                        />
                        <p className="text-[11px] text-gray-400">
                          Supports Google Pay, PhonePe, Paytm, BHIM
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number (Demo: 4242 •••• •••• 4242)"
                      defaultValue="4242 4242 4242 4242"
                      className="input-field text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="input-field text-sm"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="123"
                        className="input-field text-sm"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2">
                    <select className="input-field bg-white text-sm">
                      <option>State Bank of India (SBI)</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Canara Bank</option>
                      <option>Axis Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Truck className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <p className="text-xs">
                      Pay cash upon delivery after inspecting crop freshness and weighing the shipment.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-700">Total to Pay:</span>
                <span className="text-xl font-bold text-green-700">₹{finalTotal}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Confirming Demo Payment...
                  </>
                ) : (
                  `Authorize & Place Order (₹${finalTotal})`
                )}
              </button>
            </div>
          )}
        </Modal>
      </main>

      <Footer />
    </div>
  );
}
