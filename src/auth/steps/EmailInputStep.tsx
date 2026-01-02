import { useState } from "react";

interface Props {
  email: string;
  setEmail: (v: string) => void;
  onNext: () => void;
}

export function EmailInputStep({ email, setEmail, onNext }: Props) {
  /** Текст ошибки валидации email */
  const [error, setError] = useState("");

  /**
   * Проверка email и переход к следующему шагу
   */
  const handleNext = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Некорректный формат");
      return;
    }

    setError("");
    onNext();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold">
        Введите адрес электронной почты
      </h1>

      <p className="text-sm text-gray-500">
        Отправим код из 4 цифр на почту
      </p>

      {/* Поле ввода email */}
      <input
        type="email"
        value={email}
        autoComplete="on"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ваш email"
        className={`w-full p-3 border rounded focus:outline-none focus:border-grayscale-700 
          ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {/* Сообщение об ошибке */}
      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        className="w-full py-3 bg-black text-white rounded cursor-pointer hover:opacity-90"
        onClick={handleNext}
      >
        Получить код
      </button>

      <p className="text-xs text-gray-600 text-center mt-2">
        нажимая на кнопку «Получить код», я даю согласие на обработку своих
        персональных данных в соответствии с политикой обработки персональных
        данных
      </p>
    </div>
  );
}
