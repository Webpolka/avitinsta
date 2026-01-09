import { type ProductCardData } from "@/mocks/products.mock";
import { USERS_DATA, type User } from "@/mocks/users.mocks";

interface CartItemProps {
  item: ProductCardData;
}
export const CartItem = ({ item }: CartItemProps) => {
  if (!item) return null;

  const { id, brand, title, price, color, images, sellerId } = item;

  // Получаем объект селлера по ID  
  const seller: User | undefined = USERS_DATA.find((u) => u.id === sellerId);
  // Берём картинку (если есть)
  const image = images?.[0] ?? "";

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
                <span className="ag-h10 text-grayscale-300">Честный продавец</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row gap-[8%] items-center">
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
          {id && (
            <div className="sm:hidden mb-2 ag-c1 font-normal text-grayscale-700">
              ID: {id}
            </div>
          )}

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

          {title && <p className="ag-h7 text-grayscale-700 sm:min-h-12 font-semibold">{title}</p>}

          {color && (
            <div className="hidden sm:flex gap-2">
              <span className="text-grayscale-500 font-medium">Цвет</span>
              <span className="text-black">{color}</span>
            </div>
          )}
        </div>
      </div>

      {color && (
        <div className="flex sm:hidden gap-5 mt-6">
          <span className="ag-h8 text-grayscale-500 font-medium">Цвет</span>
          <span className="ag-h8 text-secondary">{color}</span>
        </div>
      )}
    </div>
  );
};
