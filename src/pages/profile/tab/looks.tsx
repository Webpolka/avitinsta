import { useEffect, useState } from "react";

import { useUser } from "@/context/use.all";
import { LOOKS_DATA, type Look } from "@/mocks/looks.mock";
import { COMMENTS_DATA } from "@/mocks/comment.mock";
import { CommentsModal } from "@/components/commentsModal/commentsModal";

/* =========================
   Component: ProfileTabLooks
   Вкладка "Публикации"
========================= */

export function ProfileTabLooks() {
  const { user } = useUser();

  const [userLooks, setUserLooks] = useState<Look[]>([]);
  const [activeLook, setActiveLook] = useState<Look | null>(null);

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>(
    {}
  );
  const [subscribedMap, setSubscribedMap] = useState<Record<string, boolean>>(
    {}
  );

  /* =========================
     Инициализация данных
  ========================= */

  useEffect(() => {
    if (!user) return;

    const looks = LOOKS_DATA.filter((look) => look.user.id === user.id);

    const likedInit: Record<string, boolean> = {};
    const likesInit: Record<string, number> = {};
    const subsInit: Record<string, boolean> = {};

    looks.forEach((look) => {
      likedInit[look.id] = look.isLiked ?? false;
      likesInit[look.id] = look.likesCount ?? 0;
      subsInit[look.id] = false;
    });

    const wrap = () => {
      setUserLooks(looks);
      setLikedMap(likedInit);
      setLikesCountMap(likesInit);
      setSubscribedMap(subsInit);
    };
    wrap();
  }, [user]);

  /* =========================
     Обработчики
  ========================= */

  const toggleLike = (lookId: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [lookId]: !prev[lookId],
    }));

    setLikesCountMap((prev) => ({
      ...prev,
      [lookId]: likedMap[lookId] ? prev[lookId] - 1 : prev[lookId] + 1,
    }));
  };

  const toggleSubscribe = (lookId: string) => {
    setSubscribedMap((prev) => ({
      ...prev,
      [lookId]: !prev[lookId],
    }));
  };

  /* =========================
     Render
  ========================= */

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-2 xl:pt-5">
        {userLooks.map((look, index) => {
          const commentsCount = COMMENTS_DATA.filter(
            (c) => c.lookId === look.id
          ).length;

          return (
            <div
              key={look.id + index}
              onClick={() => setActiveLook(look)}
              className="group relative overflow-hidden rounded-xl bg-grayscale-100 cursor-pointer
                xl:aspect-[253/376]
                sm:aspect-[210/376]
                aspect-[171/300]
              "
            >
              {/* IMAGE */}
              <img
                src={look.image}
                alt={look.description ?? "look"}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0  flex items-end justify-center pb-5">
                <div className="flex gap-[20px]">
                  {/* LIKE */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(look.id);
                    }}
                    className="flex flex-col items-center gap-2 text-white hover:opacity-80 cursor-pointer"
                  >
                    <svg
                      className={`w-6 h-6 ${
                        likedMap[look.id]
                          ? "fill-red-500 stroke-red-500"
                          : "fill-white stroke-white"
                      }`}
                    >
                      <use href="/icons/symbol/sprite.svg#heart" />
                    </svg>
                    <span className="ag-h6 font-medium">
                      {likesCountMap[look.id]}
                    </span>
                  </button>

                  {/* COMMENTS */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLook(look);
                    }}
                    className="flex flex-col items-center gap-2 text-white hover:opacity-80 cursor-pointer"
                  >
                    <svg className="w-6 h-6 fill-white">
                      <use href="/icons/symbol/sprite.svg#comment" />
                    </svg>
                    <span className="ag-h6 font-medium">{commentsCount}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMMENTS MODAL */}
      {activeLook && (
        <CommentsModal
          look={activeLook}
          onClose={() => setActiveLook(null)}
          lookLiked={likedMap[activeLook.id]}
          lookLikesCount={likesCountMap[activeLook.id]}
          toggleLookLike={() => toggleLike(activeLook.id)}
          subscribed={subscribedMap[activeLook.id]}
          onToggleSubscribe={() => toggleSubscribe(activeLook.id)}
        />
      )}
    </>
  );
}
