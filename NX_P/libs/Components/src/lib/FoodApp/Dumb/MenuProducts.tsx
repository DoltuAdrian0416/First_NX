import { MenuItems } from '@./Models';
import {
  Card,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import EditProductPopup from './EditProductPopup';
// import EditProductPopup from './EditProductPopup';
interface IMenuProductsProps {
  selectedCategory: string;
  menuItems: MenuItems[];
  restaurantName: string;
  setMenuToDisplay: (MenuToDisplay: string) => void;
}

export function MenuProducts(props: IMenuProductsProps) {
  return props.menuItems
    .filter((item) => item.category === props.selectedCategory)
    .map((value: MenuItems, index) => (
      <Grid key={index} size={4} container justifyContent={'center'}>
        <Card
          sx={{
            borderRadius: '20px',
            width: '80%',
            minWidth: 'fit-content',
            minHeight: 'fit-content',
            maxHeight: 'fit-content',
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {value.itemName}
            </Typography>
            <CardMedia
              component="img"
              alt="This product has no image"
              height={200}
              width={'200px'}
              sx={{ maxHeight: '200px' }}
              src={`data:image/jpeg;base64,${value.productImage}`}
            />
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                width: '100%',
                height: '50px',
                overflow: 'hidden',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '20px',
                  background:
                    'linear-gradient(to top, white, rgba(255, 255, 255, 0))',
                },
              }}
            >
              {value.description}
            </Typography>
            <EditProductPopup
              setMenuToDisplay={props.setMenuToDisplay}
              restaurantName={props.restaurantName}
              value={value}
            />{' '}
            implement the admin only feature
          </CardContent>
        </Card>
      </Grid>
    ));
}

export default MenuProducts;
