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
    // Используем новый цвет фона секции
    <section className="py-16 md:py-24 bg-base-200 overflow-hidden">
      {" "}
      {/* Добавили overflow-hidden */}
      <div className="container mx-auto px-4">
        {/* Асимметричная сетка: 7 колонок, текст занимает 4, картинка 3 */}
        {/* Добавляем items-center для вертикального выравнивания */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Левая колонка: Текст (занимает 4 колонки на lg) */}
          <div className="lg:col-span-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              О компании
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
              Ваш стратегический партнер в поставках газа
            </h2>
            {/* Используем text-muted для описания */}
            <p className="text-muted mb-4 text-lg leading-relaxed">
              Мы специализируемся на оптовых поставках сжиженного
              углеводородного газа (СУГ), пропана, бутана и их смесей
              предприятиям по всей России и в страны ближнего зарубежья.
              Многолетний опыт и отлаженная логистика позволяют нам
              гарантировать стабильность и своевременность поставок.
            </p>
            <p className="text-muted mb-6 text-lg leading-relaxed">
              Наша миссия - обеспечивать ваш бизнес качественным топливом и
              энергией, способствуя его росту и эффективности.
            </p>
            {/* Используем новый стиль кнопки */}
            <Link href="/about" className="btn btn-primary">
              Узнать больше
            </Link>
          </div>

          {/* Правая колонка: Изображение (занимает 3 колонки на lg) */}
          {/* Добавляем легкое смещение для эффекта */}
          <div className="lg:col-span-3 relative h-80 md:h-96 lg:h-[450px] rounded-lg shadow-xl -mb-8 lg:-mb-0 lg:mt-8">
            {/* Используем плейсхолдер или реальное фото */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold opacity-70">
                Место для фото
              </span>
            </div>
            {/* <Image ... /> */}
          </div>
        </div>

        {/* Блок с ключевыми показателями */}
        {/* Оставляем 4 колонки, но используем .card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {keyFigures.map((figure, index) => (
            // Применяем стиль .card
            <div key={index} className="card p-6 hover:shadow-xl">
              {" "}
              {/* Усиленная тень при наведении */}
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {figure.value}
              </div>
              {/* Используем text-muted для подписи */}
              <div className="text-muted font-medium">{figure.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
