# AgriLink – Agricultural Marketplace (Version B)

A modern, responsive, agricultural marketplace connecting farmers directly to buyers and transporters.

## 🚀 Key Features

1. **Homepage**
   - Hero banner: *"Connecting Farmers Directly to Buyers"* with CTAs and verified trust badges
   - Browse by category (Rice, Wheat, Maize, Vegetables, Fruits, Pulses, Spices)
   - Season's popular crops showcase with live prices and ratings
   - 3-step *How AgriLink Works* process flow
   - Benefits breakdown for Farmers and Buyers
   - AI Agricultural assistance feature banner
   - Verified farmer & buyer testimonials
   - Multilingual UI support (English, Kannada, Hindi, Telugu)

2. **Role-Based Authentication (Demo)**
   - Role selection: **Farmer**, **Buyer**, **Transporter**
   - Form validation with instant inline error handling
   - Demo credentials for testing:
     - **Farmer:** `farmer@agrilink.in` / `password123`
     - **Buyer:** `buyer@agrilink.in` / `password123`
     - **Transporter:** `transporter@agrilink.in` / `password123`
     *(Any valid email/password can also be registered or logged in)*

3. **Farmer Dashboard (`/dashboard/farmer`)**
   - Revenue overview, monthly sales trends, active listings, order statistics
   - **Add New Crop** with image, quantity, price, unit, location, and organic certification
   - **My Crops** management (pause/activate, delete, view metrics)
   - **Orders Management** with multi-step tracking updates (Pending → Confirmed → In Transit → Delivered)
   - Farmer profile configuration

4. **Buyer Dashboard (`/dashboard/buyer`) & Marketplace (`/marketplace`)**
   - Filter by category, price range, organic certification, and sort orders
   - Detailed product view (`/marketplace/:id`) with image gallery, farmer info, stock availability, and similar crops
   - Cart management with local persistence (`agrilink_cart`)
   - Order history and 4-step delivery tracking timeline

5. **Transporter Module (`/dashboard/transporter`)**
   - Vehicle registration & capacity management
   - Transport jobs board: view, accept, and complete freight requests
   - Coverage area and active trip tracking

6. **Prototype AI Features (`/ai`)**
   - **AI Chatbot**: Real-time advice on crop sowing, prices, and pest control
   - **Crop Advisor**: Multi-parameter recommendation engine based on state, season, soil type, and rainfall
   - **Plant Disease Scanner**: Photo upload interface with disease identification, confidence score, and treatment tips
   - **Soil Analyzer**: N-P-K and pH health score gauge with tailored fertilizer recommendations
   - **Demand Forecasting**: 6-month projected demand and price trends

7. **Cart & Demo Checkout (`/cart`, `/orders`)**
   - Promo coupon support (use `AGRI10` for 10% off)
   - Multi-option payment UI (UPI/QR, Credit/Debit Cards, Net Banking, Cash on Delivery)
   - Escrow security guarantee and order confirmation

8. **Information Pages**
   - **About Us (`/about`)**: Story, animated statistics, team profiles, and mission
   - **Contact Us (`/contact`)**: Form with validation, map preview, and FAQs
   - **Help Centre (`/help`)**: Categorized guides and interactive FAQ accordion

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS** (custom green & earth agriculture palette)
- **React Router v6**
- **Lucide React** icons

---

## 💻 Local Development Setup

```bash
# 1. Navigate to project directory
cd "c:\Users\Ganavi\OneDrive\Desktop\Agrilink-version-B"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 🌐 Independent Vercel Deployment

This project includes `vercel.json` configured with SPA routing rewrites:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

To deploy independently:
1. Connect this folder or repository as a new project in your Vercel dashboard.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy! No environment variables or external API keys are required.
