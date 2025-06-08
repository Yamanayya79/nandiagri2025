import React from 'react';
import '../styles/UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaCommentDots, FaUser, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user session (adjust based on your storage/session method)
    localStorage.removeItem("userSession");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-text">Welcome!</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate('/my-orders')}>
          <FaBox className="icon" />
          <p>My Orders</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/my-feedback')}>
          <FaCommentDots className="icon" />
          <p>My Feedback</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/account')}>
          <FaUser className="icon" />
          <p>Account Details</p>
        </div>
        <div className="dashboard-card logout" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;