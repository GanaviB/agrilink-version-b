import React, { useState } from 'react';
import {
  Search, BookOpen, Tractor, ShoppingCart, CreditCard, Package, Shield,
  ChevronDown, ChevronUp, ChevronRight, ArrowLeft, Headphones,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Category data ─────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'getting-started',
    icon: BookOpen,
    title: 'Getting Started',
    color: 'bg-blue-100 text-blue-700',
    articles: [
      'How to create your AgriLink account',
      'Verifying your phone number and KYC',
      'Setting up your profile',
      'Understanding the dashboard',
      'How to list your first crop',
    ],
  },
  {
    id: 'for-farmers',
    icon: Tractor,
    title: 'For Farmers',
    color: 'bg-green-100 text-green-700',
    articles: [
      'How to list your first crop',
      'Setting crop price and quantity',
      'Managing your crop inventory',
      'Understanding buyer requests',
      'Getting paid: bank transfer & UPI',
      'Withdrawing your earnings',
    ],
  },
  {
    id: 'for-buyers',
    icon: ShoppingCart,
    title: 'For Buyers',
    color: 'bg-orange-100 text-orange-700',
    articles: [
      'How to browse and search crops',
      'Placing your first order',
      'Negotiating with farmers',
      'Bulk order discounts',
      'Tracking your delivery',
    ],
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Payments',
    color: 'bg-purple-100 text-purple-700',
    articles: [
      'Accepted payment methods',
      'UPI payment guide',
      'Cash on Delivery availability',
      'Payment failed — what to do',
      'GST invoices and receipts',
      'Refund processing time',
    ],
  },
  {
    id: 'orders',
    icon: Package,
    title: 'Orders & Delivery',
    color: 'bg-yellow-100 text-yellow-700',
    articles: [
      'Tracking your order live',
      'Expected delivery timelines',
      'Changing or cancelling an order',
      'Raising a quality dispute',
      'Transport partner selection',
      'What if delivery is delayed?',
    ],
  },
  {
    id: 'account',
    icon: Shield,
    title: 'Account & Security',
    color: 'bg-red-100 text-red-700',
    articles: [
      'Resetting your password',
      'Enabling two-factor authentication',
      'Managing connected devices',
      'Deactivating your account',
      'Reporting suspicious activity',
    ],
  },
];

// ── FAQ data ──────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'How do I register on AgriLink?', a: 'Visit agrilink.in and click "Get Started". Choose your role (Farmer or Buyer), enter your phone number, and verify via OTP. The whole process takes under 3 minutes.' },
  { q: 'Is AgriLink free to use?', a: 'Yes! Creating an account and browsing is free. AgriLink charges a small platform fee (1–2%) only when a transaction is successfully completed.' },
  { q: 'How do I list a crop for sale?', a: 'Go to your Farmer Dashboard, click "Add Crop", fill in name, category, quantity, price/unit, harvest date, photos, and description, then hit "Publish". Your listing goes live immediately.' },
  { q: 'Can I negotiate the price with the farmer?', a: 'Yes. Each listing has a "Make an Offer" button. The farmer receives your offer and can accept, counter, or decline within 24 hours.' },
  { q: 'What payment methods are supported?', a: 'UPI, Net Banking, Debit/Credit Cards (Visa, Mastercard, RuPay), and Cash on Delivery for select pin codes.' },
  { q: 'How long does delivery take?', a: 'Within the same state: 2–3 business days. Cross-state: 4–7 business days. Live tracking is available in the Orders section.' },
  { q: 'What if the produce quality is poor on arrival?', a: 'Raise a "Quality Dispute" within 24 hours of delivery. Upload photos of the issue. AgriLink investigates and processes a refund within 3–5 business days if the claim is valid.' },
  { q: 'How do farmers get paid?', a: "Payments are released to the farmer's linked bank account or UPI ID within 48 hours of the buyer confirming receipt." },
  { q: 'Is my personal data safe?', a: "All data is encrypted in transit (TLS) and at rest. We follow India's DPDP Act guidelines. We never sell your data to third parties." },
  { q: 'How do I contact AgriLink support?', a: 'You can reach us at support@agrilink.in, call +91 80 4500 1234, or use the live chat button on the website (Mon–Sat, 9 AM–7 PM IST).' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 bg-white text-left hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-gray-800">{q}</span>
        {open ? <ChevronUp className="text-green-600 flex-shrink-0" size={20} /> : <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />}
      </button>
      {open && (
        <div className="bg-green-50 px-5 py-4 text-gray-600 leading-relaxed border-t border-gray-200">{a}</div>
      )}
    </div>
  );
}

