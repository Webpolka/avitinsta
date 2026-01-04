import { useState, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthUIContext } from "./auth.ui.context";
import { useUser } from "./use.all";

export function AuthUIProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuth = () => {
    if (user) {
      navigate("/profile");
      return;
    }

    setIsAuthOpen(true);

    if (location.pathname !== "/login") {
      navigate("/login", {
        state: { backgroundLocation: location },
      });
    }
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    const state = location.state as { backgroundLocation?: Location } | null;

    if (state?.backgroundLocation) {
      // пришли через кнопку → возвращаемся назад
      navigate(-1);
    } else {
      // пришли через адресную строку → идём на Home
      navigate("/", { replace: true });
    }
  };

  const finishAuth = () => {
    setIsAuthOpen(false);
    navigate("/profile", { replace: true });
  };

  //  прямой заход на /login
  useEffect(() => {
    if (location.pathname === "/login" && !location.state?.backgroundLocation) {
      navigate("/", { replace: true });
      const foo = () => {
        setIsAuthOpen(true);
      };
      foo();
    }
  }, [location]);

  return (
    <AuthUIContext.Provider
      value={{ isAuthOpen, openAuth, closeAuth, finishAuth }}
    >
      {children}
    </AuthUIContext.Provider>
  );
}
