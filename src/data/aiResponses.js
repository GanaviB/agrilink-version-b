export const CHATBOT_RESPONSES = {
  greeting: [
    "Namaste! 🌾 I'm Krishi, your AgriLink AI assistant. How can I help you today? I can answer questions about crop care, disease identification, weather impact, market prices, and more!",
    "Hello, farmer friend! 🌿 Welcome to AgriLink. I'm here to help you with crop advice, pest management, soil health, and connecting with buyers. What would you like to know?",
  ],

  cropCare: {
    rice: "🌾 **Rice Care Tips:**\n- Water management: Keep 2–5 cm of water during vegetative stage\n- Fertilizer: Apply N-P-K at planting; top-dress with urea at tillering\n- Weed control: Use hand-weeding or herbicides within 3 weeks of transplanting\n- Watch for: Brown plant hopper, blast disease, and sheath blight\n- Harvest when 80–85% of grains turn golden",
    wheat: "🌿 **Wheat Care Tips:**\n- Sow in Oct–Nov for Rabi season; optimal soil temp 20–25°C\n- Irrigation: Critical at crown root initiation, jointing, and grain filling\n- Fertilizer: Balanced NPK at sowing; urea top-dress at tillering\n- Pest alert: Aphids, armyworm, and rust fungus in humid conditions\n- Harvest at 12–14% grain moisture",
    maize: "🌽 **Maize Care Tips:**\n- Plant when soil temperature is above 18°C\n- Spacing: 60 cm between rows, 25 cm between plants\n- Needs 500–800 mm rainfall or regular irrigation\n- Fertilizer: High nitrogen requirement — apply in 3 splits\n- Watch for: Fall armyworm, stalk borer, and downy mildew",
    vegetables: "🥦 **Vegetable Care:**\n- Ensure well-drained, fertile soil with pH 6.0–7.0\n- Regular watering: Drip irrigation preferred to reduce foliar diseases\n- Use organic mulch to retain moisture and suppress weeds\n- Pest monitoring: Check weekly for aphids, whiteflies, and caterpillars\n- Harvest at the right maturity for best market price",
    fruits: "🍎 **Fruit Orchard Care:**\n- Pruning: Remove dead wood after fruiting season\n- Nutrient management: Apply compost and balanced fertilizers pre-flowering\n- Irrigation: Drip or sprinkler during fruit development\n- Disease prevention: Fungicide spray before monsoon\n- Harvest at correct ripeness stage for long shelf life",
    spices: "🌶️ **Spice Crop Care:**\n- Turmeric & Ginger: Plant rhizomes in well-drained loamy soil\n- Chilli: Requires warm climate, pH 6–7, stake tall plants\n- Cumin: Drought-tolerant; avoid waterlogging\n- Cardamom: Requires shade, high humidity, and rich organic soil\n- Harvest when colour and aroma are at their peak",
  },

  diseaseResponses: {
    blight: "🔬 **Blight Disease Detected:**\nSymptoms: Water-soaked lesions turning brown/black on leaves.\n\n**Treatment:**\n1. Remove infected plant parts immediately\n2. Apply copper-based fungicide (Mancozeb 2.5 g/L)\n3. Improve air circulation by thinning plants\n4. Avoid overhead irrigation\n5. Use disease-resistant varieties next season\n\nSeverity: Moderate – Act within 48 hours!",
    rust: "🔬 **Rust Fungus Identified:**\nOrange/brown pustules on leaf undersides – a classic rust infection.\n\n**Treatment:**\n1. Apply Propiconazole or Tebuconazole fungicide\n2. Spray early morning or evening\n3. Destroy infected crop residue after harvest\n4. Avoid planting in the same location next year\n5. Use certified rust-resistant seeds\n\nSeverity: High – Immediate action needed!",
    aphids: "🐛 **Aphid Infestation Found:**\nSmall soft-bodied insects clustering under leaves and on new growth.\n\n**Treatment:**\n1. Spray Neem oil solution (5 ml/L water)\n2. Introduce natural predators: Ladybirds, lacewings\n3. Insecticidal soap spray for severe infestations\n4. Remove heavily infested shoots\n5. Avoid excess nitrogen fertilization\n\nSeverity: Low-Moderate – Weekly monitoring recommended",
    yellowing: "🍂 **Leaf Yellowing Diagnosis:**\nYellowing leaves may indicate nutrient deficiency or root issues.\n\n**Likely Causes & Solutions:**\n1. **Nitrogen deficiency**: Apply urea (top-dress)\n2. **Iron chlorosis**: Use chelated iron spray\n3. **Overwatering**: Improve drainage, reduce irrigation\n4. **Root rot**: Check roots; apply fungicide if rotting\n5. **pH imbalance**: Test soil and lime/acidify accordingly\n\nGet a soil test for precise diagnosis!",
    mildew: "🍄 **Powdery Mildew Detected:**\nWhite powdery coating on leaf surfaces – fungal infection.\n\n**Treatment:**\n1. Spray diluted Neem oil or baking soda solution (5 g/L)\n2. Apply Sulphur-based fungicide in cool weather\n3. Avoid wetting foliage during evening watering\n4. Improve plant spacing for better airflow\n5. Remove and burn infected plant parts\n\nSeverity: Moderate – Treat within 72 hours",
  },

  weatherAdvice: {
    drought: "☀️ **Drought Advisory:**\n- Switch to drip or micro-irrigation immediately\n- Apply mulch (5–8 cm) to conserve soil moisture\n- Prioritize watering during morning hours\n- Consider drought-tolerant varieties for next season\n- Apply potassium foliar spray to build stress tolerance\n- Delay fertilization until rain returns",
    flood: "🌧️ **Flood/Waterlogging Advisory:**\n- Drain standing water from fields using drainage channels\n- After draining, apply urea to replenish leached nitrogen\n- Spray fungicide to prevent root rot and stem diseases\n- Do not apply any fertilizer until plants recover\n- Reseed damaged areas with pre-germinated seeds\n- Document losses for insurance claims",
    frost: "❄️ **Frost Warning:**\n- Apply irrigation before frost (wet soil holds heat better)\n- Cover sensitive crops with plastic mulch or cloth\n- Avoid pruning before or after frost events\n- Spray anti-transpirant solution on leaves\n- Apply potassium-rich fertilizer to harden plants\n- Harvest mature crops before temperature drops further",
    heatwave: "🌡️ **Heatwave Advisory:**\n- Water crops in early morning and late evening only\n- Apply shade nets over sensitive vegetables and fruits\n- Increase irrigation frequency but reduce quantity per session\n- Avoid applying urea in extreme heat\n- Monitor for increased pest activity in stressed plants\n- Harvest fruits early morning when temperatures are lower",
  },

  generalHelp:
    "🌱 **I can help you with:**\n\n1. 🌾 **Crop Care** – Rice, Wheat, Maize, Vegetables, Fruits, Spices\n2. 🔬 **Disease Identification** – Upload a photo or describe symptoms\n3. ☁️ **Weather Advice** – Drought, flood, frost, heatwave tips\n4. 💰 **Market Prices** – Live price trends and best selling times\n5. 🛒 **Buying & Selling** – How to list crops and find buyers\n6. 🚚 **Transport** – Book a vehicle for your produce\n7. 🧪 **Soil Testing** – Interpret soil test results\n\nType your question or select a topic above!",
};

