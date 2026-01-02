import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { Link } from "react-router-dom";

interface Props {
  email: string;
  code: string;
  setCode: (v: string) => void;
  onConfirm: () => Promise<void>; // серверная проверка
  onResend: () => void;
  onHelp: () => void;
}

export function EmailConfirmStep({
  email,
  code,
  setCode,
  onConfirm,
  onResend,
  onHelp,
}: Props) {
  // Ошибка неверного кода
  const [error, setError] = useState(false);

  // Индекс активного input (0–3), 4 = все заполнены
  const [activeIndex, setActiveIndex] = useState(0);

  // Ссылки на input'ы для фокуса
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Автофокус на активный input
  useEffect(() => {
    if (activeIndex < 4) inputRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  // Подтверждение кода
  const handleConfirm = async () => {
    if (code.length < 4) return; // проверяем, что заполнены 4 цифры

    try {
      await onConfirm(); // доверяем серверу
      setError(false); // сервер принял код
    } catch {
      // если код неверный
      setError(true);
      setCode("");
      setActiveIndex(0);
    }
  };

  // Глобальная обработка Enter / Space
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleConfirm();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [code]);

  // Изменение input
  const handleChange = (val: string, index: number) => {
    if (!/^\d?$/.test(val)) return; // только одна цифра

    const newCode = code.substring(0, index) + val + code.substring(index + 1);
    setCode(newCode);

    if (error) setError(false); // сброс ошибки

    // переход на следующий input
    if (val && index < 3) setActiveIndex(index + 1);
    else if (val && index === 3) setActiveIndex(4); // последний input
  };

  // Обработка клавиш
  const handleKeyDown = (
    e: ReactKeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const codeArr = code.split("").slice(0, 4);

    if (e.key === "Backspace") {
      e.preventDefault();
      if (codeArr[index]) {
        // очищаем текущее поле
        codeArr[index] = "";
        setCode(codeArr.join(""));
        setActiveIndex(index);
      } else if (index > 0) {
        // идем на предыдущий и очищаем
        codeArr[index - 1] = "";
        setCode(codeArr.join(""));
        setActiveIndex(index - 1);
      }
    } else if (e.key === "Delete") {
      e.preventDefault();
      codeArr[index] = "";
      setCode(codeArr.join(""));
      setActiveIndex(index);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) setActiveIndex(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < 3) setActiveIndex(index + 1);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[378px]">
      {/* Заголовок */}
      <h2 className="mt-5 sm:mt-0 ag-w22 lg:ag-w3 max-w-[358px] mx-auto font-semibold text-center text-secondary mb-5">
        Подтвердите адрес электронной почты
      </h2>

      {/* Email */}
      <p className="ag-h2 text-secondary text-center mb-5">{email}</p>

      {/* Подсказка */}
      <p className="ag-h3 text-grayscale-700 text-center mb-4">
        Введите код из письма
      </p>

      {/* OTP-инпуты */}
      <div className="flex gap-7.5 justify-center mt-2">
        {[0, 1, 2, 3].map((i) => {
          const isActive = i === activeIndex && activeIndex < 4;
          return (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              maxLength={1}
              name={`auth-code-${i}`}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={code[i] || ""}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`ag-w10 sm:ag-w11 w-[50px] h-[50px] sm:w-[69px] sm:h-[69px] border border-solid text-center
                ${
                  error
                    ? "border-red-500 bg-white text-black"
                    : isActive
                    ? "border-black bg-white text-black"
                    : "border-black bg-black text-white"
                } focus:outline-none selection:bg-transparent`}
              onFocus={() => setActiveIndex(i)}
              onClick={(e) => e.currentTarget.select()}
            />
          );
        })}
      </div>

      {/* Ошибка */}
      {error && (
        <p className="text-red-500 text-center mt-3 ag-h4">Неверный код</p>
      )}

      {/* Повторная отправка */}
      <button
        className="ag-h4 text-grayscale-700 mt-4 mb-3 mx-auto inline-block cursor-pointer text-center hover:text-secondary "
        onClick={onResend}
      >
        <span>Запросить код повторно</span>
      </button>

      {/* Помощь */}
      <button
        className="ag-h4 text-secondary mt-3 mb-6 mx-auto inline-block cursor-pointer text-center hover:text-grayscale-700 "
        onClick={onHelp}
      >
        Не приходит письмо?
      </button>

      {/* Подтвердить */}
      <button
        className="w-full py-3 bg-black text-white rounded mt-2 cursor-pointer hover:opacity-90"
        onClick={handleConfirm}
      >
        подтвердить почту
      </button>

      {/* Политика */}
      <p className="max-w-[392px] ag-n1 text-grayscale-700 mt-3 tracking-[0.08em] text-center">
        подтверждая адрес электронной почты, я согласен с
        <Link className="font-semibold hover:text-secondary" to="/policy">
          политикой обработки персональных данных
        </Link>
      </p>
    </div>
  );
}
