import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/use.all";
import { formatDotPrice } from "@/hooks/utils";

import { CartItem } from "@/components/cart/cart-item";
import CartOrderItem from "@/components/cart/cart-order-item";
import { Input } from "@/ui/input";
import Button from "@/ui/button";

import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { USERS_DATA, type User } from "@/mocks/users.mocks";

export function Cart() {
  const deliveryPrice = 600;
  const { items } = useCart(); // массив объектов { productId }
  const [promo, setPromo] = useState("");
  const navigate = useNavigate();

  // Получаем полные данные товаров из корзины с информацией о продавце
  const cartItems = useMemo(() => {
    return items
      .map(({ productId }) => {
        const product = PRODUCTS_DATA.find((p) => p.id === productId);
        if (!product) return null;

        const seller: User | undefined = product.sellerId
          ? USERS_DATA.find((u) => u.id === product.sellerId)
          : undefined;

        return { ...product, seller };
      })
      .filter(Boolean) as (typeof PRODUCTS_DATA[number] & { seller?: User })[];
  }, [items]);

  // Сумма товаров
  const itemsTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems]
  );

  // Общая сумма с доставкой
  const totalPrice = itemsTotal + deliveryPrice;

  // Переход к оформлению заказа
  const handleCheckout = () => {
    localStorage.setItem(
      "cartDraft",
      JSON.stringify({
        items: items.map((i) => i.productId),
        promo,
        deliveryId: null,
      })
    );
    navigate("/checkout/start");
  };

  // Если корзина пустая, рендерим альтернативный блок
  if (cartItems.length === 0) {
    return (
      <div className="w-full flex justify-center items-center min-h-[88vh] sm:min-h-[85vh] pb-5">
        <div className="flex flex-col items-center gap-3 max-w-[430px] text-center">
          <h2 className="ag-h1 font-semibold text-secondary">Корзина</h2>
          <p className="ag-h6 font-medium text-[#21212d] mb-6">
            В вашей корзине пока ничего нет, но у нас огромный{" "}
            <br className="hidden sm:inline-block" />
            выбор
          </p>
          <Button
            to="/"
            className="m-auto self-start text-secondary border border-black border-solid min-h-11 min-w-75"
          >
            <span>На главную</span>
          </Button>
        </div>
      </div>
    );
  }

  // Иначе — рендерим корзину с товарами
  return (
    <>
      <h1 className="ag-h1 pt-3 sm:pt-7.5 pb-15 sm:pb-10 text-center font-semibold text-secondary">
        Корзина
      </h1>

      <div className="flex flex-col md:flex-row md:gap-7.5 xl:gap-[115px] mb-30">
        {/* Список товаров */}
        <section className="flex-1">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </section>

        {/* Блок с информацией о заказе */}
        <section className="w-full flex md:w-[235px] lg:w-[285px] xl:w-[317px]">
          <div className="w-full">
            <h2 className="ag-h1 text-brand-secondary font-semibold mb-7.5">
              Заказ
            </h2>

            <div className="flex flex-col gap-6 mb-10">
              <CartOrderItem
                label={`${cartItems.length} товара`}
                value={`${formatDotPrice(itemsTotal)} ₽`}
              />
              <CartOrderItem label="Доставка" value={`от ${formatDotPrice(deliveryPrice)} ₽`} />
              <CartOrderItem label="Итого" value={`${formatDotPrice(totalPrice)} ₽`} />
            </div>

            <div className="mb-10">
              <Input
                label="Промокод"
                placeholder="Введите промокод"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="mt-4 placeholder-[#272727] bg-grayscale-white"
              />
            </div>

            <Button
              className="w-full bg-black text-grayscale-white font-medium min-h-[52px]"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Перейти к оформлению
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
