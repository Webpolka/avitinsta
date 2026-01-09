import { useCategoriesOrders } from "./useCategoriesOrders";
import { Card, CardTall } from "./categoriesCards";

import { type CategoryData } from "@/mocks/categories.mock";

interface CategoriesProps {
  items: CategoryData[];
}
// Определяем кофигурацию для мообильной или другой версии
const ORDER_CONFIG = {
  desktop: [0, 1, 2, 3, 4, 5],
  mobile: [0, 3, 1, 4, 2, 5],
};

// Вывод категорий
export default function Categories({ items }: CategoriesProps) {
  const isMobile = useCategoriesOrders();
  const order = isMobile ? ORDER_CONFIG.mobile : ORDER_CONFIG.desktop;
  const sortedItems = order.map((i) => items[i]);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-5 lg:mb-25 mb-20">
      {/* левая сторона с 6-ю маленькими карточками */}
      <div className="w-full md:w-[76.2%] grid grid-cols-2 md:grid-cols-3 gap-5">
        {sortedItems.map((item) => (
          <Card
            key={`category-${item.id}`}
            id={item.id}
            title={item.title}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>

      {/* Правая сторона с одной большой карточкой */}
      <div className="w-full md:w-[23.8%]">
        {items[6] && (
          <CardTall
            id={items[6].id}
            title={items[6].title}
            image={items[6].image}
            link={items[6].link}
          />
        )}
      </div>
    </div>
  );
}

