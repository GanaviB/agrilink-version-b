import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, ShoppingCart, ArrowLeft, Leaf, ShieldCheck, Truck, Star,
  Share2, Heart, CheckCircle2, ChevronRight, Phone, MessageSquare
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CropCard from '../components/CropCard';
import StarRating from '../components/StarRating';
import Badge from '../components/Badge';
import crops from '../data/crops';
import transporters from '../data/transporters';
import { useCart } from '../hooks/useCart';
import { useToast } from '../components/ToastProvider';
import { useAuth } from '../hooks/useAuth';

export default function CropDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Find current crop
  const crop = crops.find((c) => String(c.id) === String(id)) || crops[0];

  if (!crop) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Crop Not Found</h2>
          <p className="text-gray-500 mb-6">The crop listing you requested does not exist or has been removed.</p>
          <Link to="/marketplace" className="btn-primary">Back to Marketplace</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Thumbnails gallery (using Unsplash agriculture variants)
  const images = [
    crop.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=800&q=80',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
  ];

  // Similar crops (same category or top featured)
  const similarCrops = crops
    .filter((c) => c.category === crop.category && c.id !== crop.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(crop, quantity);
    addToast(`Added ${quantity} ${crop.unit || 'kg'} of ${crop.name} to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(crop, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/marketplace" className="hover:text-green-600 transition-colors">Marketplace</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium truncate">{crop.name}</span>
        </nav>

        {/* Product Hero */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={images[activeImgIndex]}
                alt={crop.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow hover:scale-110 transition-transform text-red-500"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
              </button>
              {crop.organic && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white shadow">
                    <Leaf className="w-3.5 h-3.5" /> Certified Organic
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImgIndex === idx ? 'border-green-600 shadow-md scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge color="blue" size="md">{crop.category}</Badge>
                {crop.inStock ? (
                  <Badge color="green" size="md">In Stock</Badge>
                ) : (
                  <Badge color="red" size="md">Out of Stock</Badge>
                )}
                <span className="text-xs text-gray-500 ml-auto flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-green-600" /> {crop.location}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{crop.name}</h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-extrabold text-green-700">₹{crop.price}</span>
                <span className="text-gray-500 font-medium">/ {crop.unit || 'kg'}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium border border-amber-200">
                  Best APMC Rate
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <StarRating rating={crop.farmerRating || 4.7} size="md" />
                <span className="text-sm font-semibold text-gray-700">{crop.farmerRating || 4.7}</span>
                <span className="text-xs text-gray-400">({(crop.farmerRating * 24).toFixed(0)} verified reviews)</span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {crop.description ||
                    `Premium grade ${crop.name} harvested freshly in ${crop.location}. Sorted, cleaned, and vacuum packed for extended freshness without chemical preservatives.`}
                </p>
              </div>

              {/* Stock Available */}
              <div className="mb-6 bg-green-50/60 rounded-xl p-3 border border-green-100">
                <div className="flex justify-between text-xs text-gray-700 font-semibold mb-1">
                  <span>Available Batch Quantity:</span>
                  <span className="text-green-800">{crop.quantity} {crop.unit || 'kg'}</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* Quantity Picker & CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-semibold text-gray-900 min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(crop.quantity || 1000, q + 1))}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!crop.inStock}
                  className="flex-1 w-full btn-secondary flex items-center justify-center gap-2 py-3.5"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!crop.inStock}
                  className="flex-1 w-full btn-primary flex items-center justify-center gap-2 py-3.5"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Farmer Card */}
            <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {crop.farmer?.[0] || 'F'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-800 text-sm">{crop.farmer}</span>
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500">Verified Farmer • {crop.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${crop.farmerPhone || '+919876543210'}`}
                  className="p-2.5 rounded-xl border border-gray-300 hover:bg-white text-gray-700 transition"
                  title="Call Farmer"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="p-2.5 rounded-xl border border-gray-300 hover:bg-white text-gray-700 transition"
                  title="Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Transport & Guarantee Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Direct Transport Available</h4>
              <p className="text-xs text-gray-500 mt-1">
                Verified local transporters available from {crop.location}. Estimated delivery 2-4 days.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Fair Price & Quality Check</h4>
              <p className="text-xs text-gray-500 mt-1">
                Direct trade without middleman markups. Grade A certified crop inspection.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Farm-Fresh Guarantee</h4>
              <p className="text-xs text-gray-500 mt-1">
                Harvested within 48 hours of order confirmation. 100% natural handling.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Crops Section */}
        {similarCrops.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Similar Crops</h2>
                <p className="text-sm text-gray-500">More high-quality {crop.category} listings</p>
              </div>
              <Link to={`/marketplace?category=${crop.category}`} className="text-sm font-semibold text-green-700 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCrops.map((c) => (
                <CropCard
                  key={c.id}
                  crop={c}
                  onAddToCart={(item) => {
                    addToCart(item, 1);
                    addToast(`Added ${item.name} to cart!`, 'success');
                  }}
                  onViewDetails={(item) => navigate(`/marketplace/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
