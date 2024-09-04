import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);
  
  // Check if the role is allowed
  const isAllowed = allowedRoles.includes(role);

  const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true}/>
  // Determine if the route should be accessible
  
  return accessibleRoute;
};

export default ProtectedRoute;
