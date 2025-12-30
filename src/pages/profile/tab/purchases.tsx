import { useState } from "react";
import { PURCHASES_DATA } from "@/mocks/purchases.mocks";
import { UniversalTabs , type TabItem } from "@/components/profile/universal-tabs";

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
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");

  const purchasesTabs: TabItem[] = [
    { key: "all", label: "Все", count: PURCHASES_DATA.length },
    {
      key: "active",
      label: "Активные",
      count: PURCHASES_DATA.filter((p) => p.status !== "Доставлен").length,
    },
    { key: "completed", label: "Завершенные" },
  ];

  const filteredPurchases = PURCHASES_DATA.filter((purchase) => {
    if (activeTab === "active") return purchase.status !== "Доставлен";
    if (activeTab === "completed") return purchase.status === "Доставлен";
    return true;
  });

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Заголовок */}
      <h2 className="ag-h2 text-secondary font-medium  min-h-11">Мои покупки</h2>

      {/* Табы */}
      <UniversalTabs
        tabs={purchasesTabs}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as "all" | "active" | "completed")}
      />

      {/* Список карточек */}
      <div className="flex flex-col gap-4">
        {filteredPurchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex items-center gap-6 p-8 border rounded-lg"
          >
            {/* Изображение */}
            <img
              src={purchase.productImage}
              alt={purchase.productName}
              className="w-[140px] h-[140px] object-cover rounded-md"
            />

            {/* Средняя колонка */}
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-gray-500">Трек: {purchase.trackNumber}</span>
              <span className="font-medium text-lg">{purchase.productName}</span>
              <span className="text-gray-500">{purchase.price} ₽</span>
              <div className="flex gap-2 items-center">
                <span className="text-secondary font-medium">{purchase.status}</span>
                <span className="text-gray-500">План: {purchase.plannedDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
