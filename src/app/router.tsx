import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@/context/use.user";

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

// Таб-контент личного кабинета (private)
import { ProfileTabProfile } from "@/pages/profile/tab/profile";
import { ProfileTabAds } from "@/pages/profile/tab/ads";
import { ProfileTabPurchases } from "@/pages/profile/tab/purchases";
import { ProfileTabSales } from "@/pages/profile/tab/sales";
import { ProfileTabFavourites } from "@/pages/profile/tab/favourites";
import { ProfileTabChats } from "@/pages/profile/tab/chats";
import { ProfileTabPosts } from "@/pages/profile/tab/posts";

// Public profile
import { PublicPurchaseHistory } from "@/pages/profile/public/purchase-history";

// Chat
import { ProfileChat } from "@/pages/chat";

// AUTH CANVAS
import AuthCanvas from "@/auth/AuthCanvas";
import Overlay from "@/hooks/overlay";

export function AppRouter() {
  const { isAuthOpen, closeAuth } = useUser();

  return (
    <>
      <Routes>
        {/* ===== Основной layout ===== */}
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
        </Route>

        {/* ===== ЛИЧНЫЙ ПРОФИЛЬ ===== */}
        <Route path="/profile" element={<ProfileLayout mode="private" />}>
          <Route path="profile" element={<ProfileTabProfile />} />
          <Route path="products" element={<ProfileTabAds />} />
          <Route path="purchases" element={<ProfileTabPurchases />} />
          <Route path="sales" element={<ProfileTabSales />} />
          <Route path="favourites" element={<ProfileTabFavourites />} />
          <Route path="chats" element={<ProfileTabChats />} />
          <Route path="posts" element={<ProfileTabPosts />} />
          <Route index element={<Navigate to="profile" replace />} />
        </Route>

        {/* ===== ПУБЛИЧНЫЙ ПРОФИЛЬ ===== */}
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

        {/* ===== БЕЗ ФУТЕРА ===== */}
        <Route element={<NoFooterLayout />}>
          <Route path="/chats/:chatId" element={<ProfileChat />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>

      
      {/* модалка открывается через контекст */}
      <Overlay isOpen={isAuthOpen} onClick={closeAuth} />
      <AuthCanvas isOpen={isAuthOpen} onClose={closeAuth} />
    </>
  );
}
