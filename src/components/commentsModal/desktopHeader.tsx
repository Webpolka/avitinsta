import { type Look } from "@/mocks/looks.mock";
import { USERS_DATA } from "@/mocks/users.mocks";

// Пропсы для десктопного хедера в модальном окне
type HeaderModalProps = {
  look: Look; // объект образа (может понадобиться для будущих данных)
  user?: (typeof USERS_DATA)[number]; // данные пользователя, создателя образа
  subscribed: boolean; // состояние подписки на пользователя
  onToggleSubscribe: () => void; // функция переключения подписки
};

export function DesktopHeader({
  look,
  user,
  subscribed,
  onToggleSubscribe,
}: HeaderModalProps) {
  void look; // Пока look не используется, чтобы TS не ругался

  return (
    // Контейнер хедера: аватар, имя, ник и кнопка подписки
    <div className="rounded-t-xl border-2 border-grayscale-100 flex items-center justify-between p-5">
      {/* Левая часть: аватар + имя */}
      <div className="flex items-center gap-3">
        {user?.avatar && (
          <img
            src={user.avatar}
            className="w-10 h-10 sm:w-15 sm:h-15 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          {/* Имя пользователя */}
          <span className="ag-h6 sm:ag-h4 font-medium text-secondary">
            {user?.name}
          </span>
          {/* Никнейм пользователя */}
          {user?.handle && (
            <span className="ag-h9 text-grayscale-300 font-medium">
              {user.handle}
            </span>
          )}
        </div>
      </div>

      {/* Кнопка подписки/отписки */}
      <button
        onClick={onToggleSubscribe}
        className={`ag-h8 md:ag-h7 font-medium hover:opacity-80 cursor-pointer ${
          subscribed ? "text-grayscale-500" : "text-secondary"
        }`}
      >
        {subscribed ? "Отписаться" : "Подписаться"}
      </button>
    </div>
  );
}
