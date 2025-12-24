import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

interface ProductGalleryProps {
  images: string[];
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

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = () => {
    if (!mainSwiperRef.current) return;
    setIsBeginning(mainSwiperRef.current.isBeginning);
    setIsEnd(mainSwiperRef.current.isEnd);
  };

  return (
    <div className="relative w-full">
      <div className="md:aspect-[390/500] lg:aspect-[679/864] flex h-auto w-full gap-5 overflow-hidden relative">
        {/* THUMBS */}
        <div className="md:w-[31%] lg:w-[20.65%] shrink-0 hidden md:block">
          <div className="md:aspect-[121/500] lg:aspect-[140/862] w-full overflow-hidden">
            <Swiper
              onSwiper={setThumbsSwiper}
              direction="vertical"
              spaceBetween={20}
              watchSlidesProgress
              mousewheel={{ forceToAxis: true }}
              slidesPerView={2.5}
              className="h-full h-full"
              breakpoints={{
                0: { slidesPerView: 2.5 },
                1024: { slidesPerView: 4 },
              }}
            >
              {images.map((src, index) => (
                <SwiperSlide className="cursor-pointer" key={index}>
                  <img
                    className="block w-full h-full object-cover overflow-hidden"
                    src={src}
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* MAIN SWIPER */}
        <div className="relative aspect-[358/402] md:aspect-[inherit] w-full overflow-hidden">
          <Swiper
            modules={[Navigation, Thumbs, Pagination]}
            thumbs={{ swiper: thumbsSwiper }}
            navigation={{
              nextEl: ".custom-swiper-next",
              prevEl: ".custom-swiper-prev",
            }}
            pagination={true}
            className="h-full w-full"
            spaceBetween={20}
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            breakpoints={{
              0: {
                pagination: {
                  el: ".custom-pagination",
                  clickable: true,
                  renderBullet: (index, className) => {
                    const total = images.length;
                    const center = Math.floor(total / 2);
                    let scale = 1 - Math.abs(index - center) * 0.125;
                    if (scale < 0.6) scale = 0.6;

                    return `<span class="${className}" style="
                      transform: scale(${scale});
                      display: inline-block;
                      margin: 0 3px;
                      background-color: black; 
                      width: 9px; 
                      height: 9px; 
                      border-radius: 50%;
                    "></span>`;
                  },
                },
              },
            }}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="h-full">
                <img
                  className="block w-full h-full object-cover overflow-hidden"
                  src={src}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Кнопки навигации */}
          <div
            className={`custom-swiper-prev absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer z-10 px-2.5 ${
              isBeginning ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <PrevArrow />
          </div>
          <div
            className={`custom-swiper-next absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer z-10 px-2.5 ${
              isEnd ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <NextArrow />
          </div>
        </div>
      </div>

      {/* pagination */}
      <div className="custom-pagination w-full justify-center md:hidden flex py-7.5"></div>
    </div>
  );
}
