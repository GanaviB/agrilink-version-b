import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf, User, Truck, ShoppingCart, Eye, EyeOff, Mail, Phone, Lock,
  MapPin, Camera, Wheat, AlertCircle, ChevronLeft, Loader2, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ToastProvider';

const ROLES = [
  {
    id: 'farmer',
    label: 'Farmer',
    icon: Wheat,
    description: 'List your crops, set prices, and connect with buyers directly.',
    color: 'green',
  },
  {
    id: 'buyer',
    label: 'Buyer',
    icon: ShoppingCart,
    description: 'Browse fresh produce, compare prices, and place orders.',
    color: 'blue',
  },
  {
    id: 'transporter',
    label: 'Transporter',
    icon: Truck,
    description: 'Offer transport services and earn by delivering farm produce.',
    color: 'orange',
  },
];

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

const CROP_OPTIONS = ['Rice','Wheat','Maize','Tomatoes','Onions','Potatoes','Mangoes','Bananas','Lentils','Chillies','Turmeric'];
const BUYER_TYPES = ['Individual','Retailer','Wholesaler','Restaurant'];
const VEHICLE_TYPES = ['Mini Truck','Tempo','Truck (Small)','Truck (Large)','Pickup Van','Refrigerated Van'];

const colorMap = {
  green: { border: 'border-green-500', bg: 'bg-green-50', icon: 'bg-green-100 text-green-600', badge: 'text-green-600' },
  blue:  { border: 'border-blue-500',  bg: 'bg-blue-50',  icon: 'bg-blue-100 text-blue-600',   badge: 'text-blue-600' },
  orange:{ border: 'border-orange-500',bg: 'bg-orange-50',icon: 'bg-orange-100 text-orange-600',badge: 'text-orange-600' },
};

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '', state: '',
    // Farmer
    farmSize: '', cropTypes: [], experience: '',
    // Buyer
    buyerType: '',
    // Transporter
    vehicleType: '', vehicleNumber: '', capacity: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const toggleCrop = (crop) => {
    setForm((prev) => ({
      ...prev,
      cropTypes: prev.cropTypes.includes(crop)
        ? prev.cropTypes.filter((c) => c !== crop)
        : [...prev.cropTypes, crop],
    }));
    if (errors.cropTypes) setErrors((prev) => ({ ...prev, cropTypes: '' }));
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit number';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!form.state) errs.state = 'Please select your state';

    if (role === 'farmer') {
      if (!form.farmSize) errs.farmSize = 'Farm size is required';
      if (!form.cropTypes.length) errs.cropTypes = 'Select at least one crop type';
      if (!form.experience) errs.experience = 'Experience is required';
    }
    if (role === 'buyer') {
      if (!form.buyerType) errs.buyerType = 'Please select buyer type';
    }
    if (role === 'transporter') {
      if (!form.vehicleType) errs.vehicleType = 'Vehicle type is required';
      if (!form.vehicleNumber.trim()) errs.vehicleNumber = 'Vehicle number is required';
      if (!form.capacity) errs.capacity = 'Capacity is required';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await register({ ...form, role });
      addToast('Account created! Please log in.', 'success');
      navigate('/login');
    } catch (err) {
      addToast(err?.message || 'Registration failed. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ name }) =>
    errors[name] ? <p className="text-red-500 text-xs mt-1">{errors[name]}</p> : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <div className="bg-green-600 rounded-xl p-2">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-green-700">AgriLink</span>
      </header>

      <div className="flex-1 flex items-start justify-center p-6 py-10">
        <div className="w-full max-w-2xl">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {step} of 2</span>
              <span className="text-sm text-gray-400">{step === 1 ? 'Choose Role' : 'Your Information'}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          </div>

          {/* Demo notice */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700">
              <strong>Demo mode:</strong> No real account is created. All data is stored in memory only.
            </p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
              <p className="text-gray-500 text-sm mb-6">Choose how you'll use AgriLink</p>

              <div className="grid gap-4">
                {ROLES.map(({ id, label, icon: Icon, description, color }) => {
                  const c = colorMap[color];
                  const selected = role === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setRole(id)}
                      className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                        selected ? `${c.border} ${c.bg}` : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`rounded-xl p-3 ${c.icon} flex-shrink-0`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-semibold ${selected ? c.badge : 'text-gray-900'}`}>{label}</span>
                          {selected && <CheckCircle2 className={`h-5 w-5 ${c.badge}`} />}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={!role}
                onClick={() => setStep(2)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Continue →
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 font-semibold hover:underline">Log in</Link>
              </p>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex items-center gap-3 mb-6">
                <button type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-600">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your information</h2>
                  <p className="text-gray-500 text-sm">Signing up as{' '}
                    <span className="font-medium capitalize text-green-700">{role}</span>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Raju Patil"
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                  </div>
                  <FieldError name="fullName" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                  </div>
                  <FieldError name="email" />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                  </div>
                  <FieldError name="phone" />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FieldError name="password" />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FieldError name="confirmPassword" />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.state ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    >
                      <option value="">Select your state</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <FieldError name="state" />
                </div>

                {/* Profile Photo — demo only */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo <span className="text-gray-400 font-normal">(optional — demo only)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <Camera className="h-5 w-5 text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400">Photo upload is simulated in demo mode</span>
                  </div>
                </div>

                {/* ===== FARMER FIELDS ===== */}
                {role === 'farmer' && (
                  <div className="border-t border-gray-100 pt-4 space-y-4">
                    <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide">Farmer Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size (acres) *</label>
                        <input
                          type="number"
                          name="farmSize"
                          value={form.farmSize}
                          onChange={handleChange}
                          placeholder="e.g. 5"
                          min="0"
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.farmSize ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                        />
                        <FieldError name="farmSize" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years) *</label>
                        <input
                          type="number"
                          name="experience"
                          value={form.experience}
                          onChange={handleChange}
                          placeholder="e.g. 10"
                          min="0"
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.experience ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                        />
                        <FieldError name="experience" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Crop Types *</label>
                      <div className="flex flex-wrap gap-2">
                        {CROP_OPTIONS.map((crop) => (
                          <button
                            key={crop}
                            type="button"
                            onClick={() => toggleCrop(crop)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                              form.cropTypes.includes(crop)
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'
                            }`}
                          >
                            {crop}
                          </button>
                        ))}
                      </div>
                      <FieldError name="cropTypes" />
                    </div>
                  </div>
                )}

                {/* ===== BUYER FIELDS ===== */}
                {role === 'buyer' && (
                  <div className="border-t border-gray-100 pt-4 space-y-4">
                    <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Buyer Details</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Type *</label>
                      <div className="grid grid-cols-2 gap-2">
                        {BUYER_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => { setForm(prev => ({ ...prev, buyerType: type })); setErrors(prev => ({ ...prev, buyerType: '' })); }}
                            className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                              form.buyerType === type
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      <FieldError name="buyerType" />
                    </div>
                  </div>
                )}

                {/* ===== TRANSPORTER FIELDS ===== */}
                {role === 'transporter' && (
                  <div className="border-t border-gray-100 pt-4 space-y-4">
                    <h3 className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Transporter Details</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type *</label>
                      <select
                        name="vehicleType"
                        value={form.vehicleType}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${errors.vehicleType ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                      >
                        <option value="">Select vehicle type</option>
                        {VEHICLE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                      <FieldError name="vehicleType" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number *</label>
                        <input
                          type="text"
                          name="vehicleNumber"
                          value={form.vehicleNumber}
                          onChange={handleChange}
                          placeholder="e.g. KA 05 AB 1234"
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.vehicleNumber ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                        />
                        <FieldError name="vehicleNumber" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (tons) *</label>
                        <input
                          type="number"
                          name="capacity"
                          value={form.capacity}
                          onChange={handleChange}
                          placeholder="e.g. 5"
                          min="0"
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.capacity ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                        />
                        <FieldError name="capacity" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 font-semibold hover:underline">Log in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
