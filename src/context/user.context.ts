import { createContext } from "react";
import type { User } from "@/mocks/users.mocks";

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;

  // Новое для auth canvas
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},

   isAuthOpen: false,
  openAuth: () => {},
  closeAuth: () => {},
});
