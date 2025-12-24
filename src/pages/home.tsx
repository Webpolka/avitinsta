import SearchForm from "@/components/searchForm";
import Banner from "@/components/banner";
import Categories from "@/components/categories/categories";
import ProductsHome from "@/components/product/productsHome";

import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { CATEGORIES_DATA } from "@/mocks/categories.mock";
import { BANNER_DATA } from "@/mocks/banner.mock";

export function Home() {
  return (
    <>
      <SearchForm
        onSubmit={(query) => {
          console.log("Ищем:", query);
          // тут будет AJAX
        }}
      />
      <Banner data={BANNER_DATA} />;
      <Categories items={CATEGORIES_DATA} />
      <ProductsHome items={PRODUCTS_DATA} />
    </>
  );
}
