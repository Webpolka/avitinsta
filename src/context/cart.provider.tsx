import { useState, useEffect, type ReactNode } from "react";
import { CartContext, type CartItem } from "./cart.context";

const CART_KEY = "cart_items";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // сохраняем корзину в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  // добавить товар (только если его нет)
  const addItem = (item: CartItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev; // уже в корзине
      return [...prev, item];
    });
  };

  // удалить товар по id
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // очистить корзину
  const clear = () => setItems([]);

  // проверить, есть ли товар в корзине
  const isInCart = (id: string) => items.some((i) => i.id === id);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}
