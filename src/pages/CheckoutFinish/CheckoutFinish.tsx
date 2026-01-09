import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/use.all";

import { CheckoutCartItem } from "@/pages/CheckoutStart/CheckoutCartItem";
import { type CartItemType } from "@/pages/CheckoutStart/types";
import CartOrderItem from "@/components/cart/cart-order-item";

import { formatDotPrice } from "@/hooks/utils";
import { Radio } from "@/ui/radio";

// Temperory mocks data
import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { USERS_DATA } from "@/mocks/users.mocks";

/* ================= TYPES ================= */
export interface PaymentOption {
  id: string;
  method: string;
  description: string;
  enabled: boolean;
  image?: string;
}

/* ================= CONST ================= */
const deliveryPrice = 600;
const servicePercent = 2;

const PAYMENT_DATA: PaymentOption[] = [
  {
    id: "sbp",
    method: "СБП",
    description: "Система быстрых платежей",
    enabled: true,
    image: "/images/payment/sbp_pay.png",
  },
  {
    id: "card",
    method: "Банковская карта",
    description: "Visa / MasterCard / МИР",
    enabled: true,
  },
  {
    id: "yandex_pay",
    method: "Yandex Pay",
    description: "Оплата через Yandex Pay",
    enabled: true,
    image: "/images/payment/yandex_pay.png",
  },
];

/* ================= COMPONENT ================= */
export function CheckoutFinish() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [promo, setPromo] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>(
    PAYMENT_DATA[0].id
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigate();
  const {clearCart} = useCart();

  /* ===== LOAD ORDER FROM LOCALSTORAGE ===== */
  useEffect(() => {
    const savedData = localStorage.getItem("cartDraft");
    if (savedData) {
      try {
        const { items, promo: savedPromo } = JSON.parse(savedData);

        if (items?.length) {
          const savedCart: CartItemType[] = items
            .map((id: string) => {
              const product = PRODUCTS_DATA.find((p) => p.id === id);
              if (!product) return null;

              const seller = product.sellerId
                ? USERS_DATA.find((u) => u.id === product.sellerId)
                : undefined;

              return {
                ...product,
                seller,
                image: product.images?.[0] || "", // первое изображение массива
              };
            })
            .filter(Boolean) as CartItemType[];

          setCart(savedCart);
        }

        setPromo(savedPromo || null);
      } catch (e) {
        console.error("Ошибка чтения cartDraft", e);
      }
    }
  }, []);

  /* ===== CALC PRICES ===== */
  const itemsTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const serviceAmount = (itemsTotal * servicePercent) / 100;
  const totalPrice = itemsTotal + serviceAmount + deliveryPrice;

  /* ===== SUBMIT PAYMENT ===== */
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        cart,
        promo,
        payment: { method: selectedPayment },
        prices: {
          itemsTotal,
          servicePercent,
          serviceAmount,
          deliveryPrice,
          totalPrice,
        },
        status: "pending_payment",
      };

      console.log("ORDER PAYLOAD:", orderPayload);

      //  сохраняем заказ
      localStorage.setItem("order", JSON.stringify(orderPayload));

      //  ОЧИЩАЕМ ВСЁ СВЯЗАННОЕ С КОРЗИНОЙ
      localStorage.removeItem("cartDraft");
      
      // если корзина была в состоянии
      setCart([]);
      setPromo(null);

      clearCart();

      //  дальше редирект
      // navigate("/checkout/success");

      navigation("/");
    } catch (e) {
      console.error(e);
      setError("Ошибка при отправке на оплату");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-x-20 xl:gap-x-37.5 xl:pl-15 xl:pt-15 mb-45 md:mb-52">
      {/* ===== LEFT COLUMN: PAYMENT ===== */}
      <div className="flex flex-col basis-[100%] md:basis-[47%] gap-10">
        <h2 className="text-secondary ag-h2 sm:ag-h1 font-semibold pt-5 sm:pt-0">
          Выберите способ оплаты
        </h2>

        {PAYMENT_DATA.filter((p) => p.enabled).map((option) => (
          <div
            key={option.id}
            className="flex justify-between items-center border-b border-grayscale-300 py-4"
          >
            <div className="flex flex-col">
              <Radio
                name="payment"
                label={option.method}
                value={option.id}
                checked={selectedPayment === option.id}
                onChange={() => setSelectedPayment(option.id)}
              />
              <span className="hidden text-sm text-grayscale-500 mt-1">
                {option.description}
              </span>
            </div>

            {option.image && (
              <img
                src={option.image}
                alt={option.method}
                className="w-auto h-full max-h-10"
              />
            )}
          </div>
        ))}
      </div>

      {/* ===== RIGHT COLUMN: CART SUMMARY ===== */}
      <div className="flex flex-col basis-[100%] md:basis-[53%]">
        <div className="block pt-15 md:pt-0">
          {cart.map((item, index) => (
            <CheckoutCartItem key={item.id ?? index} item={item} />
          ))}
        </div>

        <h2 className="ag-h1 text-brand-secondary font-semibold mb-7.5">
          Заказ
        </h2>

        <div className="flex flex-col gap-6 mb-10">
          <CartOrderItem
            label={`${cart.length} товара`}
            value={`${formatDotPrice(itemsTotal)} ₽`}
          />
          <CartOrderItem label="Доставка" value={`от ${formatDotPrice(deliveryPrice)} ₽`} />
          <CartOrderItem
            label="Процент сервиса"
            value={`${servicePercent} %`}
          />
          <CartOrderItem label="Итого" value={`${formatDotPrice(totalPrice)} ₽`} />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`min-h-[56px] bg-black text-white py-3 px-6 mt-5 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
            }`}
          >
            {loading ? "Переходим к оплате..." : "К оплате"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
