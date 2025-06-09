import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import '../styles/CategoryWiseProducts.css';
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";


function CategoryWiseProducts() {
  const [data, setData] = useState([]);
  const scrollRefs = useRef({});
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);

useEffect(() => {
  if (user) {
    axios.get(`https://agriapi2025.onrender.com/api/wishlist/${user.id}`)
      .then(res => {
        const wishlistIds = res.data.map(item => item.id); // assuming backend sends full product list
        setWishlist(wishlistIds);
      })
      .catch(err => console.error("Error fetching wishlist:", err));
  }
}, [user]);



  useEffect(() => {
    axios.get("https://agriapi2025.onrender.com/api/categories-products")
      .then(res => {
        const filtered = res.data.filter(cat => cat.products && cat.products.length > 0);

        // Sort products within each category by latest first
        const sorted = filtered.map(cat => ({
          ...cat,
          products: [...cat.products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }));

        setData(sorted);

        // Initialize quantities
        const initialQuantities = {};
        sorted.forEach(cat => {
          cat.products.forEach(prod => {
            initialQuantities[prod.id] = 1;
          });
        });
        setQuantities(initialQuantities);
      })
      .catch(err => {
        console.error("Error fetching category-wise products:", err);
      });
  }, []);

  const scroll = (catId, direction) => {
    const container = scrollRefs.current[catId];
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const increaseQty = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const decreaseQty = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] - 1),
    }));
  };

  const handleAddToCart = (product) => {
    const variant = product.variants?.[0];
    if (!variant) return;

    const qty = quantities[product.id] || 1;

    addToCart({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      price: variant.price,
      quantity: qty,
      image: product.images && product.images[0],
      variant: variant.quantity,
    });
  };
  // const toggleWishlist = (productId) => { setWishlist((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]); };
  const toggleWishlist = (productId) => {
  if (!user) {
    alert("Please login to add to wishlist.");
    return;
  }

  // Call API to add to wishlist
  axios.post('https://agriapi2025.onrender.com/api/wishlist/add', {
    user_id: user.id,
    product_id: productId
  })
  .then(() => {
    setWishlist((prev) => [...prev, productId]);
  })
  .catch((err) => {
    if (err.response?.status === 409) {
      alert("Item already in wishlist.");
    } else {
      console.error("Error adding to wishlist", err);
      alert("Failed to add to wishlist.");
    }
  });
};

  return (
    <div className="cwproduct-main">
      <div style={{ padding: "20px" }}>
        {data.map(category => (
          <div key={category.id} style={{ marginBottom: "50px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>{category.name}</h2>
              <button
                onClick={() => navigate(`/category/${category.id}`)}
                style={{
                  padding: "6px 12px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View All
              </button>
            </div>

            <div style={{ position: "relative" }}>
              <button
                onClick={() => scroll(category.id, "left")}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "40%",
                  zIndex: 1,
                  background: "#fff",
                  border: "1px solid #ccc",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                ◀
              </button>

              <div
                ref={el => (scrollRefs.current[category.id] = el)}
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "15px",
                  padding: "0 30px",
                  scrollBehavior: "smooth",
                }}
                className="cwbox"
              >
                {category.products.map(product => (
                  <div
                    key={product.id}
                    className="cwproduct-card"
                    style={{
                      minWidth: "220px",
                      height: "400px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      background: "#f9f9f9",
                      flex: "0 0 auto",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      {wishlist.includes(product.id) ? (
                        <FaHeart color="red" size={18} />
                      ) : (
                        <FaRegHeart size={18} />
                      )}
                    </div>

                    <div style={{
                      height: "50%",
                      overflow: "hidden",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}>
                      <Link to={`/Listing/${product.id}`} className="product_link" style={{ flex: 1 }}>
                        <img
                          className="cwp_img"
                          src={
                            product.images && product.images.length > 0
                              ? `https://agriapi2025.onrender.com/uploads/${product.images[0]}`
                              : "https://via.placeholder.com/300x200?text=No+Image"
                          }
                          loading="lazy"
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        />
                      </Link>
                    </div>

                    <div style={{
                      height: "50%",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}>
                      <div>
                        <h4 style={{ margin: "5px 0" }} className="cwp_title">{product.name}</h4>
                        {product.variants && product.variants.length > 0 && (
                          <>
                            {/* <div className="product-price" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                              <span style={{ color: "red", fontWeight: "bold" }}>
                                {product.variants[0].old_price && typeof product.variants[0].old_price === 'number' ? 
                                  (((product.variants[0].old_price - product.variants[0].price) / product.variants[0].old_price) * 100).toFixed(0) + '%') : 
                                  'N/A'}
                              </span>
                              off
                              {product.variants[0].old_price && typeof product.variants[0].old_price === 'number' && (
                                <p style={{ textDecoration: "line-through", color: "gray", margin: 0 }}>
                                  ₹{product.variants[0].old_price.toFixed(2)}
                                </p>
                              )}
                              <p style={{ color: "green", fontWeight: "bold", margin: 0 }}>
                                ₹{product.variants[0].price ? product.variants[0].price.toFixed(2) : "N/A"}
                              </p>
                            </div> */}
                            {product.variants[0].old_price !== undefined && product.variants[0].price !== undefined &&
                              typeof product.variants[0].old_price === 'number' && typeof product.variants[0].price === 'number' ? (
                              <div className="product-price" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <span style={{ color: "red", fontWeight: "bold" }}>
                                  {((parseFloat(product.variants[0].old_price) - parseFloat(product.variants[0].price)) / parseFloat(product.variants[0].old_price) * 100).toFixed(0) + '%'}
                                </span>
                                <span>off</span>
                                <p style={{ textDecoration: "line-through", color: "gray", margin: 0 }}>
                                  ₹{parseFloat(product.variants[0].old_price).toFixed(2)}
                                </p>
                                <p style={{ color: "green", fontWeight: "bold", margin: 0 }}>
                                  ₹{parseFloat(product.variants[0].price).toFixed(2)}
                                </p>
                              </div>
                            ) : (
                              <p style={{ fontWeight: "bold", margin: "5px 0" }}>Price: ₹{product.variants[0].price ? parseFloat(product.variants[0].price).toFixed(2) : "N/A"}</p>
                            )}
                            {product.variants[0].old_price !== undefined && product.variants[0].price !== undefined && (
                              <p style={{ fontWeight: "bold", margin: "5px 0" }} className="discount-savingswp">
                                You Saves ₹{(product.variants[0].old_price - product.variants[0].price).toFixed(2)}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      <div>
                        <div className="producthome-quantity" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <button onClick={() => decreaseQty(product.id)} className="quantity-button" style={{
                            padding: "5px 10px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            fontWeight: "bold",
                          }}>-</button>
                          <input type="number" value={quantities[product.id] || 1} readOnly style={{ width: "40px", textAlign: "center", border: "1px solid #ccc", borderRadius: "4px" }} />
                          <button onClick={() => increaseQty(product.id)} className="quantity-button" style={{
                            padding: "5px 10px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            fontWeight: "bold",
                          }}>+</button>
                        </div>

                        <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                          <Link to={`/Listing/${product.id}`} className="product_link" style={{ flex: 1 }}>
                            <button
                              style={{
                                width: "100%",
                                padding: "8px 0",
                                background: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Buy Now
                            </button>
                          </Link>

                          <button
                            onClick={() => handleAddToCart(product)}
                            className="cart-btn"
                            style={{
                              flex: 1,
                              padding: "8px 0",
                              backgroundColor: "#ff6f61",
                              border: "none",
                              borderRadius: "4px",
                              color: "#fff",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          >
                            Add to Cart
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll(category.id, "right")}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "40%",
                  zIndex: 1,
                  background: "#fff",
                  border: "1px solid #ccc",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                ▶
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryWiseProducts;
