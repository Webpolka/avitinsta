import { useFavourites } from "@/context/use.all";
import SliderProductsList from "@/components/product/sliderProductsList";
import ProfileProductsList from "@/components/profile/profile-products-list";

// Temperory mock data
import { PRODUCTS_DATA } from "@/mocks/products.mock";

/* =========================
   Component: ProfileTabFavourites
   Вкладка "Избранное"
========================= */

export function ProfileTabFavourites() {
  // Избранное
  const { items: favouritesItems } = useFavourites();

  const favouriteProducts = PRODUCTS_DATA.filter((product) =>
    favouritesItems.some((f) => f.productId === product.id)
  );

  // Недавно просмотренные (SessionStorage)
  const recentlyViewedIds =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("recentlyViewed") || "[]")
      : [];

  // Находим товары по айдишникам, без фильтра по избранному
  const recentlyViewedProducts = PRODUCTS_DATA.filter((p) =>
    recentlyViewedIds.includes(p.id)
  );

  return (
    <div className="flex flex-col gap-30">
      {favouriteProducts.length > 0 ? (
        <>
          {/* Слайдер избранных */}
          <SliderProductsList items={favouriteProducts} />
        </>
      ) : (
        /* Пустое состояние "Избранного" */
        <div className="flex flex-col items-center justify-center text-center gap-6 py-30">
          <svg className="w-25 h-25 opacity-40">
            <use href="/icons/symbol/sprite.svg#broken" />
          </svg>
          <p className="ag-h4 text-secondary font-medium">
            <span>Пока здесь пусто. Нажмите на</span>
            <svg className="w-6 h-6 inline-block mx-2 fill-none stroke-grayscale-300">
              <use href="/icons/symbol/sprite.svg#heart" />
            </svg>
            <span>и добавляйте товары в избранное</span>
          </p>
        </div>
      )}

      {/* Профильный блок недавно просмотренных */}
      {recentlyViewedProducts.length > 0 && (
        <ProfileProductsList
          title="Недавно просмотренные"
          button={true}
          limit={4}
          items={recentlyViewedProducts}
        />
      )}
    </div>
  );
}
