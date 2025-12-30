import { useState } from "react";

export type TabItem = {
  label: string;
  count?: number;
  key: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
};

export function UniversalTabs({ tabs, activeKey, onChange }: TabsProps) {
  const [currentTab, setCurrentTab] = useState(activeKey || tabs[0]?.key);

  const handleClick = (key: string) => {
    setCurrentTab(key);
    onChange?.(key);
  };

  return (
    <div className="flex gap-4 mb-5 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleClick(tab.key)}
          className={`min-h-9.5 rounded-xl flex items-center px-6 cursor-pointer ${
            currentTab === tab.key
              ? "text-secondary border bg-grayscale-white border-grayscale-300 "
              : "text-grayscale-300 hover:text-grayscale-500"
          }`}
        >
          <span className="ag-h7 sm:ag-h4 font-medium">
            {tab.label} {tab.count !== undefined && ` (${tab.count})`}
          </span>
        </button>
      ))}
    </div>
  );
}
