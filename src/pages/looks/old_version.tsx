import { useState, useEffect } from "react";
import { LOOKS_DATA, type Look } from "@/mocks/looks.mock.ts";
import { COMMENTS_DATA } from "@/mocks/comment.mock";
import { CommentsModal } from "@/components/commentsModal/commentsModal";
import { useDebounce } from "@/hooks/debounce";

// Имитация поиска по хештегу "потом заменяется на fetch()"
function fetchLooksByHashtag(query: string): Promise<Look[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve(LOOKS_DATA);
        return;
      }

      const q = query.toLowerCase();

      resolve(
        LOOKS_DATA.filter((look) =>
          look.hashtags?.some((tag) => tag.toLowerCase().includes(q))
        )
      );
    }, 500); // имитация сети
  });
}

// Header
type LooksHeaderProps = {
  query: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

function LooksHeader({ query, onChange, onSubmit }: LooksHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-y-5">
      {/* Заголовок страницы */}
      <h1 className="ag-h1 lg:ag-w3 font-semibold text-secondary order-1">
        Образы
      </h1>

      {/* Поиск по хештегам */}
      <div className="order-3 w-full md:order-2 md:flex-1 md:ml-[60px] md:mr-[100px] lg:ml-[100px] lg:mr-[125px]">
        <div className="rounded-full px-3 min-h-[46px] border border-gray-300 flex items-center gap-3 focus-within:border-grayscale-500">
          <button
            onClick={onSubmit}
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
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            placeholder="Поиск по хештегам"
            className="ag-h6 font-medium placeholder:text-grayscale-500 outline-none bg-transparent w-full"
          />
        </div>
      </div>

      {/* Действия: добавить образ / закрыть */}
      <div className="order-2 ml-auto lg:ml-0 flex items-center gap-5">
        <button className="w-7.5 h-7.5 lg:w-10 lg:h-10 rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-80">
          <svg className="w-6 h-6 text-white">
            <use href="/icons/symbol/sprite.svg#add_r" />
          </svg>
        </button>
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

  // Модалка комментариев
  const [isOpen, setIsOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Лайк к образу
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(look.likesCount || 0);
  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1)); // обновление счётчика лайков
  };

  // Обработчик подписки
  const toggleSubscribe = () => {
    setSubscribed((prev) => !prev);
    console.log(
      `${subscribed ? "Отписались от" : "Подписались на"} ${user.name}`
    );
  };

  // Кол-во комментариев берём из реальных данных
  const commentsCount = COMMENTS_DATA.filter(
    (c) => c.lookId === look.id
  ).length;

  // Обработка клика по хештегу
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
            onClick={toggleSubscribe} // подключаем обработчик
            className={`ag-h8 md:ag-h7 font-medium hover:opacity-80 cursor-pointer ${
              subscribed ? "text-grayscale-500" : "text-secondary"
            }`}
          >
            <span>{subscribed ? "Отписаться" : "Подписаться"}</span>
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
                <span
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="text-brand-primary-hover ag-h9 md:ag-h7 font-medium cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модалка комментариев */}
      {isOpen && <CommentsModal look={look} onClose={() => setIsOpen(false)} />}
    </>
  );
}

// Страница Looks
export function Looks() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const [looks, setLooks] = useState<Look[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLooks = async (q: string) => {
    setLoading(true);
    const data = await fetchLooksByHashtag(q);
    setLooks(data);
    setLoading(false);
  };

  // авто-поиск (AJAX + debounce)
  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      const data = await fetchLooksByHashtag(debouncedQuery);
      if (!ignore) {
        setLooks(data);
        setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [debouncedQuery]);

  // ручной поиск (лупа / Enter)
  const handleSubmit = () => {
    loadLooks(query);
  };

  return (
    <div className="pt-5 pb-45 px-4 sm:px-22">
      {/* Верхний блок: заголовок + поиск */}
      <div className="xl:px-15 mb-5 lg:mb-10">
        <LooksHeader
          query={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
        />
      </div>
      
      {loading ? (
        <div className="text-center">Загрузка…</div>
      ) : (
        <div className="px-0 md:px-[50px] xl:px-[200px]">
          <div className="flex flex-col gap-10 sm:gap-[65px] md:gap-[85px]">
            {looks.map((look) => (
              <LookCard key={look.id} look={look} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
