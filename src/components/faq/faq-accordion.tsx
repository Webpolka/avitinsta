import { useState, type ReactNode } from "react";

interface FaqAccordionProps {
  title: string;
  children: ReactNode;
  open?: boolean;
}
export function FaqAccordion({ title, children, open }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(open ?? false);
  return (
    <div className="flex flex-col gap-2.5 border-b border-solid border-grayscale-100 py-4">
      {/* кнопка */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`text-left w-full flex justify-between items-center cursor-pointer ${
          isOpen ? "text-secondary" : "text-grayscale-700 hover:text-[#0F172A]"
        }`}
      >
        <h2 className="font-medium ag-h2 sm:ag-h4 xl:ag-h2">{title}</h2>

        <svg
          className={`h-4 w-4 transition-transform duration-200 opacity-50 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <use href="/icons/symbol/sprite.svg#open" />
        </svg>
      </button>

      {/* контент */}
      {isOpen && <>{children}</>}
    </div>
  );
}
