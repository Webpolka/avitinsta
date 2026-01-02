import { useEffect, useRef, useState } from "react";

interface Props {
  phone: string;
  code: string;
  setCode: (v: string) => void;
  onConfirm: () => void;
  onHelp: () => void;
  isOpen?: boolean;
}

export function PhoneConfirmStep({
  phone,
  onConfirm,
  onHelp,
  code,
  setCode,
}: Props) {
  /** Таймер повторной отправки SMS */
  const [counter, setCounter] = useState(30);

  /**
   * Рефы для инпутов кода
   * Нужны, чтобы управлять фокусом между полями
   */
  const inputsRef = useRef<HTMLInputElement[]>([]);

  /**
   * Обратный отсчёт таймера
   */
  useEffect(() => {
    if (counter <= 0) return;

    const timer = setTimeout(() => {
      setCounter((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  /**
   * Обработка ввода цифры
   * - разрешаем только 1 цифру
   * - записываем её в нужную позицию
   * - автоматически переводим фокус на следующий инпут
   */
  const handleChange = (value: string, index: number) => {
    // Разрешаем ввод только цифры
    if (!/^\d?$/.test(value)) return;

    // Собираем новый код
    const newCode =
      code.substring(0, index) + value + code.substring(index + 1);

    setCode(newCode);

    // Если цифра введена — переходим к следующему инпуту
    if (value) {
      if (index < 3) {
        inputsRef.current[index + 1]?.focus();
      } else {
        inputsRef.current[index]?.blur(); // снимаем фокус с последнего
      }
    }
  };

  /**
   * Обработка нажатий клавиш
   * - Backspace / Delete:
   *   • удаляет текущую цифру
   *   • если поле пустое — переходит к предыдущему
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // чтобы браузер не трогал value сам

      const newCode = code.split("");

      if (newCode[index]) {
        // Если в текущем поле есть цифра — просто очищаем её
        newCode[index] = "";
        setCode(newCode.join(""));
      } else if (index > 0) {
        // Если поле пустое — переходим к предыдущему
        inputsRef.current[index - 1]?.focus();
      }
    }

    if (e.key === "Delete") {
      e.preventDefault();
      const newCode = code.split("");
      newCode[index] = "";
      setCode(newCode.join(""));
    }

    // обработка Enter / Space
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // чтобы пробел не вставлялся
      onConfirm();
    }
  };

  return (
    <div className="flex flex-col max-w-[392px]">
      <h2 className="ag-w2 sm:ag-w4 max-w-[250px] mx-auto font-semibold text-center text-secondary mb-5">
        Подтвердите номер
      </h2>

      <p className="ag-h2 text-secondary text-center">8 {phone}</p>
      <p className="ag-h3 text-grayscale-700 text-center">введите код из смс</p>

      {/* Инпуты для ввода SMS-кода */}
      <div className="flex gap-2 justify-center mt-2">
        {[...Array(4)].map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              if (el) inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete="off" //  отключаем автозаполнение
            autoCorrect="off" //  отключаем автокоррекцию
            spellCheck={false} //  отключаем подсказки
            value={code[i] || ""}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => {
              handleKeyDown(e, i);
            }}
            className={`
        w-[69px] h-[69px] text-center text-xl
        border border-black
        bg-black text-white
        focus:bg-white focus:text-black
        transition-colors duration-200
        outline-none
      `}
          />
        ))}
      </div>

      {/* Таймер повторной отправки */}
      <p className="text-xs text-gray-500 mt-2">
        Отправим код повторно через {counter} сек.
      </p>

      <p className="text-xs text-blue-600 mt-1 cursor-pointer" onClick={onHelp}>
        Не приходит SMS?
      </p>

      <button
        className="w-full py-3 bg-black text-white rounded mt-2 cursor-pointer hover:opacity-90"
        onClick={onConfirm}
      >
        Подтвердить номер
      </button>

      <p className="text-xs text-gray-600 mt-1">
        Подтверждая номер телефона, я согласен с политикой обработки
        персональных данных
      </p>
    </div>
  );
}
