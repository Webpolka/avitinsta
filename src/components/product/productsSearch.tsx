import { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { type ProductCardData } from "@/mocks/products.mock";

interface ProductsSearchProps {
  data: Array<ProductCardData>;
}

export default function ProductsSearch({ data }: ProductsSearchProps) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [products, setProducts] = useState(data);
  const [loading, setLoading] = useState(false);

  // фильтрация товаров по категории (эмуляция AJAX)
  useEffect(() => {
    // setLoading(true);

    const timer = setTimeout(() => {
      if (activeCategory === "Все") {
        setProducts(data);
      } else {
        setProducts(data.filter((p) => p.category[0] === activeCategory));
      }
      setLoading(false);
    }, 500); // имитация задержки

    return () => clearTimeout(timer);
  }, [activeCategory, data]);

  return (
    <div className="flex flex-col">
      {/* вкладки категорий */}
      <div className="flex gap-2.5 flex-wrap mb-15 lg:mb-15 w-full -mt-2">
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

      <h2 className="ag-h2 sm:ag-h1 text-secondary font-semibold mb-15 sm:mb-7.5">
        Рекомендации для вас
      </h2>

      {/* контент */}
      {loading ? (
        <div className="text-center py-10">Загрузка...</div>
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

/**********************************************************************
Категории из сервера
**********************************************************************/
const categories = ["Все", "Обувь", "Одежда", "Аксессуары", "Сумки"];
