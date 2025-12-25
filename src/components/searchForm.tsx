import { type FormEvent, useState, type InputHTMLAttributes } from "react";

interface SearchFormProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onSubmit"> {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  className?: string;
}

export default function SearchForm({
  placeholder = "Найти вещь",
  onSubmit,
  className = "",
  ...inputProps
}: SearchFormProps) {
  const [value, setValue] = useState("");

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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="ag-h7 outline-none bg-transparent w-full"
          style={{ color: "var(--grayscale-700)" }}
          {...inputProps}
        />
      </div>
    </form>
  );
}
