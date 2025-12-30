import { useEffect, useState } from "react";
import ProductCard from "@/components/product/productCard";
import { type ProductCardData } from "@/mocks/products.mock";

interface ProfileProductsListProps {
  title?: string;
  limit: number;
  items: ProductCardData[];
  button?: boolean;
}

export default function ProfileProductsList({
  title,
  items,
  limit,
  button = true,
}: ProfileProductsListProps) {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // адаптивный расчёт
  useEffect(() => {
    if (showAll) {
      setProducts(items);
      return;
    }

    const calculateVisibleItems = () => {
      let step = 4; // mobile + desktop
      const width = window.innerWidth;

      if (width >= 640 && width < 1024) {
        step = 3; // tablet
      }

      const maxVisible = Math.min(limit, items.length);
      const visibleCount =
        maxVisible < step
          ? maxVisible
          : Math.floor(maxVisible / step) * step;

      setProducts(items.slice(0, visibleCount));
    };

    calculateVisibleItems();
    window.addEventListener("resize", calculateVisibleItems);

    return () =>
      window.removeEventListener("resize", calculateVisibleItems);
  }, [items, limit, showAll]);

  const handleShowAll = async () => {
    if (loading || !button) return;

    setLoading(true);
    try {
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
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-12 lg:gap-y-16 gap-5 lg:gap-x-9">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>

      {/* Кнопка */}
      {button && !showAll && items.length > products.length && (
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
          {loading ? "Загрузка..." : "Посмотреть все"}
        </button>
      )}
    </div>
  );
}
