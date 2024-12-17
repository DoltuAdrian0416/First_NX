import { Menu } from "@./Models";

export async function getFullMenu(menu : string) {
  const response = await fetch(
    `http://localhost:5158/api/menu/${menu}`
  );

  if (response.ok) {
    const backendMenu = await response.json();
    const mappedMenu: Menu = {
      restaurantName: backendMenu.relatedRestaurant,
      description: backendMenu.description,
      imageBlob: backendMenu.image.toString('base64'), 
      menuItems: backendMenu.menuItems
    };
    return mappedMenu
  }
  return undefined;
}
