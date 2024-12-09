import { Box } from '@mui/material';
import Navbar from './Navbar';
import UserDisplay from './UserDisplay';
import curvedbg from '../assets/curvedbg.jpg';

export function UserProfilePage() {
  return (
    <>
      <Navbar />

      {/* row */}
      <Box
        id={'GASESTE-MA'}
        sx={{
          display: 'flex',
          p: '20px',
        }}
      >
        {/* row */}
        <Box
          width={'fit-content'}
          height={'fit-content'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center ',
            flexGrow: '0',
            boxShadow: '3',
            borderRadius: '15px',
            position: 'relative',
            bgcolor: 'rgb(95, 150, 227, 0.5)',
            padding: '30px',
            flexDirection: 'column',
            overflow: 'hidden',

            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${curvedbg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 1,
              zIndex: -1,
            },
          }}
        >
          <UserDisplay email={localStorage.getItem('user')} />
        </Box>
      </Box>
    </>
  );
}

export default UserProfilePage;
