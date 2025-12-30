import { useState } from "react";
import {
  UniversalTabs,
  type TabItemData,
} from "@/components/profile/universal-tabs";
import { STATUS_BADGE_CONFIG } from "./purchases.config";
import { formatDotPrice } from "@/hooks/utils";

import { PURCHASES_DATA } from "@/mocks/purchases.mocks";

// Интерфейс итема для PURCHASES_DATA (Мои покупки)
// export type PurchaseData = {
//   id: string;
//   productName: string;
//   productImage: string;
//   price: number;
//   trackNumber: string;
//   status: "В пути" | "Доставлен" | "Отменено";
//   plannedDate: string; // пример: "25.11.2025"
// };

export function ProfileTabPurchases() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">(
    "all"
  );

  const purchasesTabs: TabItemData[] = [
    { key: "all", label: "Все", count: PURCHASES_DATA.length },
    {
      key: "active",
      label: "Активные",
      count: PURCHASES_DATA.filter((p) => p.status !== "Доставлен" && p.status !== "Отменен").length,
    },
    { key: "completed", label: "Завершенные",
      count: PURCHASES_DATA.filter((p) => p.status == "Доставлен").length,
     },
  ];

  const filteredPurchases = PURCHASES_DATA.filter((purchase) => {
    if (activeTab === "active") return purchase.status !== "Доставлен" && purchase.status !== "Отменен";
    if (activeTab === "completed") return purchase.status === "Доставлен";
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Заголовок */}
      <h2 className="ag-h2 text-secondary font-medium  min-h-11">
        Мои покупки
      </h2>

      {/* Табы */}
      <UniversalTabs
        tabs={purchasesTabs}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as "all" | "active" | "completed")}
      />

      {/* Список карточек */}
      <div className="flex flex-col gap-10 mt-5 sm:mt-0">
        {filteredPurchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex-col md:flex-row flex py-7.5 px-3 sm:px-6 bg-grayscale-white border border-grayscale-100 rounded-xl gap-5 md:gap-0"
            
          >
            {/* Изображение */}
            <div className="flex flex-1 gap-6">
              <img
                src={purchase.productImage}
                alt={purchase.productName}
                className="bg-grayscale-300 w-25 h-25 md:w-[140px] md:h-[140px] object-cover shrink-0 -mr-2 md:mr-10"
              />

              {/* Средняя колонка */}
              <div className="self-center md:self-end flex-1 flex flex-col gap-2 ">
                <span className="hidden sm:block font-medium text-grayscale-700 ag-h6">
                  Трек: {purchase.trackNumber}
                </span>
                <span className="font-medium text-secondary ag-h2">
                  {purchase.productName}
                </span>
                <span className="text-grayscale-700 ag-h3">
                  {formatDotPrice(purchase.price)} ₽
                </span>
                <div className="hidden md:flex gap-3 items-center">
                  <span
                    className={`flex self-start text-secondary font-medium ag-h4 rounded-xl min-h-8 items-center px-6 whitespace-nowrap 
                  ${STATUS_BADGE_CONFIG[purchase.status]?.className ?? ""}`} // Конфиг для бейджиков
                  >
                    {purchase.status}
                  </span>
                  {purchase.status == "В пути" && purchase.plannedDate && (
                    <span className="text-grayscale-700 ag-h6 font-medium">
                      Планируемая дата: {purchase.plannedDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Отображение для мообильной версии */}
            <span className="md:hidden font-medium text-grayscale-700 ag-h6 -mt-2">
              Трек: {purchase.trackNumber}
            </span>

            <div className="md:hidden flex gap-3 items-center">
              <span
                className={`flex sm:self-start text-secondary font-medium ag-h4 rounded-xl min-h-8 items-center px-6 whitespace-nowrap 
                  ${STATUS_BADGE_CONFIG[purchase.status]?.className ?? ""}`} // Конфиг для бейджиков
              >
                {purchase.status}
              </span>
              {purchase.status == "В пути" && purchase.plannedDate && (
                <span className="text-grayscale-700 ag-h8 sm:ag-h6 font-medium">
                  Планируемая дата: {purchase.plannedDate}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
