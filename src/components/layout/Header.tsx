// src/components/layout/Header.tsx
// Убираем 'use client', если нет интерактивности ВНУТРИ этого компонента

import NavLink from "./NavLink"; // Компонент для ссылок с активным состоянием
import Logo from "@/components/ui/Logo"; // Компонент логотипа

// Определяем тип для объекта навигационной ссылки
interface NavLinkItem {
  href: string;
  label: string;
}

const Header = () => {
  // Явно типизируем массив ссылок
  const navLinks: NavLinkItem[] = [
    { href: "/about", label: "О компании" },
    { href: "/products", label: "Продукция" },
    { href: "/logistics", label: "Логистика" },
    { href: "/clients", label: "Клиентам/Партнерам" },
    { href: "/contacts", label: "Контакты" },
  ];

  // TODO: Добавить состояние и обработчик для мобильного меню
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Используем container для центрирования и px-4 для отступов */}
      {/* Задаем фиксированную высоту хедера, например h-16 (64px) или h-20 (80px) */}
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* Компонент Логотипа */}
        <Logo />

        {/* Навигация для десктопа (скрыта до md) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Кнопка Бургер-меню для мобильных экранов (видна до md) */}
        <div className="md:hidden">
          <button
            type="button"
            // onClick={toggleMobileMenu} // TODO: Добавить обработчик
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-brand-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-controls="mobile-menu"
            aria-expanded={false} // TODO: Заменить на isMobileMenuOpen
          >
            <span className="sr-only">Открыть меню</span>
            {/* TODO: Менять иконку в зависимости от isMobileMenuOpen */}
            {/* Иконка бургер */}
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
            {/* Иконка крестик */}
            {/* <svg className="hidden h-6 w-6" ... > <path d="M6 18L18 6M6 6l12 12" /> </svg> */}
          </button>
        </div>

        {/* Опциональный контакт справа (можно скрыть на некоторых размерах) */}
        {/* <div className="hidden lg:block"> ... </div> */}
      </div>

      {/* Мобильное меню (блок будет показан/скрыт по условию) */}
      {/* TODO: Обернуть в условие {isMobileMenuOpen && (...)} */}
      <div className="hidden md:hidden" id="mobile-menu">
        {" "}
        {/* Используем 'hidden' пока нет состояния */}
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            // Используем NavLink или простой Link для мобильного меню
            <NavLink key={`mobile-${link.href}`} href={link.href}>
              {/* Стили для мобильного пункта меню */}
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                {link.label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
