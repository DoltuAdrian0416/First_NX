import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Homepage() {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      sx={{ margin: '2px' }}
      onClick={() => {
        navigate('/login');
      }}
    >
      Login
    </Button>
  );
}

export default Homepage;
