// import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../../Context/AuthContext';

// const ProtectedRouteadmin = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   return user ? children : <Navigate to="/admin/login" />;
// };

// export default ProtectedRouteadmin;
// ProtectedRoute.js
// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext'; // Adjust if needed

const ProtectedRouteadmin = ({ children }) => {
  const { admin } = useContext(AuthContext);
  console.log("Admin status from context:", admin); // Debug

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRouteadmin;