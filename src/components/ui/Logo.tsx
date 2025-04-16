// src/components/ui/Logo.tsx
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    // Задаем размеры и позиционирование для ССЫЛКИ-КОНТЕЙНЕРА
    <Link
      href="/"
      className={`relative inline-block w-[150px] h-[40px] ${className}`} // <-- ЗАДАЕМ ШИРИНУ (w-[...]) И ВЫСОТУ (h-[...]) ЗДЕСЬ
      // Подставьте ваши желаемые размеры
    >
      <Image
        src="/logo.png" // Укажите ваш путь
        alt="Логотип Компании Аргойл"
        fill // <-- Заполняет родительский контейнер (Link)
        priority
        className="object-contain" // <-- Масштабирует ИЗОБРАЖЕНИЕ внутри контейнера с сохранением пропорций
        // object-cover - обрежет лишнее, object-contain - покажет всё
      />
    </Link>
  );
};

export default Logo;
