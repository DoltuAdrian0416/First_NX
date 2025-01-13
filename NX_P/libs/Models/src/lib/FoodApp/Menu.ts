import { MenuItems } from "./MenuItems";

export interface Menu {
    id: string;
    restaurantName: string;
    description: string;
    imageBlob: string;
    menuItems :MenuItems[];
  }
