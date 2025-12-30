import {
  type FormEvent,
  type ComponentPropsWithoutRef,
} from "react";

/**
 * Нативные пропсы input без value / onChange / type
 */
type InputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "value" | "onChange" | "type"
>;

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  placeholder?: string;
  inputProps?: InputProps;
}

export default function SearchForm({
  value,
  onChange,
  onSubmit,
  placeholder = "Найти вещь",
  className = "",
  inputProps,
}: SearchFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="rounded-full px-3 py-3 border border-gray-300 bg-white flex items-center gap-3 focus-within:border-blue-300">
        <button type="submit" aria-label="Search">
          <svg className="w-4 h-4">
            <use href="/icons/symbol/sprite.svg#search" />
          </svg>
        </button>

        <input
          type="text"
          value={value}
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
