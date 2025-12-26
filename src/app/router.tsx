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
      </Route>

      <Route element={<NoFooterLayout />}>
        <Route path="/looks" element={<Looks />} />

        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
