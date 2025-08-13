// import React, { useState, useEffect } from 'react';
// import { toast, Toaster } from 'react-hot-toast';
// import { 
//   Package, 
//   Calendar, 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   DollarSign, 
//   CheckCircle, 
//   Clock, 
//   XCircle, 
//   AlertCircle,
//   Eye,
//   EyeOff
// } from 'lucide-react';

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   // Fetch orders from backend
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/orders');
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch orders');
//       }

//       const data = await response.json();
//       if (data.success) {
//         setOrders(data.orders);
//       } else {
//         throw new Error(data.message || 'Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError(error.message);
//       toast.error('Failed to load orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update order status
//   const updateOrderStatus = async (orderNumber, newStatus) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${orderNumber}/status`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update order status');
//       }

//       const data = await response.json();
//       if (data.success) {
//         // Update the local state
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order.orderNumber === orderNumber
//               ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
//               : order
//           )
//         );
//         toast.success(`Order #${orderNumber} status updated to ${newStatus}`);
//       } else {
//         throw new Error(data.message || 'Failed to update status');
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       toast.error('Failed to update order status');
//     }
//   };

//   // Get status color and icon
//   const getStatusDisplay = (status) => {
//     switch (status) {
//       case 'pending':
//         return {
//           color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//           icon: <Clock size={16} />,
//           label: 'Pending'
//         };
//       case 'processing':
//         return {
//           color: 'bg-blue-100 text-blue-800 border-blue-200',
//           icon: <AlertCircle size={16} />,
//           label: 'Processing'
//         };
//       case 'completed':
//         return {
//           color: 'bg-green-100 text-green-800 border-green-200',
//           icon: <CheckCircle size={16} />,
//           label: 'Completed'
//         };
//       case 'failed':
//         return {
//           color: 'bg-red-100 text-red-800 border-red-200',
//           icon: <XCircle size={16} />,
//           label: 'Failed'
//         };
//       default:
//         return {
//           color: 'bg-gray-100 text-gray-800 border-gray-200',
//           icon: <Clock size={16} />,
//           label: 'Unknown'
//         };
//     }
//   };

//   // Get payment status display
//   const getPaymentStatusDisplay = (paymentStatus) => {
//     switch (paymentStatus) {
//       case 'paid':
//         return { color: 'text-green-600', label: '✓ Paid' };
//       case 'pending':
//         return { color: 'text-yellow-600', label: '⏳ Pending' };
//       case 'failed':
//         return { color: 'text-red-600', label: '✗ Failed' };
//       default:
//         return { color: 'text-gray-600', label: '? Unknown' };
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <XCircle className="mx-auto text-red-500 mb-4" size={48} />
//           <p className="text-red-600 mb-4">Error loading orders: {error}</p>
//           <button
//             onClick={fetchOrders}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <Toaster position="top-center" />
      
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 flex items-center">
//                 <Package className="mr-3 text-blue-500" size={32} />
//                 Order Management
//               </h1>
//               <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
//             </div>
//             <div className="text-right">
//               <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
//               <p className="text-gray-600">Total Orders</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Orders List */}
//       <div className="max-w-7xl mx-auto">
//         {orders.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <Package className="mx-auto text-gray-400 mb-4" size={64} />
//             <h2 className="text-xl font-semibold text-gray-600 mb-2">No Orders Found</h2>
//             <p className="text-gray-500">Orders will appear here once customers start placing them.</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => {
//               const statusDisplay = getStatusDisplay(order.status);
//               const paymentDisplay = getPaymentStatusDisplay(order.paymentStatus);
//               const isExpanded = expandedOrder === order.orderNumber;

