import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { ThisInput } from "@/ui/this-input";
import { type ProfileContext } from "@/pages/profile/profileLayout";

import { BirthDatePicker } from "@/components/profile/birthday-day-picker";

/* =========================
   types
========================= */
export type ProfileFormState = {
  firstName: string;
  birthDate: string;
  gender: "male" | "female";
  phone: string;
  email: string;

  // address
  addressFirstName: string;
  lastName: string;
  middleName: string;
  region: string;
  city: string;
  street: string;
  house: string;
};

export type PhotoItem = {
  id: string;
  src: string;
  isNew: boolean;
};

/* =========================
   Component: ProfileTabProfile
   Основная форма профиля пользователя
========================= */
export function ProfileTabProfile() {
  // Получаем форму и состояние фоток из лояута через OutletContext
  const { form, photos, setForm } = useOutletContext<ProfileContext>();

  // Локальный state для имитации сохранения
  const [isSaving, setIsSaving] = useState(false);

  /* =========================
     Helper: обновление поля формы
  ========================== */
  const updateField = <K extends keyof ProfileFormState>(
    key: K,
    value: ProfileFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* =========================
     Handler: сохранение данных
     - включает состояние isSaving
     - собирает payload с формой и фотками
     - имитация отправки на сервер через setTimeout
  ========================== */
  const handleSave = () => {
    setIsSaving(true);

    const payload = {
      ...form, // все поля формы
      images: photos, // добавляем фотки из Header
    };

    console.log("Сохраняем данные:", payload);

    setTimeout(() => {
      setIsSaving(false);
      console.log("Сохранение завершено!");
    }, 1000);
  };

  /* =========================
     Render: JSX
     - адаптивные колонки через flex и Tailwind breakpoints
     - для мобильных все поля занимают full-width (flex-1 + w-full)
  ========================== */
  return (
    <div className="flex flex-col max-w-165 gap-15 m-auto pt-10">
      {/* ===== Личная информация ===== */}
      <section className="flex flex-col gap-10">
        <h2 className="text-secondary ag-h3 text-center">Личная информация</h2>

        {/* Имя + Дата рождения */}
        <div className="flex flex-col sm:flex-row gap-6">
          <ThisInput
            label="Имя"
            value={form.firstName}
            required
            onChange={(val) => updateField("firstName", val)}
            className="flex-1 w-full"
            top="0.4"
          />

          <BirthDatePicker
            value={form.birthDate}
            onChange={(val: string) => updateField("birthDate", val)}
          />         
        </div>

        {/* Пол */}
        <div className="flex flex-row gap-10 items-start sm:items-center -mt-3 -mb-2">
          {[
            { value: "male", label: "Мужчина" },
            { value: "female", label: "Женщина" },
          ].map((g) => (
            <label key={g.value} className="flex gap-4 items-center">
              <input
                type="radio"
                name="gender"
                className="peer hidden"
                checked={form.gender === g.value}
                onChange={() =>
                  updateField("gender", g.value as "male" | "female")
                }
              />
              <span className="w-6 h-6 border-[2px] border-secondary flex-shrink-0 peer-checked:border-black peer-checked:bg-black transition-colors" />
              <span className="ag-h4 text-secondary">{g.label}</span>
            </label>
          ))}
        </div>

        {/* Телефон + Email */}
        <div className="flex flex-col sm:flex-row gap-6">
          <ThisInput
            label="Телефон"
            value={form.phone}
            onChange={(val) => updateField("phone", val)}
            className="flex-1 w-full"
            top="0.4"
          />
          <ThisInput
            label="E-mail"
            value={form.email}
            onChange={(val) => updateField("email", val)}
            className="flex-1 w-full"
            top="0.4"
          />
        </div>
      </section>

      {/* ===== Мои адреса ===== */}
      <section className="flex flex-col gap-8">
        <h2 className="text-secondary ag-h3 text-center mb-4">Мои адреса</h2>

        {/* Фамилия */}
        <ThisInput
          label="Фамилия"
          value={form.lastName}
          required
          onChange={(val) => updateField("lastName", val)}
          top="0.4"
          className="w-full"
        />

        {/* Имя + Отчество */}
        <div className="flex flex-col sm:flex-row gap-6">
          <ThisInput
            label="Имя"
            value={form.addressFirstName}
            required
            onChange={(val) => updateField("addressFirstName", val)}
            className="flex-1 w-full"
            top="0.4"
          />
          <ThisInput
            label="Отчество"
            value={form.middleName}
            onChange={(val) => updateField("middleName", val)}
            className="flex-1 w-full"
            top="0.4"
          />
        </div>

        {/* Регион + Город */}
        <div className="flex flex-col sm:flex-row gap-6">
          <ThisInput
            label="Регион"
            value={form.region}
            onChange={(val) => updateField("region", val)}
            className="flex-1 w-full"
            top="0.4"
          />
          <ThisInput
            label="Город"
            value={form.city}
            required
            onChange={(val) => updateField("city", val)}
            className="flex-1 w-full"
            top="0.4"
          />
        </div>

        {/* Улица + Дом / Квартира */}
        <div className="flex flex-col sm:flex-row gap-6">
          <ThisInput
            label="Улица"
            value={form.street}
            required
            onChange={(val) => updateField("street", val)}
            className="flex-1 w-full"
            top="0.4"
          />
          <div className="flex gap-2 flex-1 w-full">
            <ThisInput
              label="Дом и квартира"
              value={form.house}
              required
              onChange={(val) => updateField("house", val)}
              className="flex-1 w-full"
              top="0.4"
            />
          </div>
        </div>

        {/* Кнопка сохранить */}
        <div className="flex justify-center mt-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center px-7.5 py-3 bg-secondary min-h-[56px] hover:opacity-90 cursor-pointer"
          >
            <span className="text-grayscale-white font-medium ag-h6">
              {isSaving ? "Сохраняется..." : "Сохранить"}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
