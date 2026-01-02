import {
  useEffect,
  useState,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Link } from "react-router-dom";

interface Props {
  phone: string;
  code: string;
  setCode: (v: string) => void;
  onConfirm: () => Promise<void>; // серверная проверка
  onHelp: () => void;
  isOpen?: boolean;
}

export function PhoneConfirmStep({
  phone,
  code,
  setCode,
  onConfirm,
  onHelp,
}: Props) {
  // Таймер повторной отправки
  const [counter, setCounter] = useState(30);

  // Флаг ошибки неверного кода
  const [error, setError] = useState(false);

  // Индекс активного input (0–3), 4 = все заполнены
  const [activeIndex, setActiveIndex] = useState(0);

  // Ссылки на input'ы для управления фокусом
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ⏱ Таймер обратного отсчёта
  useEffect(() => {
    if (counter <= 0) return;
    const timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  // Автофокус на активный input
  useEffect(() => {
    if (activeIndex < 4) {
      inputRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  // Подтверждение кода
  const handleConfirm = async () => {
    // Проверяем только заполненность
    if (code.length < 4) return;

    try {
      // Доверяем проверку серверу
      await onConfirm();

      // Если сервер принял код
      setError(false);
    } catch {
      // Если код неверный
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

  // Ввод цифры в input
  const handleChange = (val: string, index: number) => {
    // Разрешаем только цифры
    if (!/^\d*$/.test(val)) return;

    const codeArr = code.split("").slice(0, 4);
    codeArr[index] = val;

    setCode(codeArr.join(""));

    // При вводе сбрасываем ошибку
    if (error) setError(false);

    // Переход на следующий input
    if (index < 3 && val) {
      setActiveIndex(index + 1);
    } else if (index === 3 && val) {
      // Последняя цифра — убираем фокус
      setActiveIndex(4);
    }
  };

  // Обработка клавиш навигации и удаления
  const handleKeyDown = (
    e: ReactKeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const codeArr = code.split("").slice(0, 4);

    // Backspace — удаление назад
    if (e.key === "Backspace") {
      e.preventDefault();

      if (codeArr[index]) {
        codeArr[index] = "";
        setCode(codeArr.join(""));
        setActiveIndex(index);
      } else if (index > 0) {
        codeArr[index - 1] = "";
        setCode(codeArr.join(""));
        setActiveIndex(index - 1);
      }
    }

    // Delete — удаление текущего
    else if (e.key === "Delete") {
      e.preventDefault();
      codeArr[index] = "";
      setCode(codeArr.join(""));
      setActiveIndex(index);
    }

    // Стрелка влево
    else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) setActiveIndex(index - 1);
    }

    // Стрелка вправо
    else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < 3) setActiveIndex(index + 1);
    }
  };

  return (
    <div className="flex flex-col max-w-[392px] px-5">
      {/* Заголовок */}
      <h2 className="ag-w3 max-w-[250px] mx-auto font-semibold text-center text-secondary mb-5">
        Подтвердите номер
      </h2>

      {/* Телефон */}
      <p className="ag-h2 text-secondary text-center mb-5">8 {phone}</p>

      {/* Подсказка */}
      <p className="ag-h3 text-grayscale-700 text-center mb-4">
        введите код из смс
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
              name={`auth-code-${i}`}
              value={code[i] || ""}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
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
        <p className="text-red-500 text-center mt-3 ag-h4">
          Неверный код
        </p>
      )}

      {/* Таймер */}
      <p className="ag-h4 text-grayscale-700 mt-4 mb-3 text-center">
        Отправим код повторно через {counter} сек.
      </p>

      {/* Помощь */}
      <button
        className="ag-h4 text-secondary mt-3 cursor-pointer hover:opacity-80 mx-auto mb-9"
        onClick={onHelp}
      >
        Не приходит SMS?
      </button>

      {/* Подтверждение */}
      <button
        className="w-full min-h-[55px] flex cursor-pointer items-center justify-center ag-h6 font-medium bg-black text-white hover:opacity-90"
        onClick={handleConfirm}
      >
        подтвердить номер
      </button>

      {/* Политика */}
      <p className="max-w-[392px] ag-n1 text-grayscale-700 mt-3 tracking-[0.08em] text-center">
        подтверждая номер телефона, я согласен с{" "}
        <Link className="font-semibold hover:text-secondary" to="/policy">
          политикой обработки персональных данных
        </Link>
      </p>
    </div>
  );
}
