import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ProfileTabsProps = {
  userId?: string;
  mode: "private" | "public-with-media" | "public-no-media";
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export function ProfileTabs({ userId, mode, setActiveTab }: ProfileTabsProps) {
  const location = useLocation();

  useEffect(() => {
    const lastSegment = location.pathname.split("/").pop();
    if (lastSegment) {
      setActiveTab(lastSegment);
    }
  }, [location.pathname, setActiveTab]);

  if (!userId && mode !== "private") return null;

  const tabs =
    mode === "private"
      ? [
          { label: "Профиль", icon: "user", path: "profile" },
          { label: "Товары", icon: "boxes", path: "products" },
          { label: "Покупки", icon: "bag_l", path: "purchases" },
          { label: "Продажи", icon: "paper", path: "sales" },
          { label: "Избранные", icon: "favorite", path: "favourites" },
          { label: "Чаты", icon: "comment", path: "chats" },
          { label: "Публикации", icon: "insta", path: "posts" },
        ]
      : mode === "public-with-media"
      ? [
          { label: "История покупок", icon: "", path: `/u/${userId}/products` },
          { label: "Контакты", icon: "", path: `/u/${userId}/contacts` }, // будет 404 (страница не существует)
        ]
      : mode === "public-no-media"
      ? [{ label: "История покупок", icon: "", path: `/purchases/${userId}` }]
      : [];

  return (
    <div className="flex flex-wrap gap-4 mb-10">
      {tabs.map((tab) => {
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === "profile"}
            className={({ isActive }) =>
              `px-6 min-h-9.5 rounded-xl flex items-center ${
                isActive
                  ? "text-secondary border bg-grayscale-white border-grayscale-300"
                  : "text-grayscale-300 hover:text-grayscale-500"
              }`
            }
          >
            <div className="flex gap-2 items-center ">
              {tab.icon && (
                <svg className="w-6 h-6 aspect-square inline-block">
                  <use href={`/icons/symbol/sprite.svg#${tab.icon}`} />
                </svg>
              )}

              <span className="ag-h4 font-medium">{tab.label}</span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
