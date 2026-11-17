import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X } from 'lucide-react';

const CATEGORY_PILLS = ['All', 'Rice', 'Wheat', 'Vegetables', 'Fruits', 'Pulses', 'Spices'];

export default function SearchBar({ onSearch, placeholder = 'Search crops, farmers, locations…', initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);
  const [activeCategory, setActiveCategory] = useState('All');
  const debounceRef = useRef(null);

  const triggerSearch = useCallback(
    (q, cat) => {
      onSearch?.({ query: q, category: cat === 'All' ? '' : cat });
    },
    [onSearch]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerSearch(query, activeCategory);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, activeCategory, triggerSearch]);

  const handleClear = () => {
    setQuery('');
    triggerSearch('', activeCategory);
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
  };

  return (
    <div className="w-full space-y-3">
      {/* Input row */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all placeholder-gray-400 text-gray-800"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_PILLS.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
              activeCategory === cat
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
