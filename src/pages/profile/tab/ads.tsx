import { useState } from "react";
import { Link } from "react-router-dom";
import { ADS_DATA } from "@/mocks/ads.mocks";
import {
  UniversalTabs,
  type TabItem,
} from "@/components/profile/universal-tabs";

// export type Ad = {
//   id: string | number;
//   image: string;
//   title: string;
//   price?: number;
//   buyerName?: string;
//   status?: string;
//   plannedDate?: string;
//   views?: number;
//   likes?: number;
// };

export function ProfileTabAds() {
  const [activeTab, setActiveTab] = useState<"active" | "sold" | "drafts">(
    "active"
  );

  const adsTabs: TabItem[] = [
    {
      key: "active",
      label: "Активные",
      count: ADS_DATA.filter((l) => l.status === "active").length,
    },
    {
      key: "sold",
      label: "Проданные",
      count: ADS_DATA.filter((l) => l.status === "sold").length,
    },
    {
      key: "drafts",
      label: "Черновики",
      count: ADS_DATA.filter((l) => l.status === "draft").length,
    },
  ];

  const filteredAds = ADS_DATA.filter((ad) => {
    if (activeTab === "active") return ad.status === "active";
    if (activeTab === "sold") return ad.status === "sold";
    if (activeTab === "drafts") return ad.status === "draft";
    return true;
  });

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Заголовок + кнопка */}
      <div className="flex justify-between items-center">
        <h2 className="ag-h2 text-secondary font-medium min-h-11">Мои объявления</h2>
        <Link
          to="/product/add"
          className="ag-h8 px-6 py-2 min-h-11 flex items-center bg-[#08f] text-white hover:opacity-80"
        >
          Создать объявление
        </Link>
      </div>

      {/* Табы */}
      <UniversalTabs
        tabs={adsTabs}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as "active" | "sold" | "drafts")}
      />

      {/* Список карточек */}
      <div className="flex flex-col gap-4">
        {filteredAds.map((ad) => (
          <div
            key={ad.id}
            className="flex items-start gap-6 p-8 border rounded-lg"
          >
            {/* Левая колонка: изображение */}
            <img
              src={ad.image}
              alt={ad.title}
              className="w-[140px] h-[140px] object-cover rounded-md"
            />

            {/* Средняя колонка */}
            <div className="flex-1 flex flex-col gap-2">
              {/* 1 ряд: заголовок и цена */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">{ad.title}</span>
                <span className="font-medium text-gray-700">{ad.price} ₽</span>
              </div>

              {/* 2 ряд: просмотры и лайки */}
              <div className="flex gap-4 items-center">
                <div className="flex gap-1 items-center text-gray-500">
                  <svg className="w-4.5 h-4.5 inline-block ml-1.5">
                    <use href="/icons/symbol/sprite.svg#view" />
                  </svg>
                  <span>{ad.views}</span>
                </div>
                <div className="flex gap-1 items-center text-gray-500">
                  <svg className="w-4.5 h-4.5 inline-block ml-1.5">
                    <use href="/icons/symbol/sprite.svg#heart" />
                  </svg>
                  <span>{ad.likes}</span>
                </div>
              </div>
            </div>

            {/* Правая колонка: кнопки */}
            <div className="flex flex-col gap-2">
              <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
                Редактировать
              </button>
              <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
                Снять с продажи
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
