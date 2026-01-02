import { Link } from "react-router-dom";

interface MethodStepProps {
  /** Колбек для выбора метода входа */
  onSelect: (step: "emailInput" | "phoneInput") => void;
}

/**
 * Компонент выбора метода входа
 * Предлагает пользователю войти по телефону или по email
 */
export function MethodStep({ onSelect }: MethodStepProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Заголовок */}
      <h1 className="text-3xl font-semibold text-center">
        Войти в личный кабинет
      </h1>

      {/* Кнопка входа по номеру телефона */}
      <button
        className="w-full py-3 bg-black text-white rounded cursor-pointer hover:opacity-90"
        onClick={() => onSelect("phoneInput")}
      >
        По номеру телефона
      </button>

      {/* Кнопка входа по email */}
      <button
        className="w-full py-3 bg-black text-white rounded cursor-pointer hover:opacity-90"
        onClick={() => onSelect("emailInput")}
      >
        По электронной почте
      </button>

      {/* Подпись с ссылкой на политику персональных данных */}
      <p className="text-xs text-gray-600 mt-1">
        при входе даю согласие на{" "}
        <Link className="font-semibold" to="/policy">
          Обработку персональных данных
        </Link>
      </p>
    </div>
  );
}
