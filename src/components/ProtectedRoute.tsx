import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getValidToken } from '../services/api';

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = getValidToken();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

