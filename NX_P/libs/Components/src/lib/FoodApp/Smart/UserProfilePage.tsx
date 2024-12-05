import { Button } from '@mui/material';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export function UserProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {/* <Navbar /> */}
      <Button
        variant="contained"
        sx={{ margin: '2px' }}
        onClick={() => {
          auth?.removeToken();
          navigate('/');
        }}
      >
        Log out
      </Button>
    </>
  );
}

export default UserProfilePage;
