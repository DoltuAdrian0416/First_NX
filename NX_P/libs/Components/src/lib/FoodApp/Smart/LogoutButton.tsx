import { Button } from '@mui/material';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ExitToApp } from '@mui/icons-material';

export function LogoutButton() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <Button
      variant="contained"
      color="error"
      sx={{
        marginLeft: '20px',
        padding: '5px',
      }}
      onClick={() => {
        auth?.removeToken();
        navigate('/login');
      }}
    >
      <ExitToApp />
    </Button>
  );
}

export default LogoutButton;
