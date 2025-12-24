
export type TextAreaProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
  gap?:string;
};

export function TextArea({
  label,
  value,
  placeholder,
  onChange,
  gap
}: TextAreaProps) {
  return (
    <label className={`flex flex-col gap-${gap}`}>
      <span className="text-secondary ag-h7 font-medium mb-1">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-none outline-none border border-gray-300 rounded-lg px-2.5 py-2 min-h-[80px] text-secondary placeholder:text-grayscale-500 bg-transparent"
      />
    </label>
  );
}
