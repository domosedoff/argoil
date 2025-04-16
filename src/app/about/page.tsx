// src/app/about/page.tsx
import Image from "next/image"; // Для возможного изображения на странице
import React from "react";

// Иконки-плейсхолдеры для преимуществ (можно взять другие или из библиотеки)
const CheckIcon = () => (
  <svg
    className="w-8 h-8 text-accent"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);
const ShieldIcon = () => (
  <svg
    className="w-8 h-8 text-accent"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    ></path>
  </svg>
);
const TruckIcon = () => (
  <svg
    className="w-8 h-8 text-accent"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM5 16h8m2 0v-4m-2-4H3"
    ></path>
  </svg>
);

// Данные для преимуществ
const advantages = [
  {
    id: 1,
    title: "Гарантия качества",
    text: "Строгий контроль качества поставляемой продукции на всех этапах.",
    icon: <CheckIcon />,
  },
  {
    id: 2,
    title: "Надежность поставок",
    text: "Соблюдение сроков и объемов благодаря отлаженной логистике.",
    icon: <ShieldIcon />,
  },
  {
    id: 3,
    title: "Собственный транспорт",
    text: "Современный автопарк специализированных газовозов.",
    icon: <TruckIcon />,
  },
  {
    id: 4,
    title: "Гибкие условия",
    text: "Индивидуальный подход к каждому клиенту и партнеру.",
    icon: <CheckIcon />,
  }, // Повторяем иконку для примера
  // Добавить больше преимуществ по необходимости
];

export default function AboutPage() {
  return (
    <>
      {/* Секция 1: Основная информация о компании */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка: Текст */}
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-6">
                О Компании «Название» {/* TODO: Заменить */}
              </h1>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                {/* TODO: Заменить на развернутый текст о компании */}
                Компания «Название» — ваш надежный и ответственный поставщик
                сжиженных углеводородных газов (СУГ) на территории Российской
                Федерации и стран СНГ. С [Год основания] года мы успешно
                работаем на рынке, обеспечивая промышленные предприятия,
                агрохолдинги и частных потребителей качественным топливом.
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Наша миссия — способствовать энергетической стабильности и
                эффективности бизнеса наших партнеров, предлагая лучшие решения
                в области поставок газа. Мы гордимся своей репутацией,
                построенной на профессионализме, честности и внимании к
                потребностям клиентов.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Ключевые направления нашей деятельности включают оптовые
                поставки пропана, бутана, пропан-бутановых смесей, а также
                [перечислить другие газы/услуги, если есть].
              </p>
            </div>
            {/* Правая колонка: Изображение (опционально) */}
            <div className="relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/about.jpg" // TODO: Заменить на релевантное фото (офис, транспорт, команда)
                alt="Офис компании или производственный объект"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              {/* Можно добавить легкий градиент или текст поверх */}
            </div>
          </div>
        </div>
      </section>

      {/* Секция 2: Наши Преимущества (как на gaz-ts.ru) */}
      <section className="py-16 md:py-20 bg-gray-50">
        {" "}
        {/* Фон для отделения */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-4">
              Наши преимущества
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Почему ведущие предприятия выбирают нас в качестве поставщика
              газа:
            </p>
          </div>

          {/* Сетка преимуществ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv) => (
              <div
                key={adv.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-center flex flex-col items-center"
              >
                <div className="mb-4">{adv.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-brand-dark mb-2">
                  {adv.title}
                </h3>
                <p className="text-gray-600 text-sm flex-grow">{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Можно добавить другие секции: Миссия и ценности, Команда, История и т.д. */}
    </>
  );
}
