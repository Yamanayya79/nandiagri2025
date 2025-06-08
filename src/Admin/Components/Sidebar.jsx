import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';


function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change (for better UX)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="sidebar-toggle"
        aria-label="Toggle sidebar"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </button>

      {/* Overlay when sidebar open on mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="logo">Admin Panel</h2>
        <nav className="nav">
          <Link to="/admin/dashboard" className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/admin/Addproduct" className={`nav-link ${location.pathname === '/admin/Addproduct' ? 'active' : ''}`}>Add Product</Link>
          <Link to="/admin/ProductList" className={`nav-link ${location.pathname === '/admin/ProductList' ? 'active' : ''}`}>Manage Product</Link>
          <Link to="/api/manageuser" className={`nav-link ${location.pathname === '/api/manageuser' ? 'active' : ''}`}>Manage Users</Link>
          <Link to="/admin/AddCategories" className={`nav-link ${location.pathname === '/admin/AddCategories' ? 'active' : ''}`}>Add Category</Link>
          <Link to="/admin/ManageCategory" className={`nav-link ${location.pathname === '/admin/ManageCategory' ? 'active' : ''}`}>Manage Category</Link>
          <Link to="/admin/ManageOrders" className={`nav-link ${location.pathname === '/admin/ManageOrders' ? 'active' : ''}`}>Manage Orders</Link>
          <Link to="/admin/Sliders" className={`nav-link ${location.pathname === '/admin/Sliders' ? 'active' : ''}`}>Add Sliders</Link>
          <Link to="/admin/addnewadmin" className={`nav-link ${location.pathname === '/admin/addnewadmin' ? 'active' : ''}`}>Add New Admin </Link>
          <Link to="/admin/createcoupn" className={`nav-link ${location.pathname === '/admin/createcoupn' ? 'active' : ''}`}>Create Coupncode</Link>
          <Link to="/admin/feedback" className={`nav-link ${location.pathname === '/admin/feedback' ? 'active' : ''}`}>Feedback</Link>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Back to Website</Link>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
