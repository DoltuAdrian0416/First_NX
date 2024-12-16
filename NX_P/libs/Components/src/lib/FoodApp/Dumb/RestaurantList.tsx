import { MenuList } from '@./Models';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

interface IRestaurantListProps {
  restaurants: MenuList[];
}

export function RestaurantList({ restaurants }: IRestaurantListProps) {
  console.log(restaurants);
  return (
    <>
      {restaurants.map((restaurant) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ width: '200px' }}
              src={`data:image/jpeg;base64,${restaurant.imageBlob}`}
              alt={restaurant.menuName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {restaurant.menuName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* description todo */}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Try
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default RestaurantList;
