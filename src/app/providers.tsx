import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { UsePageScrollToTop } from "@/hooks/scroll";

import { UserProvider } from "@/context/user.provider";
import { AuthUIProvider } from "@/context/auth.ui.provider";
import { CartProvider } from "@/context/cart.provider";
import { FavouritesProvider } from "@/context/favourites.provider";

const Router =
  import.meta.env.MODE === "production" ? HashRouter : BrowserRouter;

export function AppProviders() {
  return (
    <Router>
      <UsePageScrollToTop />
      <UserProvider>
        <AuthUIProvider>
          <CartProvider>
            <FavouritesProvider>
            <AppRouter />
            </FavouritesProvider>
          </CartProvider>
        </AuthUIProvider>
      </UserProvider>
    </Router>
  );
}
