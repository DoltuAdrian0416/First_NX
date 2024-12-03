import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

export const ProtectedRoute = () => {
  const auth = useAuth();

  // Check if the user is authenticated
  if (!auth?.token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
