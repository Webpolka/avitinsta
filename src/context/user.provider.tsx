import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./user.context";
import type { User } from "@/mocks/users.mocks";
import { USERS_DATA } from "@/mocks/users.mocks";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // открыть форму авторизации
  const openAuth = () => {
    if (user) {
      navigate("/profile");
      return;
    }

    setIsAuthOpen(true);

    // если не на /login — добавляем его
    if (location.pathname !== "/login") {
      navigate("/login", {
        state: {
          backgroundLocation: location, //  КЛЮЧ
        },
      });
    }
  };

    // закрыть форму авторизации
  const closeAuth = () => {
    setIsAuthOpen(false);

    // если мы были на /login — возвращаемся назад
    if (location.pathname === "/login") {
      navigate(-1);
    }
  };

  //  если пользователь зашёл напрямую на /login
  useEffect(() => {
    if (location.pathname === "/login") {
      const wrapFunc = () => {
        setIsAuthOpen(true);
      };
      wrapFunc();
    }
  }, [location.pathname]);

  //  восстановление пользователя по токену
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const wrapFunc = () => {
      setUser(USERS_DATA[0] as User);  // просто вместо ответа сервера
    };
    wrapFunc();
  }, []);

  // выход из аккаунта
  const handleLogout = () => {
    localStorage.removeItem("token"); // удаляем токен
    setUser(null); // очищаем пользователя
    navigate("/"); // можно отправить на главную
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        isAuthOpen,
        openAuth,
        closeAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
