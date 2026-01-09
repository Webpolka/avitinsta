import Button from "@/ui/button";
import { Link, useNavigate } from "react-router";
import HeaderOffCanvas from "@/components/header/headerOffcanvas";

import { useAuthUI, useUser, useCart } from "@/context/use.all";

export default function Header() {
  const { user } = useUser();
  const { openAuth } = useAuthUI();
  const { items } = useCart();

  const navigate = useNavigate();
  const totalCount = items.length; // просто количество товаров

  return (
    <header>
      {/* container */}
      <div className="site-container">
        {/* header row */}
        <div className="min-h-[100px] flex items-center justify-between ">
          {/* Left side */}
          <div className="flex items-center flex-shrink-0 gap-6 md:gap-7.5 xl:gap-10">
            <HeaderOffCanvas items={menuItems} />

            <Link
              to="/"
              className="flex items-center overflow-hidden h-11 w-[140px] min-[365px]:w-[150px] min-[380px]:w-[170px]"             
            >
              <img
                className="w-full h-full object-cover"
                src="/images/logo-placeholder.png"
                alt="Логотип"
                loading="lazy"
              ></img>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-5 flex-shrink-0 ml-1">
            <Button
              to="/sell"
              className="max-[576px]:hidden min-h-11 bg-black text-grayscale-white px-7.5 hover:opacity-80"
            >
              Продать
            </Button>
            <div className="flex items-center gap-2 sm:gap-5 translate-x-2.5 sm:translate-x-0">
              <div className="flex items-center gap-1 min-[350px]:gap-2 sm:gap-5 flex-shrink-0">
                {/* Кнопки войти и выйти */}
                {/* {user ? (
                  <button
                    onClick={handleLogout}
                    aria-label="Выйти"
                    title="Выйти"
                    className="block w-7.5 h-7.5 cursor-pointer"
                  >
                    <svg className="w-full h-full fill-none stroke-black stroke-1">
                      <use href={`/icons/symbol/sprite.svg#`} />
                    </svg>
                  </button>
                ) : ( */}
                <button
                  onClick={openAuth}
                  aria-label="Профиль"
                  title={user ? 'Перейти в профиль' :'Войти'}
                  className="relative block w-7.5 h-7.5 cursor-pointer"
                >
                  <svg className="w-full h-full fill-none stroke-black stroke-[1.2px]">
                    <use href={`/icons/symbol/sprite.svg#user`} />
                  </svg>

                  {/* Галочка, если пользователь авторизован */}
                  {user && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </button>
                {/* )} */}

                {/* Избранное */}
                <button
                  onClick={() => {
                    if (user) {
                      navigate("/profile/favourites");
                    } else {
                      openAuth();
                    }
                  }}
                  aria-label="Избранное"
                  title="Избранные товары"
                  className="block w-7.5 h-7.5 cursor-pointer"
                >
                  <svg className="w-full h-full fill-none stroke-black stroke-[1.7px]">
                    <use href="/icons/symbol/sprite.svg#like" />
                  </svg>
                </button>

                {/* Корзина */}
                <Link
                  to="/cart"
                  aria-label="Корзина"
                  title="Перейти в корзину"
                  className="relative flex items-center justify-center w-7.5 h-7.5 rounded-full"
                >
                  <svg className="w-full h-full fill-none stroke-black stroke-[1.2px]">
                    <use href={`/icons/symbol/sprite.svg#cart`} />
                  </svg>

                  {totalCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {totalCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * =====================================================================
 * ВРЕМЕННЫЕ ДАННЫЕ (будут заменены на API response)
 * =====================================================================
 */

/**
 * ВАЖНО
 * Сейчас массив продуктов захардкожен в компоненте.
 * В будущем он будет приходить от API.
 */

// меню для офканваса
const menuItems = [
  { title: "Образы", to: "/" },
  { title: "Продать", to: "/sell" },
  { title: "Новинки", to: "/new" },
  { title: "Предзаказ", to: "/preorder" },
  { title: "Мужская одежда", to: "/men/clothing" },
  { title: "Мужская обувь", to: "/men/shoes" },
  { title: "Женская одежда", to: "/women/clothing" },
  { title: "Женская обувь", to: "/women/shoes" },
  { title: "Сумки", to: "/bags" },
  { title: "Аксессуары", to: "/accessories" },
];
