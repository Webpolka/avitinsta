import type { User } from "@/mocks/users.mocks";

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
        return ;
      }

      codeStorage.delete(key);

      // имитация: новый или существующий пользователь
      const isNewUser = Math.random() > 0.5;

      resolve({ isNewUser });
    }, 700);
  });
}

// ==========================
// REGISTER USER
// ==========================
export function registerUser(data: {
  email?: string;
  phone?: string;
  name: string;
}): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: crypto.randomUUID(),
        email: data.email,
        phone: data.phone,
        name: data.name,
        avatar: "",
        token: "mock-jwt-token",
      } as User;

      localStorage.setItem("token", user.token ?? "");
      console.log(localStorage.getItem('token'));

      resolve(user);
    }, 800);
  });
}

