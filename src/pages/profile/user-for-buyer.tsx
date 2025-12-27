import { NavLink, useParams } from "react-router-dom";
import { UserProfileHeaderBuyer } from "@/components/profile/user-profile-header-buyer";
import { USER_PROFILES } from "@/mocks/profile-user.mock";

import ProductsUserPurchases from "@/components/product/productsUserPurchases";
import { PRODUCTS_DATA } from "@/mocks/products.mock";

export function ProfileForBuyer() {
  const { id } = useParams<{ id: string }>();

  const user = USER_PROFILES.find((u) => u.id === id);

  const userProducts = PRODUCTS_DATA.filter(
    (product) => product.seller.id === id
  );

  if (!user) {
    return (
      <div className="p-5 max-w-5xl mx-auto">
        <p className="text-red-500">Пользователь не найден</p>
      </div>
    );
  }

  const handleFollowToggle = (id: string) => {
    console.log(`Подписка/отписка на пользователя ${id}`);
  };

  return (         
    <div className="pt-7.5 sm:pl-0 sm:pr-0 sm:pt-11 xl:pl-15 xl:pr-15 xl:pt-26 xl:mb-55 mb-37.5 w-full">
      {/* Шапка профиля */}
      <UserProfileHeaderBuyer
        user={user}
        onFollowToggle={handleFollowToggle}
      />

      {/* Tabs */}

      <div className="flex gap-7.5 mb-15 sm:mb-25">
       <NavLink
          to={`/profile/${user.id}/for-buyer`}
          className={({ isActive }) =>
            `px-3 min-h-10 rounded-xl border flex items-center ${
              isActive
                ? "text-secondary bg-grayscale-white border-grayscale-300"
                : "text-grayscale-300 hover:text-grayscale-500"
            }`
          }
        >
          <span className="ag-h4 font-medium"> История покупок</span>
        </NavLink>

        {/* Будущие табы (Можно продолжать) */}
        {/*         
          <NavLink to={`/profile/${user.id}/reviews`}>Отзывы</NavLink>
          */}
      </div>

      {/* Контент таба */}
      {Array.isArray(userProducts) && userProducts.length > 0 ? (
        <ProductsUserPurchases items={userProducts} />
      ) : (
        <h2 className="text-center fint-medium text-grayscale-700">
          Пользователь не совершил ни одной покупки !
        </h2>
      )}
    </div>
  );
}
