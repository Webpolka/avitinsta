{/* <Checkbox
  label={s}
  checked={sizes.includes(s)}
  onChange={() => toggleSize(s)}
/>; */}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

//*********  CHECKBOX  ******** */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer select-none">
      {/* Скрытый стандартный чекбокс */}
      <input
        name={"checkbox-" + label}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      {/* Кастомный квадратик */}
      <span
        className="
          w-4.5 h-4.5 border border-black 
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
