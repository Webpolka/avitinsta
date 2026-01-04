import { useEffect } from "react";
import { useCart } from "@/context/use.all";

export function CartLogger() {
  const { items } = useCart();

  useEffect(() => {
    console.clear();
    console.log("🛒 Cart:", items);
  }, [items]);

  return null;
}
