import { createContext } from "react";
import type { User } from "@/mocks/users.mocks";

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isUserLoading: boolean; 
  handleLogout: () => void;  
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isUserLoading: true, 
  handleLogout: () => {},
});
