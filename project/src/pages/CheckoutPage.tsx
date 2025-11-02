import { useState } from 'react';
import { ArrowLeft, MessageCircle, CreditCard, Smartphone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product } from './MarketplacePage';

interface CheckoutPageProps {
  product: Product;
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ product, onNavigate }: CheckoutPageProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const momo1 = '*182*1*1*0782557168';
  const momo2 = '*182*8*1*352181';

  // ✅ Opens phone dial pad with prefilled USSD
  const handlePayment = (method: string) => {
    const totalPrice = product.price * quantity; // Calculate fresh total
    const code = method === 'momo1' ? momo1 : momo2;
    const ussd = `${code}*${totalPrice}#`;
    window.location.href = `tel:${encodeURIComponent(ussd)}`;
  };

  const handleWhatsAppOrder = () => {
    const totalPrice = product.price * quantity; // Calculate total here too
    const message = `Hello Africhicken, I'd like to order ${quantity} x ${product.weight} of raw chicken meat. Total: ${totalPrice.toLocaleString()} RWF`;
    const whatsappUrl = `https://wa.me/250732336152?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const totalPrice = product.price * quantity; // Calculate total here too

    try {
      const { error } = await supabase.from('orders').insert([
        {
          full_name: fullName,
          phone_number: phoneNumber,
          product: product.weight,
          quantity,
          total_price: totalPrice,
        },
      ]);

      if (error) throw error;

      setSuccessMessage('Order submitted successfully! Please proceed with payment.');
      setFullName('');
      setPhoneNumber('');
      setQuantity(1);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <button
          onClick={() => onNavigate('marketplace')}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Marketplace
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 🧾 LEFT SIDE */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Order Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="07XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Product</label>
                  <input
                    type="text"
                    value={`${product.name} - ${product.weight}`}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Total Price</label>
                  <input
                    type="text"
                    value={`${(product.price * quantity).toLocaleString()} RWF`}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 font-bold text-orange-500"
                  />
                </div>

                {successMessage && (
                  <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg">
                    {successMessage}
                  </div>
                )}

                {/* 🟧 Submit Order */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Order'}
                </button>

                {/* 🟡 PAY NOW SECTION */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">💳 Pay Now</h3>
                  <p className="text-sm text-gray-600 mb-4">Click below to open your phone dialer with the payment code</p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handlePayment('momo1')}
                      type="button"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-colors shadow-md"
                    >
                      <Smartphone size={24} />
                      <span>Pay with MTN Momo</span>
                    </button>

                    <button
                      onClick={() => handlePayment('momo2')}
                      type="button"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-colors shadow-md"
                    >
                      <Smartphone size={24} />
                      <span>Pay with Momo Pay</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* 💬 RIGHT SIDE */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="text-green-500" size={28} />
                  <h2 className="text-2xl font-bold">Order via WhatsApp</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Prefer to order directly? Click the button below to send your order via WhatsApp.
                </p>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Order via WhatsApp
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-orange-500" size={28} />
                  <h2 className="text-2xl font-bold">Payment Information</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Momo Payment Method 1:</h3>
                    <code className="text-sm bg-white px-3 py-2 rounded block">
                      *182*1*1*0782557168#
                    </code>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Momo Pay Method 2:</h3>
                    <code className="text-sm bg-white px-3 py-2 rounded block">
                      *182*8*1*352181#
                    </code>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-semibold mb-2">📝 Important Note:</h3>
                  <p className="text-sm text-gray-700">
                    After payment, confirm your order via WhatsApp or email at{' '}
                    <span className="font-semibold">africhicken.rwanda@gmail.com</span>. You can also call{' '}
                    <span className="font-semibold">0732 336 152</span> for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}