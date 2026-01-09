import { useEffect, useState } from "react";
import SearchForm from "@/components/searchForm";
import Banner from "@/components/banner";
import Categories from "@/components/categories/categories";
import ProductsHome from "@/components/product/productsHome";
import { CATEGORIES_DATA } from "@/mocks/categories.mock"; // not-kill this static

import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { BANNER_DATA } from "@/mocks/banner.mock";
import { useDebounce } from "@/hooks/debounce";

export function Home() {
  const [search, setSearch] = useState("");

  // debounced значение
  const debouncedSearch = useDebounce(search, 500);

  const fetchProducts = (value: string) => {
    console.log("Ищем:", value);
    // AJAX тут
  };

  // debounce-поиск при наборе
  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    fetchProducts(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col">
      {/* Баннер */}
      <Banner
        data={BANNER_DATA} // на мобильных сверху, на десктопе после search
      />

      {/* SearchForm */}
      <SearchForm
        className="mb-5" // на мобильных будет order-1 (под баннером), на md+ order-0 (сверху)
        value={search}
        onChange={setSearch}
        onSubmit={fetchProducts}
      />

      {/* Категории */}
      <Categories items={CATEGORIES_DATA} />

      {/* Товары */}
      <ProductsHome items={PRODUCTS_DATA} />
    </div>
  );
}
