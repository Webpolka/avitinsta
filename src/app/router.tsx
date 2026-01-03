import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthUI } from "@/context/use.all";

// Layouts — обёртки для страниц, задают общую структуру
import { MainLayout } from "@/layouts/mainlayout"; // с футером и шапкой
import { NoFooterLayout } from "@/layouts/nofooterlayout"; // без футера
import { ProfileLayout } from "@/pages/profile/profileLayout"; // для личного и публичного профиля

// Pages — сами страницы сайта
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

// Таб-контент личного кабинета (private) — внутренние вкладки профиля
import { ProfileTabInfo } from "@/pages/profile/tab/info";
import { ProfileTabAds } from "@/pages/profile/tab/ads";
import { ProfileTabPurchases } from "@/pages/profile/tab/purchases";
import { ProfileTabSales } from "@/pages/profile/tab/sales";
import { ProfileTabFavourites } from "@/pages/profile/tab/favourites";
import { ProfileTabChats } from "@/pages/profile/tab/chats";
import { ProfileTabLooks } from "@/pages/profile/tab/looks";

import { ProtectedRoute } from "@/pages/profile/protectedRoute";

// Public profile — страницы публичного профиля
import { PublicPurchaseHistory } from "@/pages/profile/public/purchase-history";

// Chat
import { ProfileChat } from "@/pages/chat";

// AUTH CANVAS — модалка авторизации
import AuthCanvas from "@/auth/AuthCanvas";
import Overlay from "@/hooks/overlay";

// --------------------- AppRouter ---------------------
export function AppRouter() {
  const { isAuthOpen, closeAuth } = useAuthUI(); // контекст пользователя: открыта ли модалка и функция закрытия

  const location = useLocation(); // текущий URL
  const state = location.state as { backgroundLocation?: Location };
  // state?.backgroundLocation — это “фоновая” страница, с которой мы открыли логин
  // нужно для модалки: чтобы на фоне оставалась текущая страница

  return (
    <>
      {/* ===== Основной router ===== */}
      {/* Если есть backgroundLocation, Routes будет рендерить фон (страницу, с которой пришли) */}
      <Routes location={state?.backgroundLocation || location}>
        {/* ===== Основной layout ===== */}
        {/* MainLayout — шапка + футер */}
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
          <Route path="/product/:id" element={<Product />} />{" "}
          {/* динамический продукт */}
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/looks" element={<Looks />} />
          
          <Route path="/login" element={<Home />} />
        </Route>

        {/* ===== ЛИЧНЫЙ ПРОФИЛЬ ===== */}
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
          {/* Если зашли на /profile, редиректим на вкладку  */}
          <Route index element={<Navigate to="info" replace />} />
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
          <Route path="/*" element={<NotFound />} />{" "}
          {/* Все остальные пути → 404 */}
        </Route>
      </Routes>

      {/* ===== Модальные компоненты поверх текущей страницы ===== */}
      {/* Overlay — затемнение фона при открытом AuthCanvas */}
      <Overlay isOpen={isAuthOpen} onClick={closeAuth} />
      {/* AuthCanvas — сама модалка логина/регистрации */}
      <AuthCanvas isOpen={isAuthOpen} onClose={closeAuth} />

      {/* Модальный маршрут для логина */}
      {/* Если есть backgroundLocation (т.е. мы пришли на /login с какой-то страницы) */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={null} />{" "}
          {/* Просто ловим URL, чтобы модалка открылась */}
        </Routes>
      )}
    </>
  );
}
