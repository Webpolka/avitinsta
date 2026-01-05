import { useEffect } from "react";

// Простое блокирование скролаа
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

// Блокирование скрола для оверлея
export function useOverlayLockScroll(isLocked: boolean) {
  useEffect(() => {
    const body = document.body;

    // если не нужно блокировать — просто выходим
    if (!isLocked) return;
    
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

// Возврат наверх и блокирование скролла для мобилки
export function useToTopMobileLockScroll(maxWidth: number = 640) {
  useEffect(() => {
    const body = document.body;

    // сохраняем оригинальные значения
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    const applyLock = () => {
      if (window.innerWidth > maxWidth) {
        // если десктоп — снимаем лок
        body.style.overflow = originalOverflow;
        body.style.paddingRight = originalPaddingRight;
        return;
      }

      // скролл вверх
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      // считаем ширину скроллбара
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      body.style.overflow = "hidden";
      body.style.paddingRight =
        scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
    };

    // первичное применение
    applyLock();

    // подписка на resize
    window.addEventListener("resize", applyLock);

    return () => {
      // cleanup
      window.removeEventListener("resize", applyLock);
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [maxWidth]);
}


