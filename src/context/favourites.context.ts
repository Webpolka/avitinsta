import { createContext } from "react";

export type FavouriteItem = {
  productId: string;
};

export type FavouritesContextType = {
  items: FavouriteItem[];
  addItem: (item: FavouriteItem) => void;
  removeItem: (productId: string) => void;
  isInFavourites: (productId: string) => boolean;
};

export const FavouritesContext = createContext<FavouritesContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  isInFavourites: () => false,
});
