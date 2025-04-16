// src/components/sections/ProductsSection.tsx
import Link from "next/link";
import React from "react"; // Импортируем React для иконок-плейсхолдеров

// Иконка-плейсхолдер (можно заменить на реальные иконки позже, например из react-icons)
const GasIcon = () => (
  <svg
    className="w-8 h-8 text-primary mb-3" // <-- Уменьшили размер (было w-12 h-12) и немного отступ снизу (mb-3)
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

// Пример данных для продуктов
const products = [
  {
    id: 1,
    name: "СУГ (Пропан-Бутан)",
    description:
      "Сжиженный углеводородный газ - универсальное и экологичное топливо для промышленности и бытовых нужд.",
    icon: <GasIcon />, // Используем плейсхолдер
    link: "/products#sug", // Пример ссылки на якорь на странице продукции
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
  // Можно добавить еще 1-3 продукта для главной страницы
];

const ProductsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      {" "}
      {/* Слегка серый фон для отделения */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            Наша продукция
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark">
            Основные виды поставляемого газа
          </h2>
        </div>

        {/* Сетка для карточек продуктов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              {product.icon}
              <h3 className="text-xl font-heading font-semibold text-brand-dark mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                {" "}
                {/* flex-grow чтобы текст занимал место */}
                {product.description}
              </p>
              <Link
                href={product.link}
                className="text-primary hover:text-accent font-medium transition-colors mt-auto" // mt-auto прижимает ссылку к низу карточки
              >
                Подробнее →
              </Link>
            </div>
          ))}
        </div>

        {/* Кнопка для перехода на основную страницу продукции */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-primary hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out"
          >
            Смотреть всю продукцию
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
