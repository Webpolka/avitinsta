
import CartOrderItem from "@/components/cart/cart-order-item";
import { CheckoutCartItem } from "./CheckoutCartItem";
import { type CartItemType } from "./types";

import { formatDotPrice } from "@/hooks/utils";

type CheckoutSummaryProps = {
  cart: CartItemType[];
  itemsTotal: number;
  deliveryPrice: number;
  servicePercent: number;
  totalPrice: number;
  isFormValid: boolean;
  loading: boolean;
  handleSubmit: () => void;
  error?: string | null;
};

export function CheckoutSummary({
  cart,
  itemsTotal,
  deliveryPrice,
  servicePercent,
  totalPrice,
  isFormValid,
  loading,
  handleSubmit,
  error,
}: CheckoutSummaryProps) {
  return (
    <div className="flex flex-col basis-[100%] md:basis-[53%]">
      {/* Список товаров */}
      <div className="hidden sm:block">
        {cart.map((item, index) => (
          <CheckoutCartItem key={item.id ?? index} item={item} />
        ))}
      </div>

      <h2 className="ag-h1 text-brand-secondary font-semibold mb-7.5">Заказ</h2>

      <div className="flex flex-col gap-6 mb-0 sm:mb-10">
        <CartOrderItem label={`${cart.length} товара`} value={`${formatDotPrice(itemsTotal)} ₽`} />
        <CartOrderItem label="Доставка" value={`от ${formatDotPrice(deliveryPrice)} ₽`} />
        <CartOrderItem label="Процент сервиса" value={`от ${servicePercent} % от суммы заказа`} />
        <CartOrderItem label="Итого" value={`${formatDotPrice(totalPrice)} ₽`} />

        <button
          disabled={!isFormValid || loading}
          onClick={handleSubmit}
          className={`min-h-[56px] bg-black text-white py-3 px-6 cursor-pointer mt-5 ${
            !isFormValid || loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          <span>{loading ? "Сохраняем..." : "К оплате"}</span>
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
