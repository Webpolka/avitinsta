import { useState } from "react";
import styles from "./headerOffcanvas.module.scss";
// Types
interface MenuItemProps {
  title: string;
  to: string;
  icon?: string;
}

interface HeaderOffcanvasProps {
  items: MenuItemProps[];
}

// Item
function MenuItem({ title, to }: MenuItemProps) {
  return (
    <li>
      <a href={to} className="ag-h4 hover:underline">
        {title}
      </a>
    </li>
  );
}

// HeaderOffcanvas
export default function HeaderOffcanvas({ items }: HeaderOffcanvasProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Бургер */}
      <button
        onClick={() => setIsOpen(true)}        
      >
        <svg preserveAspectRatio="none" className="w-10 h-[15px] sm:w-7.5 sm:h-3 cursor-pointer">
          <use href='/icons/symbol/sprite.svg#burger' />
        </svg>
      </button>

      {/* HeaderOffcanvas */}
      <nav
        className={`${styles.offcanvas} ${
          isOpen ? styles.offcanvasActive : ""
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className={styles.offcanvasClose}
        >
          <svg className="w-7.5 h-7.5">
            <use href="/icons/symbol/sprite.svg#close" />
          </svg>
        </button>

        <ul className="flex flex-col gap-[28px] sm:gap-[25px]">
          {items.map((item) => (
            <MenuItem key={item.title} {...item} />
          ))}
        </ul>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`${styles.overlay} ${
          isOpen ? styles.overlayActive : ""
        }`}
      />
    </>
  );
}
