import { useState, useRef } from "react";

import { FAQ_DATA } from "@/mocks/faq.mocks.tsx";
import { FAQSidebar } from "@/components/faq/faq-sidebar";

function renderContent(content: string | { type: string; text: string }[]) {
  if (typeof content === "string") {
    return <p className="ag-h4 text-grayscale-700 mb-10">{content}</p>;
  }

  // Если массив объектов, проходим и рендерим
  return content.map((block, index) => {
    if (block.type === "h2" || block.type === "h3") {
      return (
        <h3 key={index} className="ag-h2 font-medium mb-10">
          {block.text}
        </h3>
      );
    }
    if (block.type === "p") {
      return (
        <p key={index} className="ag-h4 text-grayscale-700 mb-10">
          {block.text}
        </p>
      );
    }
    return null;
  });
}

export function Faq() {
  // реф на правую колонку (контент)
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    setActiveTabId(id);

    // только для мобильных экранов скроллим
    // if (window.innerWidth < 768) {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    // }
  };

  // Инициализируем пустой строкой, потом в useEffect выбираем первый
  const [activeTabId, setActiveTabId] = useState(
    () =>
      FAQ_DATA.flatMap((g) => (g.type === "tab" ? [g.tab] : g.tabs))[0]?.id ??
      ""
  );

  const activeTab = FAQ_DATA.flatMap((group) =>
    group.type === "tab" ? [group.tab] : group.tabs
  ).find((tab) => tab.id === activeTabId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] lg:grid-cols-[35%_1fr] gap-x-[90px] lg:gap-x-[110px] pt-6 pb-30 sm:pb-50 xl:pr-15">
      {/* левая колонка */}
      <div className="flex flex-col gap-4 pb-10 md:pb-0">
        <h2 className="ag-h2 lg:ag-h1 text-secondary font-semibold mb-4">
          Документы сайта
        </h2>
        <FAQSidebar
          data={FAQ_DATA}
          activeTabId={activeTabId}
          onSelect={handleSelect}
        />
      </div>

      {/* правая колонка */}
      <div ref={contentRef} className="flex flex-col gap-4 pt-5">
        <div>
          {activeTab ? (
            <>
              <h2 className="ag-h2 sm:ag-h1 font-semibold mb-10 md:mb-18">
                {activeTab.title}
              </h2>
              {renderContent(activeTab.content)}
            </>
          ) : (
            <p>Выберите раздел</p>
          )}
        </div>
      </div>
    </div>
  );
}
