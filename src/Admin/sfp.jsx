import React, { useState } from 'react';

const MyOrders = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchMode, setFetchMode] = useState('byPhone'); // 'byPhone' or 'all'

  const fetchOrders = async () => {
    setError(null);
    setOrders([]);
    setLoading(true);

    try {
      let url = 'https://agriapi2025.onrender.com//api/my-orders';
      if (fetchMode === 'byPhone') {
        if (!phone.trim()) {
          setError('Please enter a phone number');
          setLoading(false);
          return;
        }
        url += `?phone=${encodeURIComponent(phone)}`;
      }
      // else fetchMode 'all' => call without phone param to get all orders

      const response = await fetch(url);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch orders');
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
      <h2 style={styles.title}>Orders Viewer</h2>

      <div style={styles.controls}>
        <label style={styles.label}>
          Phone Number:{' '}
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={styles.input}
            disabled={fetchMode === 'all'}
          />
        </label>

        <div style={styles.buttons}>
          <button
            onClick={() => { setFetchMode('byPhone'); setOrders([]); setError(null); }}
            style={{...styles.modeBtn, backgroundColor: fetchMode === 'byPhone' ? '#007acc' : '#ccc', color: fetchMode === 'byPhone' ? 'white' : '#444'}}
            disabled={loading}
          >
            Filter by Phone
          </button>
          <button
            onClick={() => { setFetchMode('all'); setOrders([]); setError(null); }}
            style={{...styles.modeBtn, backgroundColor: fetchMode === 'all' ? '#007acc' : '#ccc', color: fetchMode === 'all' ? 'white' : '#444'}}
            disabled={loading}
          >
            Show All Orders
          </button>
        </div>

        <button onClick={fetchOrders} style={styles.fetchBtn} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Orders'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {!error && !loading && orders.length === 0 && (
        <p style={styles.noOrders}>No orders found{fetchMode === 'byPhone' && phone ? ` for ${phone}` : ''}.</p>
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
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  label: {
    fontSize: 16,
    marginBottom: '0.75rem',
    userSelect: 'none',
  },
  input: {
    marginLeft: '0.5rem',
    fontSize: 16,
    padding: '0.5rem 0.75rem',
    borderRadius: 6,
    border: '1.5px solid #ccc',
    width: 260,
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  modeBtn: {
    padding: '0.55rem 1.25rem',
    fontSize: 16,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    userSelect: 'none',
    minWidth: 140,
    transition: 'all 0.3s ease',
  },
  fetchBtn: {
    padding: '0.55rem 2rem',
    fontSize: 16,
    color: 'white',
    backgroundColor: '#007acc',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.3s ease',
    alignSelf: 'center',
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

export default MyOrders;

