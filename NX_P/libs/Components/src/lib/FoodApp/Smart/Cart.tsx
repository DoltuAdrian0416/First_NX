import { Box, Button, Drawer } from '@mui/material';
import { CartStyle } from '../themes/themes';
import { MenuItems } from '@./Models';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';

interface ICart {
  cartDisplayToggle: boolean;
  cartItems: MenuItems[];
  setCartItems: (cartItems: MenuItems[]) => void;
  setCartDisplayToggle: (cartDisplayToggle: boolean) => void;
}
export function Cart({
  cartItems,
  cartDisplayToggle,
  setCartItems,
  setCartDisplayToggle,
}: ICart) {
  return (
    <Drawer anchor="right" open={cartDisplayToggle}>
      <Box sx={CartStyle} onClick={() => setCartDisplayToggle(false)}>
        {cartItems.map((item, index) => {
          return (
            <Box key={index}>
              <Card
                orientation="horizontal"
                variant="outlined"
                sx={{ width: 400 }}
              >
                <CardOverflow>
                  <AspectRatio
                    ratio="1"
                    sx={{ width: 90, border: '5px solid red' }}
                  >
                    <img
                      src={`data:image/jpeg;base64,${item.productImage}`}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography
                    textColor="success.plainColor"
                    sx={{
                      fontWeight: 'md',
                      border: '5px solid red',
                      width: 'fit-content',
                    }}
                  >
                    {item.itemName}
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      width: 'fit-content',
                      border: '5px solid red',
                    }}
                  >
                    California, USA
                  </Typography>
                </CardContent>
                <CardOverflow
                  variant="soft"
                  color="primary"
                  sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    justifyContent: 'center',
                    fontSize: 'md',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    border: '5px solid red',
                  }}
                >
                  {item.price * item.amount} $
                </CardOverflow>
              </Card>

              <Button variant="contained">+</Button>
              <Button variant="contained">-</Button>
            </Box>
          );
        })}
      </Box>
    </Drawer>
  );
}

export default Cart;
