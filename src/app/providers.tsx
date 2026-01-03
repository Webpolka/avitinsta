import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRouter } from "./router";
import  UseScrollToTop  from "@/hooks/useScrollToTop";

import { UserProvider } from "@/context/user.provider"
import { AuthUIProvider } from "@/context/auth.ui.provider";
import { CartProvider } from "@/context/cart.provider";

const Router =
  import.meta.env.MODE === "production" ? HashRouter : BrowserRouter;

export function AppProviders() {
  return (
    <Router>
      <UseScrollToTop/>
      <UserProvider>
        <AuthUIProvider>
          <CartProvider>
           <AppRouter/>
          </CartProvider>
        </AuthUIProvider>
      </UserProvider>
    </Router>
  );
}