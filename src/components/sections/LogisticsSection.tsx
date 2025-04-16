// src/components/sections/LogisticsSection.tsx
import Image from "next/image"; // Теперь будем использовать Image для карты
import Link from "next/link";

const LogisticsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      {" "}
      {/* Белый фон */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка: Текст */}
          <div className="order-2 lg:order-1">
            {" "}
            {/* Меняем порядок на мобилке, чтобы карта была выше */}
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              Логистика и Поставки
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-4">
              {/* TODO: Заменить на заголовок о логистике */}
              Гибкая и надежная доставка по всей территории
            </h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              {/* TODO: Заменить на текст о логистике */}
              Обладая собственным и партнерским парком специализированного
              транспорта, мы обеспечиваем своевременную и безопасную доставку
              газа в любую точку России и стран ближнего зарубежья.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Наша логистическая служба работает круглосуточно, чтобы
              гарантировать выполнение поставок точно в срок, соблюдая все нормы
              и стандарты безопасности.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              {/* TODO: Заменить или дополнить преимущества */}
              <li>Доставка автоцистернами и ж/д транспортом.</li>
              <li>Соблюдение графиков поставок.</li>
              <li>Контроль качества на всех этапах.</li>
              <li>Оптимальные логистические маршруты.</li>
            </ul>
            <Link
              href="/logistics"
              className="inline-block bg-primary hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out"
            >
              Подробнее о логистике
            </Link>
          </div>

          {/* Правая колонка: Изображение карты */}
          <div className="order-1 lg:order-2 relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
            {/* Используем Next/Image */}
            <Image
              // TODO: Заменить на реальный путь к вашему изображению карты
              src="/images/map.jpg" // Убедитесь, что изображение лежит в public/images/
              alt="Карта поставок газа по РФ и СНГ"
              layout="fill" // Заполняет контейнер
              objectFit="cover" // Масштабирует с сохранением пропорций, обрезая лишнее
              // objectFit="contain" // Масштабирует с сохранением пропорций, показывая всё изображение (могут быть поля)
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>{" "}
            {/* Легкое затемнение снизу для текста, если он будет */}
            {/* Можно добавить текст поверх карты, если нужно */}
            {/* <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
               Поставки по РФ и СНГ
             </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsSection;
