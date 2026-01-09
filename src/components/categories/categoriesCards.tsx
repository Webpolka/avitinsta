import { Link } from "react-router-dom";

import { type CategoryData } from "@/mocks/categories.mock";
type CardProps = CategoryData;

//  Маленькая карточка
export function Card({ id, title, image, link }: CardProps) {
  return (
    <div className="relative aspect-[171/170] sm:aspect-[209/170] lg:aspect-[319/170] overflow-hidden">
      <Link
        id={`catalog/${id}`}
        to={link || "/"}
        className="
          group
          block w-full h-full
          rounded-xl
          overflow-hidden
        "
      >
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            shadow-md
            transform
            transition-all duration-300
            group-hover:shadow-xl
            group-hover:scale-105
          "
        />

        <h2
          className="
          pointer-events-none
          absolute bottom-6 xl:bottom-10 left-0 w-full
          z-10
          ag-h2 sm:ag-h1
          text-white text-center
          px-2
        "
        >
          {title}
        </h2>
      </Link>
    </div>
  );
}


// Высокая карточка
export function CardTall({ id, title, image, link }: CardProps) {
  return (
    <div className="relative w-full h-full shrink-0 aspect-[358/221] md:aspect-[initial] overflow-hidden">
      <Link
        id={`catalog/${id}`}
        to={link || "/"}
        className="
          group
          block w-full h-full
          rounded-xl
          overflow-hidden
        "
      >
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            shadow-md
            transform
            transition-all duration-300
            group-hover:shadow-xl
            group-hover:scale-105
          "
        />

        <h2
          className="
          pointer-events-none
          absolute bottom-6 xl:bottom-10 left-0 w-full
          z-10
          ag-h2 sm:ag-h1
          text-white text-center
          px-22
          sm:px-3
        "
        >
          {title}
        </h2>
      </Link>
    </div>
  );
}
