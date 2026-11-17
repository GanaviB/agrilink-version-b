import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, Truck, MapPin, Calendar, Clock,
  CheckCircle2, XCircle, ChevronRight, ArrowLeft, RefreshCw
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { SAMPLE_ORDERS } from '../data/orders';
import { useCart } from '../hooks/useCart';
import { useToast } from '../components/ToastProvider';
import crops from '../data/crops';

export default function Orders() {
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'All') return true;
    return o.status === statusFilter;
  });

  const handleCancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
    addToast(`Order ${orderId} has been cancelled.`, 'info');
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }
  };

  const handleReorder = (cropName) => {
    const matchedCrop = crops.find((c) => c.name.toLowerCase() === cropName.toLowerCase()) || crops[0];
    addToCart(matchedCrop, 1);
    addToast(`Added ${matchedCrop.name} to cart!`, 'success');
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
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track farm dispatches, delivery statuses and previous harvests.
            </p>
          </div>
          <Link to="/marketplace" className="btn-secondary text-sm py-2 px-4 self-start">
            Browse More Crops
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {['All', 'Pending', 'Confirmed', 'In Transit', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto my-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">No orders found</h3>
            <p className="text-sm text-gray-500 mb-6">There are no orders matching the selected filter.</p>
            <button
              onClick={() => setStatusFilter('All')}
              className="btn-primary text-sm py-2 px-6"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">
                      {order.id}
                    </span>
                    <Badge
                      color={
                        order.status === 'Delivered'
                          ? 'green'
                          : order.status === 'In Transit'
                          ? 'blue'
                          : order.status === 'Cancelled'
                          ? 'red'
                          : 'amber'
                      }
                      size="md"
                    >
                      {order.status}
                    </Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {order.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">{order.cropName}</h3>
                  <p className="text-xs text-gray-500">
                    Farmer: <span className="font-semibold text-gray-700">{order.farmer}</span> •
                    Quantity: <span className="font-semibold text-gray-700">{order.quantity} kg</span> •
                    Price: <span className="font-semibold text-gray-700">₹{order.price}/kg</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-gray-400 block">Total Amount</span>
                    <span className="text-xl font-extrabold text-green-700">₹{order.total}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="btn-secondary text-xs py-2 px-4"
                    >
                      Track Order
                    </button>
                    <button
                      onClick={() => handleReorder(order.cropName)}
                      className="btn-outline text-xs py-2 px-3 flex items-center gap-1"
                      title="Reorder same crop"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reorder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tracking Details Modal */}
        {selectedOrder && (
          <Modal
            isOpen={!!selectedOrder}
            onClose={() => setSelectedOrder(null)}
            title={`Tracking Order: ${selectedOrder.id}`}
          >
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between text-sm">
                <div>
                  <h4 className="font-bold text-gray-900">{selectedOrder.cropName}</h4>
                  <p className="text-xs text-gray-500">
                    {selectedOrder.quantity} kg • Total ₹{selectedOrder.total}
                  </p>
                </div>
                <Badge color="green" size="md">{selectedOrder.status}</Badge>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                <span>Waybill / Tracking: <strong>{selectedOrder.trackingId}</strong></span>
                <span className="text-blue-700 font-medium">Direct Carrier</span>
              </div>

              {/* 4-Step Vertical Timeline */}
              <div className="space-y-4">
                {[
                  { step: 'Pending', label: 'Order Confirmed', desc: 'Crop order placed and assigned to farmer' },
                  { step: 'Confirmed', label: 'Produce Prepared & Packed', desc: 'Harvest inspected for quality Grade A' },
                  { step: 'In Transit', label: 'Dispatched with Transporter', desc: 'Loaded into local refrigerated transport' },
                  { step: 'Delivered', label: 'Delivered to Destination', desc: 'Received and verified at buyer warehouse' },
                ].map((s, idx) => {
                  const stepOrder = ['Pending', 'Confirmed', 'In Transit', 'Delivered'];
                  const curIndex = stepOrder.indexOf(selectedOrder.status);
                  const isDone = curIndex >= idx;

                  return (
                    <div key={s.step} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          isDone ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                          {s.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedOrder.status === 'Pending' && (
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    className="text-xs font-semibold text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition"
                  >
                    Cancel Order (Demo)
                  </button>
                </div>
              )}
            </div>
          </Modal>
        )}
      </main>

      <Footer />
    </div>
  );
}
