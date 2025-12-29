import { useState } from "react";
import ProductCard from "@/components/product/productCard";
import { type ProductCardData } from "@/mocks/products.mock";

interface ProfileProductsListProps {
  title?: string;
  limit: number;
  items: ProductCardData[]; // товары (моки / SSR)
  button?: boolean;
}

export default function ProfileProductsList({
  title,
  items,
  limit,
  button = true,
}: ProfileProductsListProps) {
  // текущие отображаемые товары
  const [products, setProducts] = useState<ProductCardData[]>(
    items.slice(0, limit)
  );

  // состояние загрузки
  const [loading, setLoading] = useState(false);

  // флаг — показали все товары
  const [showAll, setShowAll] = useState(false);

  // обработчик "Посмотреть все"
  const handleShowAll = async () => {
    if (loading) return;
    if (!button) return;

    setLoading(true);
    try {
      // эмуляция серверного запроса
      await new Promise((res) => setTimeout(res, 600));
      setProducts(items);
      setShowAll(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-11 pt-2">
      {/* Заголовок */}
      {title && (
        <h2 className="ag-h2 sm:ag-h1 text-secondary font-semibold text-center">
          {title}
        </h2>
      )}

      {/* Сетка товаров */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-12 lg:gap-y-16 gap-5 lg:gap-x-9">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
      {/* Кнопка "Показать все" */}
      {button && !showAll && items.length > limit && (
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
