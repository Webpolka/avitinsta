import { useState, useEffect, useMemo } from "react";

import { CheckoutCartItem } from "@/components/checkout/checkout-cart-item";
import CartOrderItem from "@/components/cart/cart-order-item";
import Map from "@/ui/map";
import { Radio } from "@/ui/radio";
import { DELIVERY_DATA , type DeliveryOption} from "@/mocks/delivery.mock";
import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { USERS_DATA, type User } from "@/mocks/users.mocks";

const deliveryPrice = 600;
const servicePercent = 2;

export function CheckoutStart() {
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [promo, setPromo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // выбранный способ доставки
  const [selectedDelivery, setSelectedDelivery] = useState<string>(
    DELIVERY_DATA[0].id
  );

  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    phone: "",
    region: "",
    city: "",
    street: "",
    note: "",
  });

  // ================== Загрузка черновика ==================
  useEffect(() => {
    const savedData = localStorage.getItem("cartDraft");
    if (savedData) {
      try {
        const { items, promo, deliveryId } = JSON.parse(savedData);
        setCartIds(items || []);
        setPromo(promo || null);
        if (deliveryId) setSelectedDelivery(deliveryId);
      } catch (err) {
        console.error("Ошибка при чтении данных из localStorage", err);
        setCartIds([]);
        setPromo(null);
      }
    }
  }, []);

  // ================== Формируем актуальные товары с продавцами ==================
  const cart = useMemo(() => {
    return cartIds
      .map((id) => {
        const product = PRODUCTS_DATA.find((p) => p.id === id);
        if (!product) return null;

        const seller: User | undefined = product.sellerId
          ? USERS_DATA.find((u) => u.id === product.sellerId)
          : undefined;

        return { ...product, seller };
      })
      .filter(Boolean) as (typeof PRODUCTS_DATA[number] & { seller?: User })[];
  }, [cartIds]);

  // ================== Цены ==================
  const itemsTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const serviceAmount = (itemsTotal * servicePercent) / 100;
  const totalPrice = itemsTotal + deliveryPrice + serviceAmount;

  // ================== Работа с формой ==================
  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const requiredFields: (keyof typeof form)[] = ["lastName", "firstName", "city", "street"];
  const isFormValid = requiredFields.every((field) => form[field].trim() !== "");

  // ================== Отправка к Checkout Finish ==================
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderPayload = {
        customer: { ...form },
        deliveryId: selectedDelivery,
        promo,
        cart: cart.map((item) => ({
          productId: item.id,
          seller: item.seller
            ? { id: item.seller.id, name: item.seller.name, avatar: item.seller.avatar, isHonest: item.seller.isHonest }
            : null,
          price: item.price,
          title: item.title,
          image: item.images?.[0] ?? null,
        })),
        prices: { itemsTotal, servicePercent, serviceAmount, deliveryPrice, totalPrice },
      };

      console.log("Заказ готов к Checkout Finish:", orderPayload);

      // Сохраняем черновик в LocalStorage
      localStorage.setItem(
        "cartDraft",
        JSON.stringify({
          items: cartIds,
          promo,
          deliveryId: selectedDelivery,
        })
      );

      window.location.href = "/checkout/finish";
    } catch (err) {
      console.error(err);
      setError("Произошла ошибка при создании заказа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-x-20 xl:gap-x-37.5 xl:pl-15 xl:pt-15 mb-45 md:mb-52">
      {/* Левая колонка */}
      <div className="flex flex-col basis-[100%] md:basis-[47%] gap-15">
        <div className="flex flex-col gap-4">
          <h2 className="text-secondary ag-h2 sm:ag-h1 font-semibold mb-2 pt-5 sm:pt-0">
            Укажите способ доставки
          </h2>

          {DELIVERY_DATA.filter((o) => o.enabled).map((option: DeliveryOption) => (
            <div key={option.id} className="flex justify-between items-center border-b border-grayscale-300 py-3">
              <Radio
                name="delivery"
                label={option.method}
                value={option.id}
                checked={selectedDelivery === option.id}
                onChange={() => setSelectedDelivery(option.id)}
              />
              {option.image && (
                <img src={option.image} alt={option.method} className="w-auto h-full max-h-10 block" />
              )}
            </div>
          ))}
        </div>

        {/* Блок оформление заказа */}
        <div className="flex-col gap-7 mb-15 xl:mb-0 flex">
          <h2 className="text-secondary ag-h2 sm:ag-h1 font-semibold mb-4">
            Оформление заказа
          </h2>

          <ThisInput label="Фамилия" value={form.lastName} onChange={(val) => updateField("lastName", val)} placeholder="Иванов" required />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ThisInput label="Имя" value={form.firstName} onChange={(val) => updateField("firstName", val)} placeholder="Иван" required />
            <ThisInput label="Отчество" value={form.middleName} onChange={(val) => updateField("middleName", val)} placeholder="Иванович" />
          </div>
          <ThisInput label="Номер телефона" value={form.phone} onChange={(val) => updateField("phone", val)} placeholder="88008080" />
          <ThisInput label="Регион" value={form.region} onChange={(val) => updateField("region", val)} />
          <ThisInput label="Город" value={form.city} onChange={(val) => updateField("city", val)} required />
          <ThisInput label="Улица" value={form.street} onChange={(val) => updateField("street", val)} required />

          <Map />

          <ThisTextArea label="Примечание" value={form.note} onChange={(val) => updateField("note", val)} placeholder="Например: домофон, подъезд и т.д." />
        </div>
      </div>

      {/* Правая колонка */}
      <div className="flex flex-col basis-[100%] md:basis-[53%]">
        <div className="hidden sm:block">
          {cart.map((item, index) => (
            <CheckoutCartItem key={item.id ?? index} item={item} />
          ))}
        </div>

        <h2 className="ag-h1 text-brand-secondary font-semibold mb-7.5">Заказ</h2>

        <div className="flex flex-col gap-6 mb-0 sm:mb-10">
          <CartOrderItem label={`${cart.length} товара`} value={`${itemsTotal} ₽`} />
          <CartOrderItem label="Доставка" value={`${deliveryPrice} ₽`} />
          <CartOrderItem label="Процент сервиса" value={`${servicePercent} %`} />
          <CartOrderItem label="Итого" value={`${totalPrice} ₽`} />

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
    </div>
  );
}

