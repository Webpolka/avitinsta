import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/mainlayout";
import { NoFooterLayout } from "@/layouts/nofooterlayout";
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

import { ProfilePurchaseHistory } from "@/pages/profile/user-purchase-history";
import { ProfileForBuyer } from "@/pages/profile/user-for-buyer";

import { ProfilePersonal } from "@/pages/profile/personal";
import { ProfileProducts } from "@/pages/profile/products";
import { ProfilePurchases } from "@/pages/profile/purchases";
import { ProfileSales } from "@/pages/profile/sales";
import { ProfileFavourites } from "@/pages/profile/favourites";
import { ProfileChats } from "@/pages/profile/chats";
import { ProfileChat } from "@/pages/profile/chat";
import { ProfilePublics } from "@/pages/profile/publics";

export function AppRouter() {
  return (
    <Routes>
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

        <Route path="/product/add" element={<ProductAdd />} />
        <Route path="/product/:id" element={<Product />} />

        <Route path="/profile/:id/purchase-history" element={<ProfilePurchaseHistory />}/>
        <Route path="/profile/:id/for-buyer" element={<ProfileForBuyer />} />

        <Route path="/profile/:id/personal" element={<ProfilePersonal />} />
        <Route path="/profile/:id/products" element={<ProfileProducts />} />
        <Route path="/profile/:id/purchases" element={<ProfilePurchases />} />
        <Route path="/profile/:id/sales" element={<ProfileSales />} />
        <Route path="/profile/:id/favourites" element={<ProfileFavourites />} />
        <Route path="/profile/:id/chats" element={<ProfileChats />} />
        <Route path="/profile/:id/publics" element={<ProfilePublics />} />
      </Route>

      

      <Route element={<NoFooterLayout />}>
      <Route path="/profile/:id/chat" element={<ProfileChat />} />
        
        <Route path="/looks" element={<Looks />} />
                <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
