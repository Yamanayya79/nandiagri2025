import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css'
import { AuthContext } from '../../Context/AuthContext'; // Make sure this is correctly imported

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '', // email or mobile
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://agriapi2025.onrender.com//api/login',
        {
          identifier: formData.identifier,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.user);
        alert('Login successful');
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error('Login Error:', err);
      alert('Server error during login');
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      <input
        type="text"
        name="identifier"
        placeholder="Email or Mobile Number"
        value={formData.identifier}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleLogin} style={{ width: '100%', padding: '10px' }}>
        Login
      </button>
      <p style={{ marginTop: '10px' }}>
        Don't have an account? <a href="/Register" >Register here</a>  

          </p>
      <p>
        <a href="/ForgotPassword">Forgot Password?</a>  
      </p>

    </div>
  );
};

export default Login;