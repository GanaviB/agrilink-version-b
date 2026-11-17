import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, ChevronLeft, ChevronRight,
  Leaf, Grid3X3, List, ArrowUpDown, Package
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CropCard from '../components/CropCard';
import crops from '../data/crops';
import { CATEGORIES } from '../data/categories';

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-9 bg-gray-200 rounded-xl" />
          <div className="w-20 h-9 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────
function FilterPanel({ priceRange, setPriceRange, isOrganic, setIsOrganic, onClear }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Filters</h3>
        <button onClick={onClear} className="text-xs text-green-600 hover:underline">Clear all</button>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Price Range (₹/kg)</p>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={500}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-green-600"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Organic Toggle */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Certification</p>
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => setIsOrganic(v => !v)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${isOrganic ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isOrganic ? 'translate-x-5' : ''}`}
            />
          </div>
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <Leaf className="w-4 h-4 text-green-500" /> Organic Only
          </span>
        </label>
      </div>

      {/* Availability */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Availability</p>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" className="accent-green-600" defaultChecked /> In Stock Only
        </label>
      </div>
    </div>
  );
}

// ─── Quick View Modal ─────────────────────────────────────────────────────────
function QuickViewModal({ crop, onClose }) {
  if (!crop) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-64 object-cover rounded-t-2xl"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80'; }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow hover:bg-white transition"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          {crop.organic && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
              <Leaf className="w-3 h-3" /> Organic
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">{crop.name}</h2>
            <span className="text-2xl font-bold text-green-600">₹{crop.price}<span className="text-sm font-normal text-gray-500">/{crop.unit || 'kg'}</span></span>
          </div>
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full mb-3">{crop.category}</span>
          <p className="text-sm text-gray-600 mb-4">{crop.description}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span>🧑‍🌾 {crop.farmer}</span>
            <span>📍 {crop.location}</span>
            <span>📦 {crop.quantity} {crop.unit || 'kg'} available</span>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/marketplace/${crop.id}`}
              onClick={onClose}
              className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              View Full Details
            </Link>
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Marketplace Page ────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
  { value: 'rating-desc', label: 'Highest Rated' },
];

const PAGE_SIZE = 12;

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [isOrganic, setIsOrganic] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewCrop, setQuickViewCrop] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // 800ms loading skeleton on mount
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Sync URL category param
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setCurrentPage(1);
  }, [urlCategory]);

  const handleCategorySelect = useCallback((cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...crops];
    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter(c => c.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.farmer.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    list = list.filter(c => c.price >= priceRange[0] && c.price <= priceRange[1]);
    if (isOrganic) list = list.filter(c => c.organic);

    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating-desc': list.sort((a, b) => (b.farmerRating ?? 0) - (a.farmerRating ?? 0)); break;
      default: list = list.filter(c => c.featured).concat(list.filter(c => !c.featured)); break;
    }
    return list;
  }, [selectedCategory, searchQuery, priceRange, isOrganic, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const allCategories = ['All', ...CATEGORIES.map(c => c.name)];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Marketplace</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {loading ? '…' : filtered.length} crop{filtered.length !== 1 ? 's' : ''} available
              </p>
            </div>
            {/* Sort + Mobile Filter toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search crops, farmers, locations…"
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600'
                }`}
              >
                {cat === 'All' ? '🌾 All' : `${CATEGORIES.find(c => c.name === cat)?.icon || ''} ${cat}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar – desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <FilterPanel
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                isOrganic={isOrganic}
                setIsOrganic={setIsOrganic}
                onClear={() => { setPriceRange([0, 500]); setIsOrganic(false); }}
              />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {filterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
              <div className="relative w-72 max-w-full h-full bg-white shadow-2xl p-6 overflow-y-auto animate-slide-in-left">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-gray-900">Filters</h2>
                  <button onClick={() => setFilterOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <FilterPanel
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  isOrganic={isOrganic}
                  setIsOrganic={setIsOrganic}
                  onClear={() => { setPriceRange([0, 500]); setIsOrganic(false); }}
                />
                <button
                  onClick={() => setFilterOpen(false)}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Package className="w-16 h-16 text-gray-200 mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-1">No crops found</h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  Try adjusting your filters, search query, or category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange([0, 500]);
                    setIsOrganic(false);
                    setCurrentPage(1);
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  }}
                  className="mt-4 px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {paginated.map(crop => (
                    <CropCard
                      key={crop.id}
                      crop={crop}
                      onViewDetails={() => setQuickViewCrop(crop)}
                      onAddToCart={() => {/* cart context hook here */}}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (totalPages > 7 && page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 2) {
                        if (page === 2 || page === totalPages - 1) return <span key={page} className="px-1 text-gray-400">…</span>;
                        return null;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-green-600 text-white'
                              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal crop={quickViewCrop} onClose={() => setQuickViewCrop(null)} />
    </div>
  );
}
