import { api } from "./api";
import type { User } from "@/mocks/users.mocks";

// ---- Шаг 1: Отправка кода на email или телефон ----
export const sendCode = async (data: { email?: string; phone?: string }): Promise<void> => {
  await api.post("/login-code", data);
};

// ---- Шаг 2: Проверка кода ----
export const verifyCode = async (data: { email?: string; phone?: string; code: string }): Promise<{ isNewUser: boolean; tempToken?: string }> => {
  const res = await api.post<{ isNewUser: boolean; tempToken?: string }>("/verify-code", data);
  return res.data;
};

// ---- Шаг 3: Финальная регистрация / создание пользователя ----
export const registerUser = async (data: {
  tempToken?: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: File;
  mailingAgree?: boolean;
  policyAgree: boolean;
}): Promise<User> => {
  const formData = new FormData();

  if (data.tempToken) formData.append("tempToken", data.tempToken);
  if (data.name) formData.append("name", data.name);
  if (data.email) formData.append("email", data.email);
  if (data.phone) formData.append("phone", data.phone);
  if (data.avatar) formData.append("avatar", data.avatar);
  formData.append("mailingAgree", String(data.mailingAgree ?? false));
  formData.append("policyAgree", String(data.policyAgree));

  const res = await api.post<User>("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};


// сервер отдаёт текущего пользователя по cookie
export const getMe = async (): Promise<User | null> => {
  try {
    const res = await api.get("/me");
    // проверка, что пришёл объект с нужными полями
    if (res.data && typeof res.data === "object" && "id" in res.data) {
      return res.data as User;
    }
    return null;
  } catch {
    return null;
  }
};


 // сервер удаляет cookie
export const logout = async (): Promise<void> => {
  await api.post("/logout");
};


