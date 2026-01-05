import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ProfileTabsProps = {
  userId?: string;
  mode: "private" | "public";
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
          { label: "Профиль", icon: "user", path: "info" },
          { label: "Товары", icon: "boxes", path: "products" },
          { label: "Покупки", icon: "bag_l", path: "purchases" },
          { label: "Продажи", icon: "paper", path: "sales" },
          { label: "Избранные", icon: "favorite", path: "favourites" },
          { label: "Чаты", icon: "comment", path: "chats" },
          { label: "Публикации", icon: "insta", path: "looks" },
        ]
      : mode === "public"
      ? [
          { label: "История покупок", icon: "", path: `/user/${userId}/purchases` },        
        ] 
      : [];

 return (
  <div className="flex flex-wrap -ml-1 -mr-1 mb-10 sm:mb-12 xl:flex-nowrap gap-y-4.5 gap-x-[2.5%] sm:gap-x-[7.5%] xl:gap-x-[4.8%]">
    {tabs.map((tab) => {
      return (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === "info"}
          className={({ isActive }) => {
            if (mode === "private") {
              // === Private Mode ===
              return `min-h-9.5 rounded-xl flex items-center px-[9px] sm:px-6 ${
                isActive
                  ? "text-secondary border bg-grayscale-white border-grayscale-300"
                  : "text-grayscale-300 hover:text-grayscale-500 border border-transparent bg-transparent"
              }`;
            } else {
              // === Public Mode ===
              return `min-h-9.5 rounded-xl flex items-center px-[9px] sm:px-6 ${
                isActive
                  ? "text-secondary border bg-grayscale-white border-grayscale-300"
                  : "text-grayscale-300 border border-grayscale-300 bg-white"
              }`;
            }
          }}
        >
          <div className="flex gap-1 sm:gap-2 items-center">
            {tab.icon && (
              <svg className="w-6 h-6 aspect-square inline-block">
                <use href={`/icons/symbol/sprite.svg#${tab.icon}`} />
              </svg>
            )}
            <span className="ag-h7 sm:ag-h4 font-medium">{tab.label}</span>
          </div>
        </NavLink>
      );
    })}
  </div>
);

}
