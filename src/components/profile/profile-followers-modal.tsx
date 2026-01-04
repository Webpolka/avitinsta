import { useState, useEffect } from "react";
import Button from "@/ui/button";
import styles from "@/styles/utilities.module.scss";
import { useScrollToTopAndLockBody } from "@/hooks/lockBodyScrollAndTop";
import { Loader } from "@/ui/loader";

import { fetchFollowers } from "@/components/profile/fetch.followers.api";
import { type FollowerData } from "@/mocks/followers.mocks";

type FollowersModalProps = {
  userId: string;
  onClose: () => void;
};

export default function FollowersModal({
  userId,
  onClose,
}: FollowersModalProps) {
  // Список подписчиков (имитация данных с сервера)
  const [followers, setFollowers] = useState<FollowerData[]>([]);

  // Значение строки поиска
  const [search, setSearch] = useState("");

  // Состояние загрузки (имитация AJAX-запроса)
  const [isLoading, setIsLoading] = useState(true);

  // При открытии модалки:
  // - скроллим страницу вверх
  // - блокируем скролл body (только на мобилке)
  useScrollToTopAndLockBody();

  // Загрузка подписчиков при открытии модалки или смене userId
  useEffect(() => {
    const updateLoadingHook = () => {
      setIsLoading(true);
    };
    updateLoadingHook();
    
    fetchFollowers(userId).then((data) => {
      setFollowers(data);
      setIsLoading(false);
    });
  }, [userId]);

  // Переключение подписки / отписки
  // (пока локально, позже будет сервер)
  const toggleFollow = (id: string) => {
    setFollowers((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isFollowing: !f.isFollowing } : f))
    );
  };

  // Фильтрация подписчиков по имени или хендлу
  const filteredFollowers = followers.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.handle.toLowerCase().includes(search.toLowerCase())
  );

  // Показываем "Ничего не найдено",
  // если есть поисковый запрос и нет результатов
  const showEmpty = search.trim().length > 0 && filteredFollowers.length === 0;

  // Сабмит поиска
  // Сейчас просто лог, позже будет серверный запрос
  const onSubmit = () => {
    console.log("Поиск подписчиков:", search);

    // В будущем:
    // fetchFollowers(userId, { search })
  };

  return (
    // Затемнение фона + центрирование модалки
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent sm:bg-black/50">
      <div
        className={`${styles.hFullHeaderMinus} absolute bottom-0 sm:relative sm:mx-4 sm:max-w-[786px] xl:max-w-[886px] h-full max-h-[95%] w-full bg-fon pt-15 px-4 sm:px-10 xl:pt-22.5 xl:pl-22.5 xl:pr-22.5 flex flex-col gap-5`}
      >
        {/* Кнопка закрытия модального окна */}
        <button
          onClick={onClose}
          className="absolute top-0 right-4 sm:top-17 sm:right-10 xl:right-15 w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          <svg className="w-9 h-9 sm:w-7 sm:h-7">
            <use href="/icons/symbol/sprite.svg#close" />
          </svg>
        </button>

        {/* Заголовок модалки */}
        <h2 className="ag-h2 font-medium text-seconadry">Подписчики</h2>

        {/* Поиск подписчиков */}
        <div className="rounded-full min-h-11 px-3 py-2 border border-grayscale-300 bg-white flex items-center gap-3 focus-within:border-blue-300">
          {/* Кнопка поиска */}
          <button onClick={onSubmit} aria-label="Search">
            <svg className="w-4 h-4 text-grayscale-825">
              <use href="/icons/symbol/sprite.svg#search" />
            </svg>
          </button>

          {/* Поле ввода */}
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ag-h7 outline-none bg-transparent w-full"
          />
        </div>

        {/* Контейнер со списком подписчиков */}
        <div
          className={`${styles.hiddenScroll} flex flex-col gap-10 flex-1 overflow-y-auto pb-5`}
        >
          {/* Лоадер */}
          {isLoading && (
            <div className="flex items-center justify-center h-full text-grayscale-300 ag-h4">
              <Loader/>
            </div>
          )}

          {/* Пустое состояние */}
          {!isLoading && showEmpty && (
            <div className="flex items-center justify-center h-full text-grayscale-300 ag-h4">
              Ничего не найдено
            </div>
          )}

          {/* Список подписчиков */}
          {filteredFollowers.map((f) => (
            <div key={f.id} className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-5">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div className="flex flex-col gap-2">
                  <span className="ag-h4 text-secondary font-medium leading-5">
                    {f.name}
                  </span>
                  <span className="ag-h9 text-grayscale-300 font-medium">
                    {f.handle}
                  </span>
                </div>
              </div>

              {/* Кнопка подписки */}
              <Button
                onClick={() => toggleFollow(f.id)}
                className={`cursor-pointer px-3 py-1 ag-h7 sm:ag-h6 min-w-[122px] sm:min-w-[153px] min-h-[48px] ${
                  f.isFollowing
                    ? "bg-gray-200 text-gray-800"
                    : "bg-secondary text-white hover:opacity-90"
                }`}
              >
                {f.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
