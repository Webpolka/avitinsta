import { useState } from "react";
import { LOOKS_DATA, type Look } from "@/mocks/looks.mock.ts";
import { CommentsModal } from "@/components/commentsModal/commentsModal";

const handleSearch = () => {
  console.log("Ищем:");
};
function LooksHeader() {
  return (
    <div className="flex flex-wrap items-center gap-y-5">
      {/* Заголовок */}
      <h1 className="ag-h1 lg:ag-w3 font-semibold text-secondary order-1">
        Образы
      </h1>

      {/* Поиск */}
      <div className="order-3 w-full md:order-2 md:flex-1 md:ml-[60px] md:mr-[100px] lg:ml-[100px] lg:mr-[125px]">
        <div className="rounded-full px-3 min-h-[46px] border border-gray-300 flex items-center gap-3 focus-within:border-grayscale-500">
          <button
            onClick={handleSearch}
            type="submit"
            aria-label="Search"
            className="cursor-pointer"
          >
            <svg className="w-7.5 h-7.5 text-grayscale-500">
              <use href="/icons/symbol/sprite.svg#search" />
            </svg>
          </button>

          <input
            type="text"
            onChange={handleSearch}
            placeholder="Поиск по хештегам"
            className="ag-h6 font-medium placeholder:text-grayscale-500 outline-none bg-transparent w-full"
          />
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="order-2 ml-auto lg:ml-0 flex items-center gap-5">
        {/* Добавить образ */}
        <button className="w-7.5 h-7.5 lg:w-10 lg:h-10 rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-80">
          <svg className="w-6 h-6 text-white">
            <use href="/icons/symbol/sprite.svg#add_r" />
          </svg>
        </button>

        {/* Закрыть */}
        <button className="cursor-pointer hover:opacity-80 w-10 h-10">
          <svg className="w-7.5 h-7.5 lg:w-10 lg:h-10">
            <use href="/icons/symbol/sprite.svg#close" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Карточка образа
function LookCard({ look }: { look: Look }) {
  const { user } = look;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Основной контейнер карточки */}
      <div className="rounded-xl overflow-hidden bg-white">
        {/* Header: пользователь + подписка */}
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

          <button className="ag-h8 md:ag-h7 text-secondary font-medium hover:opacity-80 cursor-pointer">
            <span>Подписаться</span>
          </button>
        </div>

        {/* Content: изображение образа */}
        <div className="bg-grayscale-100 w-full aspect-[886/500]">
          {look.image && (
            <img
              src={look.image}
              className="w-full object-cover aspect-[886/500] overflow-hidden"
            />
          )}
        </div>

        {/* Footer: лайки, описание, хештеги */}
        <div className="px-6 py-5 flex flex-col gap-3">
          {/* Лайки и комментарии */}

          {(look.likesCount || look.commentsCount) && (
            <div className="flex items-center gap-6">
              {look.likesCount && (
                <button className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                  <svg className="w-7.5 h-7.5">
                    <use href="/icons/symbol/sprite.svg#heart" />
                  </svg>
                  <span className="ag-h7 text-secondary font-medium">
                    {look.likesCount}
                  </span>
                </button>
              )}

              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 hover:opacity-80 cursor-pointer" 
              >
                <svg className="w-7.5 h-7.5">
                  <use href="/icons/symbol/sprite.svg#comment" />
                </svg>
                <span className="ag-h7 text-secondary font-medium">
                  {look.commentsCount || 0}
                </span>
              </button>
            </div>
          )}

          {/* Описание образа */}
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
                <span
                  key={tag}
                  className="text-brand-primary-hover ag-h9 md:ag-h7 font-medium cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* модалка */}
      {isOpen && (
        <CommentsModal look={look} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

// Лента образов
function LooksFeed() {
  return (
    // Вертикальный список карточек с большим отступом между ними
    <div className="flex flex-col gap-10 sm:gap-[65px] md:gap-[85px]">
      {LOOKS_DATA.map((look) => (
        <LookCard key={look.id} look={look} />
      ))}
    </div>
  );
}

// Страница "Образы"
export function Looks() {
  return (
    <div className="pt-5 pb-45">
      {/* Верхний блок — без боковых паддингов */}
      <div className="xl:px-15 mb-5 lg:mb-10">
        <LooksHeader />
      </div>

      {/* Лента образов с адаптивными паддингами */}
      <div className="px-0 md:px-[50px] xl:px-[200px]">
        <LooksFeed />
      </div>
    </div>
  );
}
