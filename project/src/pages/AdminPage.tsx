import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Order } from '../lib/supabase';
import { LogOut, Package, Clock, CheckCircle } from 'lucide-react';

export default function AdminPage() {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
        throw error;
      }
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      await signIn(email, password);
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    console.log('Attempting to update order:', orderId, 'to status:', newStatus);
    
    try {
      // Get current session to verify auth
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session ? 'Active' : 'None');

      const { data, error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
        .select(); // Add select to see what was updated

      if (error) {
        console.error('Update error details:', error);
        throw error;
      }

      console.log('Update successful:', data);
      
      // Update local state immediately
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // Also refresh from server
      await fetchOrders();
      
      alert('Order status updated successfully!');
    } catch (error: any) {
      console.error('Error updating order:', error);
      alert(`Failed to update order status: ${error.message || 'Unknown error'}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'confirmed':
        return <Package className="text-blue-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4 py-8 sm:py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-md w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Admin Login</h1>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={signOut}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <LogOut size={18} className="sm:w-5 sm:h-5" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="text-2xl sm:text-3xl font-bold text-orange-500">{orders.length}</div>
              <div className="text-gray-600 mt-1 text-xs sm:text-sm">Total Orders</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500">
                {orders.filter((o) => o.status === 'pending').length}
              </div>
              <div className="text-gray-600 mt-1 text-xs sm:text-sm">Pending</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-2xl sm:text-3xl font-bold text-blue-500">
                {orders.filter((o) => o.status === 'confirmed').length}
              </div>
              <div className="text-gray-600 mt-1 text-xs sm:text-sm">Confirmed</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="text-2xl sm:text-3xl font-bold text-green-500">
                {orders.filter((o) => o.status === 'completed').length}
              </div>
              <div className="text-gray-600 mt-1 text-xs sm:text-sm">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Orders</h2>
          </div>

          {loading ? (
            <div className="p-6 sm:p-8 text-center text-gray-500 text-sm sm:text-base">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-gray-500 text-sm sm:text-base">No orders yet</div>
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 xl:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm">{order.full_name}</td>
                        <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm">{order.phone_number}</td>
                        <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm">{order.product}</td>
                        <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm">{order.quantity}</td>
                        <td className="px-4 xl:px-6 py-4 whitespace-nowrap font-semibold text-sm">
                          {order.total_price.toLocaleString()} RWF
                        </td>
                        <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-base">{order.full_name}</h3>
                        <p className="text-sm text-gray-600">{order.phone_number}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div>
                        <span className="text-gray-500 text-xs">Product:</span>
                        <p className="font-medium text-gray-800">{order.product}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Quantity:</span>
                        <p className="font-medium text-gray-800">{order.quantity}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Total:</span>
                        <p className="font-semibold text-gray-800">{order.total_price.toLocaleString()} RWF</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Date:</span>
                        <p className="font-medium text-gray-800">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Update Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}