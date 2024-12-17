import {
  Grid2 as Grid,
  Button,
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';
import Navbar from './Navbar';
import UserDisplay from './UserDisplay';
import curvedbg from '../assets/curvedbg.jpg';
import simplebg from '../assets/simpleBg.jpg';
import { useAuth } from '../AuthProvider';
import { useEffect, useState } from 'react';
import { getUserProfilePicture } from '../ApiRequest/getUserProfilePicture';
import { getRestaurantList } from '../ApiRequest/getRestaurantList';
import { Menu, MenuItems, MenuList } from '@./Models';
import { RestaurantList } from '../Dumb/RestaurantList';
import { getFullMenu } from '../ApiRequest/getFullMenu';

export function UserProfilePage() {
  const [profilePicture, setProfilePicture] = useState<string>();
  const [menuList, setMenuList] = useState<MenuList[]>(); // stock all menus / restaurants
  const [selectedMenu, setSelectedMenu] = useState<Menu>(); // select a menu / restaurant
  const [menuToDisplay, setMenuToDisplay] = useState<string>(''); //stock which menu will be fetched
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

    getUserProfilePicture(user.email).then((res) => {
      setProfilePicture(res);
    });
  }, [user]);

  useEffect(() => {
    getRestaurantList().then((response) => {
      setMenuList(response);
    });
  }, []);

  useEffect(() => {
    getFullMenu(menuToDisplay).then((response) => {
      setSelectedMenu(response);
      console.log(response);
    });
  }, [menuToDisplay]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar user={{ ...user, profilePicture }} />

      {/* row */}
      <Box sx={mainContainer}>
        {/* row */}
        <Grid container spacing={0} columnGap={10}>
          <Grid size={'auto'} sx={UserProfileContainer} height={'fit-content'}>
            <UserDisplay user={user} />
          </Grid>

          <Grid size={'auto'}>
            {menuList && menuList.length > 1 && (
              <Box sx={{ display: 'flex' }}>
                <RestaurantList
                  setMenuToDisplay={setMenuToDisplay}
                  menuList={menuList}
                />
              </Box>
            )}
          </Grid>

          {/* menu items will be displayed here */}
          <Grid
            size={12}
            sx={{
              bgcolor: '#bbdefb',
              borderRadius: '15px',
              boxShadow: 4,
            }}
          >
            <Typography>
              The current menu is : {selectedMenu?.restaurantName}
              This menu features :
            </Typography>

            <Grid
              container
              spacing={0}
              columnGap={5}
              rowGap={5}
              sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}
            >
              <Grid container size={1}>
                Sidenav
              </Grid>
              <Grid container size={10} columnGap={3} rowGap={3}>
                {selectedMenu?.menuItems.map((value: MenuItems, index) => (
                  <Grid size={2}>
                    <Card
                      key={index}
                      sx={{
                        maxHeight: 'fit-content',
                        borderRadius: '20px',
                        width: 'fit-content',
                        minWidth: 250,
                        minHeight: 200,
                      }}
                    >
                      <CardActionArea
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          p: 1,
                          width: 'fit-content',
                        }}
                      >
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography gutterBottom variant="h5" component="div">
                            {value.itemName}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                            }}
                          >
                            {value.description}
                          </Typography>
                          <Button variant="contained" sx={{ mt: 3 }}>
                            Edit Product
                          </Button>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserProfilePage;
