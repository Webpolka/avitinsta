import { type InputHTMLAttributes } from 'react'

type Props = {
  label?: string
  format?: 'text' | 'number' | 'password'
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  label,
  format = 'text',
  className = '',
  ...props
}: Props) => {
  return (    
    <>
      {label && (
        <label className="font-medium text-sm text-[#272727] text-[15px]">
          {label}
        </label>
      )}

      <input
        type={format}
        name={label}
        className={`         
          w-full h-[45px]
          border border-solid border-[#e5e5e5]
          rounded-lg px-3
          text-sm text-[#272727]
          font-medium        
          outline-none
          focus:border-black          
          ${className}
        `}
        {...props}
      />
    </>
  )
}

// Use with form as state
// const [promo, setPromo] = useState('')

// <Input
//   label="Промокод"
//   placeholder="Введите промокод"
//   value={promo}
//   onChange={(e) => setPromo(e.target.value)}
// />