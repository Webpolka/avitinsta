import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./user.context";
import type { User } from "@/mocks/users.mocks";
import { USERS_DATA } from "@/mocks/users.mocks";

type UserProviderProps = { children: ReactNode };

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  // восстановление пользователя по токену
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsUserLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000)); // имитация запроса
        setUser(user || USERS_DATA[0] as User);
      } catch {
        setUser(null);
      } finally {
        setIsUserLoading(false);
      }
    };

    loadUser();

  //   async function fetchUser() {
  //   try {
  //     const res = await fetch("/api/me", { credentials: "include" });
  //     if (res.ok) {
  //       const data = await res.json();
  //       setUser(data); // кладём в контекст
  //     }
  //   } catch (err) {
  //     setUser(null); // если не авторизован
  //   }
  // }

  // fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        isUserLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
