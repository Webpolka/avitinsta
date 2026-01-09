import React from "react";
import { formatCountRu } from "@/hooks/formatCount";
import { formatDistanceToNowStrict } from "date-fns";
import { ru } from "date-fns/locale";

import { type Comment } from "@/mocks/comment.mock";
import { USERS_DATA } from "@/mocks/users.mocks";

// Пропсы для отдельного комментария
type CommentItemProps = {
  comment: Comment; // объект комментария
  user?: (typeof USERS_DATA)[number]; // пользователь, который оставил комментарий
  onReply: (replyTo: { commentId: string; username: string }) => void; // callback для ответа на комментарий
  isRoot?: boolean; // корневой ли это комментарий (не ответ)
  likesState: Record<string, { count: number; liked: boolean }>; // состояние лайков для комментариев
  setLikesState: React.Dispatch<
    React.SetStateAction<Record<string, { count: number; liked: boolean }>>
  >; // сеттер лайков
};

export function CommentItem({
  comment,
  user,
  onReply,
  isRoot = false,
  likesState,
  setLikesState,
}: CommentItemProps) {
  // Обработчик лайка для комментария
  const toggleLike = () => {
    setLikesState((prev) => ({
      ...prev,
      [comment.id]: {
        count: prev[comment.id].liked
          ? prev[comment.id].count - 1
          : prev[comment.id].count + 1,
        liked: !prev[comment.id].liked,
      },
    }));
  };

  return (
    // Отступ для вложенных ответов
    <div className={`${isRoot ? "" : "ml-12"} flex flex-col gap-2`}>
      <div className={`${isRoot ? "gap-5" : "gap-3 sm:gap-5"} flex`}>
        {/* Аватар пользователя */}
        <img
          src={user?.avatar || undefined}
          className={`${
            isRoot ? "w-7.5 h-7.5" : "w-6 h-6"
          } rounded-full object-cover bg-gray-300 flex items-center justify-center`}
          alt={user?.name || "Без имени"}
        />

        {/* Контент комментария */}
        <div className="flex flex-1 flex-col">
          {/* Имя пользователя и дата */}
          <div className="ag-h6 font-medium text-grayscale-500 mb-1">
            {user?.name || "Без имени"} ·{" "}
            {formatDistanceToNowStrict(comment.createdAt, {
              addSuffix: true,
              locale: ru,
            })}
          </div>

          {/* Текст комментария */}
          <p
            className={`${
              isRoot ? "ag-h7" : "ag-h8"
            } text-secondary leading-5 mb-0.5 pr-5`}
          >
            {comment.text}
          </p>

          {/* Блок лайков и кнопки ответить */}
          <div className="flex justify-between items-end gap-3">
            {/* Лайки */}
            <span className="ag-h9 font-medium text-grayscale-500">
              {isRoot ? "Отметки “Нравится”: " : "Понравилось: "}
              {formatCountRu(likesState[comment.id]?.count ?? 0)}
            </span>

            <div className="relative flex items-end gap-3">
              {/* Кнопка лайка */}
              <button
                onClick={toggleLike}
                className="absolute top-[2px] sm:-top-5 right-0 w-5.5 h-5.5 hover:opacity-80 cursor-pointer"
              >
                <svg
                  className={`w-5.5 aspect-square fill-none stroke-grayscale-300 ${
                    likesState[comment.id]?.liked
                      ? "fill-red-500 stroke-red-500"
                      : ""
                  }`}
                >
                  <use href="/icons/symbol/sprite.svg#like" />
                </svg>
              </button>

              {/* Кнопка "Ответить" */}
              <button
                onClick={() =>
                  onReply({ commentId: comment.id, username: user?.name || "" })
                }
                className="cursor-pointer text-grayscale-500 hover:text-secondary"
              >
                <span className="ag-h10 font-medium pr-15 sm:pr-6">
                  Ответить
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
