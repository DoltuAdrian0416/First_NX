import { Grid2 as Grid, Box, Typography } from '@mui/material';
import { Navbar } from '../Dumb/Navbar';
import UserDisplay from './UserDisplay';
import { useAuth } from '../AuthProvider';
import { useEffect, useState } from 'react';
import { getUserProfilePicture } from '../ApiRequest/getUserProfilePicture';
import { getRestaurantList } from '../ApiRequest/getRestaurantList';
import { Menu, MenuList } from '@./Models';
import { RestaurantList } from '../Dumb/RestaurantList';
import { getFullMenu } from '../ApiRequest/getFullMenu';
import MenuProducts from '../Dumb/MenuProducts';
import { mainContainer, UserProfileContainer } from '../themes/themes';

export function UserProfilePage() {
  const [profilePicture, setProfilePicture] = useState<string>();
  const [menuList, setMenuList] = useState<MenuList[]>(); // stock all menus / restaurants
  const [selectedMenu, setSelectedMenu] = useState<Menu>(); // select a menu / restaurant
  const [menuToDisplay, setMenuToDisplay] = useState<string>(''); //stock which menu will be fetched
  const user = useAuth()?.user;

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
    return <h1>Error while loading the page</h1>;
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Box>
        <Navbar user={{ ...user, profilePicture }} />
      </Box>

      <Box sx={mainContainer}>
        {/* row */}
        <Grid
          container
          spacing={0}
          columnGap={10}
          rowSpacing={0}
          alignItems="center"
          justifyContent="center"
        >
          {/* column */}
          <Grid size={'auto'} sx={UserProfileContainer} height={'fit-content'}>
            <UserDisplay user={user} />
          </Grid>
          {/*  */}
          <Grid size={'auto'}>
            {menuList && menuList.length > 1 && (
              <RestaurantList
                setMenuToDisplay={setMenuToDisplay}
                menuList={menuList}
              />
            )}
          </Grid>

          {/* menu items will be displayed here */}
          {selectedMenu?.menuItems && selectedMenu && (
            <Box
              sx={{
                bgcolor: '#bbdefb',
                borderRadius: '15px',
                boxShadow: 4,
                width: '85%',
              }}
            >
              <Grid
                container
                columns={20}
                sx={{ display: 'flex', justifyContent: 'center', p: 5 }}
              >
                <Grid size={2} sx={{ border: '5px solid red' }}>
                  <Typography sx={{ width: '100%' }}>Sidenav</Typography>
                </Grid>
                <Grid
                  container
                  size={18}
                  columnGap={0}
                  rowGap={4}
                  columns={12}
                  alignItems={'center'}
                  sx={{ border: '5px solid red' }}
                >
                  <MenuProducts
                    setMenuToDisplay={setMenuToDisplay}
                    restaurantName={selectedMenu.restaurantName}
                    menuItems={selectedMenu?.menuItems}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default UserProfilePage;
