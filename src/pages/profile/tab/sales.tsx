import { SALES_DATA } from "@/mocks/sales.mocks";
import { useState } from "react";
import {
  UniversalTabs,
  type TabItem,
} from "@/components/profile/universal-tabs";

// export type SaleData = {
//   id: string;
//   productName: string;
//   productImage: string;
//   price: number;
//   buyerName: string;
//   status: "Оплачено" | "Готов к отправке" | "Отменен" | "Завершено";
// };

const STATUS_BADGE_CONFIG: Record<
  string,
  {
    className: string;
  }
> = {
  Оплачен: {
    className: "bg-system-green/10 text-system-green",
  },
  "Готовится к отправке": {
    className: "bg-grayscale-100 text-secondary",
  },
  "Едет к получателю": {
    className: "bg-[#08f] text-white",
  },
  Отменен: {
    className: "bg-system-red text-white",
  },
  Завершен: {
    className: "bg-system-green text-white",
  },
};

export function ProfileTabSales() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">(
    "all"
  );

  // Табы
  const salesTabs: TabItem[] = [
    { key: "all", label: "Все", count: SALES_DATA.length },
    {
      key: "active",
      label: "Активные",
      count: SALES_DATA.filter((s) => s.status !== "Завершен" && s.status !== "Отменен").length,
    },
    { key: "completed", label: "Завершенные" },
  ];

  // фильтр
  const filteredSales = SALES_DATA.filter((sale) => {
    if (activeTab === "active") return(sale.status !== "Завершен" && sale.status !== "Отменен");
    if (activeTab === "completed") return sale.status === "Завершен";
    return true;
  });

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Заголовок + кнопка */}
      <h2 className="ag-h2 text-secondary font-medium  min-h-11">
        Мои продажи
      </h2>

      {/* Табы */}
      <UniversalTabs
        tabs={salesTabs}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as "all" | "active" | "completed")}
      />

      {/* Список карточек */}
      <div className="flex flex-col gap-4">
        {filteredSales.map((sale) => (
          <div
            key={sale.id}
            className="flex gap-6 py-7.5 px-6 bg-grayscale-white border border-grayscale-100 rounded-xl"
          >
            {/* Изображение */}
            <img
              src={sale.productImage}
              alt={sale.productName}
              className="bg-grayscale-100 w-[140px] h-[140px] object-cover shrink-0 mr-10"
            />

            {/* Средняя колонка */}
            <div className="self-end flex-1 flex flex-col gap-2">
              <span className="font-medium text-secondary ag-h2">
                {sale.productName}
              </span>
              <span className="text-grayscale-700 ag-h3">{sale.price} ₽</span>
              <span className="text-grayscale-700 font-medium ag-h6">
                Покупатель: {sale.buyerName}
              </span>
              <span
                className={`self-start text-secondary font-medium ag-h4 rounded-xl min-h-8 flex items-center px-6
                  ${STATUS_BADGE_CONFIG[sale.status]?.className ?? ""}`}
              >
                {sale.status}
              </span>
            </div>

            {/* Кнопка отмены */}
            {sale.status !== "Завершен" && sale.status !== "Отменен" && (
              <button className="self-start px-7.5 min-h-11 flex items-center justify-center border border-system-red text-system-red border-solid text-system-red cursor-pointer hover:opacity-80">
                Отменить
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
