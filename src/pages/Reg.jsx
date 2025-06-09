// RegisterPage.js

import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../styles/Register.css'

const Reg = () => {
  const [mnumber, setMnumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = input, 2 = OTP, 3 = success
  const [sessionId, setSessionId] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await fetch('https://agriapi2025.onrender.com/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mnumber }),
      });
      const data = await res.json();

      if (data.Status === 'Success') {
        setSessionId(data.Details); // store session_id
        setStep(2); // go to OTP step
        alert('OTP sent successfully');
      } else {
        alert('Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('https://agriapi2025.onrender.com/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, otp }),
      });
      const data = await res.json();

      if (data.Status === 'Success') {
        handleRegister(); // Proceed to register user
      } else {
        alert('OTP verification failed');
      }
    } catch (err) {
      console.error(err);
      alert('OTP verification error');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch('https://agriapi2025.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mnumber, email, password }),
      });
      const data = await res.json();

      if (data.message) {
        alert('Registration successful');
        setStep(3);
      } else {
        alert(data.err || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during registration');
    }
  };

  return (
    <div className="Reg_form" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>User Registration</h2>

      {step === 1 && (
        <>
        <label>Step:1</label>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mnumber}
            onChange={(e) => setMnumber(e.target.value)}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
        <label>Step:2</label>
          <p>Enter the OTP sent to your mobile</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <button onClick={handleVerifyOtp}>Verify OTP & Register</button>
        </>
      )}

      {step === 3 && <h4>Registration completed successfully!</h4>}
    
      <p style={{ marginTop: '20px' }}>
        Already have an account? <a href="/login">Login</a>
      </p>
      <p>
        <Link to='/'>Forget Password</Link>
      </p>

    </div>
  );
};

export default Reg;