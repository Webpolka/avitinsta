import { useState } from "react";
import ProductCard from "./productCard";
import { type ProductCardData } from "@/mocks/products.mock";

interface ProductsUserPurchasesProps {
  items: ProductCardData[]; // первые товары (моки / SSR)
}

const ITEMS_LIMIT = 12; // сколько показываем по умолчанию

export default function ProductsUserPurchases({
  items,
}: ProductsUserPurchasesProps) {
  // товары, которые сейчас отображаем
  const [products, setProducts] = useState<ProductCardData[]>(
    items.slice(0, ITEMS_LIMIT)
  );

  // состояние загрузки (под AJAX)
  const [loading, setLoading] = useState(false);

  // флаг — показали ли уже все товары
  const [showAll, setShowAll] = useState(false);

  // обработчик "Посмотреть все"
  const handleShowAll = async () => {
    // защита от повторных кликов
    if (loading) return;

    setLoading(true);

    try {
      // пока эмулируем сервер
      await new Promise((res) => setTimeout(res, 600));

      setProducts(items); // показываем все моки
      setShowAll(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-11">
      {/* Заголовок */}
      <h2 className="ag-h2 sm:ag-h1 text-secondary font-semibold text-center">
        Купленные товары{" "}
      </h2>

      {/* Сетка товаров */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-12 lg:gap-y-16 gap-5 lg:gap-x-9">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            data={product}         
          />
        ))}
      </div>

      {/* Кнопка "Показать все" */}
      {!showAll && items.length > ITEMS_LIMIT && (
        <button
          onClick={handleShowAll}
          disabled={loading}
          className="
            hidden sm:flex mt-4 lg:mt-0 px-10 min-w-[101px]
            border border-solid border-secondary
            text-secondary min-h-11 ag-h8
            items-center justify-center
            hover:opacity-80 cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span>{loading ? "Загрузка..." : "Посмотреть все"}</span>
        </button>
      )}
    </div>
  );
}
