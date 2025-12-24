import ProductsSearch from "@/components/product/productsSearch";
import SearchForm from "@/components/searchForm";

import { PRODUCTS_DATA } from "@/mocks/products.mock";

export function Search() {
  return (
    <div className="pt-2 sm:pt-5 lg:px-15">
      <SearchForm
        onSubmit={(query) => {
          console.log("Ищем:", query);
          // тут будет AJAX
        }}
      />
      <ProductsSearch data={PRODUCTS_DATA} />
    </div>
  );
}
