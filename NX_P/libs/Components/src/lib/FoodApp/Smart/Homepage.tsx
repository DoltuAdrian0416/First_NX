import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

export function Homepage() {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <Button
        variant="contained"
        sx={{ margin: '2px' }}
        onClick={() => {
          navigate('/login');
        }}
      >
        Login
      </Button>

      <Button
        variant="contained"
        sx={{ margin: '2px' }}
        onClick={() => {
          auth?.removeToken();
        }}
      >
        Log out
      </Button>
    </>
  );
}

export default Homepage;
