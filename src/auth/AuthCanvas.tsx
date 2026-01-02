import { useState } from "react";
import { useUser } from "@/context/use.user";

import { sendCode, verifyCode, registerUser } from "./auth.api";
import { type AuthStep } from "./auth.types";

import { TopBar } from "./steps/TopBar";
import { EmailConfirmStep } from "./steps/EmailConfirmStep";
import { EmailInputStep } from "./steps/EmailInputStep";
import { PhoneConfirmStep } from "./steps/PhoneConfirmStep";
import { PhoneInputStep } from "./steps/PhoneInputStep";
import { HelpStep } from "./steps/HelpStep";
import { MethodStep } from "./steps/MethodStep";

// ----- AuthCanvas Props -----
interface AuthCanvasProps {
  isOpen: boolean; // флаг, открыта ли модалка
  onClose: () => void; // функция закрытия модалки
}

// ----- AuthCanvas Component -----
export default function AuthCanvas({ isOpen, onClose }: AuthCanvasProps) {
  const { user, setUser } = useUser(); // контекст пользователя
  const [code, setCode] = useState(""); // код подтверждения (email/phone)

  // Текущий шаг авторизации
  const [step, setStep] = useState<AuthStep>("method");

  // Данные пользователя, редактируемые в форме
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [name, setName] = useState(user?.name || "");

  // История шагов для кнопки "назад"
  const [history, setHistory] = useState<AuthStep[]>([]);

  // --- Переход на новый шаг ---
  const goToStep = (newStep: AuthStep) => {
    setCode(""); // сброс кода при смене шага
    setHistory((prev) => [...prev, step]); // сохраняем текущий шаг в историю
    setStep(newStep); // устанавливаем новый шаг
  };

  // --- Назад к предыдущему шагу ---
  const handleBack = () => {
    if (history.length === 0) return; // если истории нет — ничего не делаем
    const prevStep = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1)); // удаляем последний шаг из истории
    setStep(prevStep); // возвращаемся на предыдущий шаг
  };

  // --- Закрытие модалки и сброс состояния ---
  const handleClose = () => {
    setStep("method"); // сброс к первому шагу
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setName(user?.name || "");
    setCode(""); // сброс кода подтверждения
    onClose(); // вызываем функцию закрытия модалки
  };

  // Если модалка закрыта, ничего не рендерим
  if (!isOpen) return null;

  // --- Отправка данных профиля на сервер ---
  const handleProfileSubmit = async () => {
    const userFromServer = await registerUser({
      email,
      phone,
      name,
    });

    setUser(userFromServer); // сохраняем пользователя в контекст
    onClose(); // закрываем модалку
  };

  // --- Отправка кода на email ---
  const handleSendEmailCode = async () => {
    await sendCode({ email });
    goToStep("emailConfirm"); // переходим на шаг подтверждения
  };

  // --- Отправка кода на телефон ---
  const handleSendPhoneCode = async () => {
    await sendCode({ phone });
    goToStep("phoneConfirm"); // переходим на шаг подтверждения
  };

  // --- Проверка кода email ---
  const handleVerifyEmailCode = async () => {
    try {
      const res = await verifyCode({ email, code });
      if (res.isNewUser) {
        goToStep("profile"); // если новый пользователь — показываем форму профиля
      } else {
        onClose(); // если старый пользователь — закрываем (потом будет getMe)
      }
    } catch {
      alert("Неверный код"); // обработка ошибки
    }
  };

  // --- Проверка кода телефона ---
  const handleVerifyPhoneCode = async () => {
    try {
      const res = await verifyCode({ phone, code });
      if (res.isNewUser) {
        goToStep("profile");
      } else {
        onClose();
      }
    } catch {
      alert("Неверный код");
    }
  };

  // -------------------- Рендер --------------------
  return (
    <div
      className={`
        z-50 fixed top-0 right-0 h-screen w-full md:w-1/2 bg-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col
      `}
    >
      {/* Верхняя панель с кнопкой назад и закрытия */}
      <TopBar
        canGoBack={history.length > 0}
        onBack={handleBack}
        onClose={handleClose}
      />

      {/* Контент модалки */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md text-center">
          {/* --- Выбор метода авторизации --- */}
          {step === "method" && (
            <MethodStep onSelect={(method) => goToStep(method)} />
          )}

          {/* --- Ввод Email --- */}
          {step === "emailInput" && (
            <EmailInputStep
              email={email}
              setEmail={setEmail}
              onNext={handleSendEmailCode}
            />
          )}

          {/* --- Подтверждение Email --- */}
          {step === "emailConfirm" && (
            <EmailConfirmStep
              email={email}
              code={code}
              onHelp={() => goToStep("helpEmail")}
              setCode={setCode}
              onConfirm={handleVerifyEmailCode}
              onResend={handleSendEmailCode}
            />
          )}

          {/* --- Ввод телефона --- */}
          {step === "phoneInput" && (
            <PhoneInputStep
              phone={phone}
              setPhone={setPhone}
              onNext={handleSendPhoneCode}
            />
          )}

          {/* --- Подтверждение телефона --- */}
          {step === "phoneConfirm" && (
            <PhoneConfirmStep
              phone={phone}
              code={code}
              setCode={setCode}
              onConfirm={handleVerifyPhoneCode}
              onHelp={() => goToStep("helpPhone")}
            />
          )}

          {/* --- Справка по Email --- */}
          {step === "helpEmail" && (
            <HelpStep
              title="Не приходит письмо"
              text="Убедитесь, что вы указали корректный адрес электронной почты..."
            />
          )}

          {/* --- Справка по телефону --- */}
          {step === "helpPhone" && (
            <HelpStep
              title="Не приходит SMS"
              text="Убедитесь, что вы указали корректный номер телефона..."
            />
          )}

          {/* --- Профиль пользователя --- */}
          {step === "profile" && (
            <div className="flex flex-col gap-4 w-full max-w-md">
              <h1 className="text-3xl font-semibold">Личная информация</h1>

              {/* Аватар */}
              <div className="flex justify-center mt-2 mb-4">
                <img
                  src="/images/placeholder-square.png"
                  alt="Аватар"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
              </div>

              {/* Email и имя */}
              {email ? (
                <span className="w-full text-left p-3 border border-gray-300 rounded focus:outline-none focus:border-grayscale-700">
                  {email}
                </span>
              ) : (
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-grayscale-700"
                />
              )}

              {/* имя */}
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-grayscale-700"
              />

              {/* Чекбоксы согласий */}
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

              {/* Кнопка "Продолжить" */}
              <button
                className="w-full py-3 bg-black text-white rounded mt-4 cursor-pointer hover:opacity-90"
                onClick={handleProfileSubmit}
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
