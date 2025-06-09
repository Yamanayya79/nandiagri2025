import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import '../styles/MyOrders.css';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.mnumber) {
      setError('Phone number is required');
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://agriapi2025.onrender.com/api/my-orders?phone=${encodeURIComponent(user.mnumber)}`
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch orders');
          setOrders([]);
        } else {
          setOrders(data.data || []);
        }
      } catch (err) {
        setError('Network error: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) return <div className="order-message">Loading orders...</div>;
  if (error) return <div className="order-error">{error}</div>;
  if (orders.length === 0) return <div className="order-message">No orders found.</div>;

  return (
    <div className="orders-container">
      {orders.map((order) => (
        <div key={order.order_id} className="order-card">
          <div className="order-summary">
            <h3>Order ID: {order.order_id}</h3>
            <p ><strong>Status:</strong><span className='order-status'> {order.order_status}</span></p>
            <p><strong>Amount:</strong> ₹{order.total_amount}</p>
            <p className="payment-method-line">
              <strong>Payment:</strong>{' '}
              <span className={`payment-method ${order.payment_method.toLowerCase()}`}>
                {/* {getPaymentIcon(order.payment_method)} {order.payment_method} */}
              </span>
            </p>

            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <button onClick={() => toggleExpand(order.order_id)}>
              {expandedOrderId === order.order_id ? 'Hide Details' : 'View Details'}
            </button>
          </div>

          {expandedOrderId === order.order_id && (
            <div className="order-details">
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.pin}</p>
              <p><strong>Payment:</strong> {order.payment_method}</p>
              <h4>Items:</h4>
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div key={item.item_id} className="item-card">
                    <p><strong>Product:</strong> {item.pname}</p>
                    <p><strong>Price:</strong> ₹{item.price}</p>
                    <p><strong>Qty:</strong> {item.quantity}</p>
                  </div>
                ))
              ) : (
                <p>No items found for this order.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
