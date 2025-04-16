// src/components/sections/HeroSection.tsx
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      // Пробуем другой градиент: темнее и с менее ярким переходом
      // От brand-dark (#27254c) через чуть затемненный primary до accent (#39c7ff)
      className="relative bg-gradient-to-r from-brand-dark via-primary/80 to-accent text-white py-24 md:py-32 lg:py-40 flex items-center"
      // Обратите внимание на via-primary/80 - делаем фиолетовый чуть прозрачнее/темнее в середине градиента
      // Также убедимся, что у секции есть базовый цвет текста (text-white), но переопределим его ниже при необходимости
    >
      {/* Опционально: можно добавить легкий темный оверлей поверх градиента для лучшего контраста текста */}
      {/* <div className="absolute inset-0 bg-black/20 z-0"></div> */}

      <div className="container mx-auto px-4 relative z-10 text-center">
        {" "}
        {/* z-10 чтобы текст был выше оверлея */}
        <h1
          // Явно ставим белый цвет. Если не видно, проблема может быть в CSS выше (например, в body)
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight text-white"
        >
          Надежные поставки газа <br className="hidden md:block" /> по России и
          СНГ
        </h1>
        <p
          // Используем text-gray-200. Это стандартный светло-серый цвет Tailwind.
          className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
        >
          Обеспечиваем стабильность и эффективность для вашего бизнеса с помощью
          качественных газовых продуктов и продуманной логистики.
        </p>
        <div>
          {/* Кнопки оставляем как были, они должны быть контрастны */}
          <Link
            href="/products"
            className="bg-accent hover:bg-opacity-80 text-brand-dark font-bold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out mr-4"
          >
            Наша продукция
          </Link>
          <Link
            href="/contacts"
            className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
