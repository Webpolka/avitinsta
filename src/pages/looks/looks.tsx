import { useEffect, useState } from "react";
import { type Look } from "@/mocks/looks.mock";
import { useDebounce } from "@/hooks/debounce";

import { fetchLooksByHashtag } from "./api.ts";
import { LooksHeader } from "@/components/looks/looksHeader.tsx";
import { LookCard } from "@/components/looks/looksCard.tsx";
import { AddLookModal } from "@/components/looks/addLookModal.tsx";

import { USERS_DATA } from "@/mocks/users.mocks.ts";

export function Looks() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const [looks, setLooks] = useState<Look[]>([]);
  const [loading, setLoading] = useState(false);

  // управление открытием модалки
  const [isAddOpen, setIsAddOpen] = useState(false);

  // авто-поиск с debounce
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

  // ручной поиск по Enter / кнопке
  const handleSubmit = async () => {
    setLoading(true);
    const data = await fetchLooksByHashtag(query);
    setLooks(data);
    setLoading(false);
  };

  // добавить образ
  const handleAddLook = (newLook: {
    file: File | null;
    description: string;
    hashtags: string[];
  }) => {
    const id = `tmp-${Date.now()}`; // временный id
    const createdAt = new Date().toISOString();
    const look: Look = {
      id,
      user: USERS_DATA[0],
      image: newLook.file ? URL.createObjectURL(newLook.file) : "",
      description: newLook.description,
      hashtags: newLook.hashtags,
      likesCount: 0,
      viewsCount: 0,
      commentsCount: 0,

      isLiked: false,
      isSaved: false,
      createdAt,
    };

    setLooks((prev) => [look, ...prev]);
  };

  // удалить первый образ
  const handleDeleteFirst = () => {
    setLooks((prev) => prev.slice(1));
  };

  return (
    <div className="pt-5 pb-45 px-4 sm:px-22">
      {/* Заголовок + поиск + кнопка "плюс" */}
      <div className="xl:px-15 mb-5 lg:mb-10 flex items-center justify-between">
        <LooksHeader
          query={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          onAdd={() => setIsAddOpen(true)}
          onDelete={handleDeleteFirst}
        />
      </div>

      {/* Состояние загрузки или лента карточек */}
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
              <LookCard key={look.id} look={look} />
            ))}
          </div>
        </div>
      )}

      {/* Модальное окно добавления образа */}
      {isAddOpen && (
        <AddLookModal
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleAddLook}
        />
      )}
    </div>
  );
}
