import { useEffect, useState } from "react";
import { type Look } from "@/mocks/looks.mock";
import { useDebounce } from "@/hooks/debounce";

import { fetchLooksByHashtag } from "./api.ts";
import { LooksHeader } from "./looksHeader.tsx";
import { LookCard } from "./looksCard.tsx";

export function Looks() {
  // текущее значение поиска
  const [query, setQuery] = useState("");
  // дебаунс для авто-поиска
  const debouncedQuery = useDebounce(query);
  // список образов для отображения
  const [looks, setLooks] = useState<Look[]>([]);
  // состояние загрузки
  const [loading, setLoading] = useState(false);

  // авто-поиск с debounce
  useEffect(() => {
    let ignore = false; // флаг, чтобы отменить обновление стейта при unmount

    (async () => {
      setLoading(true); // включаем индикатор загрузки
      const data = await fetchLooksByHashtag(debouncedQuery); // получаем данные
      if (!ignore) {
        setLooks(data); // обновляем список образов
        setLoading(false); // отключаем загрузку
      }
    })();

    return () => {
      ignore = true; // при размонтировании компонента игнорируем результат fetch
    };
  }, [debouncedQuery]);

  // ручной поиск по Enter или кнопке лупы
  const handleSubmit = async () => {
    setLoading(true);
    const data = await fetchLooksByHashtag(query);
    setLooks(data);
    setLoading(false);
  };

  return (
    <div className="pt-5 pb-45 px-4 sm:px-22">
      {/* Верхний блок: заголовок + поиск */}
      <div className="xl:px-15 mb-5 lg:mb-10">
        <LooksHeader
          query={query}
          onChange={setQuery} // обновляем query
          onSubmit={handleSubmit} // ручной поиск
        />
      </div>

      {/* Состояние загрузки или лента карточек */}
      {/* Состояние загрузки, пустого результата или лента карточек */}
      {loading ? (
        <div className="text-center text-grayscale-500">Загрузка…</div>
      ) : looks.length === 0 ? (
        <div className="text-center text-grayscale-500">
          По вашему запросу ничего не найдено
        </div>
      ) : (
        <div className="px-0 md:px-[50px] xl:px-[200px]">
          <div className="flex flex-col gap-10 sm:gap-[65px] md:gap-[85px]">
            {looks.map((look) => (
              <LookCard key={look.id} look={look} /> // каждая карточка образа
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
