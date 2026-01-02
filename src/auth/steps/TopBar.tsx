interface TopBarProps {
  canGoBack: boolean;
  onBack: () => void;
  onClose: () => void;
}

export function TopBar({ canGoBack, onBack, onClose }: TopBarProps) {
  return (
    <div className="absolute top-[5%] lg:top-[10%] right-[8%] left-[8%] flex items-center justify-between px-6 ">
      {/* Левая зона */}
      <div className="w-10">
        {canGoBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center text-xl transition cursor-pointer hover:opacity-80"
            aria-label="Назад"
          >
          <svg className="w-5 h-5 aspect-square inline-block">
            <use href="/icons/symbol/sprite.svg#chevron_l" />
          </svg>
          </button>
        )}
      </div>

      {/* Правая зона */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="text-xl flex items-center  transition cursor-pointer hover:opacity-80"
          aria-label="Закрыть"
        >
          <svg className="w-8 h-8 aspect-square inline-block">
            <use href="/icons/symbol/sprite.svg#close" />
          </svg>
        </button>
      </div>
    </div>
  );
}
