import { useEffect, useState } from "react";
import ProfileProductsList from "@/components/profile/profile-products-list";

import { PRODUCTS_DATA, type ProductCardData } from "@/mocks/products.mock";
import { useUser } from "@/context/use.all";

/* =========================
   Component: ProfileTabFavourites
   Вкладка "Избранное"
========================= */

export function ProfileTabFavourites() {
  // Состояние избранных товаров
  const { user } = useUser();
  const [favouriteProducts, setFavouriteProducts] = useState<ProductCardData[]>(
    []
  );

  useEffect(() => {
    if (!user) return;

    // 1. Берём ID избранных товаров пользователя
    const favouriteIds = user.favouriteProducts ?? [];

    // 2. Находим товары по этим ID
    const favouriteItems = PRODUCTS_DATA.filter((product) =>
      favouriteIds.includes(product.id)
    );

    // 3. Кладём в state
    const updateFavouriteState = () => {
      setFavouriteProducts(favouriteItems);
    };
    updateFavouriteState();
  }, [user]);


  return (
    <div className="flex flex-col gap-30">
      {favouriteProducts.length > 0 ? (
        <>
          {/* Список избранных товаров */}
          <ProfileProductsList
            button={false}
            limit={4}
            items={favouriteProducts}
          />

          <ProfileProductsList
            title="Недавно просмотренные"
            button={true}
            limit={4}
            items={favouriteProducts}  //Пока что условно (канечно это будет ответ от сервера)
          />
        </>
      ) : (
        /* Пустое состояние "Избранного" */
        <div className="flex flex-col items-center justify-center text-center gap-6 py-30">
          {/* Иконка */}
          <svg className="w-25 h-25 opacity-40">
            <use href="/icons/symbol/sprite.svg#broken" />
          </svg>

          {/* Текст */}
          <p className="ag-h4 text-secondary font-medium">
            <span>Пока здесь пусто. Нажмите на</span>
            <svg className="w-6 h-6 inline-block mx-2 fill-none stroke-grayscale-300">
              <use href="/icons/symbol/sprite.svg#heart" />
            </svg>
            <span>и добавляйте товары в избранное</span>
          </p>
        </div>
      )}
    </div>
  );
}
