import { Box } from '@mui/material';
import Navbar from './Navbar';
import UserDisplay from './UserDisplay';
import curvedbg from '../assets/curvedbg.jpg';
import simplebg from '../assets/simpleBg.jpg';
import { useAuth } from '../AuthProvider';
import { useEffect, useState } from 'react';
import { GetUserProfilePicture } from '../ApiRequest/GetUserProfilePicture';

export function UserProfilePage() {
  const [profilePicture, setProfilePicture] = useState<string>();
  const user = useAuth()?.user;

  const UserProfileContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center ',
    flexGrow: '0',
    boxShadow: '3',
    borderRadius: '15px',
    position: 'relative',
    bgcolor: 'rgb(95, 150, 227, 0.7)',
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
      backgroundImage: `url(${simplebg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 1,
      zIndex: -1,
    },
  };

  const mainContainer = {
    display: 'flex',
    height: '100%',
    padding: '30px',
    position: 'relative',
    bgcolor: 'rgb(255, 255, 255, 0.125)',

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
      opacity: 0.5,

      zIndex: -1,
    },
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    GetUserProfilePicture(user.email).then((res) => {
      setProfilePicture(res);
    });
  }, [user]);
  if (!user) {
    return null;
  }

  async function testApi() {
    const apiKey = '67cc0e8a-a6c7-42a5-b04a-0132b90c3a07';
    const endpoint = `https://jooble.org/api/${apiKey}`;
    const payload = {
      keywords: 'Sales Manager, Administrator',
      location: 'Kyiv',
      radius: '80',
      page: '1',
      companysearch: 'false',
    };
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.jobs);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }
  testApi();

  return (
    <>
      <Navbar user={{ ...user, profilePicture }} />

      {/* row */}
      <Box sx={mainContainer}>
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
