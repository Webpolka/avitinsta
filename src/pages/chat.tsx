import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { getMessageTime } from "@/hooks/getMessageTime";

import { CHATS_DATA } from "@/mocks/chats.mocks";
import { useUser } from "@/context/use.all";

import styles from "@/styles/utilities.module.scss";

/* =========================
   Страница конкретного чата
========================= */

export function ProfileChat() {
  const { user } = useUser();
  const { chatId } = useParams<{ chatId: string }>();
  const chat = CHATS_DATA.find((c) => c.id === chatId);

  const [messages, setMessages] = useState(chat?.messages ?? []);
  const [sendingStatus, setSendingStatus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!chat || !user) {
    return (
      <div className="p-5 text-red-500">
        Чат не найден или пользователь не определён
      </div>
    );
  }

  const sendMessage = () => {
    if (!inputRef.current) return;
    const text = inputRef.current.value.trim();
    if (!text) return;

    // очищаем поле сразу, чтобы показать placeholder "Отправление..."
    inputRef.current.value = "";
    setSendingStatus(true);

    const message = {
      id: uuidv4(),
      senderId: user.id,
      text,
      time: new Date().toISOString(),
    };

    // Симулируем задержку отправки
    setTimeout(() => {
      setMessages((prev) => [...prev, message]);
      setSendingStatus(false); // сброс статуса после отправки
    }, 500);
  };

  return (
    <div
      className={`${styles.hFullHeaderMinusAll} -mt-3 sm:mt-0 pt-0 xl:pl-16 xl:pr-20 flex flex-col gap-2`}
    >
      {/* Хедер чата */}
      <div className="flex items-center gap-5 px-5 py-4 border-b border-gray-300 mb-3">
        <img
          src={chat.participant.avatar}
          alt={chat.participant.name}
          className="w-15 h-15 rounded-full object-cover shrink-0"
        />

        <div className="flex flex-col gap-1">
          <span className="font-medium text-secondary ag-h4">
            {chat.participant.name}
            {chat.pinned && (
              <svg className="w-4.5 h-4.5 inline-block ml-1.5">
                <use href="/icons/symbol/sprite.svg#pin" />
              </svg>
            )}
          </span>
          {chat.participant.online ? (
            <span className="ag-h9 font-medium text-system-green">Онлайн</span>
          ) : (
            <span className="ag-h9 font-medium text-system-red">Не в сети</span>
          )}
        </div>
      </div>

      {/* Товар */}
      <div
        className="px-5 py-2 flex items-center gap-2 border border-grayscale-25 rounded-xl mb-5"
        style={{
          boxShadow:
            "0 1px 1px 0 rgba(0,0,0,0.1), 1px 0 1px 0 rgba(0,0,0,0.1), -1px 0 1px 0 rgba(0,0,0,0.1), 0 -1px 1px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-center gap-4">
          <img
            src={chat.product.images[0]}
            alt={chat.product.title}
            className="w-15 h-15 rounded-xl object-cover"
          />
          <div className="flex flex-col gap-2">
            <span className="font-medium ag-h6 text-secondary">
              {chat.product.title}
            </span>
            <span className="ag-h4 text-grayscale-700 font-medium">
              {chat.product.price} ₽
            </span>
          </div>
        </div>
      </div>

      {/* Сообщения */}
      <div
        className={`${styles.hiddenScroll} " flex-auto overflow-y-auto flex flex-col "`}
      >
        {messages.map((msg) => {
          const isMe = msg.senderId === user.id;

          return (
            <div
              key={msg.id}
              className={`flex mb-7.5 sm:mb-3 sm:px-3 ${
                isMe ? "justify-end" : "justify-start"
              }`} // добавляем зазор, если предыдущий был от того же отправителя
            >
              <div
                className={`w-full sm:max-w-[318px] xl:max-w-[421px] p-3 rounded-lg  ${
                  isMe
                    ? "bg-[#08f] text-white max-w-[280px]"
                    : "bg-grayscale-100 text-secondary max-w-[264px]"
                }`}
              >
                <p className="ag-h7 mb-1">{msg.text}</p>
                <span
                  className={`ag-h9 text-grayscale-700 ${
                    isMe
                      ? "bg-[#08f] text-white"
                      : "bg-grayscale-100 text-secondary"
                  }`}
                >
                  {getMessageTime(msg.time)}
                </span>
              </div>
            </div>
          );
        })}

        {/* Это пустой див, на который скроллим */}
        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода + кнопка отправки */}
      <div className="mb-4 sm:mb-7.5 bg-white rounded-full px-4 min-h-[46px] border border-gray-300 flex items-center gap-3 focus-within:border-grayscale-500">
        <input
          type="text"
          ref={inputRef}
          placeholder={sendingStatus ? "Отправление..." : "Напишите сообщение"}
          className="ag-h7 font-medium placeholder:text-grayscale-00 outline-none bg-transparent w-full"
          disabled={sendingStatus}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // чтобы не было переноса строки
              sendMessage();
            }
          }}
        />
        <button
          type="button"
          aria-label="Send"
          onClick={sendMessage}
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
