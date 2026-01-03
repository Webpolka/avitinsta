{/* <Checkbox
  label={s}
  checked={sizes.includes(s)}
  onChange={() => toggleSize(s)}
/>; */}

interface CheckboxProps {
  checked: boolean;
  required?: boolean;
  onChange: () => void;
  label: string;
  textClassName?:string;
  labeClassName?:string;
  className?:string;
}

//*********  CHECKBOX  ******** */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  required = false,
  label,
  textClassName = "text-lg",
  labeClassName = "items-center gap-4",
  className = "w-4.5 h-4.5 border-black",
}) => {
  return (
    <label className={`flex select-none ${labeClassName}`}>
      {/* Скрытый стандартный чекбокс */}
      <input
        name={"checkbox-" + label}
        type="checkbox"
        required = {required}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      {/* Кастомный квадратик */}
      <span
        className={`cursor-pointer border
          flex items-center justify-center
          transition shrink-0
          peer-checked:bg-black
          peer-checked:border-black
        ${className}`}
      ></span>

      {/* Лейбл с текстом */}
      <span className={`text-brand-secondary font-regular ${textClassName}`}>{label}</span>
    </label>
  );
};
