"use client"; // window доступен только на клиенте

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/productCard";
import { type ProductCardData } from "@/mocks/products.mock";

interface ProductsHomeProps {
  items: ProductCardData[];
}

export default function ProductsHome({ items }: ProductsHomeProps) {
  // Состояние для видимых элементов
  const [visibleItems, setVisibleItems] = useState<ProductCardData[]>([]);

  useEffect(() => {
    // Функция для пересчёта, сколько элементов показывать в зависимости от ширины экрана
    const calculateVisibleItems = () => {
      let step = 4; // по умолчанию mobile и desktop
      const width = window.innerWidth;

      if (width >= 640 && width < 1024) {
        // tablet
        step = 3;
      }

      const total = items.length;
      const visibleCount =
        total < step ? total : Math.floor(total / step) * step;

      // Берём первые visibleCount элементов
      setVisibleItems(items.slice(0, visibleCount));
    };

    // Первый расчёт сразу после монтирования / при изменении items
    calculateVisibleItems();
    
    // Слушаем ресайз, чтобы динамически пересчитывать шаг
    window.addEventListener("resize", calculateVisibleItems);

    // Очистка обработчика при размонтировании или перед следующим effect
    return () => window.removeEventListener("resize", calculateVisibleItems);
  }, [items]); // зависимость: пересчёт при изменении списка товаров

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-4 sm:gap-x-5 md:gap-x-[6.5%] mb-[150px]">
      {visibleItems.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
}
