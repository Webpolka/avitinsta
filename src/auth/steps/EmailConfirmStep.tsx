import { useRef} from "react";

interface Props {
  email: string;
  code: string;
  setCode: (v: string) => void;
  onConfirm: () => void;
  onResend: () => void;
  onHelp: () => void;
}

export function EmailConfirmStep({
 email,
  onConfirm,
  code,
  setCode,
  onResend,
  onHelp,
}: Props) {
  /**
   * Рефы для инпутов кода
   * Нужны, чтобы управлять фокусом между полями
   */
  const inputsRef = useRef<HTMLInputElement[]>([]);
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
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
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
    if (e.key === "Backspace" || e.key === "Delete") {
      if (code[index]) {
        // Если в текущем поле есть значение — просто очищаем его
        const newCode =
          code.substring(0, index) + "" + code.substring(index + 1);
        setCode(newCode);
      } else if (index > 0) {
        // Если поле пустое — переходим назад и очищаем предыдущее
        inputsRef.current[index - 1]?.focus();

        const newCode =
          code.substring(0, index - 1) + "" + code.substring(index);
        setCode(newCode);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold">Подтвердите адрес электронной почты</h1>

      <p className="text-sm text-gray-500">{email}</p>
      <p className="text-sm text-gray-500">ВВедите код из письма</p>

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
            value={code[i] || ""}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-12 h-12 text-center border border-gray-400 rounded text-xl"
          />
        ))}
      </div>

        <p
        className="text-xs text-gray-600 mt-1 cursor-pointer"
        onClick={onResend}
      >
       Запросить код повторно
      </p>
     
      <p
        className="text-xs text-gray-600 mt-1 cursor-pointer"
        onClick={onHelp}
      >
        Не приходит письмо?
      </p>

      <button
        className="w-full py-3 bg-black text-white rounded mt-2 cursor-pointer hover:opacity-90"
        onClick={onConfirm}
      >
        подтвердить почту
      </button>

      <p className="text-xs text-gray-600 mt-1">
        Подтверждая адрес электронной почты, я согласен с политикой обработки персональных
        данных
      </p>
    </div>
  );
}

