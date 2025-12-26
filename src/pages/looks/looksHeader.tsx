// Пропсы для компонента шапки страницы (заголовок + поиск)
export type LooksHeaderProps = {
  query: string; // текущее значение поля поиска
  onChange: (value: string) => void; // callback при изменении текста в input
  onSubmit: () => void; // callback при нажатии Enter или кнопки поиска
};

// Компонент заголовка и поиска
export function LooksHeader({ query, onChange, onSubmit }: LooksHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-y-5">
      {/* Заголовок страницы */}
      <h1 className="ag-h1 lg:ag-w3 font-semibold text-secondary order-1">
        Образы
      </h1>

      {/* Блок поиска */}
      <div className="order-3 w-full md:order-2 md:flex-1 md:ml-[60px] md:mr-[100px] lg:ml-[100px] lg:mr-[125px]">
        <div className="rounded-full px-3 min-h-[46px] border border-gray-300 flex items-center gap-3">
          {/* Кнопка поиска */}
          <button onClick={onSubmit} aria-label="Search">
            <svg className="w-7.5 h-7.5 text-grayscale-500">
              <use href="/icons/symbol/sprite.svg#search" />
            </svg>
          </button>

          {/* Поле ввода поиска */}
          <input
            value={query} // значение из пропсов
            onChange={(e) => onChange(e.target.value)} // обновление родительского state
            onKeyDown={(e) => e.key === "Enter" && onSubmit()} // отправка по Enter
            placeholder="Поиск по хештегам"
            className="ag-h6 font-medium outline-none bg-transparent w-full"
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
