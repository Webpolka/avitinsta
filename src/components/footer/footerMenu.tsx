import { useState } from "react";
import { Link } from "react-router";

interface FooterMenuItem {
  title: string;
  to: string;
}

interface FooterMenuProps {
  heading: string; // заголовок виджета
  items: FooterMenuItem[]; // массив пунктов меню
}

export default function FooterMenu({ heading, items }: FooterMenuProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="footer-widget flex flex-col gap-[10px] mb-2 sm:mb-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-left w-full flex justify-between items-center cursor-pointer"
      >
        <h2 className="ag-h4 xl:ag-h2 font-normal sm:font-medium sm:text-[#0f172a] text-black mb-2">{heading}</h2>
        <svg
          className={`min-[440px]:hidden h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <use href="/icons/symbol/sprite.svg#open" />
        </svg>
      </button>

      {/* Меню */}
      <ul
        className={`flex flex-col gap-6 ${
          isOpen ? "flex" : "hidden min-[440px]:flex"
        }`}
      >
        {items.map((item) => (
          <li key={item.title} className="ag-h8 lg:ag-h7 sm:text-[#0f172a] font-medium text-black">
            <Link to={item.to} className="hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
