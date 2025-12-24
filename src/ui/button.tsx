import { Link, type LinkProps } from "react-router-dom";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

// Общие пропсы для кнопки
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

// Пропсы для обычного <button>
type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: never; // Если to есть, это не кнопка
};

// Пропсы для <Link>
type LinkButtonProps = BaseButtonProps & LinkProps & {
  to: string;
  onClick?: () => void;
};

// Объединяем — универсальный компонент
type BtnProps = ButtonProps | LinkButtonProps;

export default function Button({
  to,
  onClick,
  children,
  className,
  disabled = false,
  ...rest
}: BtnProps) {
  const baseClasses =
    "inline-flex items-center justify-center no-underline py-2";

  const classes = clsx(baseClasses, className, disabled && "opacity-50 cursor-not-allowed");

  // Если есть to — это ссылка
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes} {...(rest as Omit<LinkProps, "to">)}>
        {children}
      </Link>
    );
  }

  // Иначе — обычная кнопка
  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
