// hooks/useScrollToTop.ts
import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { scrollPages } from "./useScrollToTop.config.ts";

function UseScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // проверяем, отключён ли скролл на текущем пути
    const isDisabled = scrollPages.disable.some((path) =>
      matchPath({ path, end: false }, pathname)
    );

    if (isDisabled) return;

    // проверяем, разрешён ли скролл
    const isEnabled = scrollPages.enable.some((path) =>
      matchPath({ path, end: false }, pathname)
    );

    if (isEnabled) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);
  return null;
}

export default UseScrollToTop;