import {
  useState,
  // ,useEffect
} from "react";
import { useUser } from "@/context/use.all";
import { useDropzone } from "react-dropzone";

import { sendCode, verifyCode, registerUser } from "./temp.auth.api";
import { type AuthStep } from "./auth.types";
import { useAuthUI } from "@/context/use.all";

import { TopBar } from "./steps/TopBar";
import { EmailConfirmStep } from "./steps/EmailConfirmStep";
import { EmailInputStep } from "./steps/EmailInputStep";
import { PhoneConfirmStep } from "./steps/PhoneConfirmStep";
import { PhoneInputStep } from "./steps/PhoneInputStep";
import { HelpStep } from "./steps/HelpStep";
import { MethodStep } from "./steps/MethodStep";
import styles from "@/styles/utilities.module.scss";

import { Checkbox } from "@/ui/checkbox";

// ----- AuthCanvas Props -----
interface AuthCanvasProps {
  isOpen: boolean; // флаг, открыта ли модалка
  onClose: () => void; // функция закрытия модалки
}

// ----- AuthCanvas Component -----
export default function AuthCanvas({ isOpen, onClose }: AuthCanvasProps) {
  const { user, setUser } = useUser(); // контекст пользователя
  const { finishAuth } = useAuthUI();

  // -------------------- Auth state --------------------
  const [code, setCode] = useState(""); // код подтверждения (email / phone)
  const [step, setStep] = useState<AuthStep>("method"); // текущий шаг авторизации
  const [history, setHistory] = useState<AuthStep[]>([]); // история шагов для кнопки "назад"

  // -------------------- Profile data --------------------
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [name, setName] = useState(user?.name || "");
  const [mailingAgree, setMailingAgree] = useState(false);
  const [policyAgree, setPolicyAgree] = useState(false);

  // -------------------- Avatar logic --------------------
  const [serverAvatar /*, setServerAvatar*/] = useState<string | null>(null); // аватар с сервера (URL)
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // локально загруженный файл
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // preview для UI

  // --- Переход на новый шаг ---
  const goToStep = (newStep: AuthStep) => {
    setCode(""); // сброс кода при смене шага
    setHistory((prev) => [...prev, step]); // сохраняем текущий шаг в историю
    setStep(newStep);
  };

  // --- Назад к предыдущему шагу ---
  const handleBack = () => {
    if (!history.length) return;
    const prevStep = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setStep(prevStep);
  };

  // --- Закрытие модалки и сброс состояния ---
  const handleClose = () => {
    setStep("method");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setName(user?.name || "");
    setCode("");
    onClose();
  };

  // --- Отправка данных профиля на сервер ---
  const handleProfileSubmit = async () => {
    // Формируем FormData всегда, если есть avatarFile — добавляем его
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("mailingAgree", String(mailingAgree));
    formData.append("policyAgree", String(policyAgree));
    if (avatarFile) formData.append("avatar", avatarFile);

    // Отправляем на сервер
    const userFromServer = await registerUser(formData);

    // Сохраняем пользователя в контекст и завершаем авторизацию
    setUser(userFromServer);
    finishAuth();
  };

  // --- Отправка кода на email ---
  const handleSendEmailCode = async () => {
    await sendCode({ email });
    goToStep("emailConfirm");
  };

  // --- Отправка кода на телефон ---
  const handleSendPhoneCode = async () => {
    await sendCode({ phone });
    goToStep("phoneConfirm");
  };

  // --- Проверка кода email ---
  const handleVerifyEmailCode = async () => {
    try {
      const res = await verifyCode({ email, code });
      if (res.isNewUser) goToStep("profile");
      else onClose();
    } catch {
      throw new Error("Неверный код");
    }
  };

  // --- Проверка кода телефона ---
  const handleVerifyPhoneCode = async () => {
    try {
      const res = await verifyCode({ phone, code });
      if (res.isNewUser) goToStep("profile");
      else onClose();
    } catch {
      throw new Error("Неверный код");
    }
  };

  const isSubmitDisabled = !name || !policyAgree;

  // Dropzone активен только если аватар НЕ пришёл с сервера
  const dropzoneEnabled = !serverAvatar;

  // Инициализация react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    disabled: !dropzoneEnabled,
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setAvatarFile(file); // сохраняем для отправки на сервер
      setAvatarPreview(URL.createObjectURL(file)); // preview для UI
    },
  });

  // Источник изображения для аватара: preview → сервер → placeholder
  const avatarSrc = avatarPreview || serverAvatar || "/images/placeholder-square.png";

  // -------------------- Рендер --------------------
  return (
    <div
      className={`
    fixed top-0 right-0 z-50 h-screen w-full md:w-[66%] lg:w-1/2 bg-white
    transform transition-transform duration-300 ease-in-out  flex flex-col
    ${isOpen ? "translate-x-0" : "translate-x-full"}
    ${isOpen ? "pointer-events-auto" : "pointer-events-none"}    
  `}
    >
      {/* Верхняя панель с кнопкой назад и закрытия */}
      <TopBar
        canGoBack={history.length > 0}
        onBack={handleBack}
        onClose={handleClose}
      />

      {/* Контент модалки */}
      <div
        className={`${styles.hiddenScroll} flex-1 flex items-center justify-center px-6 md:px-12 overflow-y-auto pb-21`}
      >
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
            <div className="flex flex-col gap-5 sm:gap-7.5 w-full max-w-[431px] pt-10 sm:pt-40">
              <h2 className="ag-h2 sm:ag-h1 font-semibold ">
                Личная информация
              </h2>

              {/* Аватар */}
              <div className="flex justify-center">
                <div className="relative w-20 h-20">
                  {/* Крестик — ТОЛЬКО если локально загружен */}
                  {avatarPreview && !serverAvatar && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAvatarFile(null);
                        setAvatarPreview(null);
                      }}
                      className="absolute z-40 top-0.5 right-0.5 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-80"
                    >
                      <svg className="h-6 w-6 shrink-0">
                        <use href="/icons/symbol/sprite.svg#close_red" />
                      </svg>
                    </button>
                  )}

                  {/* Контейнер */}
                  <div
                    {...(dropzoneEnabled ? getRootProps() : {})}
                    className={`w-full h-full rounded-full border border-gray-300 relative group
                       ${
                         dropzoneEnabled ? "cursor-pointer" : "cursor-default"
                       }`}
                  >
                    {dropzoneEnabled && <input {...getInputProps()} />}

                    {/* Маска */}
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img
                        src={avatarSrc}
                        alt="Аватар"
                        className="w-full h-full object-cover"
                      />

                      {/* Hover затемнение */}
                      {dropzoneEnabled && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition " />
                      )}

                      {/* Плюсик — ТОЛЬКО если нет serverAvatar и нет preview */}
                      {!serverAvatar && !avatarPreview && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-2xl font-light">
                            <svg className="h-6 w-6 shrink-0">
                              <use href="/icons/symbol/sprite.svg#add_r" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
                  className="w-full py-2 px-3 sm:py-3 bg-[#f8f8f8] border placeholder:text-grayscale-500 border-grayscale-100 rounded-[8px] focus:outline-none focus:border-grayscale-500"
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
                  className="w-full py-2 px-3 sm:py-3 bg-[#f8f8f8] placeholder:text-grayscale-500 border border-grayscale-100 rounded-[8px] focus:outline-none focus:border-grayscale-500"
                />
              </label>

              {/* Чекбоксы согласий */}

              <Checkbox
                label="Я соглашаюсь получать информационные письма и индивидуальные расслылки"
                checked={mailingAgree}
                onChange={() => setMailingAgree((v) => !v)}
                labeClassName="items-start gap-3"
                textClassName="ag-h10 sm:ag-h8 text-[#3b220e] leading-5"
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] border-grayscale-500"
              />
              <Checkbox
                label="Я подтверждаю, что принимаю условия лицензионного договора, агентского договора и политики обработки персональных данных"
                checked={policyAgree}
                required={true}
                onChange={() => setPolicyAgree((v) => !v)}
                labeClassName="items-start gap-3"
                textClassName="ag-h10 sm:ag-h8 text-[#3b220e] leading-5"
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] border-grayscale-500"
              />

              {/* Кнопка "Продолжить" */}
              <button
                disabled={isSubmitDisabled}
                className={`w-full min-h-[48px] sm:min-h-[55px] flex cursor-pointer items-center justify-center ag-h7 sm:ag-h6 font-medium bg-black text-white hover:opacity-90
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
