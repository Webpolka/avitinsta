import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthUI } from "@/context/use.all";

// Layouts
import { MainLayout } from "@/layouts/mainlayout";
import { NoFooterLayout } from "@/layouts/nofooterlayout";
import { ProfileLayout } from "@/pages/profile/profileLayout";

// Pages
import { Home } from "@/pages/home";
import { NotFound } from "@/pages/notfound";
import { Maintenance } from "@/pages/maintenance";
import { Catalog } from "@/pages/catalog";
import { Cart } from "@/pages/cart";
import { CartEmpty } from "@/pages/cart-empty";
import { CheckoutStart } from "@/pages/checkout-start";
import { CheckoutFinish } from "@/pages/checkout-finish";
import { Search } from "@/pages/search";
import { Product } from "@/pages/product";
import { ProductAdd } from "@/pages/product-add";
import { Faq } from "@/pages/faq";
import { SellerRating } from "@/pages/seller-rating";
import { Looks } from "@/pages/looks/looks";

// Profile tabs
import { ProfileTabInfo } from "@/pages/profile/tab/info";
import { ProfileTabAds } from "@/pages/profile/tab/ads";
import { ProfileTabPurchases } from "@/pages/profile/tab/purchases";
import { ProfileTabSales } from "@/pages/profile/tab/sales";
import { ProfileTabFavourites } from "@/pages/profile/tab/favourites";
import { ProfileTabChats } from "@/pages/profile/tab/chats";
import { ProfileTabLooks } from "@/pages/profile/tab/looks";

import { ProtectedRoute } from "@/pages/profile/protectedRoute";

// Public profile
import { PublicPurchaseHistory } from "@/pages/profile/public/purchase-history";

// Chat
import { ProfileChat } from "@/pages/chat";

// Auth modal
import AuthCanvas from "@/auth/AuthCanvas";
import Overlay from "@/hooks/overlay";

export function AppRouter() {
  const { isAuthOpen, closeAuth } = useAuthUI();
  const location = useLocation();

  // используем фон, если он есть, иначе текущий location
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
        <Routes location={state?.backgroundLocation || location}>
        {/* Main layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/empty" element={<CartEmpty />} />
          <Route path="/checkout/start" element={<CheckoutStart />} />
          <Route path="/checkout/finish" element={<CheckoutFinish />} />
          <Route path="/search" element={<Search />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/rating" element={<SellerRating />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/looks" element={<Looks />} />

          {/* Ловим /login, чтобы router не ругался */}
          <Route path="/login" element={<Home />} />
        </Route>

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileLayout mode="private" />
            </ProtectedRoute>
          }
        >
          <Route path="info" element={<ProfileTabInfo />} />
          <Route path="products" element={<ProfileTabAds />} />
          <Route path="purchases" element={<ProfileTabPurchases />} />
          <Route path="sales" element={<ProfileTabSales />} />
          <Route path="favourites" element={<ProfileTabFavourites />} />
          <Route path="chats" element={<ProfileTabChats />} />
          <Route path="looks" element={<ProfileTabLooks />} />
          <Route index element={<Navigate to="info" replace />} />
        </Route>

        {/* Public profile */}
        <Route
          path="/purchases/:id"
          element={<ProfileLayout mode="public-no-media" />}
        >
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<PublicPurchaseHistory />} />
        </Route>
        <Route
          path="/u/:id"
          element={<ProfileLayout mode="public-with-media" />}
        >
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<PublicPurchaseHistory />} />
        </Route>

        {/* No footer */}
        <Route element={<NoFooterLayout />}>
          <Route path="/chats/:chatId" element={<ProfileChat />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Auth modal */}
      <AuthCanvas isOpen={isAuthOpen} onClose={closeAuth} />
      <Overlay isOpen={isAuthOpen} onClick={closeAuth} />
    </>
  );
}
