// Пропсы футера десктопного вида
type DesktopFooterProps = {
  lookLikesCount: number; // количество лайков образа
  lookLiked: boolean; // состояние лайка образа
  toggleLookLike: () => void; // функция переключения лайка образа
  bookmarked: boolean; // состояние закладки
  toggleBookmark: () => void; // функция переключения закладки
  commentsCount: number; // количество комментариев к образу
};

// Десктопный футер образа
export function DesktopFooter({
  lookLikesCount,
  lookLiked,
  toggleLookLike,
  bookmarked,
  toggleBookmark,
  commentsCount,
}: DesktopFooterProps) {
  return (
    <div className="px-6 pt-5 flex flex-col gap-3">
      {/* Верхняя часть футера: лайки, комментарии, закладка */}
      <div className="flex justify-between items-center border-b border-grayscale-300 pb-5">
        <div className="flex items-center gap-6">
          {/* Лайк образа */}
          <button onClick={toggleLookLike} className="flex items-center gap-2 cursor-pointer">
            <svg
              className={`w-7.5 h-7.5 ${
                lookLiked ? "fill-red-500 stroke-red-500" : "fill-none stroke-secondary"
              }`}
            >
              <use href="/icons/symbol/sprite.svg#heart" />
            </svg>
            <span className="ag-h7 text-secondary font-medium">{lookLikesCount}</span>
          </button>

          {/* Количество комментариев */}
          <div className="flex items-center gap-2">
            <svg className="w-7.5 h-7.5">
              <use href="/icons/symbol/sprite.svg#comment" />
            </svg>
            <span className="ag-h7 text-grayscale-700 font-medium">{commentsCount}</span>
          </div>
        </div>

        {/* Кнопка закладки образа */}
        <button onClick={toggleBookmark} className="w-7.5 h-7.5 text-secondary hover:opacity-80 cursor-pointer">
          <svg
            className={`w-7.5 h-7.5 ${
              bookmarked ? "fill-blue-500 stroke-blue-500" : "fill-none stroke-secondary"
            }`}
          >
            <use href="/icons/symbol/sprite.svg#bookmark" />
          </svg>
        </button>
      </div>
    </div>
  );
}
