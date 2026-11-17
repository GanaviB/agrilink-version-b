import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Sprout, PlusCircle, ShoppingBag, User, Settings,
  TrendingUp, IndianRupee, Package, CheckCircle2, Clock, AlertCircle,
  Trash2, Edit3, Eye, ShieldCheck, MapPin, Phone, Mail, Check, X,
  ChevronRight, ArrowUpRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ToastProvider';
import { SAMPLE_ORDERS } from '../data/orders';
import crops from '../data/crops';

const INITIAL_MY_CROPS = [
  {
    id: 1,
    name: 'Basmati Rice (Organic)',
    category: 'Rice',
    price: 68,
    unit: 'kg',
    quantity: 450,
    location: 'Dharwad, Karnataka',
    status: 'Active',
    harvestDate: '2026-10-15',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    views: 340,
    ordersCount: 14,
  },
  {
    id: 2,
    name: 'Hybrid Sweet Corn',
    category: 'Maize',
    price: 32,
    unit: 'kg',
    quantity: 800,
    location: 'Dharwad, Karnataka',
    status: 'Active',
    harvestDate: '2026-10-20',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80',
    views: 215,
    ordersCount: 8,
  },
  {
    id: 3,
    name: 'Fresh Red Tomatoes',
    category: 'Vegetables',
    price: 24,
    unit: 'kg',
    quantity: 120,
    location: 'Dharwad, Karnataka',
    status: 'Active',
    harvestDate: '2026-11-05',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80',
    views: 520,
    ordersCount: 22,
  },
  {
    id: 4,
    name: 'Kashmiri Apples',
    category: 'Fruits',
    price: 110,
    unit: 'kg',
    quantity: 0,
    location: 'Dharwad, Karnataka',
    status: 'Sold Out',
    harvestDate: '2026-09-10',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80',
    views: 410,
    ordersCount: 19,
  },
];

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // overview, my-crops, add-crop, orders, profile
  const [cropsList, setCropsList] = useState(() => {
    try {
      const stored = localStorage.getItem('agrilink_my_crops');
      return stored ? JSON.parse(stored) : INITIAL_MY_CROPS;
    } catch {
      return INITIAL_MY_CROPS;
    }
  });

  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingCrop, setEditingCrop] = useState(null);

  // New crop form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables',
    price: '',
    quantity: '',
    unit: 'kg',
    location: user?.location || 'Karnataka, India',
    description: '',
    organic: false,
    image: '',
  });

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Raju Patil',
    phone: user?.phone || '+91 98765 43210',
    location: user?.location || 'Dharwad, Karnataka',
    farmSize: user?.farmSize || '12 Acres',
    experience: user?.experience || '15 Years',
    bio: 'Dedicated organic farmer cultivating paddy, millets and vegetables using sustainable techniques for over 15 years.',
  });

  useEffect(() => {
    localStorage.setItem('agrilink_my_crops', JSON.stringify(cropsList));
  }, [cropsList]);

  const handleAddCropSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) {
      addToast('Please fill in required crop name, price and quantity.', 'error');
      return;
    }

    const newCrop = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      unit: formData.unit,
      location: formData.location,
      description: formData.description,
      organic: formData.organic,
      status: 'Active',
      harvestDate: new Date().toISOString().split('T')[0],
      image: formData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
      views: 0,
      ordersCount: 0,
    };

    setCropsList([newCrop, ...cropsList]);
    addToast('Crop listed successfully on marketplace!', 'success');
    setFormData({
      name: '',
      category: 'Vegetables',
      price: '',
      quantity: '',
      unit: 'kg',
      location: user?.location || 'Karnataka, India',
      description: '',
      organic: false,
      image: '',
    });
    setActiveTab('my-crops');
  };

  const handleDeleteCrop = (id) => {
    setCropsList((prev) => prev.filter((c) => c.id !== id));
    addToast('Crop removed from your listings.', 'info');
  };

  const handleToggleStatus = (id) => {
    setCropsList((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
      )
    );
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(`Order ${orderId} marked as ${newStatus}`, 'success');
    if (selectedOrder) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Stats calculation
  const totalListings = cropsList.length;
  const activeListings = cropsList.filter((c) => c.status === 'Active').length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Farmer Header Banner */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-2xl font-bold">
              🧑‍🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <span className="bg-green-400 text-green-950 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  Verified Farmer
                </span>
              </div>
              <p className="text-green-100 text-sm mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {profileData.location} • {profileData.farmSize}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('add-crop')}
            className="bg-white text-green-800 hover:bg-green-50 font-bold px-5 py-3 rounded-2xl shadow transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <PlusCircle className="w-5 h-5 text-green-700" />
            Add New Crop
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'my-crops', label: `My Crops (${cropsList.length})`, icon: Sprout },
            { id: 'add-crop', label: 'Add Crop', icon: PlusCircle },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'profile', label: 'Farm Profile', icon: User },
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
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-0.5 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +18.4% this month
                  </span>
                </div>
                <div className="p-3 bg-green-50 text-green-700 rounded-2xl">
                  <IndianRupee className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{activeListings} / {totalListings}</p>
                  <span className="text-xs text-gray-500 mt-1 block">Live on marketplace</span>
                </div>
                <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl">
                  <Sprout className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold">Sample Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{totalOrders}</p>
                  <span className="text-xs font-semibold text-amber-600 mt-1 block">
                    {orders.filter((o) => o.status === 'Pending').length} pending dispatch
                  </span>
                </div>
                <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold">Farmer Rating</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">4.8 / 5.0</p>
                  <span className="text-xs text-gray-500 mt-1 block">98% positive reviews</span>
                </div>
                <div className="p-3 bg-purple-50 text-purple-700 rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Middle Section: Revenue Graph + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Monthly Sales (₹ in Thousands)</h3>
                    <p className="text-xs text-gray-500">Demo sales statistics for last 6 months</p>
                  </div>
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    2026 Season
                  </span>
                </div>
                {/* SVG Bar Chart */}
                <div className="h-56 flex items-end justify-between gap-3 pt-6 border-b border-gray-200 px-2">
                  {[
                    { month: 'Jun', val: 32, max: 60 },
                    { month: 'Jul', val: 45, max: 60 },
                    { month: 'Aug', val: 38, max: 60 },
                    { month: 'Sep', val: 54, max: 60 },
                    { month: 'Oct', val: 62, max: 60 },
                    { month: 'Nov', val: 58, max: 60 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-xs font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{bar.val}k
                      </span>
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-xl group-hover:from-green-700 group-hover:to-green-500 transition-all duration-300"
                        style={{ height: `${(bar.val / bar.max) * 85}%` }}
                      />
                      <span className="text-xs font-medium text-gray-500">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions & Tips */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Farmer AI Tools</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Leverage our prototype smart agriculture tools to optimize farm yields and pricing.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="/ai"
                      className="block p-3 rounded-2xl bg-green-50/70 border border-green-100 hover:bg-green-100 transition text-sm font-semibold text-green-900"
                    >
                      🌱 Crop Care Chatbot
                      <span className="block text-xs font-normal text-gray-500 mt-0.5">
                        Ask questions on pest control and sowing
                      </span>
                    </a>
                    <a
                      href="/ai"
                      className="block p-3 rounded-2xl bg-blue-50/70 border border-blue-100 hover:bg-blue-100 transition text-sm font-semibold text-blue-900"
                    >
                      🌿 Leaf Disease Scanner
                      <span className="block text-xs font-normal text-gray-500 mt-0.5">
                        Upload plant photos for instant diagnosis
                      </span>
                    </a>
                    <a
                      href="/ai"
                      className="block p-3 rounded-2xl bg-amber-50/70 border border-amber-100 hover:bg-amber-100 transition text-sm font-semibold text-amber-900"
                    >
                      🧪 Soil Health Analyzer
                      <span className="block text-xs font-normal text-gray-500 mt-0.5">
                        Input N-P-K & pH values for fertilizer tips
                      </span>
                    </a>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
                  Prototype agricultural features powered by demo intelligence.
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-sm font-semibold text-green-700 hover:underline"
                >
                  View All Orders →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Crop</th>
                      <th className="py-3 px-4">Quantity</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Buyer</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.slice(0, 4).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-mono font-medium text-xs">{order.id}</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">{order.cropName}</td>
                        <td className="py-3 px-4">{order.quantity} kg</td>
                        <td className="py-3 px-4 font-bold text-green-700">₹{order.total}</td>
                        <td className="py-3 px-4 text-gray-600">{order.buyer}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'In Transit'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'Confirmed'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-xs text-green-700 font-semibold hover:underline"
                          >
                            Track & Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: MY CROPS ────────────────────────────────────────────── */}
        {activeTab === 'my-crops' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Manage Crop Listings</h2>
                <p className="text-sm text-gray-500">
                  Update quantities, pause listings, or modify pricing in real time.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('add-crop')}
                className="btn-primary flex items-center gap-2 text-sm self-start"
              >
                <PlusCircle className="w-4 h-4" /> Add Another Crop
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cropsList.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="relative h-44 bg-gray-100">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold shadow ${
                          c.status === 'Active'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-bold text-green-700 shadow">
                      ₹{c.price}/{c.unit || 'kg'}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{c.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-green-600" /> {c.location}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-gray-50 p-2.5 rounded-xl">
                        <div>
                          <span className="text-gray-400 block">Stock Qty</span>
                          <span className="font-bold text-gray-800">{c.quantity} {c.unit}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Category</span>
                          <span className="font-bold text-gray-800">{c.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-5 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleToggleStatus(c.id)}
                        className="flex-1 text-xs font-medium py-2 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                      >
                        {c.status === 'Active' ? 'Pause Listing' : 'Make Active'}
                      </button>
                      <button
                        onClick={() => handleDeleteCrop(c.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                        title="Delete Crop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 3: ADD CROP ────────────────────────────────────────────── */}
        {activeTab === 'add-crop' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">List a New Crop</h2>
              <p className="text-sm text-gray-500">
                Connect directly with thousands of buyers across the country. All data is demo persisted.
              </p>
            </div>

            <form onSubmit={handleAddCropSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Crop Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sona Masoori Rice, Fresh Tomatoes"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field bg-white"
                  >
                    <option value="Rice">Rice</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Maize">Maize</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Spices">Spices</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Price per Unit (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 55"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Available Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Unit
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="input-field bg-white"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="quintal">Quintal</option>
                    <option value="ton">Ton</option>
                    <option value="box">Box / Crate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Farm Location (City / District, State)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dharwad, Karnataka"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Image URL (or use default agriculture photo)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description & Quality Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe your harvest, grade, soil condition, or freshness..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-200">
                <input
                  type="checkbox"
                  id="organic-check"
                  checked={formData.organic}
                  onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <label htmlFor="organic-check" className="text-sm text-green-900 font-medium cursor-pointer">
                  This crop is organically grown without synthetic chemical pesticides
                </label>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1 py-3.5">
                  Publish Crop Listing
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('my-crops')}
                  className="btn-outline py-3.5 px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── TAB 4: ORDERS ──────────────────────────────────────────────── */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Orders Received</h2>
              <p className="text-sm text-gray-500">
                Track pending dispatches, accept orders, and keep buyers informed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-gray-500">{o.id}</span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold ${
                          o.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : o.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-800'
                            : o.status === 'Confirmed'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">{o.cropName}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Buyer: <span className="font-semibold">{o.buyer}</span>
                    </p>

                    <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-gray-50 rounded-2xl text-center text-xs">
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
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Date: {o.date}</span>
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="btn-secondary text-xs py-2 px-4"
                    >
                      View Tracking & Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 5: PROFILE ─────────────────────────────────────────────── */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Farmer Profile Settings</h2>
            <p className="text-sm text-gray-500 mb-6">
              Update your farm information and contact details shown to buyers.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Farm Land Size</label>
                  <input
                    type="text"
                    value={profileData.farmSize}
                    onChange={(e) => setProfileData({ ...profileData, farmSize: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Farming Experience</label>
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Farm Bio</label>
                <textarea
                  rows="3"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="input-field"
                />
              </div>

              <button
                onClick={() => addToast('Farmer profile saved successfully!', 'success')}
                className="btn-primary w-full py-3.5 mt-4"
              >
                Save Profile Changes
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
                  <p className="text-xs text-gray-500">{selectedOrder.quantity} kg • Total ₹{selectedOrder.total}</p>
                </div>
                <Badge color="green" size="md">{selectedOrder.status}</Badge>
              </div>

              {/* Stepper */}
              <div className="space-y-4">
                {[
                  { step: 'Pending', label: 'Order Placed', desc: 'Customer placed order online' },
                  { step: 'Confirmed', label: 'Confirmed by Farmer', desc: 'Harvest inspected and bagged' },
                  { step: 'In Transit', label: 'Dispatched with Transporter', desc: 'Assigned to local transport route' },
                  { step: 'Delivered', label: 'Delivered Successfully', desc: 'Received at buyer destination' },
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

              {/* Status Update Buttons */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Update Order Status:</p>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Confirmed', 'In Transit', 'Delivered'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, st)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${
                        selectedOrder.status === st
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      Mark as {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <Footer />
    </div>
  );
}
