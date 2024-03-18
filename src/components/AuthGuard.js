import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('user') !== null;

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
      navigate('/logiin');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthGuard;
