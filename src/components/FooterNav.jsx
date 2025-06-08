import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaShoppingCart, FaUser, FaBox } from 'react-icons/fa';
import '../styles/FooterNav.css';

const FooterNav = () => {
  return (
    <div className="footer-nav">
      <Link to="/" className="nav-item">
        <FaHome />
        <span>Home</span>
      </Link>
      <Link to="/myorders" className="nav-item">
        {/* Changed to My Orders with FaInfoCircle icon */}
        <FaBox />
        <span>My Orders</span>
      </Link>
      <Link to="/cart" className="nav-item">
        <FaShoppingCart />
        <span>Cart</span>
      </Link>
      <Link to="/account" className="nav-item">
        <FaUser />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default FooterNav;