import { useState, useEffect } from "react";
import { PatternFormat } from "react-number-format";
import { useUser } from "@/context/use.user";

import { AuthTopBar } from "./authTopBar";
import { HelpScreen } from "./helpScreen";

import { USERS_DATA, type User } from "@/mocks/users.mocks";

// --- Типы шагов ---
export type AuthStep =
  | "method"
  | "emailInput"
  | "emailConfirm"
  | "phoneInput"
  | "phoneConfirm"
  | "profile"
  | "helpEmail"
  | "helpPhone";

// ----- Method Step -----
interface MethodStepProps {
  onSelectMethod: (step: "emailInput" | "phoneInput") => void;
}
function MethodStep({ onSelectMethod }: MethodStepProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold text-center mb-4">
        Войти в личный кабинет
      </h1>
      <button
        className="w-full py-3 bg-black text-white rounded"
        onClick={() => onSelectMethod("phoneInput")}
      >
        По номеру телефона
      </button>
      <button
        className="w-full py-3 border border-gray-300 rounded"
        onClick={() => onSelectMethod("emailInput")}
      >
        По электронной почте
      </button>
      <p className="text-xs text-gray-500 text-center mt-2">
        Нажимая на кнопку, я даю согласие на обработку персональных данных
      </p>
    </div>
  );
}

// ----- Email Step -----
interface EmailStepProps {
  email: string;
  setEmail: (v: string) => void;
  onNext: () => void;
  onHelp: () => void;
}
function EmailStep({ email, setEmail, onNext, onHelp }: EmailStepProps) {
  const [error, setError] = useState("");
  const handleNext = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Введите корректный email");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold">
        Введите адрес электронной почты
      </h1>
      <p className="text-sm text-gray-500">Отправим код из 4 цифр на почту</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ваш email"
        className="w-full p-3 border border-gray-300 rounded"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        className="w-full py-3 bg-black text-white rounded"
        onClick={handleNext}
      >
        Получить код
      </button>
      <p
        className="text-xs text-blue-600 text-center mt-2 cursor-pointer"
        onClick={onHelp}
      >
        Не приходит письмо?
      </p>
    </div>
  );
}

// ----- Email Confirm Step -----
interface EmailConfirmStepProps {
  email: string;
  onConfirm: () => void;
  onResend: () => void;
}
function EmailConfirmStep({
  email,
  onConfirm,
  onResend,
}: EmailConfirmStepProps) {
  const [code, setCode] = useState("");
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold">
        Подтвердите адрес электронной почты
      </h1>
      <p className="text-sm text-gray-500">{email}</p>
      <p className="text-sm text-gray-500">Введите код из письма</p>
      <div className="flex gap-2 justify-center mt-2">
        {[...Array(4)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={code[i] || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/, "");
              setCode(code.substr(0, i) + val + code.substr(i + 1));
            }}
            className="w-12 h-12 text-center border border-gray-400 rounded"
          />
        ))}
      </div>
      <p
        className="text-xs text-blue-600 mt-2 cursor-pointer"
        onClick={onResend}
      >
        Запросить код повторно
      </p>
      <p className="text-xs text-gray-500 mt-1">Не приходит письмо?</p>
      <button
        className="w-full py-3 bg-black text-white rounded mt-2"
        onClick={onConfirm}
      >
        Подтвердить почту
      </button>
    </div>
  );
}

// ----- Phone Step -----
interface PhoneStepProps {
  phone: string;
  setPhone: (v: string) => void;
  onNext: () => void;
}
export function PhoneStep({ phone, setPhone, onNext }: PhoneStepProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 11 || !digits.startsWith("7")) {
      setError("Введите корректный номер телефона");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold">Введите номер телефона</h1>
      <p className="text-sm text-gray-500">Отправим код из 4 цифр в SMS</p>

      <PatternFormat
        format="+7 ###-##-##-###"
        mask="_"
        value={phone}
        onValueChange={(values) => setPhone(values.formattedValue)}
        className="w-full p-3 border border-gray-300 rounded"
        placeholder="+7 ___-___-__-__"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        className="w-full py-3 bg-black text-white rounded"
        onClick={handleNext}
      >
        Получить код
      </button>

      <p className="text-xs text-blue-600 mt-1">
        Нажимая на кнопку «Получить код», я даю согласие на обработку своих
        персональных данных
      </p>
    </div>
  );
}

