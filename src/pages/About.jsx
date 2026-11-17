import React, { useEffect, useRef, useState } from 'react';
import { Users, ShoppingBag, MapPin, Star, Leaf, Eye, Cpu, Recycle, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, suffix = '', started }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
      <div className="bg-green-100 text-green-700 rounded-full p-4 mb-4">
        <Icon size={28} />
      </div>
      <div className="text-4xl font-extrabold text-green-700">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="mt-2 text-gray-600 font-medium">{label}</div>
    </div>
  );
}

// ── Team data ─────────────────────────────────────────────────────────────
const TEAM = [
  { name: 'Arjun Mehta', role: 'CEO & Co-Founder', bio: 'Former agri-tech researcher at IIT Bangalore. Passionate about bridging farm-to-fork gaps.' },
  { name: 'Priya Nair', role: 'CTO & Co-Founder', bio: 'Full-stack engineer with 10+ years in fintech and marketplace platforms.' },
  { name: 'Rohit Sharma', role: 'Head of Farmer Relations', bio: 'Grew up on a paddy farm in Punjab. Knows every challenge farmers face.' },
  { name: 'Anjali Singh', role: 'Head of Product', bio: 'Ex-Flipkart product lead who redesigned the buyer experience end-to-end.' },
  { name: 'Kiran Rao', role: 'CFO', bio: 'CA with 12 years in agri-finance. Ensuring farmers get paid on time, every time.' },
  { name: 'Meena Devi', role: 'Community Manager', bio: 'Conducts on-ground workshops to onboard farmers across rural Karnataka and Andhra Pradesh.' },
];

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-lime-600', 'bg-cyan-600', 'bg-green-700',
];

// ── Timeline data ─────────────────────────────────────────────────────────
const TIMELINE = [
  { year: '2023 Q1', event: 'AgriLink founded in Bengaluru with a 5-person team and ₹2 Cr seed funding.' },
  { year: '2023 Q3', event: 'Platform launched in Karnataka — 1,000 farmers onboarded in 60 days.' },
  { year: '2024 Q1', event: 'Expanded to Andhra Pradesh, Telangana, and Tamil Nadu.' },
  { year: '2024 Q2', event: 'Series A funding of ₹25 Cr. Launched transport booking feature.' },
  { year: '2024 Q4', event: '50,000 farmers milestone. Crossed 10 lakh orders processed.' },
  { year: '2025 Q1', event: 'AI Crop Advisor & Disease Detection launched. 500+ districts covered.' },
];

// ── Values data ───────────────────────────────────────────────────────────
const VALUES = [
  { icon: Leaf, title: 'Fair Trade', desc: 'Farmers receive fair market prices — no middlemen skimming margins.' },
  { icon: Eye, title: 'Transparency', desc: 'Every transaction is visible. Prices, fees, and processes are fully open.' },
  { icon: Cpu, title: 'Technology', desc: 'AI tools, real-time data, and mobile-first design empower every user.' },
  { icon: Recycle, title: 'Sustainability', desc: 'Promoting organic farming and reducing food waste across the supply chain.' },
];

// ── About Page ────────────────────────────────────────────────────────────
export default function About() {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold rounded-full px-4 py-1 mb-6 tracking-wide uppercase">
            Our Story
          </span>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">About AgriLink</h1>
          <p className="text-xl text-green-100 leading-relaxed">
            We are on a mission to empower every Indian farmer with direct market access, fair pricing,
            and technology-driven tools — building a future where agriculture thrives for all.
          </p>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2023 to revolutionize Indian agriculture, AgriLink was born from a simple observation:
              farmers were selling at ₹10/kg while buyers were paying ₹40/kg — and the difference was swallowed
              by a chain of middlemen who added little value.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our founders — a technologist, a farmer's son, and an agri-economist — set out to cut that chain.
              The result is AgriLink: a transparent digital marketplace where farmers list their produce directly,
              buyers browse and order, and logistics connect the two seamlessly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today we serve 500+ districts, with every rupee of margin going where it belongs — to the farmer.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
              alt="Green Indian farmland"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-green-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">AgriLink by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={Users}      label="Farmers Onboarded"  value={50000}  suffix="+"  started={statsVisible} />
            <StatCard icon={ShoppingBag} label="Orders Processed"  value={1000000} suffix="+"  started={statsVisible} />
            <StatCard icon={MapPin}     label="Districts Covered"  value={500}    suffix="+"  started={statsVisible} />
            <StatCard icon={Star}       label="Average Rating"     value={48}     suffix="★"  started={statsVisible} />
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Values</h2>
          <p className="text-gray-500 text-center mb-12">The principles that guide every decision we make.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-green-100 text-green-700 rounded-full p-3 inline-flex mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────── */}
      <section className="bg-green-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Meet the Team</h2>
          <p className="text-gray-500 text-center mb-12">The people building AgriLink's future, one harvest at a time.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, bio }, i) => (
              <div key={name} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-full ${AVATAR_COLORS[i]} text-white flex items-center justify-center text-xl font-bold mb-4`}>
                  {initials(name)}
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
                <p className="text-green-700 font-medium text-sm mb-3">{role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-200" />
            <ul className="space-y-8">
              {TIMELINE.map(({ year, event }, i) => (
                <li key={i} className="flex gap-6 items-start">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow">
                    <span className="leading-tight text-center">{year.replace(' ', '\n')}</span>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-5 flex-1 mt-1">
                    <p className="text-gray-700 leading-relaxed">{event}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Partners ──────────────────────────────────────────────────── */}
      <section className="bg-green-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Partners</h2>
          <p className="text-gray-500 text-center mb-10">Trusted by leading organisations in agriculture &amp; technology.</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['NABARD', 'ICAR', 'FPO Network', 'Agri-VC', 'KisanHub', 'GovAg'].map((name) => (
              <div key={name} className="bg-white rounded-xl h-20 flex items-center justify-center shadow-sm text-gray-400 font-semibold text-sm border border-gray-100">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 py-16 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Join the AgriLink Movement</h2>
        <p className="text-green-100 mb-8 max-w-xl mx-auto">
          Whether you're a farmer, buyer, or investor — there's a place for you in India's agricultural revolution.
        </p>
        <a href="/register" className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg">
          Get Started <ChevronRight size={18} />
        </a>
      </section>

      <Footer />
    </div>
  );
}
