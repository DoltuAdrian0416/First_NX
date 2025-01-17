import { Box, Button, Drawer } from '@mui/material';
import { CartStyle, FlexRow } from '../themes/themes';
import { MenuItems } from '@./Models';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { handleAddToCart } from '../Utils/addToCard';
import { handleRemoveFromCart } from '../Utils/removeFromCart';
import { AddCircle, Cancel, RemoveCircle } from '@mui/icons-material';
import { IconShoppingCartFilled, IconReceiptFilled } from '@tabler/icons-react';

interface ICart {
  cartDisplayToggle: boolean;
  cartItems: MenuItems[];
  setCartItems: (cartItems: MenuItems[]) => void;
  setCartDisplayToggle: (cartDisplayToggle: boolean) => void;
}

function groupItemsByMenuId(items: MenuItems[]) {
  return items.reduce((groups, item) => {
    const group = groups[item.menuId] || [];
    group.push(item);
    groups[item.menuId] = group;
    return groups;
  }, {} as { [key: string]: MenuItems[] });
}

export function Cart({
  cartItems,
  cartDisplayToggle,
  setCartItems,
  setCartDisplayToggle,
}: ICart) {
  const [totalPrice, setTotalPrice] = useState(0);

  function calculateTotalPrice(items: (MenuItems & { amount: number })[]) {
    return Number(
      items
        .reduce((total, item) => total + item.amount * item.price, 0)
        .toPrecision(4)
    );
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
  }, [cartDisplayToggle, cartItems]);

  const groupedItems = groupItemsByMenuId(cartItems);

  return (
    <Drawer anchor="right" open={cartDisplayToggle}>
      <Box sx={CartStyle}>
        <Box
          sx={{
            padding: 3,
            background: '#1e88e5',
            ...FlexRow,
            alignItems: 'center',
          }}
        >
          <IconShoppingCartFilled color="#fafafa" />
          <Typography level="h2" sx={{ ml: 2 }} textColor={'white'}>
            Your cart
          </Typography>
          <Button
            onClick={() => setCartDisplayToggle(false)}
            sx={{
              position: 'absolute',
              right: 20,
              '& svg': {
                color: 'white',
                transition: '.5s ease-in-out',
              },
              '& svg:hover': { color: 'black', transition: '.5s ease-in-out' },
            }}
          >
            <Cancel />
          </Button>
        </Box>
        {Object.keys(groupedItems).map((menuId) => (
          <Box key={menuId}>
            <Typography
              level="h3"
              textColor={'primary'}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #ccc',
              }}
            >
              Menu ID: {menuId}
            </Typography>
            {groupedItems[menuId].map((item, index) => (
              <Box key={index}>
                <Card
                  orientation="horizontal"
                  variant="outlined"
                  sx={{ width: 400, borderRadius: 0 }}
                >
                  <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                      <img
                        src={`data:image/jpeg;base64,${item.productImage}`}
                        loading="lazy"
                        alt=""
                      />
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent>
                    <Box sx={{ ...FlexRow, justifyContent: 'space-between' }}>
                      <Typography
                        textColor="success.plainColor"
                        sx={{
                          fontWeight: 'md',
                          width: 'fit-content',
                        }}
                      >
                        {item.itemName}
                      </Typography>
                      <Typography
                        textColor="primary.plainColor"
                        sx={{
                          fontWeight: 'xs',
                          width: 'fit-content',
                        }}
                      >
                        Price : {item.price} $
                      </Typography>
                    </Box>

                    <Box sx={{ ...FlexRow }}>
                      <Typography
                        textColor="primary.plainColor"
                        sx={{
                          fontWeight: 'xs',
                          width: 'fit-content',
                          mr: 2,
                        }}
                      >
                        Amount : {item.amount}
                      </Typography>
                      <Button
                        sx={{
                          minWidth: '30px',
                          maxWidth: 'fit-content',
                          p: 0,
                        }}
                        onClick={() => {
                          handleAddToCart(item, {
                            cartItems: cartItems,
                            setCartItems: setCartItems,
                          });
                        }}
                      >
                        <AddCircle />
                      </Button>
                      <Button
                        sx={{ minWidth: '30px', maxWidth: 'fit-content', p: 0 }}
                        onClick={() => {
                          handleRemoveFromCart(item, {
                            cartItems: cartItems,
                            setCartItems: setCartItems,
                          });
                        }}
                      >
                        <RemoveCircle
                          sx={{
                            transition: '.5s ease-in-out',
                            '&:hover': {
                              color: 'red',
                              transition: '.5s ease-in-out',
                            },
                          }}
                        />
                      </Button>
                    </Box>
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
                    }}
                  >
                    {(item.price * item.amount).toFixed(2)}$
                  </CardOverflow>
                </Card>
              </Box>
            ))}
          </Box>
        ))}
        <Typography
          level="h3"
          textColor={'white'}
          sx={{
            background: '#1e88e5',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            '& svg': {
              mr: 2,
            },
          }}
        >
          <IconReceiptFilled />
          Total Price is : {totalPrice}$
        </Typography>
      </Box>
    </Drawer>
  );
}

export default Cart;
