import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UniversalTabs,
  type TabItemData,
} from "@/components/profile/universal-tabs";
import { formatDotPrice } from "@/hooks/utils";

import { ADS_DATA } from "@/mocks/ads.mocks";

// Интерфейс итема для ADS_DATA (Мои объявления)
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

  const adsTabs: TabItemData[] = [
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
    <div className="flex flex-col gap-4">
      {/* Заголовок + кнопка */}
      <div className="flex justify-between items-center">
        <h2 className="ag-h2 text-secondary font-medium min-h-11">
          Мои объявления
        </h2>
        <Link
          to="/product/add"
          className="hidden sm:flex ag-h8 px-6 py-2 min-h-11 items-center bg-[#08f] text-white hover:opacity-80"
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

      
      {/* мобильная кнопка добавить товар */}
      <Link
        to="/product/add"
        className="-mt-3 mb-5 self-start flex sm:hidden ag-h8 px-6 py-2 min-h-11 flex items-center bg-[#08f] text-white hover:opacity-80"
      >
        Создать объявление
      </Link>

      {/* Список карточек */}
      <div className="flex flex-col gap-10 mt-5 sm:mt-0">
        {filteredAds.map((ad) => (
          <div
            key={ad.id}
            className="flex-col md:flex-row flex py-7.5 px-3 sm:px-6 bg-grayscale-white border border-grayscale-100 rounded-xl gap-5 md:gap-0 md:items-center"
          >
            {/* Левая колонка: изображение */}
            <div className="flex flex-1 gap-6">
              <img
                src={ad.image}
                alt={ad.title}
                className="bg-grayscale-300 w-25 h-25 md:w-[140px] md:h-[140px] object-cover shrink-0 -mr-2 md:mr-10"
              />

              {/* Средняя колонка */}
              <div className="flex-1 flex flex-col gap-2 justify-center">
                {/* 1 ряд: заголовок и цена */}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-secondary ag-h2">
                    {ad.title}
                  </span>
                </div>

                <span className="text-grayscale-700 ag-h3">
                  {formatDotPrice(ad.price || 0)} ₽
                </span>

                {/* 2 ряд: просмотры и лайки */}
                <div className="flex gap-3 items-center mt-0.5">
                  <div className="flex gap-1 items-center text-gray-500">
                    <svg className="w-4.5 h-4.5 inline-block fill-none stroke-grayscale-700">
                      <use href="/icons/symbol/sprite.svg#view" />
                    </svg>
                    <span className="ag-h8 text-grayscale-700">{ad.views}</span>
                  </div>
                  <div className="flex gap-1 items-center text-gray-500">
                    <svg className="w-4.5 h-4.5 inline-block fill-none stroke-grayscale-700">
                      <use href="/icons/symbol/sprite.svg#like" />
                    </svg>
                    <span className="ag-h8 text-grayscale-700">{ad.likes}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка: кнопки */}
            <div className="flex flex-col gap-5 mt-2 sm:mt-0">
              <button className="w-full sm:self-start px-7.5 min-h-11 flex items-center justify-center border border-grayscale-100  border-solid text-secondary cursor-pointer hover:opacity-80">
                Редактировать
              </button>

              <button className="w-full sm:self-start px-7.5 min-h-11 flex items-center justify-center border border-grayscale-100 border-solid text-secondary cursor-pointer hover:opacity-80">
                Снять с продажи
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
