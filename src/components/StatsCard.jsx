import React from 'react';

export default function StatsCard({ icon: Icon, label, value, change, color = 'green' }) {
  const colorMap = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  const selectedBg = colorMap[color] || colorMap.green;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {change && (
            <p className="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl ${selectedBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
