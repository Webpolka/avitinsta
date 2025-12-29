import { useEffect } from "react";

export function useScrollToTopAndLockBody(maxWidth: number = 640) {
  useEffect(() => {
     // Проверяем, мобилка ли сейчас
    if (window.innerWidth > maxWidth) return;

    // Скроллим страницу к верху
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // без анимации, чтобы не было дерганий
    });

    const body = document.body;

    // Сохраняем исходные значения
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    // Считаем ширину скроллбара
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Блокируем скролл
    body.style.overflow = "hidden";

    // Компенсируем исчезновение скроллбара
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Cleanup при закрытии модалки
    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, []);
}
