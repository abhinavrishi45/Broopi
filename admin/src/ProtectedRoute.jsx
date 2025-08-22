import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ContextAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return (Navigate('/'));
  }

  return children;
};

export default ProtectedRoute;
