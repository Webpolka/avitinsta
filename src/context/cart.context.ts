import { createContext } from "react";

export type CartItem = {
  id: string;      // уникальный id товара
  title: string;   // название товара
  image?: string;  // картинка (опционально)
  price?: number;  // цена (опционально)
};

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  isInCart: (id: string) => boolean;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);
