
//*********  RadioButton  ******** */
export interface RadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  name: string;
  value: string;
}

export const Radio: React.FC<RadioProps> = ({
  name,
  checked,
  onChange,
  label,
  value,
}) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer select-none">
      {/* Скрытый стандартный чекбокс */}
      <input
        name={name || ""}
        value={value || ""}
        type="radio"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      {/* Кастомный квадратик */}
      <span
        className="
          w-4.5 h-4.5 border border-black rounded-[50%]
          flex items-center justify-center
          transition
          peer-checked:bg-black
          peer-checked:border-black
        "
      ></span>

      {/* Лейбл с текстом */}
      <span className="text-brand-secondary font-regular text-lg">{label}</span>
    </label>
  );
};