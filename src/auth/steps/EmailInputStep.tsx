import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  email: string;
  setEmail: (v: string) => void;
  onNext: () => void;
}

// Регулярка для базовой email-валидации
const EMAIL_REGEXP =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function EmailInputStep({ email, setEmail, onNext }: Props) {
  // Текст ошибки валидации
  const [error, setError] = useState("");

  // Проверка email и переход дальше
  const handleNext = () => {
    if (!EMAIL_REGEXP.test(email.trim())) {
      setError("некорректный формат");
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
  }, [email]);

  return (
    <div className="flex flex-col w-full max-w-[394px]  sm:pt-10">
      {/* Заголовок */}
      <h2 className="ag-w22 lg:ag-w4 font-semibold text-center text-secondary mb-4 sm:mb-5">
        Введите адрес электронной почты
      </h2>

      {/* Подсказка */}
      <p className="ag-h4 sm:ag-h3 text-secondary text-center mb-6 sm:mb-12">
        Отправим код из 4 цифр на почту
      </p>

      {/* Поле ввода email */}
      <div className="w-full relative mb-8 sm:mb-16">
        <input
          type="email"
          value={email}
          name={`auth-email-1`}
          autoComplete="email"
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(""); // сбрасываем ошибку при вводе
          }}
          className={`w-full py-1 ag-h4 border-b focus:outline-none ${
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

      {/* Кнопка подтверждения */}
      <button
        className="w-full min-h-[48px] sm:min-h-[55px] flex cursor-pointer items-center justify-center ag-h7 sm:ag-h6 font-medium bg-black text-white hover:opacity-90"
        onClick={handleNext}
      >
        Получить код
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
