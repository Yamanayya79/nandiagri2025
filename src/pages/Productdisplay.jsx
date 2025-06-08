import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductDisplay.css';

const Productdisplay = (props) => {
  const { productdata } = props;

  const renderProducts = () => {
    if (Array.isArray(productdata) && productdata.length > 0) {
      return productdata.map((product) => {
        const oldPrice = parseFloat(product.variants[0]?.old_price) || 0;
        const price = parseFloat(product.variants[0]?.price) || 0;
        const discountAmount = oldPrice - price;
        const rating = product.rating || 4.5; // Assuming rating present or default

        return (
          <div className="product_card_simple" key={product.id}>
            <Link to={`/Listing/${product.id}`} className="product_link">
              <img
                src={`https://agriapi2025.onrender.com//uploads/${product.images[0]?.image_name}`}
                alt={product.pname}
                className="product_image_simple"
              />
              <div className="product_info_simple">
                <h3 className="product_name_simple">{product.pname}</h3>
                <div className="product_rating_simple">
                  <span>⭐</span> {rating.toFixed(1)}
                </div>
                <div className="product_price_simple">
                  {oldPrice > price && (
                    <span className="old_price_simple">₹{oldPrice.toFixed(2)}</span>
                  )}
                  <span className="current_price_simple">₹{price.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="discount_savings_simple">
                    You Save ₹{discountAmount.toFixed(2)}
                  </div>
                )}
              </div>
            </Link>
          </div>
        );
      });
    }
    return <p>No products to display.</p>;
  };

  return <div className="products_container_simple">{renderProducts()}</div>;
};

export default Productdisplay;

