import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./user.context";
import { USERS_DATA, type User } from "@/mocks/users.mocks";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user: User | null = USERS_DATA.find((u) => u.id === "1") ?? null;
    const wrap = () => {
      setUser(user);
    };
    wrap();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
