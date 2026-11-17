import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'About Us', to: '/about' },
  { label: 'Help & Support', to: '/help' },
  { label: 'Blog', to: '/blog' },
];

const FOR_FARMERS = [
  { label: 'Sell Crops', to: '/sell' },
  { label: 'Farmer Dashboard', to: '/dashboard' },
  { label: 'Price Trends', to: '/prices' },
  { label: 'AI Assistant', to: '/ai-assistant' },
  { label: 'Transport Services', to: '/transport' },
];

const FOR_BUYERS = [
  { label: 'Browse Crops', to: '/marketplace' },
  { label: 'Bulk Orders', to: '/bulk' },
  { label: 'Track Orders', to: '/orders' },
  { label: 'Buyer Dashboard', to: '/dashboard' },
  { label: 'Become a Partner', to: '/partner' },
];

const LANGUAGES = ['EN', 'KN', 'HI', 'TE'];

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-green-500 text-white transition-colors text-lg"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [lang, setLang] = useState('EN');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-green-500 p-1.5 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Agri<span className="text-green-400">Link</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting farmers directly to buyers across India. Fresh produce, fair prices, transparent trade.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <SocialIcon href="https://facebook.com" label="Facebook">📘</SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter">🐦</SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">📸</SocialIcon>
              <SocialIcon href="https://youtube.com" label="YouTube">▶️</SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Farmers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Farmers</h3>
            <ul className="space-y-2.5">
              {FOR_FARMERS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Buyers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2.5">
              {FOR_BUYERS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-5">
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                  Bengaluru, Karnataka, India
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                  +91 80000 00000
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                  support@agrilink.in
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-3">Newsletter</h3>
              {subscribed ? (
                <p className="text-green-400 text-sm font-medium">✓ Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AgriLink. All rights reserved. Made with ❤️ for Indian Farmers.
          </p>
          {/* Language pills */}
          <div className="flex items-center gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                  lang === l
                    ? 'bg-green-600 text-white border-green-600'
                    : 'text-gray-500 border-gray-600 hover:border-green-500 hover:text-green-400'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
