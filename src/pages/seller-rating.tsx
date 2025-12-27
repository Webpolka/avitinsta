import { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  SELLER_DATA,
  type SellerReview,
  type SellerData,
} from "@/mocks/seller-rating.mock";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import StarRating from "@/ui/star-rating";
import StarBlackRating from "@/ui/star-black-rating";

type RatingFilter = "all" | 1 | 2 | 3 | 4 | 5;

// -----------------------------------
// Левый блок: статистика и распределение
// -----------------------------------
function RatingDistribution({
  ratingStats,
}: {
  ratingStats: SellerData["productRating"];
}) {
  const { average, totalCount } = calculateAverageRating(
    ratingStats.distribution
  );

  return (
    <div className=" flex gap-5 justify-center sm:justify-start">
      {/* Итоговый рейтинг */}
      <div className="flex flex-col gap-2.5 sm:gap-1">
        <span className="ag-w1 text-center text-secondary font-semibold">
          {average.toFixed(1)}
        </span>

        {/* rating stars */}

        <div className="flex gap-[2px]">
          {Array.from({ length: 5 }, (_, index) => {
            const isFilled = index < Math.floor(average);
            return (
              <svg
                key={`star-${index}`}
                className="w-6 h-6 sm:w-7.5 sm:h-7.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  href={
                    isFilled
                      ? "/icons/symbol/sprite.svg#star_b"
                      : "/icons/symbol/sprite.svg#star_be"
                  }
                />
              </svg>
            );
          })}
        </div>      
        <span className="ag-h6 text-center text-secondary font-medium">
          {totalCount} оценок
        </span>
      </div>

      {/* Распределение с прогресс-барами */}
      <div className="hidden sm:flex flex-auto flex-col">
        {ratingStats.distribution.map((row) => (
          <div  key={`star-row-${row.stars}`} className="flex items-center gap-2">
            {/* Левая часть: цифра + одна звезда */}
            <div className="flex items-center justify-between w-9">
              <span className="font-normal ag-h6 text-secondary">
                {row.stars}
              </span>
              <svg className="w-4.5 h-4.5 aspect-square inline-block">
                <use href="/icons/symbol/sprite.svg#star_b" />
              </svg>
            </div>

            {/* Прогресс-бар: 2px высотой */}
            <div className="flex-1 h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400"
                style={{ width: `${row.percentage}%` }}
              />
            </div>

            {/* Правая часть: только процент */}
            <div className="text-secondary font-medium ag-h10 w-5 text-left">
              {row.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateAverageRating(
  distribution: { stars: number; count: number }[]
) {
  const totalCount = distribution.reduce((sum, r) => sum + r.count, 0);

  const totalScore = distribution.reduce(
    (sum, r) => sum + r.stars * r.count,
    0
  );

  const average = totalCount === 0 ? 0 : totalScore / totalCount;

  return {
    average,
    totalCount,
  };
}

function PhotoSlider({
  photos,
  filter,
  onFilterChange,
}: {
  photos: string[];
  filter: "all" | 1 | 2 | 3 | 4 | 5;
  onFilterChange: (v: RatingFilter) => void;
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // формируем слайды + плейсхолдеры
  const slides = [...photos];
  const placeholderCount = Math.max(0, 4 - slides.length);
  for (let i = 0; i < placeholderCount; i++) {
    slides.push("");
  }

  const updateNavState = () => {
    if (!swiperRef.current) return;
    setIsBeginning(swiperRef.current.isBeginning);
    setIsEnd(swiperRef.current.isEnd);
  };

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperRef.current.slideTo(0, 0);
    swiperRef.current.update();
  }, [photos]);

  const handleUpdate = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const canNavigate = slides.length > 4;

  return (
    <div className="max-w-full select-none hidden sm:block">
      {/* Header */}
      <div className="lg:absolute lg:-top-12 lg:right-0 flex justify-end gap-10 min-h-6 mb-8">
        <button
          className={`photo-prev cursor-pointer transition-opacity ${
            isBeginning ? "opacity-30 pointer-events-none" : ""
          } ${canNavigate ? "" : " text-transparent"}`}
        >
          <svg className="w-6 h-3">
            <use href="/icons/symbol/sprite.svg#arrow-left" />
          </svg>
        </button>

        <button
          className={`photo-next cursor-pointer transition-opacity ${
            isEnd ? "opacity-30 pointer-events-none" : ""
          } ${canNavigate ? "" : " text-transparent"}`}
        >
          <svg className="w-6 h-3">
            <use href="/icons/symbol/sprite.svg#arrow-right" />
          </svg>
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={23}
        navigation={{
          prevEl: ".photo-prev",
          nextEl: ".photo-next",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavState();
          handleUpdate(swiper); // первичная инициализация
        }}
        onSlideChange={(swiper) => {
          handleUpdate(swiper);
          updateNavState();
        }}
        onUpdate={handleUpdate}
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square overflow-hidden bg-grayscale-300 flex items-center justify-center">
              {src && (
                <img
                  src={src}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Фильтр */}
      <div className="flex gap-7.5 flex-wrap mt-5">
        {["all", 5, 4, 3, 2, 1].map((star) => (
          <button
            key={`star-two-${star}`}
            onClick={() => onFilterChange(star as RatingFilter)}
            className={`px-3 flex items-center gap-1 min-h-[34px] border rounded-full cursor-pointer hover:opacity-70 ${
              filter === star ? "bg-black text-white" : ""
            }`}
          >
            {star === "all" ? "все" : star}
            {star !== "all" && (
              <svg className="w-3 h-3">
                <use href="/icons/symbol/sprite.svg#star_b" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
// -----------------------------------
// Блок с комментариями
// -----------------------------------
function ReviewList({ reviews }: { reviews: SellerReview[] }) {
  return (
    <div className="flex flex-col gap-15">
      {reviews.map((r) => (
        <div
          key={`r-id-${r.id}`}
          className="border-b border-grayscale-100 last:border-b-0 pb-16 flex flex-col gap-2"
        >
          <div className="flex gap-3">
            <span className="font-semibold ag-h1 text-secondary">
              {r.author}
            </span>
            <span className="pt-3">
              <StarBlackRating rating={r.rating} size={16} gap={1} />
            </span>
          </div>
          <span className="ag-h7 text-secondary font-medium mb-3">
            {new Date(r.date).toLocaleDateString()}
          </span>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="ag-h2 text-secondary font-medium">Комментарий:</h3>
            <p className="ag-h4 text-secondary font-medium">{r.text}</p>
          </div>

          {r.photos && r.photos.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {r.photos.map((photo, idx) => (
                <Link
                key= {`photo-key-${idx}`}
                  to={`/product/${r.productId}`}
                  className="block w-45 aspect-[18/14] overflow-hidden "
                >
                  <img
                    key={idx}
                    src={photo}
                    className="w-full h-full object-cover"
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// -----------------------------------
// Главный компонент страницы
// -----------------------------------
export function SellerRating() {
  const seller = SELLER_DATA;

  const [filter, setFilter] = useState<RatingFilter>("all");

  // ТОЛЬКО product отзывы
  const productReviews = useMemo(
    () => seller.reviews.filter((r) => r.type === "product"),
    [seller.reviews]
  );

  //  фильтр по рейтингу
  const filteredProductReviews = useMemo(() => {
    if (filter === "all") return productReviews;
    return productReviews.filter((r) => r.rating === filter);
  }, [filter, productReviews]);

  //  фото только из product отзывов
  const filteredPhotos = useMemo(
    () => filteredProductReviews.flatMap((r) => r.photos ?? []),
    [filteredProductReviews]
  );

  return (
    <div className="xl:pl-15 sm:pt-10 pt-22 mb-45">
      <h2 className="ag-h1 text-secondary font-semibold mb-2">Рейтинг продавца</h2>

      <div className="flex flex-col gap-15 sm:gap-22.5 lg:gap-38.5 ">
        {/* Верхний блок */}
        <div
          className="
      grid
      grid-cols-1
      lg:grid-cols-[416px_1fr]
      gap-x-10
      gap-y-10     
    "
        >
          {/* Левая колонка */}
          <div className="flex flex-col gap-9.5 sm:gap-7.5 pt-10">
            <div className="flex items-center gap-4">
              <img
                src={seller.avatarUrl}
                className="w-15 h-15 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="ag-h7 font-medium text-secondary">
                  {seller.name}
                </div>
                <div className="flex items-center gap-2">
                  <div className="ag-h8 font-medium text-secondary">
                    {seller.sellerRating.averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={1} size={16} />
                  <div className="g-h8 font-medium text-secondary">
                    — {seller.sellerRating.totalReviews} отзывов
                  </div>
                </div>
              </div>
            </div>

            <RatingDistribution ratingStats={seller.productRating} />
          </div>

          {/* Правая колонка */}
          <div className="hidden sm:flex relative min-w-0 h-full items-center">
            <PhotoSlider
              photos={filteredPhotos}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
        </div>

        {/* Комментарии */}
        <ReviewList reviews={filteredProductReviews} />
      </div>
    </div>
  );
}
