import { createContext, useState, useEffect } from 'react';
import axios from './axios'; // adjust path if needed

export const AdminAuthContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    axios
      .get('https://agriapi2025.onrender.com/api/admin/check-session', { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn || res.data.success) {
          setAdmin(res.data.admin);
          console.log('Admin set from session:', res.data.admin);
        } else {
          setAdmin(null);
        }
      })
      .catch(() => setAdmin(null));
  }, []);

  const loginAsAdmin = async (email, password) => {
    try {
      const response = await axios.post(
        'https://agriapi2025.onrender.com/api/admin/login',
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        setAdmin(response.data.admin);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'admin');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return false;
    }
  };

  const logoutAdmin = async () => {
    try {
      await axios.post('https://agriapi2025.onrender.com/api/admin/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Admin logout error:', error);
    } finally {
      setAdmin(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userType');
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loginAsAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};