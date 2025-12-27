import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
/* =======================
   Типы
======================= */

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}


export interface FiltersValue {
  priceMin: number;
  priceMax: number;
  sizes: string[];
  brands: string[];
  categories: string[];
  conditions: string[];
}

interface FilterProps {
  onApply?: (filters: FiltersValue) => void;
}

/* =======================
   Константы
======================= */

const PRICE_MIN = 1;
const PRICE_MAX = 100000;
const PRICE_STEP = 500;

const sizesList = ["36", "37", "38", "39", "40", "41", "42", "43"];
const brandsList = ["Adidas", "Gucci",  "Puma", "Samsung"];
const categoriesList = ["Сумка", "Футболка", "Кроссовки"];
const conditionsList = ["new", "used"];

/* =======================
   Компонент
======================= */

const Filter: React.FC<FilterProps> = ({ onApply }) => {
  const [price, setPrice] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);

  const [sizes, setSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);

  const [openSections, setOpenSections] = useState({
    price: true,
    sizes: true,
    brands: true,
    categories: true,
    conditions: false,
  });

  // Функция для обработки изменения
  const toggleSize = (value: string) => {
    setSizes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleBrand = (value: string) => {
    setBrands((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleCategory = (value: string) => {
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleCondition = (value: string) => {
    setConditions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const reset = () => {
    setPrice([PRICE_MIN, PRICE_MAX]);
    setSizes([]);
    setBrands([]);
    setCategories([]);
    setConditions([]);
  };

  const apply = () => {
    onApply?.({
      priceMin: price[0],
      priceMax: price[1],
      sizes,
      brands,
      categories,
      conditions,
    });
  };

  /* =======================
     JSX
  ======================= */

  return (
    <div className="w-full mb-60 md:mb-30 lg:mb-60">
      {/* Цена */}
      <section className="mb-6 pb-4 border-b border-grayscale-100">
        <h3 className="font-medium ag-h3 text-brand-secondary mb-3 w-full flex justify-between">
          <span>Цена</span>
          <button
            type="button"
            onClick={() => toggleSection("price")}
            className={`transform transition-transform duration-200 ${
              openSections.price ? "rotate-0" : "rotate-180"
            }`}
          >
            <svg className="w-4 h-4 cursor-pointer">
              <use href="/icons/symbol/sprite.svg#open" />
            </svg>
          </button>
        </h3>
        {openSections.price && (
          <div className="pt-3 flex justify-between text-sm mb-8">
            <span className="border border-black py-2 px-4 text-brand-secondary ag-h6 font-medium">
              от {price[0]} ₽
            </span>
            <span className="border border-black py-2 px-4 text-brand-secondary  ag-h6 font-medium">
              до {price[1]} ₽
            </span>
          </div>
        )}

        <Slider.Root
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={price}
          name="filter-price"
          onValueChange={(value) => setPrice(value as [number, number])}
          className={`relative flex items-center select-none touch-none w-full h-5 ${
            openSections.price ? "" : "hidden"
          }`}
        >
          <Slider.Track className="bg-grayscale-300 relative grow rounded-full h-[2px]">
            <Slider.Range className="absolute bg-grayscale-300 rounded-full h-[2px]" />
          </Slider.Track>

          <Slider.Thumb className="block w-4 h-4  bg-black rounded-full shadow cursor-pointer" />
          <Slider.Thumb className="block w-4 h-4  bg-black rounded-full shadow cursor-pointer" />
        </Slider.Root>
      </section>

      {/* Размер */}
      <section className="mb-5 pb-4 border-b border-grayscale-100">
        <h3 className="font-medium ag-h3 text-brand-secondary leading-1 mb-3 w-full flex justify-between">
          <span>Размер</span>
          <button
            type="button"
            onClick={() => toggleSection("sizes")}
            className={`transform transition-transform duration-200 ${
              openSections.sizes ? "rotate-0" : "rotate-180"
            }`}
          >
            <svg className="w-4 h-4 cursor-pointer">
              <use href="/icons/symbol/sprite.svg#open" />
            </svg>
          </button>
        </h3>

        {openSections.sizes && (
          <div className="grid grid-cols-2 gap-y-3">
            {sizesList.map((s, index) => (
              <div
                key={s}
                className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <Checkbox
                  label={s}
                  checked={sizes.includes(s)}
                  onChange={() => toggleSize(s)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Бренд */}
      <section className="mb-5 pb-4 border-b border-grayscale-100">
        <h3 className="font-medium ag-h3 text-brand-secondary leading-1 mb-3 w-full flex justify-between">
          <span>Бренд</span>
          <button
            type="button"
            onClick={() => toggleSection("brands")}
            className={`transform transition-transform duration-200 ${
              openSections.brands ? "rotate-0" : "rotate-180"
            }`}
          >
            <svg className="w-4 h-4 cursor-pointer">
              <use href="/icons/symbol/sprite.svg#open" />
            </svg>
          </button>
        </h3>

        {openSections.brands && (
          <div className="grid gap-1">
            {brandsList.map((b) => (
              <Checkbox
                key={b}
                label={b}
                checked={brands.includes(b)}
                onChange={() => toggleBrand(b)} // передаем функцию toggle
              />
            ))}
          </div>
        )}
      </section>

      {/* Категория */}
      <section className="mb-5 pb-4 border-b border-grayscale-100">
        <h3 className="font-medium ag-h3 text-brand-secondary leading-1 mb-3 w-full flex justify-between">
          <span>Категория</span>
          <button
            type="button"
            onClick={() => toggleSection("categories")}
            className={`transform transition-transform duration-200 ${
              openSections.categories ? "rotate-0" : "rotate-180"
            }`}
          >
            <svg className="w-4 h-4 cursor-pointer">
              <use href="/icons/symbol/sprite.svg#open" />
            </svg>
          </button>
        </h3>

        {openSections.categories && (
          <div className="grid gap-1">
            {categoriesList.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={categories.includes(c)}
                onChange={() => toggleCategory(c)} // передаем функцию toggle
              />
            ))}
          </div>
        )}
      </section>

      {/* Состояние */}
      <section className="mb-5 pb-4 border-b border-grayscale-100">
        <h3 className="font-medium ag-h3 text-brand-secondary leading-1 mb-3 w-full flex justify-between">
          <span>Состояние</span>
          <button
            type="button"
            onClick={() => toggleSection("conditions")}
            className={`transform transition-transform duration-200 ${
              openSections.conditions ? "rotate-0" : "rotate-180"
            }`}
          >
            <svg className="w-4 h-4 cursor-pointer">
              <use href="/icons/symbol/sprite.svg#open" />
            </svg>
          </button>
        </h3>

        {openSections.conditions && (
          <div className="grid gap-1">
            {conditionsList.map((cond) => (
              <Checkbox
                key={cond}
                label={cond}
                checked={conditions.includes(cond)}
                onChange={() => toggleCondition(cond)} // передаем функцию toggle
              />
            ))}
          </div>
        )}
      </section>

      {/* Кнопки */}
      <div className="flex flex-col gap-4 mt-4 pt-7.5 border-t border-grayscale-100">
        <button
          type="button"
          onClick={reset}
          className="w-full border border-brand-secondary text-center p-4 text-brand-secondary  cursor-pointer hover:opacity-75"
        >
          Сбросить фильтры{" "}
        </button>

        <button
          type="button"
          onClick={apply}
          className="w-full border border-brand-secondary text-center p-4 text-brand-secondary  cursor-pointer hover:opacity-75"
        >
          Применить{" "}
        </button>
      </div>
    </div>
  );
};

export default Filter;



//*********  CHECKBOX  ******** */
const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer select-none">
      {/* Скрытый стандартный чекбокс */}
      <input
       name={'checkbox-'+label}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      
      {/* Кастомный квадратик */}
      <span
        className="
          w-4.5 h-4.5 border border-black 
          flex items-center justify-center
          transition
          peer-checked:bg-black
          peer-checked:border-black
        "
      >        
      </span>

      {/* Лейбл с текстом */}
      <span className="text-brand-secondary font-regular text-lg">{label}</span>
    </label>
  );
};