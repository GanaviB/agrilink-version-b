import React, { useState } from 'react';
import { MapPin, ShoppingCart, Eye, Leaf } from 'lucide-react';
import StarRating from './StarRating';
import Badge from './Badge';

export default function CropCard({ crop, onAddToCart, onViewDetails }) {
  const [imgError, setImgError] = useState(false);

  const fallback = `https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={imgError ? fallback : (crop.image || fallback)}
          alt={crop.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <Badge color="blue" size="sm">{crop.category}</Badge>
          {crop.organic && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
              <Leaf className="w-3 h-3" />
              Organic
            </span>
          )}
        </div>
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow text-green-700 font-bold text-sm">
          ₹{crop.price}<span className="text-xs font-normal text-gray-500">/{crop.unit || 'kg'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-bold text-gray-800 text-base leading-tight truncate">{crop.name}</h3>

        {/* Farmer & Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium truncate max-w-[55%]">🧑‍🌾 {crop.farmer}</span>
          <StarRating rating={crop.farmerRating ?? 0} size="sm" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
          <span className="truncate">{crop.location}</span>
        </div>

        {/* Quantity */}
        <p className="text-xs text-gray-400">
          Available: <span className="text-gray-700 font-medium">{crop.quantity} {crop.unit || 'kg'}</span>
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={() => onAddToCart?.(crop)}
            disabled={!crop.inStock}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {crop.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button
            onClick={() => onViewDetails?.(crop)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium border border-green-200 text-green-700 hover:bg-green-50 rounded-xl transition-colors"
          >
            <Eye className="w-4 h-4" />
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
