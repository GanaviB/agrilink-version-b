import React, { useState } from 'react';
import {
  MapPin, Mail, Phone, MessageCircle, Clock, ChevronDown, ChevronUp,
  Twitter, Linkedin, Instagram, Facebook, Youtube, CheckCircle2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── FAQ data ──────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'How do I register as a farmer on AgriLink?', a: "Click \"Get Started\" on the home page, choose \"I'm a Farmer\", fill in your details and verify your phone number. It takes under 3 minutes." },
  { q: 'How long does delivery take after I place an order?', a: 'Most deliveries within the same state are fulfilled within 2–3 business days. Cross-state orders take 4–7 days. You can track live status in the Orders section.' },
  { q: 'What payment methods are accepted?', a: 'UPI, Net Banking, Debit/Credit Cards, and Cash on Delivery for select pin codes. All online payments are secured by Razorpay.' },
  { q: 'How are prices set on AgriLink?', a: 'Farmers set their own prices. AgriLink displays real-time APMC mandi rates alongside listings so buyers can make informed comparisons.' },
  { q: 'Can I get a refund if the produce quality is poor?', a: 'Yes. Raise a quality dispute within 24 hours of delivery with photos. Our team investigates and issues a full or partial refund within 3–5 business days.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 bg-white text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800">{q}</span>
        {open ? <ChevronUp className="text-green-600 flex-shrink-0" size={20} /> : <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />}
      </button>
      {open && (
        <div className="bg-green-50 px-5 py-4 text-gray-600 leading-relaxed border-t border-gray-200">
          {a}
        </div>
      )}
    </div>
  );
}

const SUBJECTS = [
  'General Inquiry', 'Farmer Support', 'Buyer Support', 'Payment Issue',
  'Delivery Complaint', 'Partnership', 'Press / Media', 'Other',
];

const SOCIALS = [
  { icon: Twitter,   label: 'Twitter',   href: '#', color: 'hover:text-sky-500' },
  { icon: Linkedin,  label: 'LinkedIn',  href: '#', color: 'hover:text-blue-700' },
  { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-600' },
  { icon: Facebook,  label: 'Facebook',  href: '#', color: 'hover:text-blue-600' },
  { icon: Youtube,   label: 'YouTube',   href: '#', color: 'hover:text-red-600'  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.subject)        e.subject = 'Please choose a subject.';
    if (!form.message.trim()) e.message = 'Message cannot be empty.';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-green-100 text-xl max-w-xl mx-auto">
          Questions, feedback, or partnership ideas — we'd love to hear from you.
        </p>
      </section>

      {/* ── Form + Info ───────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="text-green-500 mb-4" size={56} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-lg">We'll respond within 24 hours. 🌾</p>
                <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }); }}
                  className="mt-6 text-green-700 font-semibold underline underline-offset-2">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Raju Patil"
                    className={`w-full border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="raju@example.com"
                      className={`w-full border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    className={`w-full border ${errors.subject ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400`}>
                    <option value="">— Choose a subject —</option>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    rows={5} placeholder="Tell us how we can help you…"
                    className={`w-full border ${errors.message ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-400`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60">
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-5">Contact Information</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex gap-3 items-start">
                  <MapPin className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-800">Office Address</p>
                    <p>42, Agri Tower, Whitefield Road,<br />Bengaluru, Karnataka – 560066</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="text-green-600 flex-shrink-0" size={20} />
                  <a href="mailto:support@agrilink.in" className="text-green-700 font-medium hover:underline">
                    support@agrilink.in
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="text-green-600 flex-shrink-0" size={20} />
                  <a href="tel:+918045001234" className="text-green-700 font-medium hover:underline">
                    +91 80 4500 1234
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <MessageCircle className="text-green-600 flex-shrink-0" size={20} />
                  <a href="https://wa.me/918045001234" target="_blank" rel="noreferrer"
                    className="text-green-700 font-medium hover:underline">
                    WhatsApp: +91 80 4500 1234
                  </a>
                </div>
                <div className="flex gap-3 items-start">
                  <Clock className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-800">Office Hours</p>
                    <p>Mon–Sat: 9:00 AM – 7:00 PM IST</p>
                    <p>Sunday: 10:00 AM – 2:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} aria-label={label}
                    className={`text-gray-400 transition-colors ${color}`}>
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Placeholder ───────────────────────────────────────────── */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div
            style={{ height: '400px' }}
            className="rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center shadow-md"
          >
            <div className="text-center text-gray-400">
              <MapPin size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="font-semibold text-lg">Google Maps — Bengaluru HQ</p>
              <p className="text-sm">42, Agri Tower, Whitefield Road, Bengaluru 560066</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-green-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Quick Answers</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
