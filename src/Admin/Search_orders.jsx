import React, { useState } from 'react';

const Search_orders = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!phone.trim()) {
      setError('Please enter a phone number');
      return;
    }

    setLoading(true);
    setError(null);
    setOrders([]);

    try {
      const response = await fetch(`https://agriapi2025.onrender.com//api/my-orders?phone=${encodeURIComponent(phone)}`);
      if (!response.ok) {
        if (response.status === 404) {
          setOrders([]);
          setError(null);
        } else {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to fetch orders');
        }
        setLoading(false);
        return;
      }
      const data = await response.json();
      setOrders(data.data || []);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Orders</h2>
      <div style={styles.inputRow}>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchOrders} style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Orders'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {!error && !loading && orders.length === 0 && phone.trim() !== '' && (
        <p style={styles.noOrders}>No orders found for {phone}</p>
      )}

      {orders.map(order => (
        <div key={order.order_id} style={styles.orderCard}>
          <h3 style={styles.orderHeader}>Order #{order.order_id}</h3>
          <p><strong>Total:</strong> ₹{order.total_amount ?? 'N/A'}</p>
          <p><strong>Payment Method:</strong> {order.payment_method ?? 'N/A'}</p>
          <p><strong>Order Date:</strong> {order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</p>
          <p><strong>Shipping to:</strong> {order.address ?? ''} {order.city}, {order.state} - {order.pin}</p>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.3rem' }}>Items:</h4>
          <ul style={styles.itemList}>
            {(Array.isArray(order.items) && order.items.length > 0)
              ? order.items.map(item => (
                  <li key={item.item_id || `${item.pname}-${item.price}`} style={styles.item}>
                    {item.pname} - {item.quantity} qty - ₹{item.price}
                  </li>
                ))
              : <li style={styles.noItems}>No items in this order</li>
            }
          </ul>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 720,
    margin: '2rem auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9fafb',
    padding: '1.5rem 2rem',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgb(0 0 0 / 0.05)'
  },
  title: {
    textAlign: 'center',
    color: '#222',
    marginBottom: '1.5rem'
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    gap: '0.75rem'
  },
  input: {
    fontSize: 16,
    padding: '0.5rem 0.75rem',
    borderRadius: 6,
    border: '1.5px solid #ccc',
    width: '240px'
  },
  button: {
    padding: '0.55rem 1.25rem',
    fontSize: 16,
    color: 'white',
    backgroundColor: '#007acc',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    userSelect: 'none',
    disabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed'
    }
  },
  error: {
    color: '#cc3333',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  noOrders: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: '1rem 1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 6px rgb(0 0 0 / 0.08)'
  },
  orderHeader: {
    color: '#007acc',
    marginBottom: '0.5rem'
  },
  itemList: {
    paddingLeft: '1.1rem',
    marginTop: 0,
  },
  item: {
    marginBottom: '0.3rem',
    fontSize: '0.95rem',
    color: '#444'
  },
  noItems: {
    fontStyle: 'italic',
    color: '#999'
  }
};

export default Search_orders;
