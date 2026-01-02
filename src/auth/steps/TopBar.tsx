interface TopBarProps {
  canGoBack: boolean;
  onBack: () => void;
  onClose: () => void;
}

export function TopBar({
  canGoBack,
  onBack,
  onClose,
}: TopBarProps) {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b">
      {/* Левая зона */}
      <div className="w-10">
        {canGoBack && (
          <button
            onClick={onBack}
            className="text-xl hover:opacity-70 transition"
            aria-label="Назад"
          >
            ←
          </button>
        )}
      </div>

      {/* Правая зона */}
      <div className="w-10 flex justify-end">
        <button
          onClick={onClose}
          className="text-xl hover:opacity-70 transition"
          aria-label="Закрыть"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
