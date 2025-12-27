import { NavLink } from "react-router-dom";

type ProfileTabsProps = {
  userId?: string;
  mode: "private" | "public-with-media" | "public-no-media";
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export function ProfileTabs({
  userId,
  mode,
  activeTab,
  setActiveTab,
}: ProfileTabsProps) {
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
    <div className="flex flex-wrap justify-between gap-1 sm:gap-4 mb-10">
      {tabs.map((tab) => {
        const isTabActive =
          activeTab === tab.path || activeTab === tab.label.toLowerCase();

        return (
          <div  key={tab.path} className="inline-flex flex-1 justify-center shrink-0">
          <NavLink
           
            to={tab.path}
            onClick={() => setActiveTab(tab.path)}
            end
            className={`px-3 sm:px-6 min-h-9.5 rounded-xl flex items-center ${
              isTabActive
                ? "text-secondary border bg-grayscale-white border-grayscale-300"
                : "text-grayscale-300 hover:text-grayscale-500"
            }`}
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
          </div>
        );
      })}
    </div>
  );
}
