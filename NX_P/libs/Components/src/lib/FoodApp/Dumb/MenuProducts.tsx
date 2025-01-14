import { Menu, MenuItems } from '@./Models';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import EditProductPopup from './EditProductPopup';
import { FlexRow } from '../themes/themes';
interface IMenuProductsProps {
  selectedCategory: string;
  menuItems: MenuItems[];
  restaurantName: string;
  selectedMenu: Menu;
  cartItems: MenuItems[];
  setCartItems: (cartItems: MenuItems[]) => void;
  setMenuToDisplay: (MenuToDisplay: string) => void;
  setSelectedMenu: (selectedMenu: Menu) => void;
}

export function MenuProducts(props: IMenuProductsProps) {
  const handleAddToCart = (item: MenuItems) => {
    const foundItem = props.cartItems.find(
      (i) => i.itemName === item.itemName && i.menuId === item.menuId
    );

    if (foundItem) {
      foundItem.amount += 1;
    } else {
      props.setCartItems([...props.cartItems, { ...item, amount: 1 }]);
    }
  };

  return props.menuItems
    .filter(
      (item) =>
        item.category === props.selectedCategory ||
        props.selectedCategory === 'all'
    )
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
            <Typography variant="body2">{value.description}</Typography>

            <Box sx={{ ...FlexRow, justifyContent: 'space-between', pt: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  handleAddToCart(value);
                }}
              >
                Add to cart
              </Button>
              <Typography variant="h6">Price : {value.price} $</Typography>
            </Box>
            {/* <EditProductPopup
              setMenuToDisplay={props.setMenuToDisplay}
              restaurantName={props.restaurantName}
              value={value}
              setSelectedMenu={props.setSelectedMenu}
              selectedMenu={props.selectedMenu}
            /> */}
          </CardContent>
        </Card>
      </Grid>
    ));
}

export default MenuProducts;
