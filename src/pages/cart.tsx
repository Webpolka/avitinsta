import { useState } from "react";
import { Input } from "@/ui/input";
import Button from "@/ui/button";

import { CartItem } from "@/components/cart/cart-item";
import CartOrderItem from "@/components/cart/cart-order-item";

import type { CartItemData } from "@/components/cart/cart-item";

export function Cart() {
  const deliveryPrice = 600;

  // Состояние корзины и промокода  
  const [cart, setCart] = useState<CartItemData[]>(CART_DATA);
  const [promo, setPromo] = useState("");

  // Итоговая сумма
  const itemsTotal = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );
  const totalPrice = itemsTotal + deliveryPrice;

  // Функция оформления заказа
  const handleCheckout = () => {
    const order = {
      cart: cart,
      promo: promo || null,
      delivery: deliveryPrice,
      total: totalPrice,
    };
    // Записываем в LocalStorage только при оформлении
    localStorage.setItem("order", JSON.stringify(order));
    // Переходим на страницу Checkout
    window.location.href = "/checkout/start";
  };

  return (
    <>
      <h1 className="ag-h1 pt-3 sm:pt-7.5 pb-15 sm:pb-10 text-center font-semibold text-secondary">
        Корзина
      </h1>

      <div className="flex flex-col md:flex-row md:gap-7.5 xl:gap-[115px] mb-30">
        {/* Список товаров */}
        <section className="flex-1">
          {cart.map((item, index) => (
            <CartItem key={item.id ?? index} item={item} />
          ))}
        </section>

        {/* Информация о заказе */}
        <section className="w-full flex md:w-[235px] lg:w-[285px] xl:w-[317px]">
          <div className="w-full">
            <h2 className="ag-h1 text-brand-secondary font-semibold mb-7.5">
              Заказ
            </h2>

            <div className="flex flex-col gap-6 mb-10">
              <CartOrderItem
                label={`${cart.length} товара`}
                value={`${itemsTotal} ₽`}
              />
              <CartOrderItem label="Доставка" value={`${deliveryPrice} ₽`} />
              <CartOrderItem label="Итого" value={`${totalPrice} ₽`} />
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
            >
              <span>Перейти к оформлению</span>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

/**
 * =====================================================================
 * ВРЕМЕННЫЕ ДАННЫЕ (будут заменены на API response)
 * =====================================================================
 */
const CART_DATA: CartItemData[] = [
  {
    id: "1",
    brand: "Nike Jordan",
    title: "Кросы",
    color: "Белый",
    price: 13000,
    image: "/images/products/product.png",
    quantity: 1,
    seller: {
      name: "Иван Иванов",
      avatar: "/images/avatar.png",
      isHonest: true,
    },
  },
  {
    id: "2",
    brand: "Adidas",
    title: "Куртка спортивная",
    color: "Черный",
    price: 8500,
    image: "/images/product.png",    
    quantity: 1,
    seller: {
      name: "Пётр Петров",
      avatar: "/images/avatar.png",
      isHonest: true,
    },
  },
];
