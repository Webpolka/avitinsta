import { createContext } from "react";

export type CartItem = {
  productId: string; 
};


export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;

  isInCart: (productId: string) => boolean;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);