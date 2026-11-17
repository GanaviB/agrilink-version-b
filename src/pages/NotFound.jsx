import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Store, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Inline tractor SVG illustration ──────────────────────────────────────
function TractorIllustration() {
  return (
    <svg viewBox="0 0 200 130" className="w-56 h-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="60" y="50" width="90" height="45" rx="8" fill="#16a34a" />
      {/* Cab */}
      <rect x="110" y="30" width="40" height="30" rx="6" fill="#15803d" />
      {/* Cab window */}
      <rect x="116" y="36" width="28" height="18" rx="4" fill="#bbf7d0" />
      {/* Hood */}
      <rect x="60" y="55" width="55" height="20" rx="4" fill="#22c55e" />
      {/* Exhaust pipe */}
      <rect x="68" y="38" width="6" height="20" rx="3" fill="#374151" />
      <rect x="62" y="34" width="18" height="6" rx="3" fill="#374151" />
      {/* Smoke puffs */}
      <circle cx="71" cy="28" r="5" fill="#d1fae5" opacity="0.7" />
      <circle cx="78" cy="22" r="4" fill="#d1fae5" opacity="0.5" />
      <circle cx="66" cy="20" r="3" fill="#d1fae5" opacity="0.4" />
      {/* Big rear wheel */}
      <circle cx="80" cy="98" r="28" fill="#374151" />
      <circle cx="80" cy="98" r="20" fill="#4b5563" />
      <circle cx="80" cy="98" r="10" fill="#6b7280" />
      <circle cx="80" cy="98" r="4" fill="#9ca3af" />
      {/* Tyre treads rear */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <line key={deg}
          x1={80 + 11 * Math.cos(deg * Math.PI / 180)}
          y1={98 + 11 * Math.sin(deg * Math.PI / 180)}
          x2={80 + 19 * Math.cos(deg * Math.PI / 180)}
          y2={98 + 19 * Math.sin(deg * Math.PI / 180)}
          stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* Small front wheel */}
      <circle cx="143" cy="102" r="15" fill="#374151" />
      <circle cx="143" cy="102" r="10" fill="#4b5563" />
      <circle cx="143" cy="102" r="5" fill="#6b7280" />
      <circle cx="143" cy="102" r="2" fill="#9ca3af" />
      {/* Ground */}
      <rect x="20" y="124" width="160" height="4" rx="2" fill="#d1fae5" />
      {/* Steering wheel */}
      <circle cx="128" cy="48" r="6" fill="none" stroke="#bbf7d0" strokeWidth="2" />
      <line x1="128" y1="42" x2="128" y2="38" stroke="#bbf7d0" strokeWidth="2" />
      {/* Headlight */}
      <circle cx="62" cy="65" r="4" fill="#fef08a" />
      {/* Farmer waving */}
      <circle cx="130" cy="40" r="6" fill="#fde68a" />
      <line x1="136" y1="38" x2="145" y2="30" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="145" cy="29" r="2" fill="#fde68a" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        {/* Large 404 */}
        <div className="text-[9rem] leading-none font-extrabold text-green-600 select-none" style={{ letterSpacing: '-0.05em' }}>
          404
        </div>

        {/* Tractor illustration */}
        <div className="mt-2 mb-6">
          <TractorIllustration />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you're looking for doesn't exist or was moved. Let's get you back on track! 🌾
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-7 py-3 rounded-full transition-colors shadow-md">
            <Home size={18} /> Go Home
          </Link>
          <Link to="/marketplace"
            className="inline-flex items-center gap-2 bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 font-bold px-7 py-3 rounded-full transition-colors shadow-md">
            <Store size={18} /> Browse Marketplace
          </Link>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-100 font-bold px-7 py-3 rounded-full transition-colors shadow-md">
            <MessageSquare size={18} /> Contact Support
          </Link>
        </div>

        {/* Back link */}
        <button onClick={() => window.history.back()}
          className="mt-8 text-sm text-gray-400 hover:text-green-700 underline underline-offset-2 transition-colors">
          ← Go back to previous page
        </button>
      </main>

      <Footer />
    </div>
  );
}
