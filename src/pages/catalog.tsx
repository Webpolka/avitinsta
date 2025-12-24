
import { useEffect, useState } from "react";
import "rc-slider/assets/index.css";

import Filter from "@/components/filter/filter"; // компонент фильтров
import ProductsCatalog from "@/components/product/productCatalog"; // компонент для отображения каталога товаров
import styles from "@/components/filter/filterCanvas.module.scss"; // стили для фильтров

import { PRODUCTS_DATA } from "@/mocks/products.mock";

export function Catalog() {
  // стейт отфильтрованных товаров
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS_DATA);

  // стейт открытия фильтров (мобильное отображение)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // эффект для блокировки скролла при открытии фильтров
  useEffect(() => {
    if (isFilterOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // скроллим наверх
      document.body.style.overflow = "hidden"; // блокируем скролл
    } else {
      document.body.style.overflow = ""; // возвращаем скролл
    }

    // cleanup на размонтирование
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  // функция для применения фильтров
  const handleApplyFilters = (filters: {
    priceMin: number;
    priceMax: number;
    sizes: string[];
    brands: string[];
    categories: string[];
    conditions: string[];
  }) => {
    // фильтруем товары по переданным параметрам
    const filtered = PRODUCTS_DATA.filter((p) => {
      // фильтр по цене
      const price = p.price;
      const matchesPrice = price >= filters.priceMin && price <= filters.priceMax;

      // фильтр по размерам (теперь размер — массив объектов)
      const matchesSize =
        filters.sizes.length === 0 ||
        (p.size?.some((s) => {
          if (s.system === "ONE_SIZE") return filters.sizes.includes("ONE_SIZE");
          if (s.system === "EU") return filters.sizes.includes(String(s.value));
          if (s.system === "LETTER") return filters.sizes.includes(s.value as string);
          return false;
        }) ?? false);

      // фильтр по бренду
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(p.brand);

      // фильтр по категории / названию
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(p.title);

      // фильтр по состоянию (condition)
      const matchesConditions =
        filters.conditions.length === 0 || filters.conditions.includes(p.condition);

      // возвращаем только товары, которые проходят все фильтры
      return matchesPrice && matchesSize && matchesBrand && matchesCategory && matchesConditions;
    });

    setFilteredProducts(filtered); // обновляем стейт товаров
    setIsFilterOpen(false); // закрываем фильтры после применения
  };

  return (
    <div className="flex gap-6 overflow-hidden">
      {/* sidebar с фильтрами */}
      <aside
        className={`${styles.filterCanvas} ${
          isFilterOpen ? styles.filterCanvasActive : ""
        }`}
      >
        <div className={styles.filterCanvasInner}>
          {/* кнопка закрытия фильтров */}
          <div className={styles.filterCanvasClose}>
            <button onClick={() => setIsFilterOpen(false)}>
              <svg className="w-7.5 h-7.5 cursor-pointer">
                <use href="/icons/symbol/sprite.svg#close" />
              </svg>
            </button>
          </div>
          {/* компонент фильтров */}
          <Filter onApply={handleApplyFilters} />
        </div>
      </aside>

      {/* основное содержимое */}
      <section className="w-full flex-1">
        {/* заголовок категории */}
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

        {/* компонент каталога товаров */}
        <ProductsCatalog items={filteredProducts} />
      </section>

      {/* затемнение фона при открытии фильтров на мобилке */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-white/40 sm:bg-black/10 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}



