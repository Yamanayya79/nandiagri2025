import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Wishlist.css';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`https://agriapi2025.onrender.com/api/wishlist/${user.id}`)
        .then(res => res.json())
        .then(data => setWishlist(data))
        .catch(err => console.error("Error fetching wishlist:", err));
    }
  }, [user]);

  const removeFromWishlist = async (productId) => {
    try {
      await fetch(`https://agriapi2025.onrender.com/api/wishlist/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.id, product_id: productId })
      });

      setWishlist(prev => prev.filter(item => item.id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="wishlist-page">
      <h2>🤍 My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-message">No items in wishlist yet.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(product => (
            <div key={product.id} className="wishlist-item">
              <img
                src={`https://agriapi2025.onrender.com/uploads/${product.image}`}
                alt={product.pname}
                className="product-image"
              />
              <div className="product-details">
                <h4>{product.pname}</h4>
                <p className="price">₹{product.price}</p>
              </div>

              <div className="button-group">
                <button
                  className="buy-now-btn"
                  onClick={() => navigate(`/Listing/${product.id}`)}
                >
                  Buy Now
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;