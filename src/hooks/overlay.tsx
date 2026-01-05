import { useOverlayLockScroll } from "./lockScroll";
interface OverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function Overlay({ isOpen, onClick }: OverlayProps) {
  useOverlayLockScroll(isOpen);
  return (
    <div
      onClick={onClick}
      className={`
        fixed inset-0 z-40
        bg-black/50
        transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    />
  );
}
