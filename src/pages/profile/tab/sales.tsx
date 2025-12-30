import { useState } from "react";
import {
  UniversalTabs,
  type TabItemData,
} from "@/components/profile/universal-tabs";
import { STATUS_BADGE_CONFIG } from "./sales.config";
import { formatDotPrice } from "@/hooks/utils";

import { SALES_DATA } from "@/mocks/sales.mocks";

// Интерфейс итема для SALES_DATA (Мои продажи)
// export type SaleData = {
//   id: string;
//   productName: string;
//   productImage: string;
//   price: number;
//   buyerName: string;
//   status: "Оплачен - готов к отправке" | "Едет к получателю" | "Отменен" | "Завершен";
// };

export function ProfileTabSales() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">(
    "all"
  );

  // Табы
  const salesTabs: TabItemData[] = [
    { key: "all", label: "Все", count: SALES_DATA.length },
    {
      key: "active",
      label: "Активные",
      count: SALES_DATA.filter(
        (s) => s.status !== "Завершен" && s.status !== "Отменен"
      ).length,
    },
    { key: "completed", label: "Завершенные" ,
      count: SALES_DATA.filter((s) => s.status == "Завершен").length
    },
  ];

  // фильтр
  const filteredSales = SALES_DATA.filter((sale) => {
    if (activeTab === "active")
      return sale.status !== "Завершен" && sale.status !== "Отменен";
    if (activeTab === "completed") return sale.status === "Завершен";
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-10 mt-5 sm:mt-0">
        {filteredSales.map((sale) => (
          <div
            key={sale.id}
            className="flex-col md:flex-row flex py-7.5 px-3 sm:px-6 bg-grayscale-white border border-grayscale-100 rounded-xl gap-5 md:gap-0"
          >
            {/* Изображение */}
            <div className="flex flex-1 gap-6">
              <img
                src={sale.productImage}
                alt={sale.productName}
                className="bg-grayscale-300 w-25 h-25 md:w-[140px] md:h-[140px] object-cover shrink-0 -mr-2 md:mr-10"
              />

              {/* Средняя колонка */}
              <div className="self-center md:self-end flex-1 flex flex-col gap-2 ">
                <span className="font-medium text-secondary ag-h2">
                  {sale.productName}
                </span>
                <span className="text-grayscale-700 ag-h3">
                  {formatDotPrice(sale.price)} ₽
                </span>
                <span className="text-grayscale-700 font-medium ag-h6 hidden md:block">
                  Покупатель: {sale.buyerName}
                </span>
                <span
                  className={`hidden md:flex self-start text-secondary font-medium ag-h4 rounded-xl min-h-8 items-center px-6
                  ${STATUS_BADGE_CONFIG[sale.status]?.className ?? ""}`} // Конфиг для бейджиков
                >
                  {sale.status}
                </span>
              </div>
            </div>

            {/* mobile badge */}
            <span
              className={`md:hidden self-start text-secondary font-medium ag-h4 rounded-xl min-h-8 flex items-center px-6
                  ${STATUS_BADGE_CONFIG[sale.status]?.className ?? ""}`} // Конфиг для бейджиков
            >
              {sale.status}
            </span>

            {/* Кнопка отмены */}
            {sale.status !== "Завершен" && sale.status !== "Отменен" && (
              <div className="flex flex-col gap-2">
                <button className="w-full sm:self-start px-7.5 min-h-11 flex items-center justify-center border border-system-red text-system-red border-solid cursor-pointer hover:opacity-80">
                  Отменить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
