import { MenuItems } from '@./Models';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid2 as Grid,
  Typography,
} from '@mui/material';

interface IMenuProductsProps {
  menuItems: MenuItems[];
}

export function MenuProducts({ menuItems }: IMenuProductsProps) {
  return menuItems.map((value: MenuItems, index) => (
    <Grid size={3}>
      <Card
        key={index}
        sx={{
          maxHeight: 'fit-content',
          borderRadius: '20px',
          width: '100%',
          minHeight: 'fit-content',
        }}
      >
        <CardActionArea
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 0,
            width: 'fit-content',
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {value.itemName}
            </Typography>
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
            <Button variant="contained" sx={{ mt: 3 }}>
              Edit Product
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ));
}

export default MenuProducts;
