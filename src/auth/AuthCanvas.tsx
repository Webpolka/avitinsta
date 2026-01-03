import { useState } from "react";
import { useUser } from "@/context/use.user";

import { sendCode, verifyCode, registerUser } from "./temp.auth.api";
import { type AuthStep } from "./auth.types";

import { TopBar } from "./steps/TopBar";
import { EmailConfirmStep } from "./steps/EmailConfirmStep";
import { EmailInputStep } from "./steps/EmailInputStep";
import { PhoneConfirmStep } from "./steps/PhoneConfirmStep";
import { PhoneInputStep } from "./steps/PhoneInputStep";
import { HelpStep } from "./steps/HelpStep";
import { MethodStep } from "./steps/MethodStep";

import { Checkbox } from "@/ui/checkbox";

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

  // Подписка и политика конфеденциальности если пользователь создан
  const [mailingAgree, setMailingAgree] = useState(false);
  const [policyAgree, setPolicyAgree] = useState(false);

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
  //  if (!isOpen) return null;

  // --- Отправка данных профиля на сервер ---
  const handleProfileSubmit = async () => {
    const userFromServer = await registerUser({
      email,
      phone,
      name,
      mailingAgree,
      policyAgree,
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
      throw Error("Неверный код");
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
      throw Error("Неверный код");
    }
  };

  const isSubmitDisabled = !name || !policyAgree;

  // -------------------- Рендер --------------------
  return (
    <div
      className={`
    fixed top-0 right-0 z-50 h-screen w-full md:w-1/2 bg-white
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "translate-x-full"}
    ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
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
        <div className="w-full flex flex-col items-center">
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
              isOpen={isOpen}
            />
          )}

          {/* --- Справка по Email --- */}
          {step === "helpEmail" && (
            <HelpStep
              title="Не приходит письмо ?"
              text="Убедитесь, что Вы указали корректный адрес электронной почты, находитесь в зоне действия сети, и Ваше мобильное устройство работает в штатном режиме или напишите в поддержку"
            />
          )}

          {/* --- Справка по телефону --- */}
          {step === "helpPhone" && (
            <HelpStep
              title="Не приходит Смс?"
              text="Убедитесь, что вы указали корректный номер телефона, находитесь в зоне действия сети, и ваше мобильное устройство работает в штатном режиме.Если данная ситуация не решается, напишите в поддержку."
            />
          )}

          {/* --- Профиль пользователя --- */}
          {step === "profile" && (
            <div className="flex flex-col gap-7.5 w-full max-w-[431px]">
              <h1 className="text-3xl font-semibold">Личная информация</h1>

              {/* Аватар */}
              <div className="flex justify-center">
                <img
                  src="/images/placeholder-square.png"
                  alt="Аватар"
                  className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
              </div>

              {/* Email и имя */}

              <label className="flex flex-col gap-2.5">
                <span className="ag-h7 text-secondary font-medium">E-mail</span>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  name="auth-email-finish"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-[#f8f8f8] border placeholder:text-grayscale-500 border-grayscale-100 rounded-[8px] focus:outline-none focus:border-grayscale-500"
                />
              </label>

              {/* имя */}
              <label className="flex flex-col gap-2.5 ">
                <span className="ag-h7 text-secondary font-medium">
                  Имя пользователя*
                </span>
                <input
                  type="text"
                  placeholder="Nikita"
                  name="auth-name-finish"
                  required
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-[#f8f8f8] placeholder:text-grayscale-500 border border-grayscale-100 rounded-[8px] focus:outline-none focus:border-grayscale-500"
                />
              </label>

              {/* Чекбоксы согласий */}

              <Checkbox
                label="Я соглашаюсь получать информационные письма и индивидуальные расслылки"
                checked={mailingAgree}
                onChange={() => setMailingAgree((v) => !v)}
                labeClassName="items-start gap-3"
                textClassName="text-[#3b220e] leading-5"
                className="w-5 h-5 rounded-[4px] border-grayscale-500"
              />
              <Checkbox
                label="Я подтверждаю, что принимаю условия лицензионного договора, агентского договора и политики обработки персональных данных"
                checked={policyAgree}
                required={true}
                onChange={() => setPolicyAgree((v) => !v)}
                labeClassName="items-start gap-3"
                textClassName="text-[#3b220e] leading-5"
                className="w-5 h-5 rounded-[4px] border-grayscale-500"
              />

              {/* Кнопка "Продолжить" */}
              <button
                disabled={isSubmitDisabled}
                className={`w-full min-h-[55px] flex cursor-pointer items-center justify-center ag-h6 font-medium bg-black text-white hover:opacity-90
                ${isSubmitDisabled ? "opacity-50 pointer-events-none" : ""}`}
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
