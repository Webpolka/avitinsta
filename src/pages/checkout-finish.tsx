import { useState, useEffect } from "react";
import axios from "axios";

import { CheckoutCartItem } from "@/components/checkout/checkout-cart-item";
import CartOrderItem from "@/components/cart/cart-order-item";
import { Radio } from "@/ui/radio";

/* ======================= TYPES ======================= */

export interface PaymentOption {
  id: string;
  method: string;
  description: string;
  enabled: boolean;
  image?: string;
}

export interface CartItemData {
  id: string;
  title: string;
  quantity: number;
  price: number;
  seller: {
    name: string;
    avatar: string;
    isHonest?: boolean;
  };
  image?: string;
}

/* ======================= COMPONENT ======================= */

export function CheckoutFinish() {
  const [cart, setCart] = useState<CartItemData[]>([]);
  const [promo, setPromo] = useState<string | null>(null);

  const [selectedPayment, setSelectedPayment] = useState<string>(
    PAYMENT_DATA[0].id
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ===== LOAD ORDER FROM LOCALSTORAGE ===== */

  useEffect(() => {
    const savedData = localStorage.getItem("order");
    if (savedData) {
      try {
        const { cart, promo } = JSON.parse(savedData);
        setCart(cart || []);
        setPromo(promo || null);
      } catch (e) {
        console.error("Ошибка чтения order", e);
      }
    }
  }, []);

  /* ===== CALC PRICES ===== */

  const itemsTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const serviceAmount = (itemsTotal * servicePercent) / 100;
  const totalPrice = itemsTotal + serviceAmount + deliveryPrice;

  /* ===== SUBMIT ===== */

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        cart,
        promo,
        payment: {
          method: selectedPayment,
        },
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

      // имитация запроса
      await axios.post("/api/order/pay", orderPayload);

      localStorage.setItem("order", JSON.stringify(orderPayload));
    } catch (e) {
      console.error(e);
      setError("Ошибка при отправке на оплату");
    } finally {
      setLoading(false);
    }
  };

  /* ======================= UI ======================= */

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-x-20 xl:gap-x-37.5 xl:pl-15 xl:pt-15 mb-45 md:mb-52">
      {/* ================= LEFT COLUMN (PAYMENT) ================= */}
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

      {/* ================= RIGHT COLUMN (NO CHANGES) ================= */}
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
            value={`${itemsTotal} ₽`}
          />
          <CartOrderItem label="Доставка" value={`${deliveryPrice} ₽`} />
          <CartOrderItem
            label="Процент сервиса"
            value={`${servicePercent} %`}
          />
          <CartOrderItem label="Итого" value={`${totalPrice} ₽`} />

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

/* ======================= CONST ======================= */

const deliveryPrice = 600;
const servicePercent = 2;

/* ======================= PAYMENT DATA ======================= */

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
    image: "",
  },
  {
    id: "yandex_pay",
    method: "Yandex Pay",
    description: "Оплата через Yandex Pay",
    enabled: true,
    image: "/images/payment/yandex_pay.png",
  },
];
