import React, { useState, useEffect } from 'react';
import { Truck, Package, CheckCircle, User, BarChart2, MapPin, Star, IndianRupee, Briefcase, ChevronRight, Bell, LogOut, Menu, X, Save, ToggleLeft, ToggleRight, Clock, Phone, Weight, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

// ─── Demo Data ───────────────────────────────────────────────────────────────
const DEMO_REQUESTS = [
  { id: 1, fromLocation: 'Hubli, Karnataka', toLocation: 'Bengaluru, Karnataka', cropType: 'Tomatoes', weight: 2.5, pickupDate: '2026-11-20', budget: 3500, requesterName: 'Raju Patil', status: 'pending' },
  { id: 2, fromLocation: 'Warangal, Telangana', toLocation: 'Hyderabad, Telangana', cropType: 'Rice', weight: 5, pickupDate: '2026-11-21', budget: 5000, requesterName: 'Meena Devi', status: 'pending' },
  { id: 3, fromLocation: 'Ludhiana, Punjab', toLocation: 'Delhi', cropType: 'Wheat', weight: 8, pickupDate: '2026-11-22', budget: 7200, requesterName: 'Suresh Kumar', status: 'pending' },
  { id: 4, fromLocation: 'Nashik, Maharashtra', toLocation: 'Mumbai, Maharashtra', cropType: 'Grapes', weight: 1.5, pickupDate: '2026-11-23', budget: 2800, requesterName: 'Anjali Singh', status: 'pending' },
  { id: 5, fromLocation: 'Coimbatore, Tamil Nadu', toLocation: 'Chennai, Tamil Nadu', cropType: 'Coconut', weight: 3, pickupDate: '2026-11-24', budget: 3200, requesterName: 'Priya Rajan', status: 'pending' },
  { id: 6, fromLocation: 'Jaipur, Rajasthan', toLocation: 'Ahmedabad, Gujarat', cropType: 'Mustard', weight: 6, pickupDate: '2026-11-25', budget: 6000, requesterName: 'Vikram Sharma', status: 'pending' },
];

const DISTRICTS = ['Bengaluru Urban', 'Mysuru', 'Hubli-Dharwad', 'Hyderabad', 'Warangal', 'Delhi', 'Ludhiana', 'Amritsar', 'Mumbai', 'Pune', 'Nashik', 'Chennai', 'Coimbatore', 'Jaipur', 'Jodhpur'];

const UPCOMING_TRIPS = [
  { id: 'T001', from: 'Hubli', to: 'Bengaluru', crop: 'Tomatoes', date: '20 Nov 2026', amount: 3500 },
  { id: 'T002', from: 'Warangal', to: 'Hyderabad', crop: 'Rice', date: '21 Nov 2026', amount: 5000 },
];

const COMPLETED_TRIPS_DATA = [
  { id: 'C001', from: 'Pune', to: 'Mumbai', crop: 'Onions', date: '10 Nov 2026', amount: 2800, rating: 5 },
  { id: 'C002', from: 'Ludhiana', to: 'Delhi', crop: 'Wheat', date: '8 Nov 2026', amount: 7000, rating: 4 },
  { id: 'C003', from: 'Jaipur', to: 'Ahmedabad', crop: 'Mustard', date: '5 Nov 2026', amount: 5500, rating: 5 },
  { id: 'C004', from: 'Chennai', to: 'Coimbatore', crop: 'Coconut', date: '1 Nov 2026', amount: 3100, rating: 4 },
];

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// ─── Overview Panel ───────────────────────────────────────────────────────────
function OverviewPanel({ myJobs }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Truck} label="Total Trips" value="47" color="bg-green-500" />
        <StatCard icon={IndianRupee} label="Earnings" value="₹1,24,500" color="bg-blue-500" />
        <StatCard icon={Briefcase} label="Active Jobs" value={myJobs.length} color="bg-orange-500" />
        <StatCard icon={Star} label="Rating" value="4.8 ★" color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Trips */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-600" /> Upcoming Trips
          </h3>
          <div className="space-y-3">
            {UPCOMING_TRIPS.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.from} → {t.to}</p>
                    <p className="text-xs text-gray-500">{t.crop} • {t.date}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-700">₹{t.amount.toLocaleString()}</span>
              </div>
            ))}
            {UPCOMING_TRIPS.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No upcoming trips</p>}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" /> Coverage Map
          </h3>
          <div className="bg-gray-100 rounded-xl h-48 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
            <MapPin className="w-10 h-10 mb-2 text-gray-300" />
            <p className="text-sm font-medium">Google Maps</p>
            <p className="text-xs">Map embed placeholder</p>
            <p className="text-xs mt-1 text-gray-300">Add Google Maps API key to enable</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── My Vehicle Panel ─────────────────────────────────────────────────────────
