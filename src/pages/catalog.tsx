import { useEffect, useState } from "react";
import Filter, {
  type FiltersValue,
  type FilterOptions,
} from "@/components/filter/filter";
import ProductsCatalog from "@/components/product/productCatalog";
import styles from "@/components/filter/filterCanvas.module.scss";
import { PRODUCTS_DATA } from "@/mocks/products.mock";

// ======= Пример серверной функции =======
function fetchProducts(
  filters: FiltersValue
): Promise<{ products: typeof PRODUCTS_DATA; filterOptions: FilterOptions }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // фильтруем товары фронтэндом, как будто это сервер
      const filtered = PRODUCTS_DATA.filter((p) => {
        const matchesPrice =
          p.price >= filters.priceMin && p.price <= filters.priceMax;
        const matchesSize =
          (!filters.sizes.length ||
            (Array.isArray(p.sizes) &&
              p.sizes.some((s) => {
                switch (s.system) {
                  case "ONE_SIZE":
                    return filters.sizes.includes("ONE_SIZE");
                  case "EU":
                    return filters.sizes.includes(String(s.value));
                  case "LETTER":
                    return filters.sizes.includes(s.value as string);
                  default:
                    return false;
                }
              }))) ??
          false;

        const matchesBrand =
          !filters.brands.length ||
          (p.brand !== undefined && filters.brands.includes(p.brand));
        const matchesCategory =
          !filters.categories.length || filters.categories.includes(p.title);
        const matchesCondition =
          !filters.conditions.length ||
          (p.condition !== undefined &&
            filters.conditions.includes(p.condition));
        return (
          matchesPrice &&
          matchesSize &&
          matchesBrand &&
          matchesCategory &&
          matchesCondition
        );
      });

      // генерим опции фильтров из всех товаров, чтобы Filter отображал
      const allSizes = Array.from(
        new Set(
          PRODUCTS_DATA.flatMap(
            (p) =>
              Array.isArray(p.sizes)
                ? p.sizes.map((s) => {
                    switch (s.system) {
                      case "EU":
                        return String(s.value);
                      case "LETTER":
                        return String(s.value);
                      case "ONE_SIZE":
                        return "ONE_SIZE";
                    }
                  })
                : [] // если p.size нет или не массив
          )
        )
      );

      const allBrands = Array.from(
        new Set(
          PRODUCTS_DATA.map((p) => p.brand).filter((b): b is string => !!b)
        )
      );

      const allCategories = Array.from(
        new Set(PRODUCTS_DATA.map((p) => p.title))
      );
      const allConditions = Array.from(
        new Set(
          PRODUCTS_DATA.map((p) => p.condition).filter(
            (c): c is "Б/У" | "Новое" => c !== undefined
          )
        )
      );

      resolve({
        products: filtered,
        filterOptions: {
          priceMin: 1,
          priceMax: 100000,
          sizes: allSizes,
          brands: allBrands,
          categories: allCategories,
          conditions: allConditions,
        },
      });
    }, 500); // имитируем задержку сервера
  });
}

// ======= Catalog Component =======
export function Catalog() {
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS_DATA);
  const [filters, setFilters] = useState<FiltersValue>({
    priceMin: 1,
    priceMax: 100000,
    sizes: [],
    brands: [],
    categories: [],
    conditions: [],
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceMin: 1,
    priceMax: 100000,
    sizes: [],
    brands: [],
    categories: [],
    conditions: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // загрузка данных при монтировании
  useEffect(() => {
    fetchProducts(filters).then(({ products, filterOptions }) => {
      setFilteredProducts(products);
      setFilterOptions(filterOptions);
    });
  }, []);

  // эффект блокировки скролла при открытии фильтров
  useEffect(() => {
    if (isFilterOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  // обработка изменения фильтров
  const handleFilterChange = (newFilters: FiltersValue) => {
    setFilters(newFilters); // обновляем локальный state фильтров
    fetchProducts(newFilters).then(({ products, filterOptions }) => {
      setFilteredProducts(products);
      setFilterOptions(filterOptions); // обновляем опции фильтров по серверу
    });
  };

  return (
    <div className="flex gap-6 overflow-hidden">
      {/* sidebar фильтров */}
      <aside
        className={`${styles.filterCanvas} ${
          isFilterOpen ? styles.filterCanvasActive : ""
        }`}
      >
        <div className={styles.filterCanvasInner}>
          <div className={styles.filterCanvasClose}>
            <button onClick={() => setIsFilterOpen(false)}>
              <svg className="w-7.5 h-7.5 cursor-pointer">
                <use href="/icons/symbol/sprite.svg#close" />
              </svg>
            </button>
          </div>
          <Filter
            options={filterOptions}
            values={filters}
            onChange={handleFilterChange}
          />
        </div>
      </aside>

      {/* основной контент */}
      <section className="w-full flex-1">
        <h2 className="ag-w2 text-center lg:text-left pb-7.5 lg:pb-0 pt-7.5 pl-7.5">
          Мужское
        </h2>

        {/* кнопка открытия фильтров на мобилке */}
        <button
          type="button"
          className="mt-2 mb-0 lg:mb-6 flex gap-3 items-center cursor-pointer lg:hidden"
          onClick={() => setIsFilterOpen(true)}
        >
          <svg className="w-7.5 h-7.5">
            <use href="/icons/symbol/sprite.svg#filter" />
          </svg>
          <span className="ag-h4 text-grayscale-700 pb-1">Фильтры</span>
        </button>

        <ProductsCatalog items={filteredProducts} />
      </section>

      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-white/40 sm:bg-black/10 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}
