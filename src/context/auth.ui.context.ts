
import { createContext } from "react";

export type AuthUIContextType = {  
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;  

};
export const AuthUIContext = createContext<AuthUIContextType>({
  isAuthOpen: false,
  openAuth: () => {},
  closeAuth: () => {},

});