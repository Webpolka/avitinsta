import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

import { CHATS_DATA } from "@/mocks/chats.mocks";
import { useUser } from "@/context/use.user";

/* =========================
   Страница конкретного чата
========================= */

export function ProfileChat() {
  /* =========================
     user from global context
  ========================= */
  const { user } = useUser();
  // Находим чат
  const { chatId } = useParams<{ chatId: string }>();
  const chat = CHATS_DATA.find((c) => c.id === chatId);

  // Локальный state для сообщений
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(chat?.messages ?? []);

  const navigate = useNavigate();

  if (!chat || !user) {
    return (
      <div className="p-5 text-red-500">
        Чат не найден или пользователь не определён
      </div>
    );
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: crypto.randomUUID(),
      senderId: user.id,
      text: newMessage,
      time: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Хедер чата */}
      <div className="flex items-center gap-3 p-4 bg-white shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700"
        >
          Назад
        </button>
        <img
          src={chat.participant.avatar}
          alt={chat.participant.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-medium text-secondary">
            {chat.participant.name}
          </span>
          <span className="text-sm text-gray-500">
            {chat.participant.handle}
          </span>
        </div>
        {/* Товар */}
        <div className="flex items-center gap-2 ml-auto">
          <img
            src={chat.product.images[0]}
            alt={chat.product.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-700 text-sm">
              {chat.product.title}
            </span>
            <span className="text-xs text-gray-500">₽{chat.product.price}</span>
          </div>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
        {messages.map((msg) => {
          const isMe = msg.senderId === user.id;
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg max-w-[70%] ${
                  isMe ? "bg-secondary text-white" : "bg-white text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(msg.time), {
                    addSuffix: true,
                    locale: ru,
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ввод сообщения */}
      <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-200">
        <input
          type="text"
          placeholder="Напишите сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-secondary text-white px-4 py-2 rounded-full hover:opacity-90"
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
