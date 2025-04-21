// src/components/sections/ProductsSection.tsx
import Link from "next/link";
import React from "react";

// Иконка (оставляем как есть или заменяем на react-icons)
const GasIcon = () => (
  <svg
    className="w-8 h-8 text-primary mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14.5 5 15 7.5 15 10c2-1 5-1.414 5 3.586A8 8 0 0117.657 18.657z"
    ></path>
  </svg>
);

// Данные (оставляем как есть)
const products = [
  {
    id: 1,
    name: "СУГ (Пропан-Бутан)",
    description:
      "Сжиженный углеводородный газ - универсальное и экологичное топливо для промышленности и бытовых нужд.",
    icon: <GasIcon />,
    link: "/products#sug",
  },
  {
    id: 2,
    name: "Пропан Технический (ПТ)",
    description:
      "Высококачественный пропан для газосварочных работ, отопления и технологических процессов.",
    icon: <GasIcon />,
    link: "/products#propan",
  },
  {
    id: 3,
    name: "Бутан Технический (БТ)",
    description:
      "Используется в качестве сырья в химической промышленности и как компонент топлива.",
    icon: <GasIcon />,
    link: "/products#butan",
  },
];

const ProductsSection = () => {
  return (
    // Используем фон base-200 (очень светлый серый)
    <section className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            Наша продукция
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content">
            Основные виды поставляемого газа
          </h2>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {products.map((product) => (
            // --- АЛЬТЕРНАТИВНЫЙ СТИЛЬ КАРТОЧКИ ---
            <div
              key={product.id}
              className="card border border-transparent hover:border-primary/30 flex flex-col text-left p-6 md:p-8 group"
            >
              {" "}
              {/* Изменен стиль, добавлен group */}
              {/* Иконка */}
              <div className="mb-4">{product.icon}</div>
              {/* Заголовок */}
              <h3 className="text-xl font-heading font-semibold text-base-content mb-2 group-hover:text-primary transition-colors duration-300">
                {" "}
                {/* Цвет меняется при наведении на карточку */}
                {product.name}
              </h3>
              {/* Описание */}
              <p className="text-muted mb-4 flex-grow text-sm leading-relaxed">
                {" "}
                {/* Добавил leading-relaxed */}
                {product.description}
              </p>
              {/* Ссылка "Подробнее" */}
              <div className="mt-auto">
                {" "}
                {/* Прижимаем ссылку к низу */}
                <Link
                  href={product.link}
                  className="inline-flex items-center text-primary hover:text-primary-focus font-medium transition-colors text-sm group-hover:underline" /* Подчеркивание при наведении на карточку */
                >
                  Подробнее
                  {/* Стрелка появляется при наведении на карточку */}
                  <svg
                    className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
            // --- КОНЕЦ АЛЬТЕРНАТИВНОГО СТИЛЯ КАРТОЧКИ ---
          ))}
        </div>

        {/* Кнопка */}
        <div className="text-center">
          <Link href="/products" className="btn btn-outline-primary">
            {" "}
            {/* Сделал контурной */}
            Смотреть всю продукцию
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
