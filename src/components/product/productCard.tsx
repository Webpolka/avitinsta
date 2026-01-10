import { Link } from "react-router";
import { USERS_DATA } from "@/mocks/users.mocks";
import { type ProductCardData } from "@/mocks/products.mock";

import { useFavourites } from "@/context/use.all";

interface ProductCardProps {
  data: ProductCardData;
  className?: string;
}

export default function ProductCard({
  data,
  className = "",
}: ProductCardProps) {
  const {
    id,
    images,
    brand,
    title,
    price,
    sizes,
    sellerId,
    favoriteCount = 0,
  } = data;

  const { addItem, removeItem, isInFavourites } = useFavourites();

  const seller = USERS_DATA.find((user) => user.id === sellerId);

  const mainImage = images[0];
  const productLink = `/product/${id}`;

  const liked = isInFavourites(id);

  const handleLike = () => {
    if (liked) {
      removeItem(id);
    } else {
      addItem({ productId: id });
    }
  };

  // форматирование цены
  const formattedPrice = price.toLocaleString("ru-RU") + " ₽";

  const size = sizes?.[0];

  const formattedSize = (() => {
    if (!size) return "";

    switch (size.system) {
      case "EU":
        return `EU: ${size.value}`;
      case "LETTER":
        return size.value;
      case "ONE_SIZE":
        return "One Size";
      default:
        return "";
    }
  })();

  // счётчик (локально +1 если лайкнут)
  const likes = liked ? favoriteCount + 1 : favoriteCount;

  return (
    <div className={`group flex flex-col gap-3 overflow-hidden ${className}`}>
      {/* Мобильный блок с пользователем */}
      {seller && (
        <Link
          to={`/user/${seller.id}`}
          className="flex sm:hidden items-start gap-2"
        >
          <img
            src={seller.avatar}
            alt={seller.name}
            className="h-6 w-6 rounded-full"
          />
          <div className="flex flex-col">
            <span className="ag-h7 leading-4 whitespace-nowrap">
              {seller.name}
            </span>
            <span className="ag-h12 text-grayscale-500 pt-1">
              @{seller.name}
            </span>
          </div>
        </Link>
      )}

      {/* Основная картинка */}
      <div className="relative">
        <Link
          to={productLink}
          className="block relative overflow-hidden aspect-[171/250] sm:aspect-[210/265] lg:aspect-[264/300]"
        >
          <img
            src={mainImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Избранное */}
        <button
          onClick={handleLike}
          className="absolute right-3 top-3 flex items-center gap-1 cursor-pointer"
        >
          <svg
            className={`h-7 w-7 transition-colors stroke-[1.5px] ${
              liked ? "fill-red-500 stroke-red-500" : "fill-none stroke-black"
            }`}
          >
            <use href="/icons/symbol/sprite.svg#like" />
          </svg>

          <span className="ag-h9 text-secondary font-medium">{likes}</span>
        </button>
      </div>

      {/* Нижняя часть */}
      <div className="flex justify-between">
        {/* Левая */}
        <Link to={productLink} className="flex flex-col gap-1 flex-1">
          <h2 className="ag-h6 font-medium text-secondary whitespace-nowrap">
            {brand}
          </h2>
          <span className="ag-h8 text-grayscale-700">{title}</span>
          <span className="ag-h6 font-medium whitespace-nowrap">
            {formattedPrice}
          </span>
        </Link>

        {/* Правая */}
        <div className="flex flex-col items-center justify-between">
          <span className="ag-h8 text-grayscale-700">{formattedSize}</span>

          {seller && (
            <Link
              to={`/user/${seller.id}`}
              className="hidden sm:flex flex-col items-center gap-1"
            >
              <img
                src={seller.avatar}
                alt={seller.name}
                className="h-6 w-6 rounded-full"
              />
              <span className="ag-h12 text-grayscale-400">{seller.name}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
