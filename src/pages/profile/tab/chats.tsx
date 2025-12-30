import { useState, useEffect } from "react";
import { CHATS_DATA, type Chat } from "@/mocks/chats.mocks";
import { formatDistanceToNowStrict  } from "date-fns";
import { ru } from "date-fns/locale";

import { Link } from "react-router-dom";
import { useUser } from "@/context/use.user";

export function ProfileTabChats() {
  const { user } = useUser();

  // Локальный state для чатов (можно потом заменить на fetch)
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (!user) return;

    // 1. Находим по ID
    // Фильтруем чаты, где текущий юзер участвует
    const chatList = CHATS_DATA.filter(
      (chat) =>
        chat.participant.id === user.id ||
        chat.messages.some((msg) => msg.senderId === user.id)
    );

    // 2. Сортируем по времени последнего сообщения (самые свежие вверху)
    chatList.sort((a, b) => {
      const lastA = new Date(a.messages[a.messages.length - 1].time).getTime();
      const lastB = new Date(b.messages[b.messages.length - 1].time).getTime();
      return lastB - lastA; // большее время сверху
    });

    // 3. Кладём в state
    const updateChatsState = () => {
      setChats(chatList);
    };
    updateChatsState();
  }, [user]);

  return (
    <>
      <h2 className="ag-h2 sm:ag-w4 text-secondary font-semibold mb-10 sm:mb-15">
        Сообщения
      </h2>
      <div className="flex flex-col gap-3">
        {chats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <Link
              to={`/chats/${chat.id}`}
              key={chat.id}
              className="flex justify-between items-center px-3 pt-[16px]  pb-[26px] sm:px-6 sm:py-[12px] rounded-xl border-solid border border-grayscale-25 shadow-sm hover:bg-gray-50 cursor-pointer"
              style={{
                boxShadow:
                  "0 1px 1px 0 rgba(0,0,0,0.1), 1px 0 1px 0 rgba(0,0,0,0.1), -1px 0 1px 0 rgba(0,0,0,0.1), 0 -1px 1px 0 rgba(0,0,0,0.1)",
              }}
            >
             
              <div className="flex gap-2 sm:gap-4.5 items-center w-full">
                {/* Аватар */}
                <div className="relative shrink-0">
                  <img
                    src={chat.participant.avatar}
                    alt={chat.participant.name}
                    className="w-10 h-10 sm:w-15 sm:h-15 rounded-full object-cover"
                  />
                  {/* {chat.participant.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )} */}
                </div>

                <div className="flex flex-1 flex-col gap-2.5  ">
                  {/* Имя и handle */}
                  <div className="flex gap-2 justify-between items-center w-full ">
                    <span className="font-medium text-secondary ag-h6 sm:ag-h4 leading-4 sm:leading-[initial] whitespace-nowrap">
                      {chat.participant.name}
                      {chat.pinned && (
                        <svg className="w-4.5 h-4.5 inline-block ml-1.5">
                          <use href="/icons/symbol/sprite.svg#pin" />
                        </svg>
                      )}
                    </span>

                    <span className="text-right ag-h10 font-medium text-grayscale-300 sm:mr-10 -mt-1.5">
                      {formatDistanceToNowStrict (new Date(lastMessage.time), {
                        addSuffix: true,
                        locale: ru,
                      })}
                    </span>
                  </div>

            
                  <div className="flex gap-2 justify-between items-center max-h-[12px] sm:max-h-[16px]">
                    <span className="text-grayscale-300 font-medium ag-h9 leading-4">
                      {lastMessage.text}
                    </span>

                    {chat.unreadCount > 0 && (
                      <div className="w-6 h-6 -mt-1 sm:mt-1 sm:w-7.5 sm:h-7.5 bg-[#08f] text-white text-xs font-medium flex items-center justify-center rounded-full">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {chats.length === 0 && (
          <div className="flex justify-center items-center text-gray-400 text-sm h-40">
            Нет чатов
          </div>
        )}
      </div>
    </>
  );
}
