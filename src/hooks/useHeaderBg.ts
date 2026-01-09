import { useEffect } from "react";

export function useHeaderBackground(isWhite: boolean) {
  useEffect(() => {
    const header = document.querySelector("header"); // или твой селектор

    if (!header) return;

    const prevBg = header.style.backgroundColor;

    if (isWhite) {
      header.style.backgroundColor = "#fff";
    } else {
      header.style.backgroundColor = prevBg || "";
    }

    return () => {
      header.style.backgroundColor = prevBg || "";
    };
  }, [isWhite]);
}
