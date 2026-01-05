import { PatternFormat } from "react-number-format";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  phone: string;
  setPhone: (v: string) => void;
  onNext: () => void;
}

/**
 * Шаг ввода номера телефона
 * Форматирование + базовая валидация
 */
export function PhoneInputStep({ phone, setPhone, onNext }: Props) {
  // Текст ошибки валидации
  const [error, setError] = useState("");

  // Ref для автофокуса на input
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Автофокус при открытии шага
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Проверка номера и переход дальше
  const handleNext = () => {
    const digits = phone.replace(/\D/g, "");

    // Проверяем количество цифр
    if (digits.length !== 10) {
      setError("введите корректный номер");
      return;
    }

    setError("");
    onNext();
  };

  // Отправка по Enter / Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phone]);

  return (
    <div className="flex flex-col max-w-[392px]  sm:pt-10">
      {/* Заголовок */}
      <h2 className="ag-w22 sm:ag-w4 font-semibold text-center text-secondary mb-4 sm:mb-5">
        Введите номер телефона
      </h2>

      {/* Подсказка */}
      <p className="ag-h4 sm:ag-h3 text-secondary text-center mb-4 sm:mb-11">
        Отправим код из 4 цифр в SMS
      </p>

      {/*  Инпут номера с маской */}
      <div className="relative flex gap-4 mb-10 sm:mb-17">
        {/* Код страны */}
        <span
          className={`inline-block py-1 ag-h1 sm:ag-h4 border-b ${
            error ? "border-red-500" : "border-secondary"
          }`}
        >
          +7
        </span>

        <div className="w-full">
          <PatternFormat
            // Пробрасываем ref для автофокуса
            getInputRef={inputRef}
            format="###-##-##-###"
            mask="_"
            type="tel"
            name={`auth-phone-1`}
            value={phone}
            onValueChange={(values) => {
              setPhone(values.formattedValue);

              // Сбрасываем ошибку при полном вводе
              const digits = values.formattedValue.replace(/\D/g, "");
              if (digits.length === 10) {
                setError("");
              }
            }}
            placeholder="___-___-__-__"
            className={`w-full py-1 ag-h1 sm:ag-h4 border-b focus:outline-none ${
              error ? "border-red-500" : "border-secondary"
            }`}
          />

          {/* Ошибка */}
          {error && (
            <p className="absolute w-full -bottom-8 left-0 ag-h4 text-center text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Кнопка подтверждения */}
      <button
        className="w-full min-h-[48px] sm:min-h-[55px] flex cursor-pointer items-center justify-center ag-h7 sm:ag-h6 font-medium bg-black text-white hover:opacity-90"
        onClick={handleNext}
      >
        получить код
      </button>

      {/* Политика персональных данных */}
      <p className="max-w-[392px] ag-n1 text-grayscale-700 mt-3 tracking-[0.08em] text-center">
        нажимая на кнопку «Получить код», я даю согласие на обработку своих
        персональных данных в соответствии с{" "}
        <Link className="font-semibold hover:text-secondary" to="/policy">
          политикой обработки персональных данных
        </Link>
      </p>
    </div>
  );
}
