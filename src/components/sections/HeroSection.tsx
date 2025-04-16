// src/components/sections/HeroSection.tsx
// 'use client'; // Не нужен, если нет анимации или другой клиентской логики

import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      // Градиент и отступы остаются прежними
      className="relative bg-gradient-to-r from-brand-dark via-primary/80 to-accent text-white py-24 md:py-32 lg:py-40 flex items-center"
    >
      {/* Опциональный оверлей */}
      {/* <div className="absolute inset-0 bg-black/20 z-0"></div> */}

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1
          // Стили заголовка остаются прежними
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight text-white"
        >
          Надежные поставки газа <br className="hidden md:block" /> по России и
          СНГ
        </h1>
        <p
          // Стили параграфа остаются прежними
          className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
        >
          Обеспечиваем стабильность и эффективность для вашего бизнеса с помощью
          качественных газовых продуктов и продуманной логистики.
        </p>

        {/* Контейнер для кнопок с Flexbox для управления переносом */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          {" "}
          {/* Добавлен flex, flex-wrap, justify-center, gap-4, mt-8 */}
          <Link
            href="/products"
            // Убран mr-4, используется gap-4 в родительском div
            className="bg-accent hover:bg-opacity-80 text-brand-dark font-bold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out"
          >
            Наша продукция
          </Link>
          <Link
            href="/contacts"
            // Стили второй кнопки остаются прежними
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
