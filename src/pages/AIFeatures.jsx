import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Upload, Leaf, BarChart2, Sprout, FlaskConical, TrendingUp, Loader2, CheckCircle, AlertTriangle, ChevronRight, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── Canned AI Responses ──────────────────────────────────────────────────────
const aiResponses = {
  default: "Thank you for your question! As an AI assistant for AgriLink, I can help with crop advice, disease identification, soil health, market prices, and more. Could you provide more details?",
  tomato: "🍅 **Best time to sow tomatoes:**\n- **Kharif (June-July):** Sow before monsoon for a September harvest.\n- **Rabi (October-November):** Sow for a January-February harvest.\n- **Spring (Jan-Feb):** For a March-April harvest.\n\nTomatoes prefer well-drained loamy soil with pH 6.0–7.0. Ensure 6+ hours of sunlight daily.",
  "leaf curl": "🌿 **Treating Leaf Curl in Plants:**\n1. **Identify cause:** Viral (Tomato Yellow Leaf Curl Virus), Mites, or Nutrient deficiency.\n2. **For viral:** Remove infected plants; spray neem oil to control whitefly vectors.\n3. **For mites:** Apply miticide (e.g., Abamectin) every 7 days.\n4. **Nutrient fix:** Spray micronutrient mix with zinc and boron.\n\nPrevention: Use resistant varieties and yellow sticky traps.",
  rice: "📊 **Current Rice Market Prices (Demo Data):**\n- Basmati: ₹3,800–₹4,200/quintal\n- Sona Masuri: ₹2,800–₹3,100/quintal\n- IR-64: ₹2,200–₹2,500/quintal\n\nPrices vary by region. Recommended selling time: Post-harvest (Nov-Dec) when prices stabilize after the initial glut.",
  hello: "👋 Hello! I'm your AgriLink AI Assistant. I can help you with:\n- 🌱 Crop sowing & growing advice\n- 🌿 Disease identification & treatment\n- 💰 Market prices & selling tips\n- 🌍 Soil & weather guidance\n\nWhat would you like to know today?",
};

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('tomato')) return aiResponses.tomato;
  if (lower.includes('leaf curl') || lower.includes('leafcurl')) return aiResponses['leaf curl'];
  if (lower.includes('rice') || lower.includes('price')) return aiResponses.rice;
  if (lower.includes('hello') || lower.includes('hi')) return aiResponses.hello;
  return aiResponses.default;
}

// ─── INITIAL CHAT MESSAGES ────────────────────────────────────────────────────
const INITIAL_MESSAGES = [
  { id: 1, role: 'bot', text: "👋 Hello! I'm your AgriLink AI Assistant. Ask me about crops, diseases, market prices, or farming tips!" },
  { id: 2, role: 'user', text: 'When should I sow tomatoes?' },
  { id: 3, role: 'bot', text: aiResponses.tomato },
];

const SUGGESTED = ['When to sow tomatoes?', 'How to treat leaf curl?', 'Best price for rice?'];

