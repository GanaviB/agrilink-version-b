import React from 'react';
import { Star } from 'lucide-react';

const SIZE_MAP = {
  sm: { star: 'w-3.5 h-3.5', text: 'text-xs' },
  md: { star: 'w-5 h-5', text: 'text-sm' },
  lg: { star: 'w-6 h-6', text: 'text-base' },
};

export default function StarRating({ rating = 0, maxRating = 5, size = 'sm', showCount = false, count = 0 }) {
  const { star, text } = SIZE_MAP[size] || SIZE_MAP.sm;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, i) => {
          const filled = rating >= i + 1;
          const half = !filled && rating > i && rating < i + 1;
          return (
            <span key={i} className="relative inline-block">
              {/* Empty star */}
              <Star className={`${star} text-gray-200 fill-gray-200`} />
              {/* Filled or half overlay */}
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? '50%' : '100%' }}
                >
                  <Star className={`${star} text-yellow-400 fill-yellow-400`} />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showCount && (
        <span className={`${text} text-gray-500 ml-0.5`}>
          ({count})
        </span>
      )}
      {!showCount && rating > 0 && (
        <span className={`${text} text-gray-600 font-medium`}>{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
