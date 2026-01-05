// import {v4 as uuidv4} from "uuid";
import { type User } from "@/mocks/users.mocks";
/**
 * Имитация базы кодов на сервере
 * key = email или phone
 */
const codeStorage = new Map<string, string>();

function generateCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// ==========================
// SEND CODE
// ==========================
export function sendCode(target: {
  email?: string;
  phone?: string;
}): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const key = target.email ?? target.phone!;
      const code = generateCode();

      codeStorage.set(key, code);

      console.log(`📩 MOCK CODE for ${key}:`, code);
      alert(`Введи этот код для подтверждения: ${code}`);
      resolve();
    }, 700);
  });
}

// ==========================
// VERIFY CODE
// ==========================
export function verifyCode(target: {
  email?: string;
  phone?: string;
  code: string;
}): Promise<{ isNewUser: boolean }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const key = target.email ?? target.phone!;
      const storedCode = codeStorage.get(key);

      if (storedCode !== target.code) {
        reject(new Error("Неверный код"));
        return;
      }

      codeStorage.delete(key);

      // имитация: новый или существующий пользователь
      // const isNewUser = Math.random() > 0.5;
      const isNewUser = true;

      resolve({ isNewUser });
    }, 700);
  });
}

// ==========================
// REGISTER USER
// ==========================
export function registerUser(data: FormData): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // проверка принятия политики
      const policyAgree = data.get("policyAgree") === "true";
      if (!policyAgree) {
        reject(new Error("Policy must be accepted"));
        return;
      }

      // собираем данные пользователя из FormData
      const email = (data.get("email") as string) || "";
      const phone = (data.get("phone") as string) || "";
      const name = (data.get("name") as string) || "User";
      const mailingAgree = data.get("mailingAgree") === "true";
      const avatarFile = data.get("avatar") as File | null;

      // генерируем аватар, если файл есть (для мокапа)
      const avatarUrl = avatarFile ? URL.createObjectURL(avatarFile) : "";

      // создаём пользователя
      const user: User = {
        id: "1", // или uuidv4(), если есть
        email,
        phone,
        name,
        avatar: avatarUrl,
        token: "mock-jwt-token",
        mailingAgree,
        policyAgree,

        description:
        "Здесь продается оригинальная продукция: кроссовки и стритвир. Все вещи с чеками и гарантией подлинности. Быстрая доставка по всей России",
        handle: `@@${name}`,
        isMe: true,
        verified: true,
        rating: 1,
        reviewsCount: 22,
        productsCount: 4,
        followersCount: 620,
        followingCount: 20,
        isFollowing: false,
        favouriteProducts: ["1", "3", "5", "6", "8", "9"],
        photos: ["/images/product.png", "/images/product.png"],
        createdAt: "2023-09-15T10:23:00.000Z",
        online: false,
        isHonest: true,
      };

      // сохраняем токен
      localStorage.setItem("token", user.token ?? "");

      resolve(user);
    }, 800);
  });
}

