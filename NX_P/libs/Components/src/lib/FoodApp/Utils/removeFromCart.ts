import { MenuItems } from "@./Models";

interface CartItem extends MenuItems {
  amount: number;
}

interface CartUtilsProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

export const handleRemoveFromCart = (item: MenuItems, props: CartUtilsProps) => {
  const foundItem = props.cartItems.find(
    (i) => i.itemName === item.itemName && i.menuId === item.menuId
  );

  if (foundItem) {
    const updatedCartItems = props.cartItems
      .map((i) =>
        i.itemName === item.itemName && i.menuId === item.menuId
          ? { ...i, amount: i.amount - 1 }
          : i
      )
      .filter((i) => i.amount > 0);
    props.setCartItems(updatedCartItems);
  }
};
