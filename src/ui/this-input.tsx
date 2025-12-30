/******************************
 * ThisInput — универсальный инпут
 ******************************/
type ThisInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;

  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  top?: string;
};

export function ThisInput({
  label,
  value,
  placeholder,
  onChange,
  required = false,
  type = "text",
  className = "",
  top = "1",
}: ThisInputProps) {
  return (
    <label className={`flex flex-col gap-${top} ${className}`}>
      <span className="text-secondary ag-h7 font-medium mb-3">
        {label}
        {required && <span className="text-secondary ml-1">*</span>}
      </span>

      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
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
    </label>
  );
}
