import { PatternFormat } from "react-number-format";
import { useState } from "react";

interface Props {
  phone: string;
  setPhone: (v: string) => void;
  onNext: () => void;
}

/**
 * Шаг ввода номера телефона
 * Форматирует номер и проверяет длину перед переходом дальше
 */
export function PhoneInputStep({ phone, setPhone, onNext }: Props) {
  /** Текст ошибки при некорректном номере */
  const [error, setError] = useState("");

  /**
   * Проверка номера телефона и переход к следующему шагу
   */
  const handleNext = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 11) {
      setError("Введите корректный номер");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Заголовок */}
      <h1 className="text-3xl font-semibold">Введите номер телефона</h1>

      {/* Подсказка */}
      <p className="text-sm text-gray-500">
        Отправим код из 4 цифр в SMS
      </p>

      {/* Инпут с маской для номера телефона */}
      <PatternFormat
        format="+7 ###-##-##-###"       // Маска номера
        mask="_"                        // Символ для пустых мест
        value={phone}                   // Текущее значение
        onValueChange={(values) => setPhone(values.formattedValue)} // Обновление
        placeholder="+7 ___-___-__-__"
        className={`w-full p-3 border rounded focus:outline-none
                   caret-transparent ${error ? "border-red-500" : "border-gray-300"}`}/>

      {/* Сообщение об ошибке */}
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Кнопка перехода к следующему шагу */}
      <button
        className="w-full py-3 bg-black text-white rounded cursor-pointer hover:opacity-90"
        onClick={handleNext}
      >
        Получить код
      </button>

      {/* Подпись о согласии на обработку персональных данных */}
      <p className="text-xs text-gray-600 mt-1">
        Нажимая на кнопку «Получить код», я даю согласие на обработку своих
        персональных данных
      </p>
    </div>
  );
}