export const CROP_RECOMMENDATIONS = [
  {
    id: 1,
    crop: "Basmati Rice",
    season: "Kharif (Jun–Nov)",
    region: "Punjab, Haryana, UP",
    expectedYield: "3.5–4.5 tons/ha",
    marketPrice: "₹65–80/kg",
    profitIndex: 4.5,
    tip: "Use SRI (System of Rice Intensification) method to increase yield by 30%.",
  },
  {
    id: 2,
    crop: "Tomato",
    season: "Year-round (best Oct–Jan)",
    region: "AP, Karnataka, Maharashtra",
    expectedYield: "25–40 tons/ha",
    marketPrice: "₹15–60/kg (variable)",
    profitIndex: 3.8,
    tip: "Install drip irrigation and use mulching to reduce water use by 50%.",
  },
  {
    id: 3,
    crop: "Turmeric",
    season: "Kharif (Apr–Jan)",
    region: "AP, Tamil Nadu, Odisha",
    expectedYield: "20–25 tons/ha (raw)",
    marketPrice: "₹120–200/kg (dry)",
    profitIndex: 4.7,
    tip: "Organic turmeric fetches 30–50% premium in export and urban markets.",
  },
  {
    id: 4,
    crop: "Wheat",
    season: "Rabi (Oct–Mar)",
    region: "Punjab, Haryana, UP, MP",
    expectedYield: "4–5 tons/ha",
    marketPrice: "₹25–35/kg",
    profitIndex: 3.5,
    tip: "Zero-tillage farming saves ₹3,000–5,000/acre and conserves soil moisture.",
  },
  {
    id: 5,
    crop: "Black Pepper",
    season: "Perennial (harvest May–Jan)",
    region: "Kerala, Karnataka, Tamil Nadu",
    expectedYield: "1–3 kg/vine",
    marketPrice: "₹400–600/kg",
    profitIndex: 5.0,
    tip: "Support vines on living standards like betel nut for maximum productivity.",
  },
];

export const SOIL_ANALYSIS_RESULTS = [
  {
    id: 1,
    soilType: "Alluvial Soil",
    pH: 7.2,
    nitrogen: "Medium (280 kg/ha)",
    phosphorus: "Low (12 kg/ha)",
    potassium: "High (340 kg/ha)",
    organicMatter: "1.8%",
    recommendation: "Add phosphorus-rich fertilizer (SSP). Suitable for wheat, rice, and vegetables.",
    suitableCrops: ["Wheat", "Rice", "Sugarcane", "Vegetables"],
  },
  {
    id: 2,
    soilType: "Red Laterite Soil",
    pH: 5.8,
    nitrogen: "Low (180 kg/ha)",
    phosphorus: "Medium (22 kg/ha)",
    potassium: "Medium (180 kg/ha)",
    organicMatter: "0.9%",
    recommendation: "Apply lime to raise pH. Add organic matter (FYM 10 tons/ha). Increase nitrogen fertilization.",
    suitableCrops: ["Groundnut", "Cotton", "Pulses", "Millets"],
  },
  {
    id: 3,
    soilType: "Black Cotton Soil",
    pH: 7.8,
    nitrogen: "Medium (260 kg/ha)",
    phosphorus: "Medium (18 kg/ha)",
    potassium: "High (380 kg/ha)",
    organicMatter: "1.2%",
    recommendation: "Improve drainage. Use gypsum to correct alkalinity. Ideal for cotton and sorghum.",
    suitableCrops: ["Cotton", "Sorghum", "Wheat", "Chilli"],
  },
  {
    id: 4,
    soilType: "Sandy Loam",
    pH: 6.5,
    nitrogen: "High (320 kg/ha)",
    phosphorus: "High (28 kg/ha)",
    potassium: "Low (120 kg/ha)",
    organicMatter: "2.4%",
    recommendation: "Add potash (MOP). Good drainage – great for root vegetables and groundnut.",
    suitableCrops: ["Groundnut", "Potato", "Carrot", "Onion"],
  },
];