export default function Help() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const activeCat = CATEGORIES.find(c => c.id === activeCategory);

  // filter FAQs by search
  const filteredFAQs = query
    ? FAQS.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()))
    : FAQS;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* ── Hero / Search ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Help Centre</h1>
        <p className="text-green-100 text-xl mb-8">How can we help you?</p>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for answers…"
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg"
          />
        </div>
      </section>

      {/* ── Category cards / Article list ─────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">

          {activeCategory ? (
            /* Article list */
            <div>
              <button onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-1 text-green-700 font-semibold mb-6 hover:underline">
                <ArrowLeft size={18} /> Back to all topics
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{activeCat.title}</h2>
              <ul className="space-y-3">
                {activeCat.articles.map(article => (
                  <li key={article}>
                    <button className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm p-4 hover:shadow-md hover:bg-green-50 transition-all group text-left">
                      <span className="text-gray-700 font-medium group-hover:text-green-700">{article}</span>
                      <ChevronRight className="text-gray-300 group-hover:text-green-600" size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* Category grid */
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Browse Help Topics</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map(({ id, icon: Icon, title, color, articles }) => (
                  <button key={id} onClick={() => setActiveCategory(id)}
                    className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all group">
                    <div className={`inline-flex rounded-xl p-3 mb-4 ${color}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-green-700">{title}</h3>
                    <p className="text-gray-400 text-sm">{articles.length} articles</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Article ───────────────────────────────────────────── */}
      {!activeCategory && (
        <section className="bg-green-50 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📌 Featured Article</h2>
            <div className="bg-white rounded-2xl shadow-md p-8">
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">For Farmers</span>
              <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">How to List Your First Crop</h3>
              <div className="text-gray-600 leading-relaxed space-y-3 text-sm">
                <p><strong>Step 1.</strong> Log in and go to your <em>Farmer Dashboard</em>.</p>
                <p><strong>Step 2.</strong> Click the green <strong>+ Add Crop</strong> button in the top right.</p>
                <p><strong>Step 3.</strong> Fill in crop name, category, quantity available, price per unit, and harvest date.</p>
                <p><strong>Step 4.</strong> Upload 2–4 clear photos of your produce. Good photos attract 3× more buyers.</p>
                <p><strong>Step 5.</strong> Write a short description: soil type, watering method, pesticide use (or organic status).</p>
                <p><strong>Step 6.</strong> Click <strong>Publish</strong>. Your listing is live instantly and visible to 50,000+ buyers!</p>
                <p className="text-green-700 font-medium">💡 Tip: Mark your crop as "Organic" if applicable — organic listings earn 15–30% higher prices on average.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {filteredFAQs.length > 0
              ? filteredFAQs.map(faq => <FAQItem key={faq.q} {...faq} />)
              : <p className="text-center text-gray-400 py-8">No results found for "<strong>{query}</strong>".</p>
            }
          </div>
        </div>
      </section>

      {/* ── Contact Support CTA ───────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 py-14 px-4 text-center text-white">
        <Headphones className="mx-auto mb-4 text-green-200" size={40} />
        <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
        <p className="text-green-100 mb-8">Our support team is ready to assist you Mon–Sat, 9 AM – 7 PM IST.</p>
        <Link to="/contact"
          className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg">
          Contact Support <ChevronRight size={18} />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
