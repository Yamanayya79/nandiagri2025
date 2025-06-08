// src/pages/ForgetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/forget-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="forget-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgetPassword;