import { Box } from '@mui/material';
import Navbar from './Navbar';
import UserDisplay from './UserDisplay';

export function UserProfilePage() {
  return (
    <Box>
      <Navbar />
      <Box
        width={'100%'}
        height={'100%'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center ',
        }}
      >
        <UserDisplay email={localStorage.getItem('user')} />
      </Box>
    </Box>
  );
}

export default UserProfilePage;
