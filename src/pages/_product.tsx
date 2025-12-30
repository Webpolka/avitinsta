import { useParams, Link } from "react-router";
import { useState } from "react";
import ProductGallery from "@/components/product/productGallery";
import Button from "@/ui/button";
import StarRating from "@/ui/star-rating";
import Accordion from "@/components/accordion";
import ScrollToTop from "@/components/scrolltotop";

import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { DELIVERY_DATA } from "@/mocks/delivery.mock";
import { USERS_DATA } from "@/mocks/users.mocks";

import ProductsSeller from "@/components/product/productsSeller";
import ProductsSimilar from "@/components/product/productsSimilar";
import Breadcrumbs from "@/components/breadcrumbs";

interface CartItem {
  productId: string;
  size?: string;
  deliveryId?: string;
  sellerId?: string;
}

// === Родительский компонент: проверка существования продукта ===
export function Product() {
  const { id } = useParams();
  const product = PRODUCTS_DATA.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="w-full py-20 text-center">
        <h2 className="text-2xl font-semibold">Товар не найден</h2>
      </div>
    );
  }

  return <ProductView product={product} />;
}

// === Дочерний компонент: всегда получает продукт ===
interface ProductViewProps {
  product: (typeof PRODUCTS_DATA)[number];
}

function ProductView({ product }: ProductViewProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const seller = USERS_DATA.find(
    (user) => product.seller && user.id === product.seller.id
  );

  const { size } = product;

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

  const activeDelivery =
    product.delivery &&
    product.delivery
      .map((item) => DELIVERY_DATA.find((d) => d.id === item.id))
      .filter((d): d is NonNullable<typeof d> => Boolean(d && d.enabled));

  const firstDeliveryId =
    activeDelivery && activeDelivery.length > 0
      ? activeDelivery[0].id
      : undefined;

  const [cartItem, setCartItem] = useState<CartItem>({
    productId: product.id,
    size: formattedSize,
    deliveryId: firstDeliveryId,
    sellerId: product.seller && product.seller.id,
  });

  const handleLike = () => setLiked((prev) => !prev);

  const addToCart = () => {
    console.log("Добавляем в корзину:", cartItem);
  };

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(product.price);

  ScrollToTop();

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
                onClick={addToCart}
                className="bg-secondary min-h-15 font-mediun text-grayscale-white w-full max-w-103 border border-solid border-secondary"
              >
                <span>Добавить в корзину</span>
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

            {activeDelivery && activeDelivery.length > 0 && (
              <Accordion title="Доставка">
                <div className="flex gap-3 pt-2">
                  <svg className="h-5 w-5 mt-0.5 shrink-0">
                    <use href="/icons/symbol/sprite.svg#truck-fast" />
                  </svg>
                  <div className="flex-1 flex flex-col gap-2">
                    {activeDelivery.length === 1 ? (
                      <div className="flex flex-col sm:flex-row sm:justify-between md:flex-col md:items-start md:justify-normal xl:flex-row xl:items-center xl:justify-between gap-0 sm:gap-3 md:gap-0 xl:gap-3 mb-2">
                        <span className="ag-h6 font-medium text-secondary">
                          {activeDelivery[0].method}
                        </span>
                        <span className="ag-h6 font-normal text-secondary">
                          {activeDelivery[0].description}
                        </span>
                      </div>
                    ) : (
                      activeDelivery.map((d) => (
                        <label
                          key={d?.id}
                          className="cursor-pointer select-none"
                        >
                          <div className="text-right flex flex-col sm:flex-row sm:justify-between md:flex-col md:items-start md:justify-normal xl:flex-row xl:items-center xl:justify-between gap-0 sm:gap-3 md:gap-0 xl:gap-3 mb-2">
                            <div className="flex gap-3 items-center">
                              {/* Радио-квадратик */}
                              <input
                                type="radio"
                                name="delivery"
                                value={d.id}
                                checked={cartItem.deliveryId === d.id}
                                onChange={() =>
                                  setCartItem((prev) => ({
                                    ...prev,
                                    deliveryId: d.id,
                                  }))
                                }
                                className="peer hidden"
                              />
                              <span className="w-4 h-4 border border-[#d3d3d3] flex-shrink-0 peer-checked:border-black peer-checked:bg-black transition-colors"></span>

                              {/* Метод доставки */}
                              <span className="ag-h6 font-medium text-secondary">
                                {d?.method}
                              </span>
                            </div>

                            {/* Описание метода доставки */}
                            <span className="ag-h6 font-normal text-secondary">
                              {d?.description}
                            </span>
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              </Accordion>
            )}
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
