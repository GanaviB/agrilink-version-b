import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <Loader2 className={`animate-spin text-green-600 ${sizeMap[size] || sizeMap.md}`} />
      {text && <p className="text-sm font-medium text-gray-500">{text}</p>}
    </div>
  );
}
