// Конфиг бейджиков

export const STATUS_BADGE_CONFIG: Record<
  string,
  {
    className: string;
  }
> = { 
  "Оплачен - готов к отправке": {
    className: "bg-grayscale-100 text-secondary",
  },
  "Едет к получателю": {
    className: "bg-[#08f] text-white",
  },
  "Отменен": {
    className: "bg-system-red text-white",
  },
  "Завершен": {
    className: "bg-system-green text-white",
  },
};
