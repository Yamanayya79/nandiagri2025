import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faInfoCircle, faEnvelope, faShoppingCart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await axios.post('https://agriapi2025.onrender.com//api/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // hear we can count cart items
  const { cartItems } = useContext(CartContext);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>Nandi-Agri</Link>
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}><FontAwesomeIcon icon={faHome} /> Home</Link></li>
        <li><Link to="/products" onClick={closeMenu}><FontAwesomeIcon icon={faBox} /> Products</Link></li>
        <li><Link to="/about" onClick={closeMenu}><FontAwesomeIcon icon={faInfoCircle} /> About Us</Link></li>
        <li><Link to="/contactus" onClick={closeMenu}><FontAwesomeIcon icon={faEnvelope} /> Contact Us</Link></li>
        {/* <li><Link to="/cart" onClick={closeMenu}><FontAwesomeIcon icon={faShoppingCart} /> Cart</Link></li> */}
        <li>
          <Link to="/cart" onClick={closeMenu}>
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
            {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
          </Link>
        </li>
        {user ? (
          <>
            <li>Welcome, {user.mnumber || user.email}</li>
            <li><button onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button></li>
          </>
        ) : (
          <li className='login_btn'>
            <Link to="/Register" onClick={closeMenu}><FontAwesomeIcon icon={faUser} className='login_btn.reg'/> Register</Link>
            <Link to="/Login" onClick={closeMenu}><FontAwesomeIcon icon={faUser} /> Login</Link>
          </li>
        )}
      </ul>

      <div className="search-container">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </div>

      <button className="navbar-toggle" onClick={toggleNavbar}>
        {isOpen ? '✖' : '☰'}
      </button>

      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
