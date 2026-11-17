import React from 'react';
import { RotateCcw } from 'lucide-react';

const CATEGORIES = ['Rice', 'Wheat', 'Maize', 'Vegetables', 'Fruits', 'Pulses', 'Spices'];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const DEFAULT_FILTERS = {
  categories: [],
  minPrice: '',
  maxPrice: '',
  sortBy: 'newest',
  organicOnly: false,
};

export default function FilterPanel({ filters = DEFAULT_FILTERS, onChange }) {
  const update = (patch) => onChange?.({ ...filters, ...patch });

  const toggleCategory = (cat) => {
    const current = filters.categories || [];
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    update({ categories: updated });
  };

  const handleClear = () => onChange?.(DEFAULT_FILTERS);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-sm">Filters</h3>
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Category</p>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={(filters.categories || []).includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-400 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-green-700 transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Price Range (₹/kg)</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: e.target.value })}
            placeholder="Min"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
          <span className="text-gray-400 text-sm">–</span>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value })}
            placeholder="Max"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Sort By</p>
        <select
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Organic Toggle */}
      <div>
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-gray-700 group-hover:text-green-700 font-medium transition-colors">
            🌿 Organic Only
          </span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={!!filters.organicOnly}
              onChange={(e) => update({ organicOnly: e.target.checked })}
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                filters.organicOnly ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                  filters.organicOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
