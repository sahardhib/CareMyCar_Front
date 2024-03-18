// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  
  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/Login" replace />
  );
};

export default PrivateRoute;