//               return (
//                 <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                   {/* Order Header */}
//                   <div className="p-6 border-b border-gray-100">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center space-x-4">
//                         <h3 className="text-xl font-bold text-gray-800">
//                           Order #{order.orderNumber}
//                         </h3>
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusDisplay.color} flex items-center`}>
//                           {statusDisplay.icon}
//                           <span className="ml-1">{statusDisplay.label}</span>
//                         </span>
//                         <span className={`text-sm font-medium ${paymentDisplay.color}`}>
//                           {paymentDisplay.label}
//                         </span>
//                       </div>
                      
//                       <button
//                         onClick={() => setExpandedOrder(isExpanded ? null : order.orderNumber)}
//                         className="flex items-center text-blue-600 hover:text-blue-800"
//                       >
//                         {isExpanded ? <EyeOff size={20} /> : <Eye size={20} />}
//                         <span className="ml-1">{isExpanded ? 'Hide' : 'View'} Details</span>
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
//                       <div className="flex items-center text-gray-600">
//                         <Calendar size={16} className="mr-2" />
//                         {formatDate(order.createdAt)}
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <DollarSign size={16} className="mr-2" />
//                         ¥{order.totalAmount?.toFixed(2) || '0.00'}
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <Package size={16} className="mr-2" />
//                         {order.items?.length || 0} items
//                       </div>
//                       {order.customerDetails?.fullName && (
//                         <div className="flex items-center text-gray-600">
//                           <User size={16} className="mr-2" />
//                           {order.customerDetails.fullName}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Order Details (Expandable) */}
//                   {isExpanded && (
//                     <div className="p-6 bg-gray-50">
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
//                         {/* Items */}
//                         <div>
//                           <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
//                             <Package size={18} className="mr-2" />
//                             Order Items
//                           </h4>
//                           <div className="space-y-3">
//                             {order.items?.map((item, index) => (
//                               <div key={index} className="bg-white p-4 rounded-lg border">
//                                 <div className="flex items-center justify-between">
//                                   <div className="flex items-center">
//                                     {item.url && (
//                                       <img 
//                                         src={item.url} 
//                                         alt={item.itemName}
//                                         className="w-12 h-12 object-cover rounded mr-3"
//                                         onError={(e) => {
//                                           e.target.src = "/placeholder.svg";
//                                         }}
//                                       />
//                                     )}
//                                     <div>
//                                       <p className="font-medium text-gray-800">{item.itemName}</p>
//                                       <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
//                                     </div>
//                                   </div>
//                                   <div className="text-right">
//                                     <p className="font-semibold text-gray-800">¥{item.price?.toFixed(2)}</p>
//                                     <p className="text-gray-600 text-sm">
//                                       Total: ¥{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Customer Details */}
//                         {order.customerDetails && (
//                           <div>
//                             <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
//                               <User size={18} className="mr-2" />
//                               Customer Details
//                             </h4>
//                             <div className="bg-white p-4 rounded-lg border space-y-3">
//                               <div className="flex items-center">
//                                 <User size={16} className="mr-2 text-gray-500" />
//                                 <span className="text-gray-800">{order.customerDetails.fullName}</span>
//                               </div>
//                               <div className="flex items-center">
//                                 <Mail size={16} className="mr-2 text-gray-500" />
//                                 <span className="text-gray-800">{order.customerDetails.email}</span>
//                               </div>
//                               <div className="flex items-center">
//                                 <Phone size={16} className="mr-2 text-gray-500" />
//                                 <span className="text-gray-800">{order.customerDetails.phone}</span>
//                               </div>
//                               <div className="flex items-start">
//                                 <MapPin size={16} className="mr-2 text-gray-500 mt-1 flex-shrink-0" />
//                                 <div className="text-gray-800">
//                                   <p>{order.customerDetails.address}</p>
//                                   {order.customerDetails.city && (
//                                     <p>{order.customerDetails.city}, {order.customerDetails.postalCode}</p>
//                                   )}
//                                   {order.customerDetails.country && <p>{order.customerDetails.country}</p>}
//                                 </div>
//                               </div>
//                               {order.customerDetails.notes && (
//                                 <div className="pt-2 border-t">
//                                   <p className="text-gray-600 text-sm"><strong>Notes:</strong></p>
//                                   <p className="text-gray-800 text-sm">{order.customerDetails.notes}</p>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* Status Update Controls */}
//                   <div className="p-6 bg-white border-t border-gray-100">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-gray-600 mb-2">Update Order Status:</p>
//                         <div className="flex space-x-2">
//                           {['pending', 'processing', 'completed', 'failed'].map((status) => {
//                             const isCurrentStatus = order.status === status;
//                             return (
//                               <button
//                                 key={status}
//                                 onClick={() => !isCurrentStatus && updateOrderStatus(order.orderNumber, status)}
//                                 disabled={isCurrentStatus}
//                                 className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
//                                   isCurrentStatus
//                                     ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                                     : 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer'
//                                 }`}
//                               >
//                                 {status.charAt(0).toUpperCase() + status.slice(1)}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
                      
