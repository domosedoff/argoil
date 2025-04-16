// src/components/layout/Header.tsx
import Link from "next/link";
import NavLink from "./NavLink"; // <--- Импортируем NavLink

const Header = () => {
  const navLinks = [
    { href: "/about", label: "О компании" },
    { href: "/products", label: "Продукция" },
    { href: "/logistics", label: "Логистика" },
    { href: "/clients", label: "Клиентам/Партнерам" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-heading font-bold text-primary hover:text-primary/80 transition-colors"
        >
          ЛогоКомпании
        </Link>

        <nav>
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                {/* Используем наш новый компонент NavLink */}
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* ... остальной код ... */}
      </div>
    </header>
  );
};

export default Header;
