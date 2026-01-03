import { useContext } from "react";
import { UserContext } from "./user.context";
import { AuthUIContext } from "./auth.ui.context";
import { CartContext, type CartContextType } from "./cart.context";

export function useUser() {
  return useContext(UserContext);
}

export function useAuthUI() {
  return useContext(AuthUIContext);
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
