import { useEffect } from "react";

export function useScrollToTopAndLockBody(maxWidth: number = 640) {
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
