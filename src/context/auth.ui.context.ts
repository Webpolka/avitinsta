import { createContext } from "react";
import type { Location } from "react-router-dom";

export type AuthUIContextType = {
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  backgroundLocation?: Location | null;
};
export const AuthUIContext = createContext<AuthUIContextType>({
  isAuthOpen: false,
  openAuth: () => {},
  closeAuth: () => {},
  backgroundLocation: null,
});

// export const AuthUIContext = createContext<AuthUIContextType | undefined>(undefined);