import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Basic validation
    if (!username || !email || !password) {
      setMessageType('error');
      setMessage('Please fill in all fields.');
      return;
    }
    if (username.length < 3) {
      setMessageType('error');
      setMessage('Username must be at least 3 characters long.');
      return;
    }
    if (password.length < 6) {
      setMessageType('error');
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType('success');
        setMessage('Registration successful! You can now log in.');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessageType('error');
        setMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Could not connect to server. Please try later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Registration</h1>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <label htmlFor="username" style={styles.label}>Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          minLength={3}
          required
          autoComplete="username"
          disabled={loading}
        />

        <label htmlFor="email" style={styles.label}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
          autoComplete="email"
          disabled={loading}
        />

        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          minLength={6}
          required
          autoComplete="new-password"
          disabled={loading}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && (
        <div
          role="alert"
          style={{
            ...styles.message,
            ...(messageType === 'success' ? styles.success : styles.error),
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 350,
    width: '100%',
    margin: '0 auto',
    padding: 20,
    background:
      'linear-gradient(135deg, #4b6cb7, #182848)',
    borderRadius: 12,
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 600,
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: 25,
    fontWeight: '700',
    fontSize: '1.8rem',
    letterSpacing: 1,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  label: {
    fontWeight: 600,
    fontSize: '0.9rem',
    marginBottom: 5,
    display: 'block',
  },
  input: {
    padding: '12px 15px',
    borderRadius: 8,
    border: 'none',
    fontSize: '1rem',
    outlineOffset: 2,
    outline: '2px solid transparent',
    transition: 'outline-color 0.3s',
    background: 'rgba(255 255 255 / 0.2)',
    color: '#fff',
  },
  button: {
    padding: '12px 0',
    borderRadius: 8,
    border: 'none',
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: 1,
    color: '#182848',
    background: '#6cb1ff',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgb(108 177 255 / 0.6)',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: 15,
    padding: '10px 15px',
    borderRadius: 8,
    fontWeight: 600,
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  success: {
    backgroundColor: 'rgba(50, 205, 50, 0.8)',
    color: '#152f13',
  },
  error: {
    backgroundColor: 'rgba(255, 69, 58, 0.85)',
    color: '#3a0c0c',
  },
};

export default Register;
