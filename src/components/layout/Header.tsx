// src/components/layout/Header.tsx [ДЛЯ ПЛАНА Б - с useLocale]
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./NavLink";
import Logo from "@/components/ui/Logo";
import { useLocale } from "@/context/LocaleContext"; // Наш хук
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import { AbstractIntlMessages } from "next-intl"; // Тип

// --- Иконки ---
const IconMenu = () => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);
const IconX = () => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Тип для навигационной ссылки
interface NavLinkData {
  href: string;
  label: string;
}

// --- Компонент Header ---
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Получаем сообщения из контекста
  const { messages } = useLocale();

  // --- Функция для безопасного получения перевода ---
  const getTranslation = (
    namespace: string,
    key: string,
    fallback: string
  ): string => {
    if (
      typeof messages === "object" &&
      messages !== null &&
      messages[namespace]
    ) {
      const nsMessages = messages[namespace] as AbstractIntlMessages;
      const message = nsMessages[key];
      if (typeof message === "string" && message.trim() !== "") {
        return message;
      }
    }
    return fallback;
  };

  // --- Формируем массив ссылок (убрали useMemo) ---
  const navLinks: NavLinkData[] = [
    {
      href: "/about",
      label: getTranslation("Navigation", "about", "О компании"),
    },
    {
      href: "/products",
      label: getTranslation("Navigation", "products", "Продукция"),
    },
    {
      href: "/logistics",
      label: getTranslation("Navigation", "logistics", "Логистика"),
    },
    {
      href: "/clients",
      label: getTranslation("Navigation", "clients", "Клиентам/Партнерам"),
    },
    {
      href: "/contacts",
      label: getTranslation("Navigation", "contacts", "Контакты"),
    },
  ];

  // Анимация мобильного меню
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex-shrink-0">
          {" "}
          <Logo />{" "}
        </div>
        <div className="flex items-center">
          <nav className="hidden md:block mr-4">
            <ul className="flex space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:block">
            {" "}
            <LocaleSwitcher />{" "}
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <LocaleSwitcher />
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-brand-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Открыть меню</span>
              {isMobileMenuOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 overflow-hidden"
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink key={`mobile-${link.href}`} href={link.href}>
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  >
                    {" "}
                    {link.label}{" "}
                  </span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
