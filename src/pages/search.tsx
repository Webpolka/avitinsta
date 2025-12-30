import { useState, useEffect } from "react";
import SearchForm from "@/components/searchForm";
import ProductCard from "@/components/product/productCard";
import { type ProductCardData, PRODUCTS_DATA } from "@/mocks/products.mock";

import { CATEGORIES_DATA } from "@/mocks/categories.mock";
import { useDebounce } from "@/hooks/debounce";

const categories = ["Все", ...CATEGORIES_DATA.map((c) => c.title)];

// В компоненте Search
export function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [products, setProducts] = useState<ProductCardData[]>(PRODUCTS_DATA);
  const [loading, setLoading] = useState(true);

  // Эффект для имитации AJAX (поиск по названию, бренду и категориям)
  useEffect(() => {
    let ignore = false;

    const timer = setTimeout(() => {
      if (ignore) return;

      setLoading(true);

      const filtered = PRODUCTS_DATA.filter((p) => {
        const matchesCategory =    
          activeCategory === "Все" ? true : p.category && (p.category.includes(activeCategory));

        const q = debouncedQuery.toLowerCase();
        const matchesQuery = 
          !debouncedQuery ||
          p.title.toLowerCase().includes(q) ||
          p.brand && (p.brand.toLowerCase().includes(q));

        return matchesCategory && matchesQuery;
      });

      if (!ignore) {
        setProducts(filtered);
        setLoading(false);
      }
    }, 500);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [debouncedQuery, activeCategory]);


  
  return (
    <div className="pt-2 sm:pt-5 lg:px-15">
      {/* Теперь форма контролируется родителем */}
      <SearchForm
        value={query} // value берем из родителя
        onChange={setQuery} // при вводе обновляем родительский стейт
        placeholder="Искать товары..."
        className="mb-6"
      />

      {/* Вкладки категорий */}
      <div className="flex gap-2.5 flex-wrap mb-15 w-full -mt-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4.5 py-1.5 border rounded-xl font-medium ag-h7 cursor-pointer ${
              activeCategory === cat
                ? "bg-grayscale-white text-secondary border-grayscale-300"
                : "bg-grayscale-100 text-grayscale-300 border-grayscale-100 hover:text-gray-500"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Лента товаров */}
      {loading ? (
        <div className="text-center py-10">Загрузка...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-grayscale-500">
          Товары по этой категории не найдены
        </div>
      ) : (
        <div className="h-full lg:border-l lg:border-grayscale-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-16 gap-x-5 lg:gap-x-7.5 mb-[150px]">
            {products.map((product, index) => (
              <ProductCard key={product.id + index} data={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
