import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);
  
  // Check if the role is allowed
  const isAllowed = allowedRoles.includes(role);
  
  // Determine if the route should be accessible
  if (token && isAllowed) {
    return children;
  } else {
    return <Navigate to='/login' replace={true} />;
  }
};

export default ProtectedRoute;
