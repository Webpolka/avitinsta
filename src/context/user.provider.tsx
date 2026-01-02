import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./user.context";
import { type User } from "@/mocks/users.mocks";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Добавляем состояние для AuthCanvas
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  // useEffect(() => {
  //   const foundUser: User | null = USERS_DATA.find((u) => u.id === "1") ?? null;
  //   const wrap = () => {
  //     setUser(foundUser);
  //   };
  //   wrap();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    // mock-запрос
    const wrap = () => {
      setUser({
        id: "1",
        name: "Test",
        token,
      } as User);
    };
    wrap();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthOpen, // для AuthCanvas
        openAuth, // открыть модалку
        closeAuth, // закрыть модалку
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
