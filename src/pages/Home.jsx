import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Truck,
  ShoppingBag,
  Leaf,
  Bot,
  Sprout,
  Microscope,
  BarChart3,
  FlaskConical,
  Users,
  Package,
  Globe,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CropCard from '../components/CropCard';
import crops from '../data/crops';
import { CATEGORIES } from '../data/categories';
import testimonials from '../data/testimonials';

// ─── Trust badges ───────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: Users, label: '50,000+ Farmers' },
  { icon: Package, label: '10,00,000+ Orders' },
  { icon: Globe, label: '500+ Districts' },
];

// ─── How it works steps ─────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    step: 1,
    icon: Leaf,
    title: 'Farmers List Crops',
    desc: 'Farmers upload crop details — photos, quantity, price, location — in minutes using our simple form.',
  },
  {
    step: 2,
    icon: ShoppingBag,
    title: 'Buyers Browse & Order',
    desc: 'Buyers search, filter by category or location, compare prices and place orders directly with farmers.',
  },
  {
    step: 3,
    icon: Truck,
    title: 'Fast Delivery',
    desc: "Registered transporters pick up fresh produce and deliver it straight to the buyer's doorstep.",
  },
];

// ─── Benefits ────────────────────────────────────────────────────────────────
const FARMER_BENEFITS = [
  'Sell directly — no middlemen cutting your profit',
  'Set your own price and reach national buyers',
  'Real-time order tracking and instant payments',
  'AI crop recommendations to maximise yield',
  'Free listings and dedicated farmer support',
];

const BUYER_BENEFITS = [
  'Fresh produce sourced straight from the farm',
  'Transparent pricing — always fair market rates',
  'Wide variety — 500+ crops across all categories',
  'Doorstep delivery with cold-chain logistics',
  'Quality guarantee and easy return policy',
];

// ─── AI Features ─────────────────────────────────────────────────────────────
const AI_FEATURES = [
  {
    icon: Bot,
    title: 'AI Chatbot',
    desc: 'Get instant answers about crops, prices, and orders.',
  },
  {
    icon: Sprout,
    title: 'Crop Recommendation',
    desc: 'AI suggests best crops for your soil and season.',
  },
  {
    icon: Microscope,
    title: 'Disease Detection',
    desc: 'Upload a leaf photo — AI detects diseases instantly.',
  },
  {
    icon: FlaskConical,
    title: 'Soil Analysis',
    desc: 'Know your soil health and get tailored advice.',
  },
  {
    icon: BarChart3,
    title: 'Demand Forecasting',
    desc: 'Predict market demand and plan your harvest.',
  },
];

// ─── Star renderer ────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const featuredCrops = crops.filter((c) => c.featured).slice(0, 6);
  const topTestimonials = testimonials.slice(0, 3);

  // Simple scroll-reveal via IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('animate-fade-in');
            e.target.style.opacity = '1';
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      el.style.opacity = '0';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80")',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-green-700/80" />

        {/* Organic decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-emerald-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-20 w-64 h-64 bg-lime-300/10 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl animate-slide-up">
            {/* Pill badge */}
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <TrendingUp size={14} />
              India's #1 Farm-to-Table Marketplace
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Connecting Farmers
              <br />
              <span className="text-lime-300">Directly to Buyers</span>
            </h1>

            <p className="text-lg sm:text-xl text-green-100 mb-10 max-w-xl leading-relaxed">
              AgriLink eliminates middlemen. Fresh crops from farm to your doorstep at fair prices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-200 hover:scale-105"
              >
                Explore Crops <ArrowRight size={20} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-green-800 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-105"
              >
                Join as Farmer
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-full"
                >
                  <Icon size={16} className="text-lime-300" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. FEATURED CATEGORIES
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-12">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find the freshest produce across every category</p>
          </div>

          <div data-reveal className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/marketplace?category=${encodeURIComponent(cat.name)}`)}
                className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-transparent hover:border-green-200 ${cat.color} hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-semibold text-gray-800 text-center leading-tight">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-500">{cat.count} crops</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. POPULAR CROPS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="section-title text-left">Popular Crops This Season</h2>
              <p className="section-subtitle text-left">Hand-picked, in-demand crops from verified farmers</p>
            </div>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-1 text-green-700 font-semibold hover:text-green-900 transition-colors whitespace-nowrap"
            >
              View All Crops <ChevronRight size={18} />
            </Link>
          </div>

          <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCrops.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>

          <div data-reveal className="text-center mt-12">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 btn-primary text-base px-8 py-3"
            >
              View All Crops <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. HOW AGRILINK WORKS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <h2 className="section-title">How AgriLink Works</h2>
            <p className="section-subtitle">Three simple steps to connect farm to table</p>
          </div>

          <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-14 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-green-200" />

            {HOW_STEPS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                {/* Circle */}
                <div className="relative z-10 w-28 h-28 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mb-6 shadow-sm">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shadow">
                    {step}
                  </div>
                  <Icon size={40} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. BENEFITS — 2 COLUMN GRID
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-12">
            <h2 className="section-title">Why Choose AgriLink?</h2>
            <p className="section-subtitle">Designed to empower both sides of the marketplace</p>
          </div>

          <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Farmers */}
            <div className="bg-green-50 border border-green-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Leaf size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">For Farmers</h3>
              </div>
              <ul className="space-y-4">
                {FARMER_BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register?role=farmer"
                className="mt-8 inline-flex items-center gap-2 btn-primary text-sm"
              >
                Register as Farmer <ArrowRight size={16} />
              </Link>
            </div>

            {/* For Buyers */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900">For Buyers</h3>
              </div>
              <ul className="space-y-4">
                {BUYER_BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register?role=buyer"
                className="mt-8 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Register as Buyer <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. AI FEATURES SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-green-700 to-green-900 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-12">
            <span className="inline-block bg-lime-400/20 text-lime-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Powered by AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Smart Agriculture at Your Fingertips
            </h2>
            <p className="text-green-200 text-lg max-w-xl mx-auto">
              Our AI tools help farmers grow smarter and buyers find the best produce.
            </p>
          </div>

          <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            {AI_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-lime-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-lime-400/30 transition-colors">
                  <Icon size={24} className="text-lime-300" />
                </div>
                <h4 className="text-white font-bold mb-2 text-sm">{title}</h4>
                <p className="text-green-200 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="text-center">
            <Link
              to="/ai"
              className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-green-900 font-bold px-8 py-3.5 rounded-xl text-base shadow-lg transition-all duration-200 hover:scale-105"
            >
              Explore AI Features <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-12">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">Real stories from farmers and buyers across India</p>
          </div>

          <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Stars */}
                <Stars rating={t.rating} />

                {/* Quote */}
                <blockquote className="mt-4 text-gray-700 leading-relaxed flex-1 italic">
                  "{t.text}"
                </blockquote>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">
                      {t.role}
                      {t.location ? ` · ${t.location}` : ''}
                    </p>
                  </div>
                </div>

                {/* Since badge */}
                {t.since && (
                  <span className="mt-4 text-xs text-green-600 font-medium">
                    Member since {t.since}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          8. CTA BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-green-700 via-green-800 to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=60")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-green-200 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of farmers and buyers already benefiting from AgriLink's direct marketplace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=farmer"
              className="inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Leaf size={20} /> Start as Farmer
            </Link>
            <Link
              to="/register?role=buyer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-green-800 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-105"
            >
              <ShoppingBag size={20} /> Start as Buyer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
