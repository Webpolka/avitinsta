import { useParams } from "react-router-dom";
import ProductsPublic from "@/components/product/productsPublic";

import { USERS_DATA } from "@/mocks/users.mocks";
import { PRODUCTS_DATA } from "@/mocks/products.mock";

export function UserProducts() {
  const { id } = useParams<{ id: string }>();
  const user = USERS_DATA.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="p-5 max-w-5xl mx-auto">
        <p className="text-red-500">Пользователь не найден</p>
      </div>
    );
  }

  // фильтруем товары пользователю
  const userProducts = PRODUCTS_DATA.filter(
    (product) => product.sellerId && product.sellerId === id
  );

  // Инструкция к ProductsPublic
  //  items: ProductCardData[];       // товары для отображения
  //   title?: string;                 // заголовок
  //   initialLimit?: number;          // сколько показывать по умолчанию
  //   showAllButtonText?: string;     // текст кнопки "Посмотреть все"
  //   loadingText?: string;           // текст во время загрузки
  //  showButton?:boolean;
  return (
    <>
      {/* Контент таба */}
      {userProducts.length > 0 ? (
        <ProductsPublic
          items={userProducts}
          title="Товары"
          showButton={false}
        />
      ) : (
        <h2 className="text-center font-medium text-grayscale-700">
          У пользователя не товаров !
        </h2>
      )}
    </>
  );
}
