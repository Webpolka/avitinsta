import { useState } from "react";
import { Link } from "react-router";

import { type ProductCardData } from "@/mocks/products.mock";

interface ProductCardProps {
  data: ProductCardData;
  className?: string;
}

export default function ProductCard({ data, className = ""}: ProductCardProps) {
  const {
    id,
    images,
    brand,
    title,
    price,
    size,
    seller,
    favoriteCount = 0,
    isFavorite = false,
  } = data;

  const mainImage = images[0]; 
  const productLink = `/product/${id}`;

  const [liked, setLiked] = useState(isFavorite);
  const [likes, setLikes] = useState(favoriteCount);

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  // форматирование числа с пробелами для читаемости
  const formattedPrice = price.toLocaleString("ru-RU") + " ₽";

  const formattedSize =
    size && size.length > 0
      ? (() => {
          const first = size[0];
          switch (first.system) {
            case "EU":
              return `EU: ${first.value}`;
            case "LETTER":
              return `${first.value}`;
            case "ONE_SIZE":
              return "One Size";
            default:
              return "";
          }
        })()
      : "";

  return (
    <div className={`group flex flex-col gap-3 overflow-hidden ${className ?? ""}`}> 
      {/* Мобильный блок с пользователем */}
      {seller && (
        <Link to={seller.link} className="flex sm:hidden items-start gap-2">
          <img
            src={seller.avatar}
            alt={seller.name}
            className="h-6 w-6 rounded-full"
          />
          <div className="flex flex-col">
            <span className="ag-h7 leading-4 whitespace-nowrap">{seller.name}</span>
            <span className="ag-h12 text-grayscale-500 pt-1">@{seller.name}</span>
          </div>
        </Link>
      )}

      {/* Основная картинка товара */}
      <div className="relative">
        <Link
          to={productLink}
          className="block relative overflow-hidden aspect-[171/250] sm:aspect-[210/265] lg:aspect-[264/300]"
        >
          <img
            src={mainImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Кнопка лайка */}
        <button
          onClick={handleLike}
          className="absolute right-3 top-3 flex items-center gap-1"
        >
          <svg
            className={`h-5.5 w-5.5 transition-colors ${
              liked ? "fill-red-500" : "fill-none stroke-black"
            }`}
          >
            <use href="/icons/symbol/sprite.svg#like" />
          </svg>
          <span className="ag-h9 text-secondary font-medium">{likes}</span>
        </button>
      </div>

      {/* Нижняя часть карточки */}
      <div className="flex justify-between">
        {/* Левая часть: бренд, название, цена */}
        <Link to={productLink} className="flex flex-col gap-1 flex-1">
          <h2 className="ag-h6 font-medium text-secondary whitespace-nowrap">{brand}</h2>
          <span className="ag-h8 text-grayscale-700">{title}</span>
          <span className="ag-h6 font-medium whitespace-nowrap">{formattedPrice}</span>
        </Link>

        {/* Правая часть: размер и пользователь */}
        <div className="flex flex-col items-center justify-between">
          <span className="ag-h8 text-grayscale-700">{formattedSize}</span>

          {seller && (
            <Link to={seller.link} className="hidden sm:flex flex-col items-center gap-1">
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
