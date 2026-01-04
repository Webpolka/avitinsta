export interface CheckoutCartItemData {
  id?: string;
  brand?: string;
  title?: string;
  price?: number;
  color?: string;
  images?: string[];
  seller?: {
    id?: string;
    name?: string;
    avatar?: string;
    isHonest?: boolean;
  };
}

type Props = {
  item?: CheckoutCartItemData;
};

export const CheckoutCartItem = ({ item }: Props) => {
  if (!item) return null;

  const { id, brand, title, price, images, seller } = item;
  const image = images?.[0] ?? "/images/product-placeholder.png";

  return (
    <div className="flex flex-col mb-7.5 sm:mb-7.5">
      {/* Продавец */}
      {(seller?.name || seller?.avatar) && (
        <div className="flex items-start gap-2 border-b border-grayscale-100 pb-2 mb-5">
          {seller?.avatar && (
            <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
              <img
                src={seller.avatar}
                alt={seller?.name ?? "seller"}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {seller?.name && (
            <div className="flex flex-col">
              <span className="ag-h7 text-secondary font-medium">
                {seller.name}
              </span>

              {seller?.isHonest && (
                <span className=" sm:hidden ag-h10 text-grayscale-300">
                  Честный продавец
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row gap-7.5 xl:gap-20 items-center">
        {/* Картинка */}
        {image && (
          <img
            src={image}
            alt={title ?? "product"}
            loading="lazy"
            className="block w-28 h-28 sm:w-20 sm:h-20 bg-gray-400 shrink-0 object-cover"
          />
        )}

        {/* Информация */}
        <div className="flex-1">
          {/* ID (мобилка) */}
          {id && (
            <div className="sm:hidden ag-c1 font-normal text-grayscale-700 mb-2">
              ID: {id}
            </div>
          )}

          {/* Название и цена */}
          {(brand || price) && (
            <h3 className="ag-h4 mb-1 flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between w-full">
              {brand && (
                <span className="font-semibold whitespace-nowrap">{brand}</span>
              )}

              {typeof price === "number" && (
                <span className="font-semibold whitespace-nowrap text-secondary">
                  {price.toLocaleString("ru-RU")} ₽
                </span>
              )}
            </h3>
          )}

          {/* Описание */}
          {title && (
            <p className="text-gray-400 sm:min-h-11 font-semibold">{title}</p>
          )}

          {/* Цвет (десктоп) */}
          {size && (
            <div className="hidden sm:flex gap-2">
              <span className="ag-h8 text-grayscale-500">Размер</span>
              <span className="ag-h8 text-brand-secondary">{size}</span>
            </div>
          )}
        </div>
      </div>

      {/* Размер (планшет) */}
      {size && (
        <div className="flex sm:hidden gap-4 mt-6 mb-7.5">
          <span className="ag-h8 text-grayscale-500">Размер</span>
          <span className="ag-h8 text-brand-secondary">{size}</span>
        </div>
      )}
    </div>
  );
};

/**
 * =====================================================================
 * ВРЕМЕННЫЕ ДАННЫЕ (будут заменены на API response)
 * =====================================================================
 */

const size = "XL";
