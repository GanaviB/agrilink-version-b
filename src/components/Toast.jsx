import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  const { id, message, type = 'info' } = toast;

  const bgConfig = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }[type] || 'bg-gray-50 border-gray-200 text-gray-800';

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }[type] || Info;

  const iconColor = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  }[type] || 'text-gray-600';

  return (
    <div
      className={`flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg max-w-sm w-full transition-all duration-300 animate-slide-up ${bgConfig}`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
        <p className="text-sm font-medium leading-snug">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:opacity-75 transition-opacity rounded-lg"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
