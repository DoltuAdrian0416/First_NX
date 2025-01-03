import { MenuItems } from "./MenuItems";

export interface Menu {

    restaurantName: string;
    description: string;
    imageBlob: string;
    menuItems :MenuItems[];
  }
