import { useState } from "react";
import { type Look } from "@/mocks/looks.mock";
import { COMMENTS_DATA } from "@/mocks/comment.mock";
import { CommentsModal } from "@/components/commentsModal/commentsModal";

export function LookCard({ look }: { look: Look }) {
  const { user } = look;

  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [likesCount, setLikesCount] = useState(look.likesCount || 0);

  const commentsCount = COMMENTS_DATA.filter(
    (c) => c.lookId === look.id
  ).length;

  // Обработчик лайков образов
  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  // Обработчик пидписок
  const toggleSubscribe = () => {
    setSubscribed((prev) => !prev);
    console.log(
      `${subscribed ? "Отписались от" : "Подписались на"} ${user.name}`
    );
  };  

  // Обработчик клика по теги
  const handleTagClick = (tag: string) => console.log("Ищем хештег:", tag);

  return (
    <>
      <div className="rounded-xl overflow-hidden bg-white">
        {/* Header: пользователь + кнопка подписки */}
        <div className="rounded-t-xl border-2 border-grayscale-100 flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              className="w-10 h-10 md:w-15 md:h-15 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="ag-h6 md:ag-h4 font-medium text-secondary">
                {user.name}
              </span>
              <span className="ag-h9 text-grayscale-300 font-medium">
                {user.handle}
              </span>
            </div>
          </div>
          <button
            onClick={toggleSubscribe}
            className={`ag-h8 md:ag-h7 font-medium hover:opacity-80 cursor-pointer ${
              subscribed ? "text-grayscale-500" : "text-secondary"
            }`}
          >
            {subscribed ? "Отписаться" : "Подписаться"}
          </button>
        </div>

        {/* Изображение образа */}
        <div className="bg-grayscale-100 w-full aspect-[886/500]">
          {look.image && (
            <img
              src={look.image}
              className="w-full object-cover aspect-[886/500] overflow-hidden"
            />
          )}
        </div>

        {/* Footer: лайки, комментарии, описание, хештеги */}
        <div className="px-6 py-5 flex flex-col gap-3">
          {/* Лайки и комментарии */}
          {(likesCount || commentsCount) && (
            <div className="flex items-center gap-6">
              <button
                onClick={toggleLike}
                className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
              >
                <svg
                  className={`w-7.5 h-7.5 ${
                    liked
                      ? "fill-red-500 stroke-red-500"
                      : "fill-none stroke-secondary"
                  }`}
                >
                  <use href="/icons/symbol/sprite.svg#heart" />
                </svg>
                <span className="ag-h7 text-secondary font-medium">
                  {likesCount}
                </span>
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
              >
                <svg className="w-7.5 h-7.5">
                  <use href="/icons/symbol/sprite.svg#comment" />
                </svg>
                <span className="ag-h7 text-secondary font-medium">
                  {commentsCount || 0}
                </span>
              </button>
            </div>
          )}

          {/* Описание */}
          {look.description && (
            <div className="flex gap-7.5">
              <span className="ag-h6 font-medium text-secondary">
                {user.name}
              </span>
              <span className="ag-h8 md:ag-h6 font-medium text-grayscale-700 mt-0.5 md:mt-0">
                {look.description}
              </span>
            </div>
          )}

          {/* Хештеги */}
          {look.hashtags && (
            <div className="flex flex-wrap gap-3">
              {look.hashtags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="text-brand-primary-hover ag-h9 md:ag-h7 font-medium cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модалка комментариев */}
      {isOpen && (
        <CommentsModal
          look={look}
          onClose={() => setIsOpen(false)}
          lookLiked={liked}
          lookLikesCount={likesCount}
          toggleLookLike={toggleLike}
          subscribed={subscribed}
          onToggleSubscribe={toggleSubscribe}
        />
      )}
    </>
  );
}
