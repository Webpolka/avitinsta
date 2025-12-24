import { type FormEvent, useState, type InputHTMLAttributes } from "react";

interface SearchFormProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onSubmit"> {
  placeholder?: string;
  onSubmit?: (value: string) => void;
}

export default function SearchForm({
  placeholder = "Найти вещь",
  onSubmit,
  ...inputProps
}: SearchFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim()) return;

    onSubmit?.(value);
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="rounded-full px-3 py-3 border border-gray-300 border-solid bg-white flex items-center gap-3 focus-within:border-blue-300">
        <button type="submit" aria-label="Search" className="cursor-pointer">
          <svg className="icon icon--search w-4 h-4">
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
