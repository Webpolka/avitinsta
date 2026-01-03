import { useEffect } from "react";

export function useOverlayLockScroll(isLocked: boolean) {
  useEffect(() => {
    const body = document.body;

    // если не нужно блокировать — просто выходим
    if (!isLocked) return;

    console.log("INN");
    
    // сохраняем исходные значения
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    // ширина скроллбара
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // блокируем скролл
    body.style.overflow = "hidden";

    // компенсируем исчезновение скроллбара
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // cleanup — ВАЖНО
    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}
