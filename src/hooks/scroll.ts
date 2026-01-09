import { useEffect } from "react";
import { useLocation } from "react-router";

/*===================================================================
Скролл на начало страницы - ОПТОМ по конфигу
====================================================================*/

const SCROLL_TO_TOP_PAGES = [
  "/cart",
  "/checkout/start",
  "/checkout/finish",
  "/search",
  "/faq",
  "/rating",
  "/looks",
  "/catalog",
  "/product",
  "/profile/info",
];

const SCROLL_PROFILE_ROUTES = [
  "/profile/products",
  "/profile/purchases",
  "/profile/sales",
  "/profile/favourites",
  "/profile/chats",
  "/profile/looks",
  "/user/:id/purchases",
];

export function UsePageScrollToTop() {
  const { pathname } = useLocation();

  // хелпер для проверки динамического пути
  const matchPath = (pattern: string, path: string) => {
    // заменяем :id на [^/]+ (любой сегмент)
    const regexPattern = "^" + pattern.replace(/:\w+/g, "[^/]+") + "$";
    const regex = new RegExp(regexPattern);
    return regex.test(path);
  };

  // Скролл на выбранных страницах наверх
  useEffect(() => {
    if (SCROLL_TO_TOP_PAGES.some((path) => pathname.startsWith(path))) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  // Скролл на страницы профиля к табам
  useEffect(() => {
    if (SCROLL_PROFILE_ROUTES.some((pattern) => matchPath(pattern, pathname))) {
      window.scrollTo({ top: 450, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}

/*===================================================================
Скролл на начало страницы - для избранных
====================================================================*/

export function UseOneScrollToTop() {
  // Одиночный скролл наверх
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return null;
}
