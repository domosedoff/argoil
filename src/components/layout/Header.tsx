// src/components/layout/Header.tsx
"use client"; // <--- ОБЯЗАТЕЛЬНО: Делаем клиентским компонентом

import { useState } from "react"; // <--- Импортируем useState
import NavLink from "./NavLink";
import Logo from "@/components/ui/Logo";

interface NavLinkItem {
  href: string;
  label: string;
}

const Header = () => {
  const navLinks: NavLinkItem[] = [
    { href: "/about", label: "О компании" },
    { href: "/products", label: "Продукция" },
    { href: "/logistics", label: "Логистика" },
    { href: "/clients", label: "Клиентам/Партнерам" },
    { href: "/contacts", label: "Контакты" },
  ];

  // Состояние для управления мобильным меню
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Функция для переключения состояния меню
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Закрываем меню при клике на ссылку в мобильном меню
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Logo />

        {/* Навигация для десктопа */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Кнопка Бургер-меню */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu} // <--- Привязываем обработчик
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-brand-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen} // <--- Управляем aria-expanded
          >
            <span className="sr-only">Открыть меню</span>
            {/* Иконка меняется в зависимости от состояния */}
            {isMobileMenuOpen ? (
              // Иконка крестик (закрыть)
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Иконка бургер (открыть)
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {/* Управляем отображением через isMobileMenuOpen */}
      {/* Добавляем классы для плавного появления/скрытия (опционально) */}
      <div
        className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-200`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            // Добавляем onClick к каждой ссылке для закрытия меню
            <div key={`mobile-${link.href}`} onClick={handleMobileLinkClick}>
              <NavLink href={link.href}>
                <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                  {link.label}
                </span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