function MyVehiclePanel({ onToast }) {
  const saved = JSON.parse(localStorage.getItem('transporter_vehicle') || '{}');
  const [form, setForm] = useState({
    vehicleType: saved.vehicleType || 'Mini Truck',
    vehicleNumber: saved.vehicleNumber || '',
    capacity: saved.capacity || '',
    location: saved.location || '',
    coverageArea: saved.coverageArea || [],
    available: saved.available !== undefined ? saved.available : true,
  });

  const toggleDistrict = (d) => {
    setForm(f => ({
      ...f,
      coverageArea: f.coverageArea.includes(d)
        ? f.coverageArea.filter(x => x !== d)
        : [...f.coverageArea, d],
    }));
  };

  const handleSave = () => {
    localStorage.setItem('transporter_vehicle', JSON.stringify(form));
    onToast('Vehicle details saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800">My Vehicle Details</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
          <select
            value={form.vehicleType}
            onChange={e => setForm(f => ({ ...f, vehicleType: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {['Mini Truck', 'Truck', 'Tempo', 'Refrigerator Van', 'Bike'].map(v => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        {/* Vehicle Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
          <input
            type="text"
            placeholder="e.g. KA 05 AB 1234"
            value={form.vehicleNumber}
            onChange={e => setForm(f => ({ ...f, vehicleNumber: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (tons)</label>
          <input
            type="number"
            placeholder="e.g. 5"
            value={form.capacity}
            onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
            min="0"
            step="0.5"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
          <input
            type="text"
            placeholder="e.g. Bengaluru, Karnataka"
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Coverage Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Area (Districts)</label>
          <div className="flex flex-wrap gap-2">
            {DISTRICTS.map(d => (
              <button
                key={d}
                onClick={() => toggleDistrict(d)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  form.coverageArea.includes(d)
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          {form.coverageArea.length > 0 && (
            <p className="text-xs text-green-600 mt-2">{form.coverageArea.length} district(s) selected</p>
          )}
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-800">Availability Status</p>
            <p className="text-xs text-gray-500 mt-0.5">Toggle to show your availability to farmers</p>
          </div>
          <button
            onClick={() => setForm(f => ({ ...f, available: !f.available }))}
            className="flex items-center gap-2 focus:outline-none"
          >
            {form.available ? (
              <>
                <span className="text-sm font-semibold text-green-600">Available</span>
                <ToggleRight className="w-8 h-8 text-green-500" />
              </>
            ) : (
              <>
                <span className="text-sm font-semibold text-red-500">Busy</span>
                <ToggleLeft className="w-8 h-8 text-gray-400" />
              </>
            )}
          </button>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> Save Vehicle Details
        </button>
      </div>
    </div>
  );
}

// ─── Transport Requests Panel ─────────────────────────────────────────────────
function TransportRequestsPanel({ requests, onAccept, onDecline, myJobs }) {
  const [subTab, setSubTab] = useState('requests');
  const pending = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {['requests', 'myjobs'].map(t => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              subTab === t ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
            }`}
          >
            {t === 'requests' ? `Pending Requests (${pending.length})` : `My Jobs (${myJobs.length})`}
          </button>
        ))}
      </div>

      {subTab === 'requests' && (
        <div className="space-y-4">
          {pending.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No pending requests</p>
            </div>
          )}
          {pending.map(req => (
            <RequestCard key={req.id} req={req} onAccept={onAccept} onDecline={onDecline} />
          ))}
        </div>
      )}

      {subTab === 'myjobs' && (
        <div className="space-y-4">
          {myJobs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No accepted jobs yet</p>
            </div>
          )}
          {myJobs.map(req => (
            <div key={req.id} className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Accepted</span>
                  <p className="font-semibold text-gray-800 mt-2">{req.fromLocation} → {req.toLocation}</p>
                  <p className="text-sm text-gray-500 mt-1">{req.cropType} • {req.weight} tons • {req.pickupDate}</p>
                  <p className="text-xs text-gray-400 mt-1">By {req.requesterName}</p>
                </div>
                <p className="text-lg font-bold text-green-700">₹{req.budget.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RequestCard({ req, onAccept, onDecline }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-green-200 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-800 text-base">{req.fromLocation}</p>
          <div className="flex items-center gap-1 text-green-600 my-1">
            <ArrowRight className="w-3 h-3" />
          </div>
          <p className="font-semibold text-gray-800 text-base">{req.toLocation}</p>
        </div>
        <span className="text-lg font-bold text-green-700">₹{req.budget.toLocaleString()}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4 text-xs text-gray-500">
        <div className="flex items-center gap-1"><Package className="w-3 h-3" /> {req.cropType}</div>
        <div className="flex items-center gap-1"><Weight className="w-3 h-3" /> {req.weight} tons</div>
        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {req.pickupDate}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <User className="w-3 h-3" /> {req.requesterName}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onDecline(req.id)}
            className="px-4 py-1.5 rounded-xl text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
          >Decline</button>
          <button
            onClick={() => onAccept(req.id)}
            className="px-4 py-1.5 rounded-xl text-sm bg-green-600 text-white hover:bg-green-700 transition-colors"
          >Accept</button>
        </div>
      </div>
    </div>
  );
}

// ─── Completed Trips Panel ────────────────────────────────────────────────────
function CompletedTripsPanel() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-gray-800">Completed Trips</h2>
      {COMPLETED_TRIPS_DATA.map(trip => (
        <div key={trip.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{trip.from} → {trip.to}</p>
              <p className="text-xs text-gray-500">{trip.crop} • {trip.date}</p>
              <div className="flex items-center gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < trip.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
            </div>
          </div>
          <span className="text-base font-bold text-green-700">₹{trip.amount.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Profile Panel ────────────────────────────────────────────────────────────
function ProfilePanel({ onToast }) {
  const [profile, setProfile] = useState({
    name: 'Ramesh Transporter',
    phone: '+91 98765 43210',
    email: 'ramesh@example.com',
    city: 'Bengaluru, Karnataka',
    experience: '5',
    bio: 'Experienced transporter specializing in fresh produce logistics across Karnataka.',
  });

  const handleSave = () => {
    localStorage.setItem('transporter_profile', JSON.stringify(profile));
    onToast('Profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg">{profile.name}</p>
            <p className="text-sm text-gray-500">Transporter • 4.8 ★ Rating</p>
          </div>
        </div>
        {[
          { label: 'Full Name', key: 'name', placeholder: 'Your name' },
          { label: 'Phone Number', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
          { label: 'Email', key: 'email', placeholder: 'email@example.com', type: 'email' },
          { label: 'City / Location', key: 'city', placeholder: 'City, State' },
          { label: 'Years of Experience', key: 'experience', placeholder: '5', type: 'number' },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
            <input
              type={f.type || 'text'}
              placeholder={f.placeholder}
              value={profile[f.key]}
              onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TransporterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [myJobs, setMyJobs] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => setToast(msg);

  const handleAccept = (id) => {
    const req = requests.find(r => r.id === id);
    if (req) {
      setRequests(r => r.map(x => x.id === id ? { ...x, status: 'accepted' } : x));
      setMyJobs(j => [...j, { ...req, status: 'accepted' }]);
      showToast('Request accepted! Added to My Jobs.');
    }
  };

  const handleDecline = (id) => {
    setRequests(r => r.map(x => x.id === id ? { ...x, status: 'declined' } : x));
    showToast('Request declined.');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'vehicle', label: 'My Vehicle', icon: Truck },
    { id: 'requests', label: 'Transport Requests', icon: Package },
    { id: 'completed', label: 'Completed Trips', icon: CheckCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-100 min-h-screen transition-all duration-300 flex flex-col fixed top-16 left-0 z-30`}>
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            {sidebarOpen && <span className="font-bold text-green-700 text-sm">Transporter Portal</span>}
            <button onClick={() => setSidebarOpen(o => !o)} className="p-1 rounded-lg hover:bg-gray-100">
              {sidebarOpen ? <X className="w-4 h-4 text-gray-500" /> : <Menu className="w-4 h-4 text-gray-500" />}
            </button>
          </div>
          <nav className="flex-1 py-4 space-y-1 px-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span>{tab.label}</span>}
                </button>
              );
            })}
          </nav>
          {sidebarOpen && (
            <div className="p-4 border-t border-gray-100">
              <button className="w-full flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} p-6 transition-all duration-300`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Monday, 17 November 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-green-200">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">R</div>
            </div>
          </div>

          {/* Tab Panels */}
          {activeTab === 'overview' && <OverviewPanel myJobs={myJobs} />}
          {activeTab === 'vehicle' && <MyVehiclePanel onToast={showToast} />}
          {activeTab === 'requests' && (
            <TransportRequestsPanel
              requests={requests}
              onAccept={handleAccept}
              onDecline={handleDecline}
              myJobs={myJobs}
            />
          )}
          {activeTab === 'completed' && <CompletedTripsPanel />}
          {activeTab === 'profile' && <ProfilePanel onToast={showToast} />}
        </main>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
