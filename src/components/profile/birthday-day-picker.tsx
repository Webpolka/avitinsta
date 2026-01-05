import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

// тип пропсов
interface BirthDatePickerProps {
  value?: string; // ISO string
  required?: boolean;
  onChange: (value: string) => void;
  top?: string;
  className?: string;
  name?:string;
}

export function BirthDatePicker({
  value,
  onChange,
  required = false,
  top = "0",
  name,
  className = "",
}: BirthDatePickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // правильно типизированный ref
  const ref = useRef<HTMLDivElement | null>(null);

  const selectedDate: Date | undefined = value ? new Date(value) : undefined;

  // тип date
  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(date.toISOString());
    setIsOpen(false);
  };

  // тип события
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative datepicker flex-1 flex flex-col gap-${top} ${className}`}
    >
      <span className="text-secondary ag-h7 font-medium mb-3">
        Дата рождения
        {required && <span className="text-secondary ml-1">*</span>}
      </span>
      <input
      name={name}
        type="text"
        required={required}
        readOnly
        value={
          selectedDate ? format(selectedDate, "dd.MM.yyyy", { locale: ru }) : ""
        }
        onClick={() => setIsOpen(true)}
        placeholder="ДД.ММ.ГГГГ"
        className="
           w-full rounded-lg px-2.5 min-h-[45px]
          placeholder:ag-h8 text-secondary
          placeholder:text-grayscale-500
          border border-[#e5e5e5]
          focus:border-grayscale-500
          outline-none
        "
        style={{
          boxShadow:
            "0 1px 1px 0 rgba(0,0,0,0.1), 1px 0 1px 0 rgba(0,0,0,0.1), -1px 0 1px 0 rgba(0,0,0,0.1), 0 -1px 1px 0 rgba(0,0,0,0.1)",
        }}
      />

      {isOpen && (
        <div className="absolute top-[100%] z-50 mt-1 rounded-lg border border-grayscale-300 bg-white p-4 shadow-lg">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            locale={ru}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
          />
        </div>
      )}
    </div>
  );
}
