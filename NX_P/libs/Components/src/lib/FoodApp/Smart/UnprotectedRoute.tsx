import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

export const UnprotectedRoute = () => {
  const auth = useAuth();

  // Check if the user is authenticated
  if (auth?.token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/user" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
