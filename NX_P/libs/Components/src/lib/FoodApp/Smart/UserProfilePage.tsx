import { Grid2 as Grid, Button, Box } from '@mui/material';
import Navbar from './Navbar';
import UserDisplay from './UserDisplay';
import curvedbg from '../assets/curvedbg.jpg';
import simplebg from '../assets/simpleBg.jpg';
import { useAuth } from '../AuthProvider';
import { useEffect, useState } from 'react';
import { GetUserProfilePicture } from '../ApiRequest/GetUserProfilePicture';
import { GetRestaurantList } from '../ApiRequest/GetRestaurantList';
import { MenuList } from '@./Models';
import { RestaurantList } from '../Dumb/RestaurantList';

export function UserProfilePage() {
  const [profilePicture, setProfilePicture] = useState<string>();
  const [restaurants, setRestaurants] = useState<MenuList[]>();
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
    flexGrow: 1,
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

  return (
    <>
      <Navbar user={{ ...user, profilePicture }} />

      {/* row */}
      <Box sx={mainContainer}>
        {/* row */}
        <Grid container spacing={0}>
          <Grid sx={UserProfileContainer} height={'fit-content'}>
            <UserDisplay user={user} />
          </Grid>

          <Grid size={12}>
            <Button
              variant="outlined"
              onClick={async () => {
                setRestaurants(await GetRestaurantList());
                console.log(restaurants);
              }}
            >
              Fetch Data
            </Button>

            {restaurants && restaurants.length > 1 && (
              <Box sx={{ display: 'flex' }}>
                <RestaurantList restaurants={restaurants} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserProfilePage;