// ======================= Input / Textarea =======================
type ThisInputProps = { label: string; value: string; placeholder?: string; required?: boolean; name?: string; id?: string; type?: string; onChange: (val: string) => void; };
function ThisInput({ label, value, placeholder, required = false, id, name, type, onChange }: ThisInputProps) {
  return (
    <label className="flex flex-col">
      <span className="text-secondary ag-h7 font-medium mb-3">{label} {required && <span className="text-secondary">*</span>}</span>
      <input
        id={id || ""} name={name || ""} type={type || "text"}
        className="w-full rounded-lg px-2.5 min-h-[45px] placeholder:ag-h8 text-secondary placeholder:text-grayscale-500 border border-[#e5e5e5] focus:border-grayscale-500 outline-none"
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} />
    </label>
  );
}

type ThisTextAreaProps = { label: string; value: string; placeholder?: string; onChange: (val: string) => void; };
function ThisTextArea({ label, value, placeholder, onChange }: ThisTextAreaProps) {
  return (
    <label className="flex flex-col">
      <span className="text-secondary ag-h7 font-medium mb-3">{label}</span>
      <textarea
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full resize-none outline-none border border-[#e5e5e5] rounded-lg px-2.5 py-2 min-h-[153px] text-secondary placeholder:text-grayscale-500 focus:border-grayscale-500 bg-transparent" />
    </label>
  );
}