//                       <div className="text-right text-sm text-gray-500">
//                         <p>Last updated: {formatDate(order.updatedAt)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderList;







import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { 
  Package, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  Filter
} from 'lucide-react';


const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');


  // Fetch orders from backend
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search query and status filter
  useEffect(() => {
    let filtered = orders;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => {
        // Search by order number
        if (order.orderNumber?.toString().toLowerCase().includes(query)) {
          return true;
        }
        
        // Search by customer details
        if (order.customerDetails) {
          const customer = order.customerDetails;
          if (
            customer.fullName?.toLowerCase().includes(query) ||
            customer.email?.toLowerCase().includes(query) ||
            customer.phone?.toLowerCase().includes(query)
          ) {
            return true;
          }
        }
        
        // Search by item names
        if (order.items) {
          return order.items.some(item => 
            item.itemName?.toLowerCase().includes(query)
          );
        }
        
        return false;
      });
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchQuery, statusFilter, orders]);


  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }


      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };


  // Update order status
  const updateOrderStatus = async (orderNumber, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderNumber}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });


      if (!response.ok) {
        throw new Error('Failed to update order status');
      }


      const data = await response.json();
      if (data.success) {
        // Update the local state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.orderNumber === orderNumber
              ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
              : order
          )
        );
        toast.success(`Order #${orderNumber} status updated to ${newStatus}`);
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };


  // Get status color and icon
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock size={16} />,
          label: 'Pending'
        };
      case 'processing':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <AlertCircle size={16} />,
          label: 'Processing'
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle size={16} />,
          label: 'Completed'
        };
      case 'failed':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle size={16} />,
          label: 'Failed'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Clock size={16} />,
          label: 'Unknown'
        };
    }
  };


  // Get payment status display
  const getPaymentStatusDisplay = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return { color: 'text-green-600', label: '✓ Paid' };
      case 'pending':
        return { color: 'text-yellow-600', label: '⏳ Pending' };
      case 'failed':
        return { color: 'text-red-600', label: '✗ Failed' };
      default:
        return { color: 'text-gray-600', label: '? Unknown' };
    }
  };


  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto text-red-500 mb-4" size={48} />
          <p className="text-red-600 mb-4">Error loading orders: {error}</p>
          <button
            onClick={fetchOrders}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <Package className="mr-3 text-blue-500" size={32} />
                Order Management
              </h1>
              <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
              <p className="text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto mb-6">
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
      {/* Search Bar */}
      <div className="lg:col-span-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Search size={16} className="inline mr-1" />
          Search Orders
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer name, email, phone, or item name..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Order Status Filter */}
      <div className="lg:col-span-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Filter size={16} className="inline mr-1" />
          Order Status
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>

    {/* Filter Summary */}
    {(searchQuery || statusFilter !== 'all') && (
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium text-gray-800">
                {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
              </span>
            </div>
            {searchQuery && (
              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                <Search size={14} className="mr-1 text-blue-600" />
                <span className="text-blue-800">"{searchQuery}"</span>
              </div>
            )}
            {statusFilter !== 'all' && (
              <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                <Filter size={14} className="mr-1 text-green-600" />
                <span className="text-green-800 capitalize">{statusFilter}</span>
              </div>
            )}
          </div>
          <button
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:bg-blue-50 px-3 py-1 rounded-md"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    )}
  </div>
</div>



      {/* Orders List */}
      <div className="max-w-7xl mx-auto">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              {(searchQuery || statusFilter !== 'all') ? 'No Orders Found' : 'No Orders Found'}
            </h2>
            <p className="text-gray-500">
              {(searchQuery || statusFilter !== 'all')
                ? 'No orders match your current filters. Try adjusting your search or filter criteria.'
                : 'Orders will appear here once customers start placing them.'
              }
            </p>
            {(searchQuery || statusFilter !== 'all') && (
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const statusDisplay = getStatusDisplay(order.status);
              const paymentDisplay = getPaymentStatusDisplay(order.paymentStatus);
              const isExpanded = expandedOrder === order.orderNumber;


              return (
                <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-xl font-bold text-gray-800">
                          Order #{order.orderNumber}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusDisplay.color} flex items-center`}>
                          {statusDisplay.icon}
                          <span className="ml-1">{statusDisplay.label}</span>
                        </span>
                        <span className={`text-sm font-medium ${paymentDisplay.color}`}>
                          {paymentDisplay.label}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.orderNumber)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        {isExpanded ? <EyeOff size={20} /> : <Eye size={20} />}
                        <span className="ml-1">{isExpanded ? 'Hide' : 'View'} Details</span>
                      </button>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign size={16} className="mr-2" />
                        ¥{order.totalAmount?.toFixed(2) || '0.00'}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Package size={16} className="mr-2" />
                        {order.items?.length || 0} items
                      </div>
                      {order.customerDetails?.fullName && (
                        <div className="flex items-center text-gray-600">
                          <User size={16} className="mr-2" />
                          {order.customerDetails.fullName}
                        </div>
                      )}
                    </div>
                  </div>


                  {/* Order Details (Expandable) */}
                  {isExpanded && (
                    <div className="p-6 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Items */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <Package size={18} className="mr-2" />
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items?.map((item, index) => (
                              <div key={index} className="bg-white p-4 rounded-lg border">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {item.url && (
                                      <img 
                                        src={item.url} 
                                        alt={item.itemName}
                                        className="w-12 h-12 object-cover rounded mr-3"
                                        onError={(e) => {
                                          e.target.src = "/placeholder.svg";
                                        }}
                                      />
                                    )}
                                    <div>
                                      <p className="font-medium text-gray-800">{item.itemName}</p>
                                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-gray-800">¥{item.price?.toFixed(2)}</p>
                                    <p className="text-gray-600 text-sm">
                                      Total: ¥{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>


                        {/* Customer Details */}
                        {order.customerDetails && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                              <User size={18} className="mr-2" />
                              Customer Details
                            </h4>
                            <div className="bg-white p-4 rounded-lg border space-y-3">
                              <div className="flex items-center">
                                <User size={16} className="mr-2 text-gray-500" />
                                <span className="text-gray-800">{order.customerDetails.fullName}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail size={16} className="mr-2 text-gray-500" />
                                <span className="text-gray-800">{order.customerDetails.email}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone size={16} className="mr-2 text-gray-500" />
                                <span className="text-gray-800">{order.customerDetails.phone}</span>
                              </div>
                              <div className="flex items-start">
                                <MapPin size={16} className="mr-2 text-gray-500 mt-1 flex-shrink-0" />
                                <div className="text-gray-800">
                                  <p>{order.customerDetails.address}</p>
                                  {order.customerDetails.city && (
                                    <p>{order.customerDetails.city}, {order.customerDetails.postalCode}</p>
                                  )}
                                  {order.customerDetails.country && <p>{order.customerDetails.country}</p>}
                                </div>
                              </div>
                              {order.customerDetails.notes && (
                                <div className="pt-2 border-t">
                                  <p className="text-gray-600 text-sm"><strong>Notes:</strong></p>
                                  <p className="text-gray-800 text-sm">{order.customerDetails.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}


                  {/* Status Update Controls */}
                  <div className="p-6 bg-white border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Update Order Status:</p>
                        <div className="flex space-x-2">
                          {['pending', 'processing', 'completed', 'failed'].map((status) => {
                            const isCurrentStatus = order.status === status;
                            return (
                              <button
                                key={status}
                                onClick={() => !isCurrentStatus && updateOrderStatus(order.orderNumber, status)}
                                disabled={isCurrentStatus}
                                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                  isCurrentStatus
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer'
                                }`}
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-gray-500">
                        <p>Last updated: {formatDate(order.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


export default OrderList;
