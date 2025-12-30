// Конфиг бейджиков

export const STATUS_BADGE_CONFIG: Record<
  string,
  {
    className: string;
  }
> = { 
  "В пути": {
    className: "bg-grayscale-100 text-secondary",
  },
  "Доставлен": {
    className: "bg-[#43D5FA] text-white",
  },
  "Отменен": {
    className: "bg-system-red text-white",
  },
  "Завершен": {
    className: "bg-system-green text-white",
  },
};

