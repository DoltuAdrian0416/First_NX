import { Box } from '@mui/material';
import Login from './Login';
import { Outlet, useLocation } from 'react-router-dom';
import Register from './Register';
import { useAuth } from '../AuthProvider';
import { useEffect } from 'react';

export function Auth() {
  const location = useLocation();
  console.log(location);
  const auth = useAuth();
  useEffect(() => {
    auth?.setToken();
  }, [location]);
  if (!auth?.token) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '40%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'linear-gradient(to right top,#000000, #191919, #333333)',
          }}
        >
          {location.pathname === '/login' ? <Login /> : <Register />}
        </Box>
        <Box
          className="bg-[url('/hero_login.jpg')] bg-cover"
          sx={{
            width: '60%',
            height: '100vh',
            backgroundImage: 'url(hero_login.jpg)',
            backgroundSize: 'cover',
            bgcolor: '#2a2a2aad',
            backgroundBlendMode: 'multiply',
          }}
        ></Box>
      </Box>
    );
  }
}

export default Auth;
