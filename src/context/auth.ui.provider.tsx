import { useState, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthUIContext } from "./auth.ui.context";
import { useUser } from "./use.all";

type AuthUIProviderProps = { children: ReactNode };

export function AuthUIProvider({ children }: AuthUIProviderProps) {
  const { user } = useUser(); // берём данные пользователя
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const openAuth = () => {
    if (user) {
      navigate("/profile");
      return;
    }

    setIsAuthOpen(true);

    if (location.pathname !== "/login") {
      navigate("/login", { state: { backgroundLocation: location } });
    }
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    if (location.pathname === "/login") navigate(-1);
  };

  // если пользователь зашёл напрямую на /login
  useEffect(() => {
    if (location.pathname === "/login" && !user) {
      const foo = () => {
        setIsAuthOpen(true);
      };
      foo();
    }
  }, [location.pathname, user]);

  return (
    <AuthUIContext.Provider value={{ isAuthOpen, openAuth, closeAuth }}>
      {children}
    </AuthUIContext.Provider>
  );
}
