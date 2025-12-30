import { useEffect, useState } from "react";
import SearchForm from "@/components/searchForm";
import Banner from "@/components/banner";
import Categories from "@/components/categories/categories";
import ProductsHome from "@/components/product/productsHome";

import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { CATEGORIES_DATA } from "@/mocks/categories.mock";
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
    <>
      <SearchForm
        className="mb-6"
        value={search}
        onChange={setSearch}         
        onSubmit={fetchProducts}     
      />

      <Banner data={BANNER_DATA} />
      <Categories items={CATEGORIES_DATA} />
      <ProductsHome items={PRODUCTS_DATA} />
    </>
  );
}
