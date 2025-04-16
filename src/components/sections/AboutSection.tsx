// src/components/sections/AboutSection.tsx
// import Image from "next/image"; // Будем использовать для изображения (пока плейсхолдер)
import Link from "next/link";

// Пример данных для ключевых показателей
const keyFigures = [
  { value: "> 10", label: "Лет на рынке" },
  { value: "70+", label: "Регионов поставок РФ" },
  { value: "500+", label: "Партнеров" }, // Пример
  { value: "24/7", label: "Поддержка и логистика" }, // Пример
];

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      {" "}
      {/* Отступы, белый фон */}
      <div className="container mx-auto px-4">
        {/* Основной блок: Текст + Изображение */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 md:mb-20">
          {/* Левая колонка: Текст */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              О компании
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-4">
              {/* TODO: Заменить на заголовок о компании */}
              Ваш стратегический партнер в поставках газа
            </h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              {/* TODO: Заменить на 1-2 абзаца текста о компании */}
              Мы специализируемся на оптовых поставках сжиженного
              углеводородного газа (СУГ), пропана, бутана и их смесей
              предприятиям по всей России и в страны ближнего зарубежья.
              Многолетний опыт и отлаженная логистика позволяют нам
              гарантировать стабильность и своевременность поставок.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Наша миссия - обеспечивать ваш бизнес качественным топливом и
              энергией, способствуя его росту и эффективности.
            </p>
            <Link
              href="/about"
              className="inline-block bg-primary hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out"
            >
              Узнать больше
            </Link>
          </div>

          {/* Правая колонка: Изображение (плейсхолдер) */}
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
            {/* Используем простой div как плейсхолдер */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-2xl font-bold opacity-70">
                Место для фото
              </span>
            </div>
            {/* Закомментированный вариант с Next/Image для будущего использования:
             <Image
               src="/placeholder-about.jpg" // TODO: Заменить на реальный путь к фото
               alt="О компании ГазТрейдСервис" // TODO: Заменить на релевантный alt
               layout="fill" // Заполняет контейнер
               objectFit="cover" // Масштабирует изображение с сохранением пропорций
               className="rounded-lg"
             /> */}
          </div>
        </div>

        {/* Блок с ключевыми показателями */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {keyFigures.map((figure, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {figure.value}
              </div>
              <div className="text-gray-700 font-medium">{figure.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
