import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

interface Props {
  phone: string;
  code: string;
  setCode: (v: string) => void;
  onConfirm: () => void;
  onHelp: () => void;
  isOpen?: boolean;
}

export function PhoneConfirmStep({
  phone,
  onConfirm,
  onHelp,
  code,
  setCode,
}: Props) {
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    if (counter <= 0) return;
    const timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div className="flex flex-col max-w-[392px]">
      <h2 className="ag-w2 sm:ag-w4 max-w-[250px] mx-auto font-semibold text-center text-secondary mb-5">
        Подтвердите номер
      </h2>

      <p className="ag-h2 text-secondary text-center">8 {phone}</p>
      <p className="ag-h3 text-grayscale-700 text-center">введите код из смс</p>

      {/* OTP Inputs */}
      <div className="flex justify-center mt-2">
        <OtpInput
          value={code}
          onChange={setCode}
          numInputs={4}
          inputType="tel"
          shouldAutoFocus
          renderInput={(props, index) => (
            <input
              {...props}
              key={index}
              style={{
                width: "69px",
                height: "69px",
                margin: "0 4px",
                fontSize: "1.5rem",
                border: "1px solid black",
                borderRadius: 0,
                // backgroundColor: props.focused ? "white" : "black",
                // color: props.focused ? "black" : "white",
                textAlign: "center",
                outline: "none",
              }}
            />
          )}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Отправим код повторно через {counter} сек.
      </p>

      <p className="text-xs text-blue-600 mt-1 cursor-pointer" onClick={onHelp}>
        Не приходит SMS?
      </p>

      <button
        className="w-full py-3 bg-black text-white rounded mt-2 cursor-pointer hover:opacity-90"
        onClick={onConfirm}
      >
        Подтвердить номер
      </button>

      <p className="text-xs text-gray-600 mt-1">
        Подтверждая номер телефона, я согласен с политикой обработки
        персональных данных
      </p>
    </div>
  );
}
