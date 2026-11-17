import React from 'react';

export default function CategoryCard({ category, onClick }) {
  return (
    <button
      onClick={() => onClick?.(category)}
      className={`group relative w-full rounded-2xl p-6 text-center overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 ${
        category.color || 'bg-green-50'
      }`}
    >
      {/* Decorative circle */}
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/20 group-hover:scale-150 transition-transform duration-500" />

      {/* Icon */}
      <div className="relative text-5xl mb-3 leading-none select-none">{category.icon}</div>

      {/* Name */}
      <h3 className="relative font-bold text-gray-800 text-sm sm:text-base leading-tight">
        {category.name}
      </h3>

      {/* Count badge */}
      {category.count !== undefined && (
        <span className="relative mt-2 inline-block px-2.5 py-0.5 text-xs font-semibold bg-white/70 text-gray-700 rounded-full">
          {category.count} listings
        </span>
      )}

      {category.description && (
        <p className="relative mt-1 text-xs text-gray-500 leading-snug line-clamp-2">
          {category.description}
        </p>
      )}
    </button>
  );
}
