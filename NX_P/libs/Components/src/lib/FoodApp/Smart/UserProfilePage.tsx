import { Grid2 as Grid, Box, Button } from '@mui/material';
import { Navbar } from '../Dumb/Navbar';
import UserDisplay from './UserDisplay';
import { useAuth } from '../AuthProvider';
import { useEffect, useState } from 'react';
import { getUserProfilePicture } from '../ApiRequest/getUserProfilePicture';
import { getRestaurantList } from '../ApiRequest/getRestaurantList';
import { Menu, MenuItems, MenuList } from '@./Models';
import { RestaurantList } from '../Dumb/RestaurantList';
import { getFullMenu } from '../ApiRequest/getFullMenu';
import MenuProducts from '../Dumb/MenuProducts';
import {
  FlexColumn,
  FlexRow,
  mainContainer,
  UserProfileContainer,
} from '../themes/themes';
import { getMenuCategories } from '../ApiRequest/getMenuCategories';
import MenuSidenav from './MenuSidenav';
import { Cart } from './Cart';

export function UserProfilePage() {
  const [profilePicture, setProfilePicture] = useState<string>();
  const [menuList, setMenuList] = useState<MenuList[]>(); // stock all menus / restaurants
  const [selectedMenu, setSelectedMenu] = useState<Menu>(); // select a menu / restaurant
  const [menuToDisplay, setMenuToDisplay] = useState<string>(''); //stock which menu will be fetched
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartDisplayToggle, setCartDisplayToggle] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<MenuItems[]>([]);
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
    fetchMenuToDisplay();
  }, [menuToDisplay]);

  const fetchMenuToDisplay = () => {
    if (menuToDisplay === '') {
      return;
    }
    getFullMenu(menuToDisplay).then((response) => {
      setSelectedMenu(response);
    });

    getMenuCategories(menuToDisplay).then((response) => {
      setCategories(response);
    });
  };
  if (!user) {
    return <h1>Error while loading the page</h1>;
  }

  console.log(cartItems);
  return (
    <Box sx={{ height: '100%' }}>
      <Cart
        cartDisplayToggle={cartDisplayToggle}
        setCartDisplayToggle={setCartDisplayToggle}
        cartItems={cartItems}
        setCartItems={setCartItems}
      ></Cart>

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
          <Button
            variant="contained"
            onClick={() => {
              setCartDisplayToggle(!cartDisplayToggle);
            }}
          >
            Open Drawer
          </Button>

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
                width: '90%',
                padding: '0px',
              }}
            >
              <Grid container columns={20} sx={{ ...FlexRow }}>
                <Grid
                  size={2}
                  sx={{
                    ...FlexColumn,

                    height: 'fit-content',
                  }}
                >
                  <MenuSidenav
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                  />
                </Grid>
                <Grid
                  container
                  size={18}
                  columnGap={0}
                  rowGap={4}
                  columns={12}
                  alignItems={'center'}
                  sx={{ p: 3 }}
                >
                  <MenuProducts
                    selectedCategory={selectedCategory}
                    setMenuToDisplay={setMenuToDisplay}
                    restaurantName={selectedMenu.restaurantName}
                    menuItems={selectedMenu?.menuItems}
                    setSelectedMenu={setSelectedMenu}
                    selectedMenu={selectedMenu}
                    setCartItems={setCartItems}
                    cartItems={cartItems}
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
