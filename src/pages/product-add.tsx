import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Listbox } from "@headlessui/react";
import { useNavigate } from "react-router";
import { ThisInput } from "@/ui/this-input";

import { CATEGORIES_DATA, type CategoryData } from "@/mocks/categories.mock";

/* =========================
   types
========================= */
type AddProductForm = {
  gender: string;
  category: CategoryData | null;
  brand: string;
  model: string;
  size: string;
  color: string;
  description: string;
  condition: string;
  price: string;
  city: string;
};

// type CategoryOption = { id: string; label: string };

/* =========================
   SVG компоненты
========================= */
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${
      open ? "rotate-180" : "rotate-0"
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export function ProductAdd() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // <- вот это "назад"
  };

  /* =========================
     state
  ========================== */
  const [form, setForm] = useState<AddProductForm>({
    gender: "male",
    category: null,
    brand: "",
    model: "",
    size: "",
    color: "",
    description: "",
    condition: "new",
    price: "",
    city: "",
  });

  const [images, setImages] = useState<File[]>([]);

  /* =========================
     helpers
  ========================== */
  const updateField = <K extends keyof AddProductForm>(
    key: K,
    value: AddProductForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* =========================
     image uploader
  ========================== */
  const MAX_IMAGES = 9;

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: MAX_IMAGES,
    onDrop: (acceptedFiles) => {
      setImages((prev) => [...prev, ...acceptedFiles].slice(0, MAX_IMAGES));
    },
  });

  // Удалить изображение
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  /* =========================
     submit
  ========================== */
  const handleSubmit = () => {
    const data = new FormData();

    if (form.category) {
      data.append("categoryId", String(form.category.id));
    }

    data.append("gender", form.gender);
    data.append("brand", form.brand);
    data.append("model", form.model);
    data.append("size", form.size);
    data.append("color", form.color);
    data.append("description", form.description);
    data.append("condition", form.condition);
    data.append("price", form.price);
    data.append("city", form.city);

    images.forEach((file) => {
      data.append("images", file);
    });

    // DEBUG
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }
  };

  /* =========================
   Валидация
========================= */
  const isFormValid = (): boolean => {
    return (
      form.gender !== "" &&
      form.category !== null &&
      form.brand.trim() !== "" &&
      form.model.trim() !== "" &&
      form.size.trim() !== "" &&
      form.color.trim() !== "" &&
      form.description.trim() !== "" &&
      form.condition !== "" &&
      form.price.trim() !== "" &&
      form.city.trim() !== ""
    );
  };

  /* =========================
     render
  ========================== */
  return (
    <div className="flex flex-col gap-12 p-0 pl-0 sm:pr-12.5 sm:pt-10 lg:pl-15 lg:pr-50 mb-30 lg:mb-50">
      {/* ================= Пол и категория ================= */}
      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-secondary ag-h1 font-semibold">Пол и категория</h2>
        <p className="text-grayscale-300 ag-h6 font-medium mb-2">
          Выберите, для кого предназначен товар
        </p>

        {/* ===== Пол ===== */}
        <div className="flex flex-col gap-2">
          {[
            { value: "male", label: "Мужское" },
            { value: "female", label: "Женское" },
            { value: "unisex", label: "Унисекс" },
          ].map((g) => (
            <label key={g.value} className="flex items-center gap-3">
              <input
                type="radio"
                name="gender"
                className="hidden peer"
                checked={form.gender === g.value}
                onChange={() => updateField("gender", g.value)}
              />
              <span className="w-4 h-4 border peer-checked:bg-black" />
              <span>{g.label}</span>
            </label>
          ))}
        </div>

        {/* category */}
        <label className="flex flex-col gap-1">
          <Listbox
            value={form.category}
            onChange={(category) => updateField("category", category)}
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button
                  className={`w-full flex justify-between items-center border border-[#e5e5e5] px-3 py-2 bg-white
    ${open ? "rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none" : "rounded-lg"}
  `}
                >
                  <span
                    className={`ag-h6 font-medium ${
                      form.category?.title
                        ? "text-grayscale-825"
                        : "text-gray-400"
                    }`}
                  >
                    {form.category?.title ?? "Выберите категорию"}
                  </span>

                  <ChevronDown open={open} />
                </Listbox.Button>

                <Listbox.Options className="absolute w-full border-[#e5e5e5] border rounded-bl-lg rounded-br-lg bg-white z-10 focus:border-[#e5e5e5]  outline-none shadow-md">
                  {CATEGORIES_DATA.map((category) => (
                    <Listbox.Option
                      key={category.id}
                      value={category}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-1.5 flex justify-between m-1 rounded-lg ${
                          active ? "bg-gray-100" : ""
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className="ag-h8 text-grayscale-825">
                            {category.title}
                          </span>
                          {selected && (
                            <svg className="h-5 w-5 shrink-0">
                              <use href="/icons/symbol/sprite.svg#done" />
                            </svg>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </label>
      </section>

      {/* ================= Бренд ================= */}
      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-secondary ag-h1 font-semibold">Бренд</h2>

        <p className="text-grayscale-300 ag-h6 font-medium mb-3">
          Укажите бренд товара
        </p>

        <ThisInput
          label="Бренд"
          value={form.brand}
          onChange={(val) => updateField("brand", val)}
          placeholder="Например: Nike, Adidas, Supreme"
        />

        <ThisInput
          label="Модель"
          value={form.model}
          onChange={(val) => updateField("model", val)}
          placeholder="Например: Air Jordan"
        />
      </section>

      {/* ================= Фото ================= */}
      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-secondary ag-h1 font-semibold">Фотографии</h2>

        <p className="text-grayscale-300 ag-h6 font-medium mb-10">
          Загрузите от трех до девяти фотографий товара
        </p>

        <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-10">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl bg-grayscale-100 overflow-hidden"
            >
              <img
                src={URL.createObjectURL(img)}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0.5 right-0.5 sm:top-2 sm:right-2 text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:opacity-80"
              >
                {/* red button svg */}
                <svg className="h-5 w-5 sm:h-7 sm:w-7 shrink-0">
                  <use href="/icons/symbol/sprite.svg#close_red" />
                </svg>
              </button>
            </div>
          ))}

          {images.length < MAX_IMAGES && (
            <div
              {...getRootProps()}
              className="flex flex-col gap-3 aspect-square border border-solid border-grayscale-500 rounded-xl bg-grayscale-100 flex items-center justify-center cursor-pointer hover:bg-grayscale-300"
            >
              <input {...getInputProps()} />
              <svg className="h-[25%] w-[25%] shrink-0">
                <use href="/icons/symbol/sprite.svg#img" />
              </svg>
              <span className="text-secondary font-medium ag-h10 sm:ag-h6">
                Загрузить
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ================= Размер и цвет ================= */}
      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-2xl font-semibold">Размер и цвет</h2>
        <p className="text-grayscale-300 ag-h6 font-medium mb-3">
          Укажите характеристики товара
        </p>

        <ThisInput
          label="Размер"
          value={form.size}
          onChange={(val) => updateField("size", val)}
          placeholder="Например: 43, M, L"
        />

        <ThisInput
          label="Цвет"
          value={form.color}
          onChange={(val) => updateField("color", val)}
          placeholder="Например: черный, белый, желтый"
        />
      </section>

      {/* ================= Описание ================= */}
      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-2xl font-semibold">Описание</h2>
        <p className="text-grayscale-300 ag-h6 font-medium mb-3">
          Расскажите о товаре подробнее
        </p>

        <label className="flex flex-col gap-1">
          <span className="text-secondary ag-h7 font-medium mb-3">
            Описание
          </span>
          <textarea
            className="w-full py-2.5 rounded-lg px-2.5 min-h-[183px] placeholder:ag-h8 text-secondary placeholder:text-grayscale-500 border border-[#e5e5e5] focus:border-grayscale-500 outline-none resize-none"
            placeholder="Опишите состояние, дефекты, особенности"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </label>
      </section>

      {/* ================= Состояние и цена ================= */}
      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-2xl font-semibold">Состояние и цена</h2>
        <p className="text-grayscale-300 ag-h6 font-medium mb-3">
          Укажите состояние товара и желаемую цену
        </p>

        <div className="flex flex-col gap-2 mb-2">
          {[
            { value: "new", label: "Новое" },
            { value: "used", label: "Б/У" },
          ].map((c) => (
            <label key={c.value} className="flex items-center gap-3">
              {/* Радио-квадратик */}
              <input
                type="radio"
                className="peer hidden"
                name="condition"
                checked={form.condition === c.value}
                onChange={() =>
                  updateField("condition", c.value as "new" | "used")
                }
              />

              <span className="w-4 h-4 border border-[#d3d3d3] flex-shrink-0 peer-checked:border-black peer-checked:bg-black transition-colors"></span>

              {/* пол */}
              <span className="ag-h6 font-medium text-secondary">
                {c.label}
              </span>
            </label>
          ))}
        </div>

        <ThisInput
          label="Цена"
          value={form.price}
          onChange={(val) => updateField("price", val)}
          placeholder="25000 ₽"
        />
      </section>

      {/* ================= Адрес ================= */}
      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-2xl font-semibold">Адрес отправки</h2>
        <p className="text-grayscale-300 ag-h6 font-medium mb-3">
          Откуда будете отправлять товар
        </p>

        <ThisInput
          label="Город"
          value={form.city}
          onChange={(val) => updateField("city", val)}
          placeholder="Москва"
        />
      </section>

      {/* ================= Кнопки ================= */}
      <div className="flex flex-col gap-1">       
        <div className="flex-wrap sm:flex-nowrap flex gap-5 sm:gap-7.5">
          {/* разместить */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`min-h-13 sm:max-w-[307px] w-full bg-secondary inline-flex items-center justify-center no-underline cursor-pointer 
    ${!isFormValid() ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}
  `}
          >
            <span className="text-grayscale-white whitespace-nowrap">
              Разместить объявление
            </span>
          </button>
          {/* назад */}
          <button
            onClick={goBack}
            className="min-h-13 sm:max-w-[122px] w-full border border-grayscale-300 inline-flex items-center justify-center hover:opacity-80 cursor-pointer "
          >
            <span className="text-grayscale-700 whitespace-nowrap">Назад</span>
          </button>
        </div>
         {!isFormValid() && (
          <span className="text-red-500 ag-h6">Заполните все поля</span>
        )}
      </div>
    </div>
  );
}
