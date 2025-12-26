import { useState } from "react";

// Пропсы для поля ввода комментария
type AddCommentInputProps = {
  placeholder: string; // Текст подсказки
  absolute?: boolean; // Если true — компонент будет фиксирован внизу (для модалки)
  onSend?: (text: string) => void; // Callback для отправки текста
};

export function AddCommentInput({ placeholder, absolute = false, onSend }: AddCommentInputProps) {
  const [text, setText] = useState(""); // Состояние текста в input
  const [sendingStatus, setSendingStatus] = useState(false); // Статус отправки

  // Отправка комментария
  const handleSend = () => {
    if (!text.trim() || sendingStatus) return; // не отправляем пустой текст или если уже отправляем
    const sendingText = text; // сохраняем текст на момент отправки
    setSendingStatus(true); // включаем статус "отправка"

    if (absolute) {
      // для модалки сразу вызываем callback
      onSend?.(sendingText);
    } else {
      // для обычного поля делаем имитацию сетевого запроса
      setTimeout(() => {
        onSend?.(sendingText);
        setSendingStatus(false); // снимаем статус отправки
      }, 800);
    }

    setText(""); // очищаем поле ввода
  };

  return (
    <div
      className={`${
        absolute
          ? "absolute bottom-0 left-0 right-0 z-50 bg-white rounded-b-xl px-4 sm:px-6 pt-5 pb-5"
          : "px-0 sm:px-6 pt-4 pb-5 shrink-0"
      }`}
    >
      {/* Поле ввода + кнопка отправки */}
      <div className="rounded-full px-4 min-h-[46px] border border-gray-300 flex items-center gap-3 focus-within:border-grayscale-500">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={sendingStatus ? "Отправление..." : placeholder} // подсказка меняется во время отправки
          className="ag-h7 font-medium placeholder:text-grayscale-00 outline-none bg-transparent w-full"
          disabled={sendingStatus && absolute} // блокируем при отправке в модалке
        />
        <button
          type="button"
          aria-label="Send"
          onClick={handleSend}
          className="w-9 h-9 aspect-square cursor-pointer rounded-full border border-grayscale-300 flex items-center justify-center hover:border-secondary"
        >
          <svg className="w-[8px] h-[14px] text-secondary ml-0.5">
            <use href="/icons/symbol/sprite.svg#chevron_r" />
          </svg>
        </button>
      </div>
    </div>
  );
}
