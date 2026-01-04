import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_DATA } from "@/mocks/products.mock";
import { USERS_DATA } from "@/mocks/users.mocks";
import { type CartItemType } from "./types";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { type FormFields } from "./CheckoutForm";

const DELIVERY_PRICE = 600;
const SERVICE_PERCENT = 2;

export function CheckoutStart() {
  const navigate = useNavigate();

  // ================== Стейты ==================
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [promo, setPromo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string>("");

  const [form, setForm] = useState<FormFields>({
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
    if (!savedData) return;
    try {
      const { items, promo, deliveryId, form: savedForm } = JSON.parse(savedData);
      setCartIds(items || []);
      setPromo(promo || null);
      if (deliveryId) setSelectedDelivery(deliveryId);
      if (savedForm) setForm(savedForm);
    } catch (err) {
      console.error("Ошибка при чтении данных из localStorage", err);
      setCartIds([]);
      setPromo(null);
    }
  }, []);

  // ================== Формируем актуальные товары с продавцами ==================
  const cart = useMemo<CartItemType[]>(() => {
    return cartIds
      .map((id) => {
        const product = PRODUCTS_DATA.find((p) => p.id === id);
        if (!product) return null;

        const seller = product.sellerId
          ? USERS_DATA.find((u) => u.id === product.sellerId)
          : undefined;

        return { ...product, seller };
      })
      .filter(Boolean) as CartItemType[];
  }, [cartIds]);

  // ================== Цены ==================
  const itemsTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);
  const serviceAmount = (itemsTotal * SERVICE_PERCENT) / 100;
  const totalPrice = itemsTotal + DELIVERY_PRICE + serviceAmount;

  // ================== Работа с формой ==================
  const updateField = (field: keyof FormFields, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const requiredFields: (keyof typeof form)[] = ["lastName", "firstName", "city", "street"];
  const isFormValid = requiredFields.every((f) => form[f].trim() !== "");

  // ================== Отправка к CheckoutFinish ==================
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Сохраняем полностью все данные в localStorage
      localStorage.setItem(
        "cartDraft",
        JSON.stringify({
          items: cartIds,
          promo,
          deliveryId: selectedDelivery,
          form,
          servicePercent: SERVICE_PERCENT,
        })
      );

      // Переход к следующему этапу через useNavigate
      navigate("/checkout/finish");
    } catch (err) {
      console.error(err);
      setError("Произошла ошибка при создании заказа");
    } finally {
      setLoading(false);
    }
  };

  // ================== Рендер ==================
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-x-20 xl:gap-x-37.5 xl:pl-15 xl:pt-15 mb-45 md:mb-52">
      {/* Левая колонка: форма и выбор доставки */}
      <CheckoutForm
        form={form}
        updateField={updateField}
        selectedDelivery={selectedDelivery}
        setSelectedDelivery={setSelectedDelivery}
      />

      {/* Правая колонка: товары и итог */}
      <CheckoutSummary
        cart={cart}
        itemsTotal={itemsTotal}
        deliveryPrice={DELIVERY_PRICE}
        servicePercent={SERVICE_PERCENT}
        totalPrice={totalPrice}
        isFormValid={isFormValid}
        loading={loading}
        handleSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
}
