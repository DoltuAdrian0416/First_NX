import { Button, Typography } from '@mui/material';
import {
  IconPig,
  IconBurger,
  IconBottleFilled,
  IconCookie,
  IconMeat,
  IconBorderAll,
} from '@tabler/icons-react';
import { category as categoryStyle } from '../themes/themes';

interface IUserSidenav {
  categories: string[];
  setSelectedCategory: (category: string) => void;
}

enum Icons {
  Burgers = 'Burgers',
  Beef = 'Beef',
  Chicken = 'Chicken',
  Pork = 'Pork',
  Soda = 'Sodas',
  Desserts = 'Desserts',
}

const iconMap = {
  [Icons.Beef]: <IconBurger size={25} />,
  [Icons.Chicken]: <IconMeat size={25} />,
  [Icons.Pork]: <IconPig size={25} />,
  [Icons.Soda]: <IconBottleFilled size={25} />,
  [Icons.Desserts]: <IconCookie size={25} />,
  [Icons.Burgers]: <IconBurger size={25} />,
};

export function MenuSidenav({ categories, setSelectedCategory }: IUserSidenav) {
  return (
    <>
      <Button
        variant="contained"
        sx={categoryStyle}
        onClick={() => {
          setSelectedCategory('all');
        }}
      >
        <IconBorderAll />
        <Typography sx={{ ml: '10px' }} variant={'body2'}>
          All
        </Typography>
      </Button>

      {categories.map((categoryName, index) => {
        const IconComponent = iconMap[categoryName as Icons]; // Type assertion to ensure categoryName is treated as Icons enum

        const changeCategory = () => {
          setSelectedCategory(categoryName);
        };
        return (
          <Button
            variant="contained"
            key={index}
            sx={categoryStyle}
            onClick={changeCategory}
          >
            {IconComponent}
            <Typography sx={{ ml: '10px' }} variant={'body2'}>
              {categoryName}
            </Typography>
          </Button>
        );
      })}
    </>
  );
}

export default MenuSidenav;
