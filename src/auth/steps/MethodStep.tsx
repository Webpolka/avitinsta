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
    <>
      <div className="flex flex-col gap-8 sm:gap-10 max-w-[392px] ">
        {/* Заголовок */}
        <h2 className="ag-w22 sm:ag-w4 font-semibold text-center text-secondary mb-2 sm:mb-5">
          Войти в личный кабинет
        </h2>

        {/* Кнопка входа по номеру телефона */}
        <button
          className="w-full min-h-[48px] sm:min-h-[55px] flex items-center justify-center ag-h7 sm:ag-h6 font-medium bg-black text-white cursor-pointer hover:opacity-90"
          onClick={() => onSelect("phoneInput")}
        >
          По номеру телефона
        </button>

        {/* Кнопка входа по email */}
        <button
          className=" w-full min-h-[48px] sm:min-h-[55px] flex items-center justify-center ag-h7 sm:ag-h6 font-medium bg-black text-white cursor-pointer hover:opacity-90"
          onClick={() => onSelect("emailInput")}
        >
          По электронной почте
        </button>
      </div>
      {/* Подпись с ссылкой на политику персональных данных */}
      <p className="max-w-[392px] w-full ag-n1 text-grayscale-700 mt-3 tracking-[0.08em] text-center">
        при входе даю согласие на{" "}
        <Link className="font-semibold hover:text-secondary" to="/policy">
          Обработку персональных данных
        </Link>
      </p>
    </>
  );
}
