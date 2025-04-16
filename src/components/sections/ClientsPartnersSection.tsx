"use client";

// src/components/sections/ClientsPartnersSection.tsx
import Link from "next/link";
import React from "react";

// Иконка-плейсхолдер для кнопок (можно заменить на более подходящие)
const ArrowRightIcon = () => (
  <svg
    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    ></path>
  </svg>
);

// Данные-заглушки для кнопок/ссылок
// TODO: Заменить на данные из файла, когда он будет предоставлен
const clientLinks = [
  { id: 1, text: "Как стать клиентом?", link: "/clients#how-to-start" },
  { id: 2, text: "Условия поставок", link: "/clients#delivery-terms" },
  { id: 3, text: "Типовые договоры", link: "/clients#contracts" },
  {
    id: 4,
    text: "Запрос коммерческого предложения",
    link: "/contacts?subject=КП",
  }, // Пример ссылки с параметром
  { id: 5, text: "Стандарты качества продукции", link: "/products#quality" },
  { id: 6, text: "Личный кабинет (скоро)", link: "#" }, // Пример неактивной ссылки
];

const ClientsPartnersSection = () => {
  return (
    // Используем градиент или фоновое изображение, как на референсе ptomsk.ru
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-dark via-blue-900 to-brand-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          {/* Заголовок можно сделать светлым */}
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Клиентам и Партнерам
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Мы ценим каждого партнера и стремимся сделать сотрудничество
            максимально удобным и выгодным. Узнайте больше о наших условиях и
            возможностях.
          </p>
        </div>

        {/* Сетка для кнопок/ссылок */}
        {/* Адаптивная сетка, похожая на ptomsk.ru */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {clientLinks.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              // Используем group для управления иконкой при наведении на всю ссылку
              className={`group flex items-center justify-between p-4 rounded-md transition duration-300 ease-in-out
                ${
                  item.link === "#"
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed" // Стиль для неактивной ссылки
                    : "bg-primary bg-opacity-80 hover:bg-opacity-100 hover:shadow-lg" // Стиль для активной ссылки
                }`}
              // Предотвращаем переход по неактивной ссылке
              onClick={(e) => item.link === "#" && e.preventDefault()}
            >
              <span className="font-medium">{item.text}</span>
              {item.link !== "#" && <ArrowRightIcon />}{" "}
              {/* Показываем иконку только для активных ссылок */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsPartnersSection;
