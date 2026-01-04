import { useEffect } from "react";
import { DELIVERY_DATA, type DeliveryOption } from "@/mocks/delivery.mock";
import Map from "@/ui/map";
import { Radio } from "@/ui/radio";

export type FormFields = {
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  region: string;
  city: string;
  street: string;
  note: string;
};

export type CheckoutFormProps = {
  form: FormFields;
  updateField: (field: keyof FormFields, value: string) => void; // <-- вот так!
  selectedDelivery: string;
  setSelectedDelivery: (id: string) => void;
};

export function CheckoutForm({
  form,
  updateField,
  selectedDelivery,
  setSelectedDelivery,
}: CheckoutFormProps) {
  
  // ===================== Если ничего не выбрано — выбрать первый метод =====================
  useEffect(() => {
    if (!selectedDelivery) {
      const firstEnabled = DELIVERY_DATA.find((o) => o.enabled);
      if (firstEnabled) setSelectedDelivery(firstEnabled.id);
    }
  }, [selectedDelivery, setSelectedDelivery]);

  return (
    <div className="flex flex-col basis-[100%] md:basis-[47%] gap-15">
      {/* Выбор способа доставки */}
      <div className="flex flex-col gap-4">
        <h2 className="text-secondary ag-h2 sm:ag-h1 font-semibold mb-2 pt-5 sm:pt-0">
          Укажите способ доставки
        </h2>

        {DELIVERY_DATA.filter((o) => o.enabled).map(
          (option: DeliveryOption) => (
            <div
              key={option.id}
              className="flex justify-between items-center border-b border-grayscale-300 py-3"
            >
              <Radio
                name="delivery"
                label={option.method}
                value={option.id}
                checked={selectedDelivery === option.id}
                onChange={() => setSelectedDelivery(option.id)}
              />

              {option.image && (
                <img
                  src={option.image}
                  alt={option.method}
                  className="w-auto h-full max-h-10 block"
                />
              )}
            </div>
          )
        )}
      </div>

      {/* Форма оформления заказа */}
      <div className="flex flex-col gap-7 mb-15 xl:mb-0">
        <h2 className="text-secondary ag-h2 sm:ag-h1 font-semibold mb-4">
          Оформление заказа
        </h2>

        <ThisInput
          label="Фамилия"
          value={form.lastName}
          onChange={(val) => updateField("lastName", val)}
          placeholder="Иванов"
          required
        />

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ThisInput
            label="Имя"
            value={form.firstName}
            onChange={(val) => updateField("firstName", val)}
            placeholder="Иван"
            required
          />
          <ThisInput
            label="Отчество"
            value={form.middleName}
            onChange={(val) => updateField("middleName", val)}
            placeholder="Иванович"
          />
        </div>

        <ThisInput
          label="Номер телефона"
          value={form.phone}
          onChange={(val) => updateField("phone", val)}
          placeholder="88008080"
        />
        <ThisInput
          label="Регион"
          value={form.region}
          onChange={(val) => updateField("region", val)}
        />
        <ThisInput
          label="Город"
          value={form.city}
          onChange={(val) => updateField("city", val)}
          required
        />
        <ThisInput
          label="Улица"
          value={form.street}
          onChange={(val) => updateField("street", val)}
          required
        />

        <Map />

        <ThisTextArea
          label="Примечание"
          value={form.note}
          onChange={(val) => updateField("note", val)}
          placeholder="Например: домофон, подъезд и т.д."
        />
      </div>
    </div>
  );
}

// ======================= Input / Textarea =======================
type ThisInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (val: string) => void;
};

function ThisInput({
  label,
  value,
  placeholder,
  required = false,
  onChange,
}: ThisInputProps) {
  return (
    <label className="flex flex-col">
      <span className="text-secondary ag-h7 font-medium mb-3">
        {label} {required && <span className="text-secondary">*</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg px-2.5 min-h-[45px] placeholder:ag-h8 text-secondary placeholder:text-grayscale-500 border border-[#e5e5e5] focus:border-grayscale-500 outline-none"
      />
    </label>
  );
}

type ThisTextAreaProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
};

function ThisTextArea({
  label,
  value,
  placeholder,
  onChange,
}: ThisTextAreaProps) {
  return (
    <label className="flex flex-col">
      <span className="text-secondary ag-h7 font-medium mb-3">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-none outline-none border border-[#e5e5e5] rounded-lg px-2.5 py-2 min-h-[153px] text-secondary placeholder:text-grayscale-500 focus:border-grayscale-500 bg-transparent"
      />
    </label>
  );
}
