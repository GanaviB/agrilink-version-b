import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { CartProvider } from './hooks/useCart';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import CropDetail from './pages/CropDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import TransporterDashboard from './pages/TransporterDashboard';
import AIFeatures from './pages/AIFeatures';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

// Helper to scroll to top upon page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Redirect /dashboard based on current user role
function DashboardRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (user?.role === 'farmer') return <Navigate to="/dashboard/farmer" replace />;
  if (user?.role === 'transporter') return <Navigate to="/dashboard/transporter" replace />;
  return <Navigate to="/dashboard/buyer" replace />;
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<CropDetail />} />
          <Route path="/ai" element={<AIFeatures />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route
            path="/dashboard/farmer"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/buyer"
            element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/transporter"
            element={
              <ProtectedRoute allowedRoles={['transporter']}>
                <TransporterDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </ToastProvider>
  );
}
