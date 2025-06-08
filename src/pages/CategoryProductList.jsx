import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../styles/CategoryProductList.css';

function CategoryProductList() {
  const { id } = useParams(); // category ID from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`https://agriapi2025.onrender.com//api/category-products/${id}`)
      .then(res => {
        console.log("Fetched products:", res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });

    // Optional: fetch category name
    axios.get(`https://agriapi2025.onrender.com//api/categories`)
      .then(res => {
        const category = res.data.find(cat => cat.id.toString() === id);
        if (category) setCategoryName(category.name);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="Plist_container">
      <h2 className="title">{categoryName ? categoryName : "Category"} Products</h2>

      {products.length === 0 ? (
        <p>No products available in this category.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map(product => {

            const oldPrice = parseFloat(product.variants[0]?.old_price) || 0;
            const price = parseFloat(product.variants[0]?.price) || 0;
            const discountAmount = oldPrice - price;
            const rating = product.rating || 4.5; // Assuming rating present or default
            return (
              <div className="product-card" key={product.id}>
                <Link to={`/Listing/${product.id}`} className="product_link">
                  <img
                    src={`https://agriapi2025.onrender.com//uploads/${product.images[0]}`}
                    alt={product.pname}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}

                  // onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/fallback-image.jpg'; }} // Fallback image
                  />
                  <h4 className="product-name">{product.pname}</h4>
                  <div className="product-rating">
                    <span>⭐</span> {rating.toFixed(1)}
                  </div>
                  <div className="product-price">
                    {oldPrice > price && (
                      <span className="old-price">₹{oldPrice.toFixed(2)}</span>
                    )}
                    <span className="current-price">₹{price.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="discount-savings">
                      You Save ₹{discountAmount.toFixed(2)}
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryProductList;