// ----- Phone Confirm Step -----
interface PhoneConfirmStepProps {
  phone: string;
  onConfirm?: () => void;
  onHelp?: () => void;
}
function PhoneConfirmStep({ phone, onConfirm, onHelp }: PhoneConfirmStepProps) {
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    if (counter <= 0) return;
    const timer = setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold">Подтвердите номер телефона</h1>
      <p className="text-sm text-gray-500">{phone}</p>
      <p className="text-sm text-gray-500">Введите код из SMS</p>
      <div className="flex gap-2 justify-center mt-2">
        {[...Array(4)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={code[i] || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/, "");
              setCode(code.substr(0, i) + val + code.substr(i + 1));
            }}
            className="w-12 h-12 text-center border border-gray-400 rounded"
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Отправим код повторно через {counter} сек.
      </p>
      <p className="text-xs text-blue-600 mt-1 cursor-pointer" onClick={onHelp}>
        Не приходит SMS?
      </p>
      <button
        className="w-full py-3 bg-black text-white rounded mt-2"
        onClick={onConfirm}
      >
        Подтвердить номер
      </button>
      <p className="text-xs text-blue-600 mt-1">
        Подтверждая номер телефона, я согласен с политикой обработки
        персональных данных
      </p>
    </div>
  );
}

// ----- AuthCanvas -----
interface AuthCanvasProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AuthCanvas({ isOpen, onClose }: AuthCanvasProps) {
  const { user, setUser, closeAuth } = useUser();

  const [step, setStep] = useState<AuthStep>("method");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [name, setName] = useState(user?.name || "");

  const [history, setHistory] = useState<AuthStep[]>([]);

  const goToStep = (newStep: AuthStep) => {
    setHistory((prev) => [...prev, step]);
    setStep(newStep);
  };
  const handleBack = () => {
    if (history.length === 0) return;
    const prevStep = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setStep(prevStep);
  };

  const handleClose = () => {
    setStep("method");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setName(user?.name || "");
    onClose();
  };

  if (!isOpen) return null;

  const serverFunc = () => {
    const serverResponseUser = USERS_DATA[0];

    // --- обновляем контекст ---
    const newUser: User = {
      id: serverResponseUser.id, // обязательно строка
      email,
      name,
      avatar: serverResponseUser.avatar || "",
      token: serverResponseUser.token || "",
      phone: serverResponseUser.phone || "",
      // добавляем остальные обязательные поля User, если есть
    };

    setUser(newUser);
    console.log(newUser);

    // Закрываем модалку
    closeAuth();
  };

  return (
    <div
      className={`
        z-50 fixed top-0 right-0 h-screen w-full md:w-1/2 bg-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col
      `}
    >
      <AuthTopBar
        canGoBack={history.length > 0}
        onBack={handleBack}
        onClose={handleClose}
      />

      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md text-center">
          {step === "method" && (
            <MethodStep onSelectMethod={(method) => goToStep(method)} />
          )}
          {step === "emailInput" && (
            <EmailStep
              email={email}
              setEmail={setEmail}
              onNext={() => goToStep("emailConfirm")}
              onHelp={() => goToStep("helpEmail")}
            />
          )}
          {step === "emailConfirm" && (
            <EmailConfirmStep
              email={email}
              onConfirm={() => goToStep("profile")}
              onResend={() => console.log("Отправка нового кода")}
            />
          )}
          {step === "phoneInput" && (
            <PhoneStep
              phone={phone}
              setPhone={setPhone}
              onNext={() => goToStep("phoneConfirm")}
            />
          )}
          {step === "phoneConfirm" && (
            <PhoneConfirmStep
              phone={phone}
              onConfirm={() => goToStep("profile")}
              onHelp={() => goToStep("helpPhone")}
            />
          )}
          {step === "helpEmail" && (
            <HelpScreen
              title="Не приходит письмо"
              text="Убедитесь, что вы указали корректный адрес электронной почты..."
            />
          )}
          {step === "helpPhone" && (
            <HelpScreen
              title="Не приходит SMS"
              text="Убедитесь, что вы указали корректный номер телефона..."
            />
          )}

          {/* --- Профиль с аватаркой и симуляцией сервера --- */}
          {step === "profile" && (
            <div className="flex flex-col gap-4 w-full max-w-md">
              <h1 className="text-3xl font-semibold">Личная информация</h1>

              {/* Аватарка */}
              <div className="flex justify-center mt-2 mb-4">
                <img
                  src={user?.avatar || ""}
                  alt="Аватар"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                value={email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />

              <div className="flex items-start flex-col gap-2 mt-2">
                <label className="flex gap-2">
                  <input type="checkbox" />
                  <span>
                    Я согласен получать информационные письма и рассылки
                  </span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" />
                  <span>
                    Я подтверждаю условия лицензионного договора и политику
                    обработки персональных данных
                  </span>
                </label>
              </div>

              <button
                className="w-full py-3 bg-black text-white rounded mt-4"
                onClick={serverFunc}
              >
                Продолжить
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
