// // src/Context/AuthContext.js
// import { createContext, useState, useEffect } from 'react';
// import axios from '../pages/Login/axios';

// export const AuthContext = createContext(); // <-- export this

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const checkSession = async () => {
//     try {
//       const res = await axios.get('/api/check-session');
//       if (res.data.loggedIn) {
//         setUser(res.data.user);
//       }
//     } catch (error) {
//       console.error('Session check failed', error);
//     }
//   };

//   useEffect(() => {
//     checkSession();
//   }, []);

//   const logout = async () => {
//     await axios.post('/api/logout');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// import React, { createContext, useState, useEffect } from 'react';
import { createContext, useState, useEffect } from 'react';
import axios from '../pages/Login/axios';

export const AuthContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Optional: Check session on page refresh
  useEffect(() => {
    axios.get('https://agriapi2025.onrender.com/api/check-session', { withCredentials: true })
      .then(res => {
        if (res.data.success) setUser(res.data.user);
      })
      .catch(() => setUser(null));
  }, []);
//   useEffect(() => {
//   axios.get('https://agriapi2025.onrender.com/api/check-session', { withCredentials: true })
//     .then(res => {
//       if (res.data.success) setUser(res.data.user);
//       else setUser(null);
//     })
//     .catch(() => setUser(null));
// }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
