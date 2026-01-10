import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "@/components/product/productCard";
import { type ProductCardData } from "@/mocks/products.mock";

interface SliderProductsListProps {
  title?: string;
  items: ProductCardData[];
}

// SVG стрелки
const PrevArrow = () => (
  <svg className="w-8 h-8">
    <use href="/icons/symbol/sprite.svg#left_r" />
  </svg>
);

const NextArrow = () => (
  <svg className="w-8 h-8">
    <use href="/icons/symbol/sprite.svg#right_r" />
  </svg>
);

export default function SliderProductsList({
  title,
  items,
}: SliderProductsListProps) {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const mainSwiperRef = useRef<SwiperClass | null>(null);

  // Считаем сколько слайдов видно на текущем экране
  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width < 640) setSlidesPerView(2); // mobile
    else if (width < 768) setSlidesPerView(3); // tablet
    else setSlidesPerView(4); // desktop
  };

  useEffect(() => {
    const foo = () => {
      updateSlidesPerView();
    };
    foo();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  useEffect(() => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.update(); // обновляем слайды и пагинацию
    }
  }, [items]);

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const showNavigation = items.length > slidesPerView;

  return (
    <div className="pt-2 w-full relative select-none">
      {/* Заголовок */}
      {title && (
        <h2 className="ag-h2 sm:ag-h1 text-secondary font-semibold text-center mb-11">
          {title}
        </h2>
      )}

      {/* Навигационные стрелки */}
      <div
        className="hidden sm:block"
        style={{ visibility: showNavigation ? "visible" : "hidden" }}
      >
        <div
          className={`custom-swiper-prev absolute top-1/2 -left-6.5 -translate-y-1/2 cursor-pointer z-10 px-2.5 ${
            isBeginning ? "opacity-50" : ""
          }`}
        >
          <PrevArrow />
        </div>
        <div
          className={`custom-swiper-next absolute top-1/2 -right-6.5 -translate-y-1/2 cursor-pointer z-10 px-2.5 ${
            isEnd ? "opacity-50" : ""
          }`}
        >
          <NextArrow />
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            const total = items.length;
            const center = Math.floor(total / 2);
            let scale = 1 - Math.abs(index - center) * 0.125;
            if (scale < 0.6) scale = 0.6;

            return `<span class="${className}" style="
                    display: inline-block;
                    transform: scale(${scale});
                    margin: 0 3px;
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background-color: black;
                "></span>`;
          },
        }}
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
        }}
      >
        {items.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Пагинация (только на мобилке) */}
      <div className="absolute -bottom-10 flex justify-center w-full">
        <div className="custom-pagination sm:hidden shrink-0"></div>
      </div>
    </div>
  );
}
