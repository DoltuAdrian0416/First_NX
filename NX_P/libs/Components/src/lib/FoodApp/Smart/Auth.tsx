import Grid from '@mui/material/Grid2';
import Login from './Login';
import { useLocation } from 'react-router-dom';
import Register from './Register';
import { useAuth } from '../AuthProvider';
import { useEffect } from 'react';

const containerStyles = { height: '100vh' };

const leftGridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to right top,#000000, #191919, #333333)',
};

const rightGridStyles = {
  backgroundImage: 'url(hero_login.jpg)',
  backgroundSize: 'cover',
  bgcolor: '#2a2a2aad',
  backgroundBlendMode: 'multiply',
};

export function Auth() {
  const location = useLocation();
  console.log(location);
  const auth = useAuth();
  useEffect(() => {
    auth?.removeCredentials();
  }, [location]);

  if (!auth?.token) {
    return (
      <Grid container spacing={0} sx={containerStyles}>
        <Grid size={{ xs: 12, md: 7, lg: 5 }} sx={leftGridStyles}>
          {location.pathname === '/login' ? <Login /> : <Register />}
        </Grid>
        <Grid size={{ xs: 0, md: 5, lg: 7 }} sx={rightGridStyles}></Grid>
      </Grid>
    );
  }
}

export default Auth;
