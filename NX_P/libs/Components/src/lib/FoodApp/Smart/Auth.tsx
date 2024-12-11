import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Login from './Login';
import { useLocation } from 'react-router-dom';
import Register from './Register';
import { useAuth } from '../AuthProvider';
import { useEffect } from 'react';

export function Auth() {
  const location = useLocation();
  console.log(location);
  const auth = useAuth();
  useEffect(() => {
    auth?.removeToken();
  }, [location]);

  if (!auth?.token) {
    return (
      <Grid container spacing={0} sx={{ height: '100vh' }}>
        <Grid
          size={{ xs: 12, md: 7, lg: 5 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'linear-gradient(to right top,#000000, #191919, #333333)',
          }}
        >
          {location.pathname === '/login' ? <Login /> : <Register />}
        </Grid>
        <Grid
          size={{ xs: 0, md: 5, lg: 7 }}
          sx={{
            backgroundImage: 'url(hero_login.jpg)',
            backgroundSize: 'cover',
            bgcolor: '#2a2a2aad',
            backgroundBlendMode: 'multiply',
          }}
        ></Grid>
      </Grid>
    );
  }
}

export default Auth;
