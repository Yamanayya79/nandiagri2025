import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Modal from './model/Modal'; // Path to Modal.js
import '../styles/Me.css';
import axios from 'axios'

const Me = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: '', email: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [wallet, setWallet] = useState({ reward_wallet: 0, purchase_wallet: 0 });

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetch(`https://agriapi2025.onrender.com/api/wallet/${user.id}`)
        .then(res => res.json())
        .then(data => setWallet(data));
    }
  }, [user]);

 const handleLogout = async () => {
    try {
      await axios.post('https://agriapi2025.onrender.com/api/logout', {}, { withCredentials: true });
      alert('Logout Successful!')
      setUser(null);
      
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch('https://agriapi2025.onrender.com/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mnumber: user.mnumber,
          name: editedUser.name,
          email: editedUser.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Profile updated!');
        alert('✅ Profile updated successfully!');
        setShowEditModal(false);
        window.location.reload();
      } else {
        setMessage('❌ ' + (data.message || 'Update failed'));
        alert('❌ ' + (data.message || 'Update failed'));
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
      alert('❌ Error: ' + error.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://agriapi2025.onrender.com/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: user.mnumber,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      setMessage(res.ok ? '✅ Password changed!' : data.message);
      alert(res.ok ? '✅ Password changed successfully!' : '❌ ' + data.message);
      if (res.ok) {
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err) {
      setMessage('❌ ' + err.message);
      alert('❌ ' + err.message);
    }
  };

  if (!user) return null;

  return (
    <div className="account-wrapper">
      <div className="account-header">
        <div className="avatar-box">
          <img src="/agri-avatar.png" alt="Avatar" className="avatar-img" />
        </div>
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.mnumber}</p>
        </div>
      </div>

      <div className="wallet-box">
        <h3>My Wallets</h3>
        <p>Reward Wallet: ₹{wallet.reward_wallet}</p>
        <p>Purchase Wallet: ₹{wallet.purchase_wallet}</p>
      </div>

      <div className="account-options">
        <div className="option-card">
          <Link to="/MyOrders"><i className="fas fa-box"></i> <span>Orders</span></Link>
        </div>
        <Link to='/Wishlist'>
        <div className="option-card" onClick={() => alert("Wishlist page coming soon")}>
          <i className="fas fa-heart"></i> <span>Wishlist</span>
        </div>
        </Link>
        <div className="option-card" onClick={() => alert("Coupons feature not available yet")}>
          <i className="fas fa-ticket-alt"></i> <span>Coupons</span>
        </div>
        <div className="option-card" onClick={() => alert("Help Center page coming soon")}>
          <i className="fas fa-question-circle"></i> <span>Help Center</span>
        </div>
        <div className="option-card" onClick={() => setShowPasswordModal(true)}>
          <i className="fas fa-lock"></i> <span>Change Password</span>
        </div>
        <div
          className="option-card"
          onClick={() => {
            setEditedUser({ name: user.name, email: user.email });
            setShowEditModal(true);
          }}
        >
          <i className="fas fa-edit"></i> <span>Edit Profile</span>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      {message && <p className="message">{message}</p>}

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <h3>Edit Profile</h3>
          <input
            type="text"
            placeholder="Name"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
          />
          <div className="modal-actions">
            <button onClick={handleEditSave}>Save</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}

      {showPasswordModal && (
        <Modal onClose={() => setShowPasswordModal(false)}>
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              min-length="6"
              max-length="20"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className="modal-actions">
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowPasswordModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      <div className="footer">
        <p>&copy; {new Date().getFullYear()} AgriMart. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Me;