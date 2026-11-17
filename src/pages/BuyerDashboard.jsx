import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, ShoppingCart, User, Search,
  MapPin, Clock, CheckCircle2, ChevronRight, Eye, Trash2, Heart,
  Package, IndianRupee, ShieldCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CropCard from '../components/CropCard';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import crops from '../data/crops';
import { SAMPLE_ORDERS } from '../data/orders';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ToastProvider';

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview, browse, orders, cart, profile
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter crops for the in-dashboard browse tab
  const filteredCrops = crops.filter((crop) => {
    const matchCat = selectedCategory === 'All' || crop.category === selectedCategory;
    const matchQuery =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const categories = ['All', 'Rice', 'Wheat', 'Maize', 'Vegetables', 'Fruits', 'Pulses'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Buyer Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-green-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-2xl font-bold">
              🛒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{user?.name || 'Ananya Sharma'}</h1>
                <span className="bg-blue-400 text-blue-950 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  Verified Buyer
                </span>
              </div>
              <p className="text-blue-100 text-sm mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {user?.location || 'Bengaluru, Karnataka'} • Direct Farm Buyer
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/marketplace"
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-5 py-3 rounded-2xl shadow transition text-sm flex items-center gap-2"
            >
              Explore Full Marketplace <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'browse', label: 'Browse Crops', icon: Search },
            { id: 'orders', label: `My Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'cart', label: `My Cart (${itemCount})`, icon: ShoppingCart },
            { id: 'profile', label: 'Buyer Profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  active
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── TAB 1: OVERVIEW ────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
                  <span className="text-xs text-green-600 mt-1 block">All completed smoothly</span>
                </div>
                <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold">Total Purchases</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₹18,450</p>
                  <span className="text-xs text-green-600 mt-1 block">Saved ~₹3,200 vs APMC</span>
                </div>
                <div className="p-3 bg-green-50 text-green-700 rounded-2xl">
                  <IndianRupee className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold">Cart Items</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{itemCount} items</p>
                  <span className="text-xs text-gray-500 mt-1 block">₹{total} subtotal</span>
                </div>
                <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold">Active Delivery</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1 In Transit</p>
                  <span className="text-xs text-blue-600 mt-1 block">Arrival tomorrow</span>
                </div>
                <div className="p-3 bg-purple-50 text-purple-700 rounded-2xl">
                  <Package className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Featured Fresh Harvests */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Recommended Fresh Harvests</h3>
                  <p className="text-xs text-gray-500">Directly from farms in your zone</p>
                </div>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="text-sm font-semibold text-green-700 hover:underline"
                >
                  Browse All →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {crops.slice(0, 3).map((crop) => (
                  <CropCard
                    key={crop.id}
                    crop={crop}
                    onAddToCart={() => {
                      navigate(`/marketplace/${crop.id}`);
                    }}
                    onViewDetails={() => navigate(`/marketplace/${crop.id}`)}
                  />
                ))}
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-sm font-semibold text-green-700 hover:underline"
                >
                  View Order History →
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 3).map((o) => (
                  <div
                    key={o.id}
                    className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{o.cropName}</p>
                      <p className="text-xs text-gray-500">
                        Farmer: {o.farmer} • {o.quantity} kg • Total ₹{o.total}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge color={o.status === 'Delivered' ? 'green' : 'blue'}>{o.status}</Badge>
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="text-xs font-semibold text-green-700 hover:underline"
                      >
                        Track
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: BROWSE CROPS ────────────────────────────────────────── */}
        {activeTab === 'browse' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search & Filter Header */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by crop name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCrops.map((crop) => (
                <CropCard
                  key={crop.id}
                  crop={crop}
                  onAddToCart={() => navigate(`/marketplace/${crop.id}`)}
                  onViewDetails={() => navigate(`/marketplace/${crop.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 3: ORDERS ──────────────────────────────────────────────── */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order History</h2>
              <p className="text-sm text-gray-500">Track and view all your farm-direct produce orders.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {orders.map((o) => (
                <div key={o.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-400">{o.id}</span>
                    <Badge color={o.status === 'Delivered' ? 'green' : 'blue'}>{o.status}</Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{o.cropName}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Farmer: {o.farmer} • Date: {o.date}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-2xl text-center text-xs">
                    <div>
                      <span className="text-gray-400 block">Quantity</span>
                      <span className="font-bold text-gray-800">{o.quantity} kg</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Unit Price</span>
                      <span className="font-bold text-gray-800">₹{o.price}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Total</span>
                      <span className="font-bold text-green-700">₹{o.total}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-gray-400">Tracking: {o.trackingId}</span>
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="btn-secondary text-xs py-2 px-4"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 4: CART ────────────────────────────────────────────────── */}
        {activeTab === 'cart' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Shopping Cart</h2>
                <p className="text-sm text-gray-500">{itemCount} items in cart</p>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mb-6">Explore the marketplace for fresh crops direct from farmers.</p>
                <Link to="/marketplace" className="btn-primary">
                  Browse Marketplace
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80'}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">₹{item.price} / {item.unit || 'kg'}</p>
                          <p className="text-xs font-semibold text-green-700 mt-1">
                            Subtotal: ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1.5 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1.5 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1.5 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Summary Card */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit space-y-4">
                  <h3 className="font-bold text-gray-900 text-base">Order Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600 border-b border-gray-100 pb-4">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-gray-900">₹{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Direct Farmer Delivery</span>
                      <span className="text-green-600 font-semibold">FREE (Demo)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee</span>
                      <span>₹0 (Fair Trade)</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
                    <span>Total Amount</span>
                    <span className="text-green-700 text-xl">₹{total}</span>
                  </div>
                  <Link
                    to="/cart"
                    className="btn-primary w-full py-3.5 block text-center mt-4"
                  >
                    Proceed to Demo Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 5: PROFILE ─────────────────────────────────────────────── */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm animate-fade-in space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Buyer Profile</h2>
              <p className="text-sm text-gray-500">Manage your delivery destination and contact info.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company / Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || 'Ananya Sharma'}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email || 'buyer@agrilink.in'}
                    className="input-field"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    defaultValue="+91 91234 56789"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Default Delivery Warehouse / Address
                </label>
                <input
                  type="text"
                  defaultValue="Plot 44, APMC Yard, Yeshwanthpur, Bengaluru, Karnataka - 560022"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Buyer Type</label>
                <select className="input-field bg-white" defaultValue="Wholesaler">
                  <option value="Individual">Individual Consumer</option>
                  <option value="Retailer">Retail Store Owner</option>
                  <option value="Wholesaler">Mandi Wholesaler</option>
                  <option value="Restaurant">Restaurant / Hotel Chain</option>
                  <option value="FoodProcessor">Food Processing Unit</option>
                </select>
              </div>

              <button
                onClick={() => addToast('Buyer profile details updated!', 'success')}
                className="btn-primary w-full py-3.5 mt-4"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Order Tracking Modal */}
        {selectedOrder && (
          <Modal
            isOpen={!!selectedOrder}
            onClose={() => setSelectedOrder(null)}
            title={`Order Tracking: ${selectedOrder.id}`}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold text-gray-900">{selectedOrder.cropName}</p>
                  <p className="text-xs text-gray-500">Farmer: {selectedOrder.farmer} • ₹{selectedOrder.total}</p>
                </div>
                <Badge color="green" size="md">{selectedOrder.status}</Badge>
              </div>

              {/* Stepper */}
              <div className="space-y-4">
                {[
                  { step: 'Pending', label: 'Order Confirmed', desc: 'Farmer notified of purchase order' },
                  { step: 'Confirmed', label: 'Harvest Packed', desc: 'Quality checked and loaded' },
                  { step: 'In Transit', label: 'En Route', desc: 'Vehicle PB-10-EF-9012 dispatched' },
                  { step: 'Delivered', label: 'Delivered', desc: 'Received at destination warehouse' },
                ].map((s, idx) => {
                  const stepIndex = ['Pending', 'Confirmed', 'In Transit', 'Delivered'].indexOf(selectedOrder.status);
                  const isDone = idx <= stepIndex;
                  return (
                    <div key={s.step} className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                          isDone ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                          {s.label}
                        </p>
                        <p className="text-xs text-gray-400">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal>
        )}
      </main>

      <Footer />
    </div>
  );
}
