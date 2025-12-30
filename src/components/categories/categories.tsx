import { Link } from "react-router";
import { type CategoryData } from "@/mocks/categories.mock";

type CardProps = CategoryData;
interface CategoriesProps {
  items: CategoryData[];
}

//  Маленькая карточка
function Card({ id, title, image, link }: CardProps) {
  return (
    <div className="relative aspect-[171/170] sm:aspect-[209/170] lg:aspect-[319/170] overflow-hidden">
      <Link
        id={`category-${id}`}
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
function CardTall({ id, title, image, link }: CardProps) {
  return (
    <div className="relative w-full h-full shrink-0 aspect-[358/221] sm:aspect-[initial] overflow-hidden">
      <Link
        id={`category-${id}`}
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
          px-3
        "
        >
          {title}
        </h2>
      </Link>
    </div>
  );
}

// Вывод категорий
export default function Categories({ items }: CategoriesProps) {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-5 lg:mb-25 mb-20">
      <div className="w-full md:w-[76.2%] grid grid-cols-2 md:grid-cols-3 gap-5 ">
        {items.slice(0, 6).map((item, index) => (
          <Card
            key={index}
            id={item.id}
            title={item.title}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>

      <div className="w-full md:w-[23.8%]">
        {items[6] && (
          <CardTall
            id={items[6].id}
            title={items[6].title}
            image={items[6].image}
            link={items[6].link}
          />
        )}
      </div>
    </div>
  );
}
