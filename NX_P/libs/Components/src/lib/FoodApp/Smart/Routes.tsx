import { useAuth } from '../AuthProvider';
import Auth from './Auth';
import Homepage from './Homepage';
import { Login } from '@mui/icons-material';
import Register from './Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProfilePage from './UserProfilePage';
import { ProtectedRoute } from './ProtectedRoute';
import { UnprotectedRoute } from './UnprotectedRoute';

export function Routes() {
  const auth = useAuth();
  const publicRoutes = [{}];
  const routesForNotAuthenticatedOnly = [
    {
      element: <UnprotectedRoute />,
      children: [
        {
          path: '',
          element: <Homepage />,
        },
        {
          path: '/',
          element: <Auth />,
          children: [
            {
              path: '/login',
              element: <Login />,
            },
            {
              path: '/register',
              element: <Register />,
            },
          ],
        },
      ],
    },
    {},
  ];
  const routesForAuthenticatedOnly = [
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/user',
          element: <UserProfilePage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
