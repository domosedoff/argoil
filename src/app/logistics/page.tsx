// src/app/logistics/page.tsx
import Image from "next/image";
import React from "react"; // Необязательно, но пусть будет
import Link from "next/link"; // Для возможных ссылок

export default function LogisticsPage() {
  return (
    <>
      {/* Верхняя секция с заголовком */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark">
            Логистика и Поставки
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-2 max-w-2xl mx-auto">
            Обеспечиваем своевременную и безопасную доставку газа по России и
            СНГ.
          </p>
        </div>
      </section>

      {/* Секция 1: Описание + Карта (похоже на главную, но можно с другим текстом) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка: Текст */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">
                Наша география поставок
              </h2>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                {/* TODO: Заменить на подробный текст о географии и транспорте */}
                Мы располагаем развитой логистической сетью, охватывающей более
                70 регионов Российской Федерации, а также страны ближнего
                зарубежья, включая [перечислить страны, например, Казахстан,
                Беларусь]. Доставка осуществляется собственным и привлеченным
                автотранспортом (газовозы различной вместимости), а также
                железнодорожными цистернами.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Наши специалисты подбирают оптимальный маршрут и вид транспорта
                для каждого заказа, учитывая объем, расстояние и требования к
                срокам. Мы гарантируем соблюдение всех норм безопасности при
                перевозке опасных грузов.
              </p>
              {/* Можно добавить еще детали */}
              <h3 className="text-xl font-heading font-semibold text-brand-dark mt-6 mb-3">
                Виды транспорта:
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Автомобильные газовозы (от 5 до 40 тонн).</li>
                <li>Железнодорожные цистерны для СУГ.</li>
                <li>Возможность организации мультимодальных перевозок.</li>
              </ul>
            </div>

            {/* Правая колонка: Изображение карты */}
            <div className="order-1 lg:order-2 relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              {/* Используем то же изображение, что и на главной */}
              <Image
                src="/images/map.jpg" // Убедитесь, что изображение существует
                alt="Карта поставок газа по РФ и СНГ"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция 2: Преимущества логистики (можно добавить или убрать) */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-4">
              Преимущества нашей логистики
            </h2>
          </div>
          {/* Можно вставить блок с преимуществами, как на странице "О компании", но с другим текстом */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Пример карточки преимущества */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              {/* <Иконка /> */}
              <h3 className="text-xl font-heading font-semibold text-brand-dark mb-2">
                Соблюдение сроков
              </h3>
              <p className="text-gray-600 text-sm">
                Точное планирование и контроль доставки.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              {/* <Иконка /> */}
              <h3 className="text-xl font-heading font-semibold text-brand-dark mb-2">
                Безопасность
              </h3>
              <p className="text-gray-600 text-sm">
                Строгое соответствие нормам перевозки ОГ.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              {/* <Иконка /> */}
              <h3 className="text-xl font-heading font-semibold text-brand-dark mb-2">
                Гибкость
              </h3>
              <p className="text-gray-600 text-sm">
                Подбор оптимального транспорта и маршрута.
              </p>
            </div>
            {/* Добавить еще карточки */}
          </div>
        </div>
      </section>

      {/* Секция CTA (Призыв к действию) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark mb-4">
            Нужна консультация по доставке?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            Наши менеджеры рассчитают стоимость и сроки доставки до вашего
            объекта.
          </p>
          <Link
            href="/contacts" // Ссылка на контакты
            className="inline-block bg-primary hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </>
  );
}
