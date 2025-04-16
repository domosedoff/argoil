// src/components/layout/NavLink.tsx
"use client"; // Эта директива ОБЯЗАТЕЛЬНА для использования хуков

import Link from "next/link";
import { usePathname } from "next/navigation"; // Хук для получения текущего пути

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname(); // Получаем текущий путь (например, '/about')
  const isActive = pathname === href; // Проверяем, совпадает ли путь со ссылкой

  // Определяем классы в зависимости от активности ссылки
  const activeClassName = "border-primary text-primary"; // Классы для активной ссылки
  const inactiveClassName =
    "border-transparent text-brand-dark hover:text-primary hover:border-primary"; // Классы для неактивной

  return (
    <Link
      href={href}
      className={`font-medium transition-colors pb-1 border-b-2 ${
        isActive ? activeClassName : inactiveClassName
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
