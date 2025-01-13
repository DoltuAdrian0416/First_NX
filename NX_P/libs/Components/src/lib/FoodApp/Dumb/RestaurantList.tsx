import { MenuList } from '@./Models';
import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid2 as Grid,
  Box,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

interface IRestaurantListProps {
  menuList: MenuList[];
  setMenuToDisplay: (menu: string) => void;
}

export function RestaurantList({
  menuList,
  setMenuToDisplay,
}: IRestaurantListProps) {
  return (
    <Box>
      <Carousel
        sx={{ width: '500px', overflow: 'visible' }}
        NextIcon={<SkipNextOutlined />}
        PrevIcon={<SkipPreviousOutlined />}
        fullHeightHover={false}
        animation="fade"
        navButtonsAlwaysVisible={false}
        IndicatorIcon={false}
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: 'darkblue',
            borderRadius: 15,
          },
        }}
        navButtonsWrapperProps={{
          // Move the buttons to the bottom. Unsetting top here to override default style.
          style: {
            top: '-20px',
          },
        }}
        interval={5000}
        duration={1500}
      >
        {menuList.map((menu, index) => (
          <Card key={index} sx={{ maxHeight: '100', borderRadius: '20px' }}>
            <CardActionArea
              sx={{ display: 'flex', alignContent: 'flex-start' }}
              onClick={() => {
                setMenuToDisplay(menu.menuName);
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={`data:image/jpeg;base64,${menu.imageBlob}`}
                alt={menu.menuName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {menu.menuName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 'fit-content',
                    maxHeight: '77px',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '30px',
                      background:
                        'linear-gradient(to top, white, rgba(255, 255, 255, 0))',
                    },
                  }}
                >
                  {menu.menuDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
}

export default RestaurantList;
