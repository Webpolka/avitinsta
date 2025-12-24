export interface CartItemData {
  id?: string;
  brand?: string;
  title?: string;
  price?: number;
  color?: string;
  image?: string;
  quantity?: number;
  seller?: {
    name?: string;
    avatar?: string;
    isHonest?: boolean;
  };
}

type Props = {
  item?: CartItemData;
};

export const CartItem = ({ item }: Props) => {
  if (!item) return null;

  const { id, brand, title, price, color, image, quantity, seller } = item;

  return (
    <div className="flex flex-col mb-[65px] sm:mb-[70px]">
      {/* Продавец */}
      {(seller?.name || seller?.avatar) && (
        <div className="flex items-start gap-2 border-b border-grayscale-100 pb-3 mb-10">
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
                <span className="ag-h10 text-grayscale-300">
                  Честный продавец
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row  gap-[8%] items-center">
        {/* Картинка */}
        {image && (
          <img
            src={image}
            alt={title ?? "product"}
            loading="lazy"
            className="block w-[112px] h-[112px] lg:w-[138px] lg:h-[142px] bg-gray-400 shrink-0 object-cover"
          />
        )}

        {/* Информация */}
        <div className="flex-1">
          {/* ID (мобилка) */}
          {id && (
            <div className="sm:hidden mb-2 ag-c1 font-normal text-grayscale-700">
              ID: {id}
            </div>
          )}

          {/* Название и цена */}
          {(brand || price) && (
            <h3 className="ag-h4 mb-2 flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between w-full">
              {brand && (
                <span className="font-semibold whitespace-nowrap">{brand}</span>
              )}

              {typeof price === "number" && (
                <span className="font-semibold whitespace-nowrap">
                  {price.toLocaleString("ru-RU")} ₽
                </span>
              )}
            </h3>
          )}

          {/* Описание */}
          {title && (
            <p className="text-gray-400 sm:min-h-12 font-semibold">{title}</p>
          )}

          {/* Цвет (десктоп) */}
          {color && (
            <div className="hidden sm:flex gap-2">
              <span className="text-gray-400">Цвет</span>
              <span className="text-black">{color}</span>
            </div>
          )}
        </div>
      </div>

      {/* Цвет (планшет) */}
      {color && (
        <div className="flex sm:hidden gap-4 mt-6">
          <span className="ag-h8 text-grayscale-500">Цвет</span>
          <span className="ag-h8 text-brand-secondary">{color}</span>
        </div>
      )}

      {quantity && <div className="hidden">{quantity}</div>}
    </div>
  );
};
