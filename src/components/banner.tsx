import Button from "@/ui/button";

import { type BannerData} from "@/mocks/banner.mock";
// interface BannerData {
//   title?: string;
//   subtitle?: string;
//   btnText?: string;
//   btnLink?: string;
//   rightTitle?: string;
//   rightSubtitle?: string;
// }

interface BannerProps {
  data?: BannerData;
}

export default function Banner({ data }: BannerProps) {
  if (!data) return null;

  const { title, subtitle, btnText, btnLink, rightTitle, rightSubtitle } = data;

  return (
    <div className="banner mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-h-[220px]">
        {/* Левая колонка */}
        {(title || subtitle || (btnText && btnLink)) && (
          <div className="sm:col-span-1 lg:col-span-2 rounded-2xl h-full px-7 py-5 bg-black flex flex-col gap-5">
            {title && (
              <h1 className="ag-h2 text-grayscale-white leading-none">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="ag-h4 text-grayscale-100 mb-3">{subtitle}</p>
            )}

            {btnLink && btnText && (
              <Button
                to={btnLink}
                className="bg-grayscale-white text-black self-start min-h-11 px-7.5 hover:opacity-80"
              >
                {btnText}
              </Button>
            )}
          </div>
        )}

        {/* Правая колонка */}
        {(rightTitle || rightSubtitle) && (
          <div className="rounded-2xl h-full p-5 bg-grayscale-100 flex-col items-center justify-center gap-4 hidden sm:flex">
            {rightTitle && <h2 className="ag-h2">{rightTitle}</h2>}
            {rightSubtitle && (
              <p className="ag-h7 text-grayscale-700">{rightSubtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
