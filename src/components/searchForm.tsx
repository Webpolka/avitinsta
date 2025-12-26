import { type FormEvent, type InputHTMLAttributes } from "react";

interface SearchFormProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onSubmit" | "onChange"> {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  className?: string;
  value: string;
  onChange: (value: string) => void; // сразу строка
}

export default function SearchForm({
  value,          // теперь value приходит сверху
  onChange,       // onChange приходит сверху
  placeholder = "Найти вещь",
  onSubmit,
  className = "",
  ...inputProps
}: SearchFormProps & { value: string; onChange: (v: string) => void }) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="rounded-full px-3 py-3 border border-gray-300 bg-white flex items-center gap-3 focus-within:border-blue-300">
        <button type="submit" aria-label="Search" className="cursor-pointer">
          <svg className="w-4 h-4">
            <use href="/icons/symbol/sprite.svg#search" />
          </svg>
        </button>

        <input
          type="text"
          value={value}                  // берем из родителя
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="ag-h7 outline-none bg-transparent w-full"
          style={{ color: "var(--grayscale-700)" }}
          {...inputProps}
        />
      </div>
    </form>
  );
}