// ─── ChatBot Tab ──────────────────────────────────────────────────────────────
function ChatBotTab() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    const userMsg = { id: Date.now(), role: 'user', text: msg };
    setMessages(m => [...m, userMsg]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    setTyping(false);
    const botMsg = { id: Date.now() + 1, role: 'bot', text: getAIResponse(msg) };
    setMessages(m => [...m, botMsg]);
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {m.role === 'bot' && (
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
              m.role === 'user'
                ? 'bg-green-600 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
            }`}>
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex justify-start gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested */}
      <div className="px-4 pb-2 flex gap-2 flex-wrap">
        {SUGGESTED.map(s => (
          <button key={s} onClick={() => sendMessage(s)} className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors">
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about crops, diseases, prices..."
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button onClick={() => sendMessage()} className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-xl transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Crop Recommendation Tab ──────────────────────────────────────────────────
const INDIAN_STATES = ['Andhra Pradesh', 'Gujarat', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh'];
const SOIL_TYPES = ['Alluvial', 'Black (Regur)', 'Red & Yellow', 'Laterite', 'Sandy Loam', 'Clay Loam'];

const CROP_RECOMMENDATIONS = {
  default: [
    { name: 'Wheat', yield: '35-40 quintals/acre', price: '₹2,015/quintal (MSP)', period: '120-150 days', tips: 'Sow in Oct-Nov. Needs well-drained loamy soil. Irrigate at crown root initiation.' },
    { name: 'Tomato', yield: '25-30 tons/acre', price: '₹800-1,200/quintal', period: '90-120 days', tips: 'Stake plants for support. Apply calcium spray to prevent blossom end rot.' },
    { name: 'Chickpea', yield: '8-10 quintals/acre', price: '₹5,440/quintal (MSP)', period: '90-100 days', tips: 'Drought tolerant. Avoid waterlogging. Best in black cotton soil.' },
  ],
};

function CropAdvisorTab() {
  const [form, setForm] = useState({ state: '', season: 'Kharif', soil: '', rainfall: 'Medium', land: '' });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResults(null);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setResults(CROP_RECOMMENDATIONS.default);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">Select state...</option>
            {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
          <select value={form.season} onChange={e => setForm(f => ({ ...f, season: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            {['Kharif', 'Rabi', 'Zaid'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
          <select value={form.soil} onChange={e => setForm(f => ({ ...f, soil: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">Select soil type...</option>
            {SOIL_TYPES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall</label>
          <select value={form.rainfall} onChange={e => setForm(f => ({ ...f, rainfall: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            {['Low', 'Medium', 'High'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Land Size (acres)</label>
          <input type="number" placeholder="e.g. 5" value={form.land} onChange={e => setForm(f => ({ ...f, land: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <div className="flex items-end">
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Sprout className="w-4 h-4" /> Get Recommendations</>}
          </button>
        </div>
      </div>

      {results && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">🌱 Recommended Crops</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((crop, i) => (
              <div key={i} className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <Sprout className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">{crop.name}</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Expected Yield</span><span className="font-medium text-gray-800">{crop.yield}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Market Price</span><span className="font-medium text-green-700">{crop.price}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Growing Period</span><span className="font-medium text-gray-800">{crop.period}</span></div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">{crop.tips}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Disease Detection Tab ────────────────────────────────────────────────────
const DEMO_DISEASE = {
  name: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
  confidence: 92,
  symptoms: ['Upward curling of leaves', 'Yellow margins on leaves', 'Stunted plant growth', 'Reduced fruit set'],
  treatment: ['Remove and destroy infected plants immediately', 'Apply imidacloprid (0.3 ml/L) to control whitefly vector', 'Use reflective mulches to repel whiteflies', 'Spray neem oil (5 ml/L) every 7 days'],
  prevention: ['Use TYLCV-resistant varieties (e.g., Arka Rakshak)', 'Install insect-proof netting in nurseries', 'Maintain 60+ day crop-free period between seasons'],
};

function DiseaseDetectTab() {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setImage(e.target.result);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setResult(DEMO_DISEASE);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragging ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-400 hover:bg-gray-50'}`}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        {image ? (
          <div className="relative inline-block">
            <img src={image} alt="Preview" className="max-h-48 rounded-xl mx-auto" />
            <button onClick={e => { e.stopPropagation(); setImage(null); setResult(null); }} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-medium text-gray-600">Drag & drop a plant photo here</p>
            <p className="text-sm text-gray-400 mt-1">or click to browse • JPG, PNG up to 10MB</p>
          </>
        )}
      </div>

      {image && (
        <button onClick={handleAnalyze} disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing plant disease...</>
          ) : (
            <><FlaskConical className="w-4 h-4" /> Analyze Plant</>
          )}
        </button>
      )}

      {/* Result */}
      {result && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">Disease Detected</span>
              <h3 className="font-bold text-gray-800 text-lg mt-2">{result.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-orange-600">{result.confidence}%</p>
              <p className="text-xs text-gray-500">Confidence</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-orange-500" /> Symptoms</h4>
              <ul className="space-y-1">
                {result.symptoms.map((s, i) => <li key={i} className="text-gray-600 text-xs">• {s}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Treatment</h4>
              <ul className="space-y-1">
                {result.treatment.map((t, i) => <li key={i} className="text-gray-600 text-xs">• {t}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-1"><Leaf className="w-3 h-3 text-blue-500" /> Prevention</h4>
              <ul className="space-y-1">
                {result.prevention.map((p, i) => <li key={i} className="text-gray-600 text-xs">• {p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sample Results */}
      {!result && (
        <div>
          <p className="text-sm text-gray-500 mb-3">📌 Sample detection results (upload a photo to analyze):</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: 'Powdery Mildew', confidence: 88, crop: 'Wheat' },
              { name: 'Early Blight', confidence: 95, crop: 'Tomato' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-60">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 text-sm">{s.name}</span>
                  <span className="text-orange-600 font-bold text-sm">{s.confidence}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Detected in: {s.crop}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Soil Analyzer Tab ────────────────────────────────────────────────────────
function SoilAnalyzerTab() {
  const [form, setForm] = useState({ ph: 6.5, nitrogen: 'Medium', phosphorus: 'Medium', potassium: 'High', moisture: 45 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    // Score calculation based on inputs
    let score = 70;
    if (form.ph >= 6 && form.ph <= 7) score += 10;
    if (form.nitrogen === 'High') score += 5;
    if (form.potassium === 'High') score += 5;
    if (form.moisture > 30 && form.moisture < 70) score += 5;
    score = Math.min(100, score);
    setResult({ score, crops: ['Wheat', 'Chickpea', 'Mustard', 'Sunflower'], recs: ['Add organic compost to improve nitrogen levels', 'Maintain irrigation to keep moisture between 40-60%', 'Apply 20 kg/acre of single superphosphate for phosphorus boost'] });
  };

  const scoreColor = result ? (result.score >= 80 ? 'text-green-600' : result.score >= 60 ? 'text-yellow-600' : 'text-red-600') : '';
  const gaugeDeg = result ? (result.score / 100) * 180 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Soil pH: <span className="text-green-600 font-bold">{form.ph}</span></label>
          <input type="range" min={4} max={9} step={0.1} value={form.ph} onChange={e => setForm(f => ({ ...f, ph: parseFloat(e.target.value) }))} className="w-full accent-green-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>4 (Acidic)</span><span>9 (Alkaline)</span></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moisture (%): <span className="text-green-600 font-bold">{form.moisture}%</span></label>
          <input type="range" min={0} max={100} value={form.moisture} onChange={e => setForm(f => ({ ...f, moisture: parseInt(e.target.value) }))} className="w-full accent-green-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0%</span><span>100%</span></div>
        </div>
        {[
          { key: 'nitrogen', label: 'Nitrogen (N)' },
          { key: 'phosphorus', label: 'Phosphorus (P)' },
          { key: 'potassium', label: 'Potassium (K)' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map(opt => (
                <button key={opt} onClick={() => setForm(f => ({ ...f, [key]: opt }))} className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${form[key] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}>{opt}</button>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-end">
          <button onClick={handleAnalyze} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Soil...</> : <><FlaskConical className="w-4 h-4" /> Analyze Soil</>}
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Gauge */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <h4 className="font-semibold text-gray-700 mb-4">Soil Health Score</h4>
            <div className="relative w-32 h-16 overflow-hidden mb-4">
              <svg viewBox="0 0 120 60" className="w-full">
                <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
                <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke={result.score >= 80 ? '#16a34a' : result.score >= 60 ? '#d97706' : '#dc2626'} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(result.score / 100) * 157} 157`} />
              </svg>
            </div>
            <span className={`text-4xl font-bold ${scoreColor}`}>{result.score}</span>
            <span className="text-sm text-gray-500">/ 100</span>
            <span className={`text-sm font-medium mt-1 ${scoreColor}`}>{result.score >= 80 ? 'Excellent' : result.score >= 60 ? 'Good' : 'Needs Improvement'}</span>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-3">Recommendations</h4>
            <ul className="space-y-2">
              {result.recs.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{r}</li>
              ))}
            </ul>
          </div>

          {/* Suitable Crops */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-3">Suitable Crops</h4>
            <div className="flex flex-wrap gap-2">
              {result.crops.map(c => (
                <span key={c} className="bg-green-50 text-green-700 border border-green-200 text-sm px-3 py-1.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Market Intel Tab ─────────────────────────────────────────────────────────
const MONTHS = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
const DEMAND_DATA = [65, 80, 75, 90, 85, 70];
const PRICE_DATA = [2200, 2400, 2350, 2600, 2550, 2300];

function MarketIntelTab() {
  const [state, setState] = useState('');
  const [crop, setCrop] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleForecast = async () => {
    setLoading(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setResult({ bestMonth: 'March', price: '₹2,600/quintal', trend: '+18.2%' });
  };

  const maxDemand = Math.max(...DEMAND_DATA);
  const maxPrice = Math.max(...PRICE_DATA);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select value={state} onChange={e => setState(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">Select state...</option>
            {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
          <select value={crop} onChange={e => setCrop(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">Select crop...</option>
            {['Rice', 'Wheat', 'Tomato', 'Potato', 'Onion', 'Soybean', 'Cotton', 'Maize'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={handleForecast} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Forecasting...</> : <><TrendingUp className="w-4 h-4" /> Forecast</>}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-5">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Best Harvest Month', value: result.bestMonth, color: 'bg-green-50 text-green-700' },
              { label: 'Peak Price', value: result.price, color: 'bg-blue-50 text-blue-700' },
              { label: 'Price Trend', value: result.trend, color: 'bg-purple-50 text-purple-700' },
            ].map(c => (
              <div key={c.label} className={`${c.color} rounded-2xl p-4 text-center`}>
                <p className="text-xs font-medium opacity-70">{c.label}</p>
                <p className="text-xl font-bold mt-1">{c.value}</p>
              </div>
            ))}
          </div>

          {/* Demand Bar Chart (SVG) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-4">Predicted Demand — Next 6 Months</h4>
            <svg viewBox="0 0 400 180" className="w-full">
              {DEMAND_DATA.map((val, i) => {
                const barH = (val / maxDemand) * 120;
                const x = 30 + i * 60;
                const y = 140 - barH;
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={36} height={barH} rx={6} fill={i === 2 ? '#16a34a' : '#86efac'} />
                    <text x={x + 18} y={y - 6} textAnchor="middle" fontSize={10} fill="#374151">{val}%</text>
                    <text x={x + 18} y={158} textAnchor="middle" fontSize={10} fill="#6b7280">{MONTHS[i]}</text>
                  </g>
                );
              })}
              <line x1={20} y1={140} x2={390} y2={140} stroke="#e5e7eb" strokeWidth={1} />
              <text x={10} y={144} fontSize={9} fill="#9ca3af">0%</text>
              <text x={10} y={24} fontSize={9} fill="#9ca3af">100%</text>
            </svg>
          </div>

          {/* Price Trend (SVG line) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-4">Market Price Trend (₹/quintal)</h4>
            <svg viewBox="0 0 400 160" className="w-full">
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86efac" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#86efac" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid */}
              {[0, 1, 2, 3].map(i => (
                <line key={i} x1={30} y1={20 + i * 30} x2={390} y2={20 + i * 30} stroke="#f3f4f6" strokeWidth={1} />
              ))}
              {/* Area fill */}
              <path
                d={`M ${PRICE_DATA.map((v, i) => `${30 + i * 60},${130 - ((v - 2000) / 700) * 110}`).join(' L ')} L ${30 + 5 * 60},130 L 30,130 Z`}
                fill="url(#priceGrad)"
              />
              {/* Line */}
              <polyline
                points={PRICE_DATA.map((v, i) => `${30 + i * 60},${130 - ((v - 2000) / 700) * 110}`).join(' ')}
                fill="none" stroke="#16a34a" strokeWidth={2.5} strokeLinejoin="round"
              />
              {/* Dots + Labels */}
              {PRICE_DATA.map((v, i) => {
                const cx = 30 + i * 60;
                const cy = 130 - ((v - 2000) / 700) * 110;
                return (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r={4} fill="#16a34a" />
                    <text x={cx} y={cy - 8} textAnchor="middle" fontSize={9} fill="#374151">₹{v}</text>
                    <text x={cx} y={148} textAnchor="middle" fontSize={10} fill="#6b7280">{MONTHS[i]}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const TABS = [
  { id: 'chat', label: 'AI Assistant', icon: Bot },
  { id: 'crop', label: 'Crop Advisor', icon: Sprout },
  { id: 'disease', label: 'Disease Detect', icon: Leaf },
  { id: 'soil', label: 'Soil Analyzer', icon: FlaskConical },
  { id: 'market', label: 'Market Intel', icon: TrendingUp },
];

export default function AIFeatures() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-16 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">AI-Powered</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Features Hub</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Smart tools to empower farmers, buyers, and transporters with data-driven insights.</p>
        </div>

        {/* Prototype Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🤖</span>
          <div>
            <p className="font-semibold text-amber-800">AI-Powered Prototypes — Demo Mode</p>
            <p className="text-sm text-amber-700 mt-0.5">These features are AI-powered prototypes. Responses are demonstrations only and should not be used as professional agricultural or medical advice. Real AI integration coming soon.</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            {activeTab === 'chat' && <ChatBotTab />}
            {activeTab === 'crop' && <CropAdvisorTab />}
            {activeTab === 'disease' && <DiseaseDetectTab />}
            {activeTab === 'soil' && <SoilAnalyzerTab />}
            {activeTab === 'market' && <MarketIntelTab />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
