// src/components/sections/LogisticsSection.tsx
import Image from "next/image"; // Убедимся, что Image импортирован
import Link from "next/link"; // Убедимся, что Link импортирован

const LogisticsSection = () => {
  return (
    // Используем цвета из новой палитры
    <section className="py-16 md:py-24 bg-base-100">
      {" "}
      {/* Белый фон */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка: Текст */}
          <div className="order-2 lg:order-1">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              Логистика и Поставки
            </span>
            {/* Используем основной цвет текста */}
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
              Гибкая и надежная доставка по всей территории
            </h2>
            {/* Используем приглушенный цвет текста */}
            <p className="text-muted mb-4 text-lg leading-relaxed">
              {/* TODO: Заменить на текст о логистике */}
              Обладая собственным и партнерским парком специализированного
              транспорта, мы обеспечиваем своевременную и безопасную доставку
              газа в любую точку России и стран ближнего зарубежья.
            </p>
            <p className="text-muted mb-6 text-lg leading-relaxed">
              Наша логистическая служба работает круглосуточно, чтобы
              гарантировать выполнение поставок точно в срок, соблюдая все нормы
              и стандарты безопасности.
            </p>
            {/* Используем приглушенный цвет для списка */}
            <ul className="list-disc list-inside text-muted mb-6 space-y-2">
              {/* TODO: Заменить или дополнить преимущества */}
              <li>Доставка автоцистернами и ж/д транспортом.</li>
              <li>Соблюдение графиков поставок.</li>
              <li>Контроль качества на всех этапах.</li>
              <li>Оптимальные логистические маршруты.</li>
            </ul>
            {/* Используем новый стиль кнопки */}
            <Link href="/logistics" className="btn btn-primary">
              Подробнее о логистике
            </Link>
          </div>

          {/* Правая колонка: Изображение карты */}
          {/* Увеличили тень для акцента */}
          <div className="order-1 lg:order-2 relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              // TODO: Заменить на реальный путь к вашему изображению карты
              src="/images/map.jpg" // Убедитесь, что изображение лежит в public/images/
              alt="Карта поставок газа по РФ и СНГ"
              layout="fill" // Заполняет контейнер
              objectFit="cover" // Масштабирует с сохранением пропорций, обрезая лишнее
              className="rounded-lg"
            />
            {/* Легкое затемнение снизу для возможного текста */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsSection;
