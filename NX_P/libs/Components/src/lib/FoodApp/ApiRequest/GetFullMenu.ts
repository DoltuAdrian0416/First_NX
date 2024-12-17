import { Menu } from '@./Models';

export async function getFullMenu(menu: string) {
  const response = await fetch(`http://localhost:5158/api/menu/${menu}`);

  if (response.ok) {
    const backendMenu = await response.json();
    const mappedMenu: Menu = {
      restaurantName: backendMenu.relatedRestaurant,
      description: backendMenu.description,
      imageBlob: backendMenu.image.toString('base64'),
      menuItems: backendMenu.menuItems.map((item: any) => ({
        id: item.id,
        itemName: item.name,
        description: item.description,
        price: item.price,
        productImage: item.productImage.toString('base64'), // Convert byte array to base64 string if needed
        menuId: item.menuId,
      })),
    };
    return mappedMenu;
  }
  return undefined;
}
