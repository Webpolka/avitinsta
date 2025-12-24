import { useState, type ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2.5">
      {/* кнопка */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-left w-full flex justify-between items-center cursor-pointer"
      >
        <h2 className="text-secondary font-medium ag-h6 mt-1">
          {title}
        </h2>

        <svg
          className={`h-4 w-4 transition-transform duration-200 opacity-50 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <use href="/icons/symbol/sprite.svg#open" />
        </svg>
      </button>

      {/* контент */}
      {isOpen && (
        <div className="ag-h7 text-grayscale-700 font-medium leading-6 border-b border-solid border-grayscale-100 pb-2.5">
          {children}
        </div>
      )}
    </div>
  );
}
