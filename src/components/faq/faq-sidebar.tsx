import { FaqAccordion } from "./faq-accordion.tsx";
import type { FaqGroupJSON } from "../../mocks/faq.mocks.tsx";

interface FAQSidebarProps {
  data: FaqGroupJSON[];
  activeTabId: string;
  onSelect: (id: string) => void;
}

export function FAQSidebar({ data, activeTabId, onSelect }: FAQSidebarProps) {
  return (
    <div>
      {data.map((group, groupIndex) => {
        // -------------------------------
        //  ОДИНОЧНЫЙ ТАБ
        // -------------------------------
        if (group.type === "tab") {
          return (
            <div
              key={`tab-group-${groupIndex}-${group.tab.id}`}
              className="block border-b border-solid border-grayscale-100 py-4"
            >
              <button
                onClick={() => onSelect(group.tab.id)}
                className={`cursor-pointer w-full text-left ag-h2 sm:ag-h4 xl:ag-h2 font-medium transition-colors duration-200 ${
                  group.tab.id === activeTabId
                    ? "text-[#0F172A]"
                    : "text-grayscale-700 hover:text-secondary"
                }`}
              >
                {group.tab.title}
              </button>
            </div>
          );
        }

        // -------------------------------
        //  ГРУППА ТАБОВ → АККОРДЕОН
        // -------------------------------
        return (
          <FaqAccordion
            key={`accordion-group-${groupIndex}-${group.title}`}
            title={group.title}
            open={false} 
          >
            {group.tabs.map((tab, tabIndex) => (
              <button
                key={`accordion-tab-${groupIndex}-${tabIndex}-${tab.id}`} //  уникальный ключ
                onClick={() => onSelect(tab.id)}
                className={`cursor-pointer w-full text-left  ag-h2 sm:ag-h4 xl:ag-h2 font-normal transition-colors duration-200 ${
                  tab.id === activeTabId
                    ? "text-secondary"
                    : "text-grayscale-700 hover:text-secondary"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </FaqAccordion>
        );
      })}
    </div>
  );
}
