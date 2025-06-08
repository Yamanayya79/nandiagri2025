import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Listing.css';

const Listing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://agriapi2025.onrender.com//api/products`)
      .then(res => {
        const products = res.data.data;
        const current = products.find(p => p.id === parseInt(id));
        setProduct(current);
        if (current && current.variants.length > 0) {
          setSelectedVariant(current.variants[0]);
        }

        if (current) {
          const filtered = products.filter(
            p => p.category === current.category && p.id !== current.id
          );
          setSimilar(filtered.slice(0, 4));
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleVariantChange = (e) => {
    const qty = e.target.value;
    const variant = product.variants.find(v => v.quantity === qty);
    setSelectedVariant(variant);
  };

  const increaseQty = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return toast.error("Please select a variant!");
    addToCart({ ...product, selectedVariant, quantity });
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    if (!selectedVariant) return toast.error("Please select a variant!");
    addToCart({ ...product, selectedVariant, quantity });
    navigate('/checkout');
  };

  if (!product) return <p className="loading">Loading product...</p>;

  return (
    <div className="product-display-container">
      <ToastContainer />

      {/* Product Section */}
      <div className="main-product">
        <div className="product-image">
          <img
            src={`https://agriapi2025.onrender.com//uploads/${product.images[0]?.image_name}`}
            alt={product.pname}
          />
        </div>

        <div className="product_listing_details">
          <h2>{product.pname}</h2>

          <p className="product-pricelisting">
            <del>₹{selectedVariant?.old_price}</del>
            <span> ₹{selectedVariant?.price} <span className="discount">off{selectedVariant?.discount}%</span></span>
          </p>

          <h3>Select Variant</h3>
          <select className="size-select" onChange={handleVariantChange}>
            <option value="">Select Size</option>
            {product.variants.map((variant, index) => (
              <option key={index} value={variant.quantity}>
                {variant.quantity}
              </option>
            ))}
          </select>

          <table className="product_dosage">
            <thead>
              <tr>
                <th>Dosage</th>
                <th>Acre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedVariant?.quantity}</td>
                <td>{selectedVariant?.acre}</td>
              </tr>
            </tbody>
          </table>

          <div className="product-quantity">
            <h3>Quantity</h3>
            <button onClick={decreaseQty} className="quantity-button">-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={increaseQty} className="quantity-button">+</button>
          </div>

          <div className="action-buttons">
            <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
            <button onClick={handleBuyNow} className="buy-button">Buy Now</button>
          </div>

          <div className="product-info">
            <h3>Product Information</h3>
            <table>
              <tbody>
                <tr><th>Name</th><td>{product.pname}</td></tr>
                <tr><th>Brand</th><td>{product.brand}</td></tr>
                <tr><th>Price</th><td>₹{selectedVariant?.price}</td></tr>
                <tr><th>Discount</th><td>{selectedVariant?.discount}%</td></tr>
                <tr><th>Rating</th><td>{selectedVariant?.rating ?? '4'} (update soon)</td></tr>
              </tbody>
            </table>

            <details style={{ marginTop: '20px' }}>
            
              <summary>Product Description</summary>
              <p>{product.description}</p>
            </details>

            <h3>Specifications</h3>
            <ul>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Color:</strong> {product.color}</li>
              <li><strong>Size:</strong> {product.size}</li>
              <li><strong>Weight:</strong> {product.weight}</li>
              <li><strong>Material:</strong> {product.material}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="similar-section">
        <h3>Similar Products</h3>
        <div className="similar-products">
          {similar.map(item => (
            <div key={item.id} className="similar-card">
              <img src={`https://agriapi2025.onrender.com//uploads/${item.images[0]?.image_name}`} alt={item.pname} width={120} />
              <p>{item.pname}</p>
              <p>₹{item.variants[0]?.price}</p>
              <button onClick={() => navigate(`/listing/${item.id}`)}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;