import { Box } from '@mui/material';
import Navbar from './Navbar';
import UserDisplay from './UserDisplay';
import curvedbg from '../assets/curvedbg.jpg';
import { useAuth } from '../AuthProvider';
import { VerifyUserModifications } from '../ApiRequest/VerifyUserModifications';

export function UserProfilePage() {
  const user = useAuth()?.user;
  if (!user) {
    return <h1>Not logged in</h1>;
  }
  const UserProfileContainer = {
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
  };

  return (
    <>
      <Navbar user={user} />

      {/* row */}
      <Box
        sx={{
          display: 'flex',
          p: '20px',
        }}
      >
        {/* row */}
        <Box
          width={'fit-content'}
          height={'fit-content'}
          sx={UserProfileContainer}
        >
          <UserDisplay user={user} />
        </Box>
      </Box>
    </>
  );
}

export default UserProfilePage;
