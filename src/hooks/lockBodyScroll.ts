import { useEffect } from "react";

export function useLockBodyScroll() {
  useEffect(() => {
    const body = document.body;

    // Сохраняем исходные значения
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    // Ширина скроллбара
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Блокируем скролл
    body.style.overflow = "hidden";

    // Компенсируем исчезновение скроллбара
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Cleanup
    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, []);
}
