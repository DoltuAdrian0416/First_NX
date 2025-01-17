import { MenuItems } from "@./Models";

interface CartItem extends MenuItems {
  amount: number;
}

interface CartUtilsProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

export const handleAddToCart = (item: MenuItems, props: CartUtilsProps) => {
  const foundItem = props.cartItems.find(
    (i) => i.itemName === item.itemName && i.menuId === item.menuId
  );

  if (foundItem) {
    const updatedCartItems = props.cartItems.map((i) =>
      i.itemName === item.itemName && i.menuId === item.menuId
        ? { ...i, amount: i.amount + 1 }
        : i
    );
    props.setCartItems(updatedCartItems);
  } else {
    props.setCartItems([...props.cartItems, { ...item, amount: 1 }]);
  }
};
