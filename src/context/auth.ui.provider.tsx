import { useState, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { AuthUIContext } from "./auth.ui.context";
import { useUser } from "./use.all";

type AuthUIProviderProps = { children: ReactNode };

export function AuthUIProvider({ children }: AuthUIProviderProps) {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [backgroundLocation, setBackgroundLocation] = useState<Location | null>(
    null
  );

  // открываем модалку логина
  const openAuth = () => {
    if (user) {
      navigate("/profile");
      return;
    }

    setBackgroundLocation(location); // сохраняем текущую страницу как фон
    setIsAuthOpen(true);

    if (location.pathname !== "/login") {
      navigate("/login", {
        state: { backgroundLocation: location },
        replace: true,
      });
    }
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    // возврат назад только если был переход через кнопку
    if (location.pathname === "/login" && backgroundLocation) {
      navigate("/");
    }
  };

  // прямой заход на /login через адресную строку → просто открываем модалку, фон = Home
  useEffect(() => {
    if (location.pathname === "/login") {
      if (user) {
        navigate("/profile");
      } else {
        const foo = () => {
          setIsAuthOpen(true);
          setBackgroundLocation({ ...location, pathname: "/" }); // фон всегда Home
        };
        foo();
      }
    }
  }, [location.pathname, user, navigate]);

  return (
    <AuthUIContext.Provider
      value={{ isAuthOpen, openAuth, closeAuth, backgroundLocation }}
    >
      {children}
    </AuthUIContext.Provider>
  );
}
