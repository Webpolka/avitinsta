import { type Look } from "@/mocks/looks.mock";
import { USERS_DATA } from "@/mocks/users.mocks";
import { useRef } from "react";
import styles from "@/styles/utilities.module.scss";

type CommentsModalProps = {
  look: Look;
  onClose: () => void;
};

export function CommentsModal({ look, onClose }: CommentsModalProps) {
  const user = USERS_DATA.find((u) => u.id === look.user.id);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        className={`${styles.hiddenScroll} overflow-y-auto ml-4 mr-4 px-4 py-7.5 sm:px-0 sm:py-0 bottom-0 absolute sm:static sm:rounded-xl bg-white w-full sm:max-w-[707px] h-[90vh]  overflow-hidden flex flex-col gap-4`}
      >
        {/*MOBILE : Мобильный заголовок и кнопка "закрыть"  */}
        <div className="relative sm:hidden flex flex-col gap-2 items-center pb-9">
          {/* title */}
          <h2 className="ag-h2 font-medium text-secondary">Комментарии</h2>
          {/* mobile counter */}
          <p className="ag-h7 font-medium text-grayscale-500">
            Оценили {look.likesCount} человек · {look.viewsCount} просмотров
          </p>
          {/* mobile close button */}
          <div className="absolute top-1 right-1">
            <button
              onClick={onClose}
              className="cursor-pointer w-5 h-5 rounded-full bg-grayscale-100 flex items-center justify-center text-secondary hover:opacity-80"
            >
              <svg className="w-4 h-4">
                <use href="/icons/symbol/sprite.svg#close" />
              </svg>
            </button>
          </div>
        </div>

        {/* DESKTOP : Header + image + buttons */}
        <div className="hidden sm:block flex-1">
          {/* Header: пользователь + подписка */}
          <div className="rounded-t-xl border-2 border-grayscale-100 flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  className="w-10 h-10 sm:w-15 sm:h-15 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col">
                <span className="ag-h6 sm:ag-h4 font-medium text-secondary">
                  {user?.name}
                </span>
                {user?.handle && (
                  <span className="ag-h9 text-grayscale-300 font-medium">
                    {user.handle}
                  </span>
                )}
              </div>
            </div>

            <button className="ag-h8 sm:ag-h7 text-secondary font-medium hover:opacity-80 cursor-pointer">
              <span>Подписаться</span>
            </button>
          </div>

          {/* Content: изображение (скрыто на мобилке) */}
          {look?.image && (
            <div className="bg-grayscale-100 w-full aspect-[886/500] hidden sm:block">
              <img
                src={look.image}
                className="w-full object-cover aspect-[886/500] overflow-hidden"
              />
            </div>
          )}

          {/* Footer: лайки, описание, хештеги */}
          <div className="px-6 py-5 flex flex-col gap-3">
            {(look?.likesCount || look?.commentsCount) && (
              <div className="flex justify-between items-center border-b border-grayscale-300 pb-5">
                <div className="flex items-center gap-6">
                  {look?.likesCount && (
                    <button className="flex items-center gap-2 cursor-pointer">
                      <svg className="w-7.5 h-7.5 ">
                        <use href="/icons/symbol/sprite.svg#heart" />
                      </svg>
                      <span className="ag-h7 text-secondary font-medium">
                        {look.likesCount}
                      </span>
                    </button>
                  )}
                  {look?.commentsCount && (
                    <div className="flex items-center gap-2">
                      <svg className="w-7.5 h-7.5">
                        <use href="/icons/symbol/sprite.svg#comment" />
                      </svg>
                      <span className="ag-h7 text-secondary font-medium">
                        {look.commentsCount}
                      </span>
                    </div>
                  )}
                </div>
                <button className="w-7.5 h.7.5 text-secondary hover:opacity-80 cursor-pointer">
                  <svg className="w-7.5 h-7.5">
                    <use href="/icons/symbol/sprite.svg#bookmark" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comment 1*/}
        <div className="px-0 sm:px-6 pt-0  flex flex-col gap-3">
          <div className="flex gap-5 mb-2">
            {/* left */}
            <img
              src={user?.avatar}
              className="w-7.5 h-7.5 rounded-full object-cover"
            />
            {/* center */}
            <div className="flex flex-1 flex-col">
              <div className="ag-h6 font-medium text-grayscale-500 mb-1">
                Annaasti 3дн.
              </div>
              <p className="ag-h7 font-medium text-secondary leading-5 mb-0.5 pr-5">
                Эту историю придумать невозможно, только пережить
              </p>
              <div className="flex justify-between items-end gap-1">
                <span className="ag-h9 font-medium text-grayscale-500">
                  Отметки “Нравится” : 1468
                </span>

                <div className="relative">
                  {/* like */}
                  <button className="absolute top-[2px] sm:-top-5 right-0 w-5.5 h-5.5 text-black hover:opacity-80 cursor-pointer">
                    <svg className="w-5.5 aspect-square">
                      <use href="/icons/symbol/sprite.svg#like" />
                    </svg>
                  </button>

                  {/* respond */}
                  <button className="cursor-pointer text-grayscale-500 hover:text-secondary">
                    <span className="ag-h10 font-medium pr-15 sm:pr-6">
                      Ответить
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PARENT LIST BUTTON */}
          <button className="self-start flex items-center gap-3 text-grayscale-500 ag-h8 hover:text-secondary cursor-pointer">
            <span className="ag-h9 font-medium block w-17.5 h-px bg-grayscale-500" />
            Смотреть все ответы (3)
          </button>
        </div>

        {/* Comment 2*/}
        <div className="px-0 sm:px-6 pt-0  flex flex-col gap-3">
          <div className="flex gap-5 mb-2">
            {/* left */}
            <img
              src={user?.avatar}
              className="w-7.5 h-7.5 rounded-full object-cover"
            />
            {/* center */}
            <div className="flex flex-1 flex-col">
              <div className="ag-h6 font-medium text-grayscale-500 mb-1">
                Annaasti 3дн.
              </div>
              <p className="ag-h7 font-medium text-secondary leading-5 mb-0.5 pr-5">
                Эту историю придумать невозможно, только пережить
              </p>
              <div className="flex justify-between items-end gap-1">
                <span className="ag-h9 font-medium text-grayscale-500">
                  Отметки “Нравится” : 1468
                </span>

                <div className="relative">
                  {/* like */}
                  <button className="absolute top-[2px] sm:-top-5 right-0 w-5.5 h-5.5 text-black hover:opacity-80 cursor-pointer">
                    <svg className="w-5.5 aspect-square">
                      <use href="/icons/symbol/sprite.svg#like" />
                    </svg>
                  </button>

                  {/* respond */}
                  <button className="cursor-pointer text-grayscale-500 hover:text-secondary">
                    <span className="ag-h10 font-medium pr-15 sm:pr-6">
                      Ответить
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment 3*/}
        <div className="px-0 sm:px-6 pt-0  flex flex-col gap-3">
          <div className="flex gap-5 mb-2">
            {/* left */}
            <img
              src={user?.avatar}
              className="w-7.5 h-7.5 rounded-full object-cover"
            />
            {/* center */}
            <div className="flex flex-1 flex-col">
              <div className="ag-h6 font-medium text-grayscale-500 mb-1">
                Annaasti 3дн.
              </div>
              <p className="ag-h7 font-medium text-secondary leading-5 mb-0.5 pr-5">
                Эту историю придумать невозможно, только пережить
              </p>
              <div className="flex justify-between items-end gap-1">
                <span className="ag-h9 font-medium text-grayscale-500">
                  Отметки “Нравится” : 1468
                </span>

                <div className="relative">
                  {/* like */}
                  <button className="absolute top-[2px] sm:-top-5 right-0 w-5.5 h-5.5 text-black hover:opacity-80 cursor-pointer">
                    <svg className="w-5.5 aspect-square">
                      <use href="/icons/symbol/sprite.svg#like" />
                    </svg>
                  </button>

                  {/* respond */}
                  <button className="cursor-pointer text-grayscale-500 hover:text-secondary">
                    <span className="ag-h10 font-medium pr-15 sm:pr-6">
                      Ответить
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment 4*/}
        <div className="px-0 sm:px-6 pt-0  flex flex-col gap-3">
          <div className="flex gap-5 mb-2">
            {/* left */}
            <img
              src={user?.avatar}
              className="w-7.5 h-7.5 rounded-full object-cover"
            />
            {/* center */}
            <div className="flex flex-1 flex-col">
              <div className="ag-h6 font-medium text-grayscale-500 mb-1">
                Annaasti 3дн.
              </div>
              <p className="ag-h7 font-medium text-secondary leading-5 mb-0.5pr-5">
                Эту историю придумать невозможно, только пережить
              </p>
              <div className="flex justify-between items-end gap-1">
                <span className="ag-h9 font-medium text-grayscale-500">
                  Отметки “Нравится” : 1468
                </span>

                <div className="relative">
                  {/* like */}
                  <button className="absolute top-[2px] sm:-top-5 right-0 w-5.5 h-5.5 text-black hover:opacity-80 cursor-pointer">
                    <svg className="w-5.5 aspect-square">
                      <use href="/icons/symbol/sprite.svg#like" />
                    </svg>
                  </button>

                  {/* respond */}
                  <button className="cursor-pointer text-grayscale-500 hover:text-secondary">
                    <span className="ag-h10 font-medium pr-15 sm:pr-6">
                      Ответить
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Send mesage form */}

        {/* Поиск */}
        <div className="px-0 sm:px-6 mb-6 w-full flex-1">
          <div className="rounded-full px-4 min-h-[46px] border border-gray-300 flex items-center gap-3 focus-within:border-grayscale-500">
            <input
              type="text"
              placeholder="Добавить комментарий..."
              className="ag-h7 font-medium placeholder:text-grayscale-00 outline-none bg-transparent w-full"
            />

            <button
              type="submit"
              aria-label="Search"
              className="w-9 h-9 cursor-pointer rounded-full border border-grayscale-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-grayscale-500">
                <use href="/icons/symbol/sprite.svg#arrow-right" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
