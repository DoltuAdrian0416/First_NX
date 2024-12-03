import { useAuth } from '../AuthProvider';
import Auth from './Auth';
import Homepage from './Homepage';
import { Login } from '@mui/icons-material';
import Register from './Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export function Routes() {
  const auth = useAuth();
  const routesForNotAuthenticatedOnly = [
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
    {},
  ];
  const routesForAuthenticatedOnly = [{}];

  const router = createBrowserRouter([
    ...(!auth?.token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
