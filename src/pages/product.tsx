import { useParams, Link } from "react-router";
import { useState } from "react";
import ProductGallery from "@/components/product/productGallery";
import Button from "@/ui/button";
import StarRating from "@/ui/star-rating";
import Accordion from "@/components/accordion";
// import ScrollToTop from "@/components/scrolltotop";

import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { USERS_DATA } from "@/mocks/users.mocks";

import ProductsSeller from "@/components/product/productsSeller";
import ProductsSimilar from "@/components/product/productsSimilar";
import Breadcrumbs from "@/components/breadcrumbs";

import { useCart } from "@/context/use.all";
import { CartLogger } from "@/context/cart.logger";

// === Родительский компонент: проверка существования продукта ===
export function Product() {
  const { id } = useParams();
  const { addItem, removeItem, isInCart } = useCart();

  const product = PRODUCTS_DATA.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="w-full py-20 text-center">
        <h2 className="text-2xl font-semibold">Товар не найден</h2>
      </div>
    );
  }

  const inCart = isInCart(product.id);

  return (
    <>
      {/* для вывода корзины в консоле браузера  */}
      <CartLogger />
      {/* представление товара */}
      <ProductView
        product={product}
        inCart={inCart}
        addItem={addItem}
        removeItem={removeItem}
      />
    </>
  );
}

// === Дочерний компонент: всегда получает продукт ===
interface ProductViewProps {
  product: (typeof PRODUCTS_DATA)[number];
  inCart: boolean;
  addItem: (item: {
    productId: string;  
  }) => void;
  removeItem: (productId: string) => void;
}

function ProductView({
  product,
  inCart,
  addItem,
  removeItem,
}: ProductViewProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => setLiked((prev) => !prev);

  const handleCartClick = () => {
    if (inCart) {
      removeItem(product.id);
    } else {
      addItem({
        productId: product.id,       
      });
    }
  };

  const size = product.sizes?.[0];

  const seller = USERS_DATA.find(
    (user) => product.sellerId && user.id === product.sellerId
  );

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

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbsArray} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7.5 sm:gap-12 lg:gap-16 xl:gap-22.5 mb-30 md:mb-100">
        {/* Галерея */}
        <ProductGallery images={product.images} />

        {/* Контент */}
        <div className="flex flex-col gap-5 lg:max-w-[495px]">
          <h1 className="ag-w4 text-secondary font-semibold">
            {product.brand}
          </h1>
          <p className="ag-h1 text-secondary font-semibold mb-2">
            {formattedPrice}
          </p>

          {/* Размеры */}
          {formattedSize && (
            <div className="flex flex-row items-center gap-5 mb-2">
              <span className="ag-h7 font-medium text-grayscale-500">
                Размер
              </span>
              <div className="flex gap-4 flex-wrap">
                {/* Выводим только первый размер */}
                {formattedSize && (
                  <span className="px-4 py-2 border border-solid ag-h7 font-medium cursor-pointer border-[#d3d3d3] text-grayscale-500">
                    {formattedSize}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex items-end gap-5.5">
            <div className="flex flex-col gap-5 flex-1">
              <Button
                to="/write"
                className="bg-grayscale-white min-h-15 font-mediun text-secondary w-full max-w-103 border border-solid border-grayscale-100"
              >
                <span>Написать продавцу</span>
              </Button>
              <Button
                onClick={handleCartClick}
                className={`min-h-15 font-mediun w-full max-w-103 border border-solid cursor-pointer ${
                  inCart
                    ? "bg-grayscale-500 text-secondary border-grayscale-100"
                    : "bg-secondary text-grayscale-white border-secondary"
                }`}
              >
                <span>
                  {inCart ? "Убрать из корзины" : "Добавить в корзину"}
                </span>
              </Button>
            </div>

            <button
              onClick={handleLike}
              className="cursor-pointer bg-gray-200 p-2 h-15 aspect-square flex justify-center items-center"
            >
              <svg
                className={`h-10 w-10 transition-colors stroke-amber-400 ${
                  liked ? "fill-red-500" : "fill-none"
                }`}
              >
                <use href="/icons/symbol/sprite.svg#like" />
              </svg>
            </button>
          </div>

          {/* Продавец */}
          {seller && (
            <div className="flex flex-col gap-3 mt-3">
              <h3 className="text-secondary ag-h3 mb-1">Продавец</h3>
              <Link
                to="seller/link"
                className="group flex items-start gap-2 pb-2"
              >
                {seller.avatar && (
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                )}
                {seller.rating && (
                  <div>
                    <span className="ag-h7 text-secondary font-medium">
                      {seller.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="ag-h8 text-secondary font-medium">
                        {seller.rating.toFixed(1)}
                      </span>
                      <StarRating rating={seller.rating} size={16} gap={2} />
                      <span className="ag-h8 text-secondary font-medium">
                        — {seller.reviewsCount} отзыва
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          )}

          {/* Аккордеоны */}
          <div className="flex flex-col gap-2">
            <Accordion title="Описание" button={false}>
              <p>{product.description}</p>
            </Accordion>

            <Accordion title="Доставка" button={false}>
              <div className="flex gap-3 pt-2">
                <svg className="h-5 w-5 mt-0.5 shrink-0">
                  <use href="/icons/symbol/sprite.svg#truck-fast" />
                </svg>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-center gap-1 sm:gap-2 mb-2 text-right flex-wrap">
                    <span className="ag-h6 font-medium text-secondary">
                      Курьерская
                    </span>
                    <span className="ag-h6 font-normal text-secondary">
                      доставка курьером или до ПВЗ
                    </span>
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>

      <ProductsSeller items={PRODUCTS_DATA} />
      <ProductsSimilar items={PRODUCTS_DATA} />
    </>
  );
}

const breadcrumbsArray = [
  { title: "Главная", slug: "" },
  { title: "Каталог", slug: "catalog" },
  { title: "Ботинки", slug: "boots" },
  { title: "Кроссовки и кеды", slug: "sneakers" },
  { title: "Jordan", slug: "jordan" },
];
