import ProfileProductsList from "@/components/profile/profile-products-list";
import { PRODUCTS_DATA } from "@/mocks/products.mock";

/* =========================
   Component: ProfileTabFavorites
   Вывод понравишихся товаров
========================= */
export function ProfileTabFavourites() {
  const id = "1"; // мой профиль

  // фильтруем покупки по пользователю
  const userProducts = PRODUCTS_DATA.filter(
    (product) => product.seller.id === id
  );

  /* =========================
     Render: JSX
     - адаптивные колонки через flex и Tailwind breakpoints
     - для мобильных все поля занимают full-width (flex-1 + w-full)
  ========================== */
  return (
    <div className="flex flex-col gap-30 ">
      {/* Контент таба */}
      {userProducts.length > 0 ? (
        <>
          {/* ИЗБРАННОЕ ограничено 4мя просто для верстки */}
          <ProfileProductsList button={false} limit={4} items={userProducts} />

          {/* НЕДАВНО ПРОСМОТРЕННЫЕ */}
          <ProfileProductsList
            title="Недавно просмотренные"
            limit={4}
            items={userProducts}
          />
        </>
      ) : (
        <h2 className="text-center font-medium text-grayscale-700">
          Пользователь не имеет избранных !
        </h2>
      )}
    </div>
  );
}
