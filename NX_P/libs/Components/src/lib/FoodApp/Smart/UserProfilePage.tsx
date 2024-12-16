import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
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
  const [products, setProducts] = useState([
    {
      id: null,
      title: '',
      image: '',
      imageType: '',
      restaurantChain: '',
      servings: {
        number: null,
        size: null,
        unit: null,
      },
    },
  ]);
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

  async function GetProducts() {
    const apiKey = '27e3ba1dab574c4b9bc72a0a928782c7';
    const endpoint = `https://api.spoonacular.com/food/menuItems/search?query=KFC&restaurant`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const transformedProducts = data.menuItems.map((menuItem: any) => ({
          id: menuItem.id,
          title: menuItem.title,
          image: menuItem.image,
          imageType: menuItem.imageType,
          restaurantChain: menuItem.restaurantChain,
          servings: {
            number: menuItem.servings.number,
            size: menuItem.servings.size,
            unit: menuItem.servings.unit,
          },
        }));
        setProducts(transformedProducts);
        console.log(products);
      } else {
        console.error(
          'Failed to fetch data:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

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

        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              GetProducts();
            }}
          >
            Fetch Data
          </Button>

          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia component="img" height="50" />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default UserProfilePage;
