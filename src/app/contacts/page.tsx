// src/app/contacts/page.tsx
import React from "react";
// Убедитесь, что путь импорта карты правильный
import YandexMap from "@/components/ui/YandexMap";
// Импортируем компонент формы
import ContactForm from "@/components/forms/ContactForm";

// Определяем тип для контактной информации
interface ContactInfo {
  address: string;
  phone: string;
  phoneLink: string;
  email: string;
  workingHours: string;
  mapCenter: [number, number]; // Тип кортежа
  placemarkCoords: [number, number]; // Тип кортежа
}

// --- ДАННЫЕ ---
// TODO: Заменить на реальные данные вашей компании
const contactInfo: ContactInfo = {
  address: "123456, г. Москва, ул. Центральная, д. 1, офис 101",
  phone: "+7 (495) 123-45-67",
  phoneLink: "tel:+74951234567",
  email: "info@gaz-company.ru",
  workingHours: "Пн-Пт: 9:00 - 18:00, Сб-Вс: выходной",
  // Координаты центра Москвы (ЗАМЕНИТЕ НА КООРДИНАТЫ ВАШЕГО ОФИСА)
  mapCenter: [55.751244, 37.618423],
  // Координаты метки на карте (ЗАМЕНИТЕ НА КООРДИНАТЫ ВАШЕГО ОФИСА)
  placemarkCoords: [55.751244, 37.618423],
};

// --- ИКОНКИ ---
const LocationIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-primary inline flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
const PhoneIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-primary inline flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
  </svg>
);
const MailIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-primary inline flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
  </svg>
);
const ClockIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-primary inline flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// --- КОМПОНЕНТ СТРАНИЦЫ ---
export default function ContactsPage() {
  // Проверка наличия API ключа (опционально, для отладки в консоли сервера)
  if (
    typeof window === "undefined" &&
    !process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
  ) {
    // Проверяем только на сервере
    console.warn(
      "ВНИМАНИЕ: API ключ Яндекс.Карт (NEXT_PUBLIC_YANDEX_MAPS_API_KEY) не найден в .env.local. Карта может не отображаться или работать некорректно."
    );
  }

  return (
    <>
      {/* --- ШАПКА СТРАНИЦЫ --- */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark">
            Контакты
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-2 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом или посетите наш офис.
          </p>
        </div>
      </section>

      {/* --- ОСНОВНАЯ СЕКЦИЯ (ИНФО + КАРТА) --- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Используем сетку для разделения на 2 колонки на больших экранах */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Левая колонка: Контактная информация и форма */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-brand-dark mb-6">
                Наши координаты
              </h2>
              {/* Блок с контактами */}
              <div className="space-y-4 text-lg text-gray-700 mb-10">
                {/* Используем flex для выравнивания иконки и текста */}
                <p className="flex items-start">
                  {" "}
                  {/* items-start если текст длинный */}
                  <LocationIcon />
                  <span>
                    <strong>Адрес:</strong> {contactInfo.address}
                  </span>
                </p>
                <p className="flex items-center">
                  <PhoneIcon />
                  <span>
                    <strong>Телефон:</strong>{" "}
                    <a
                      href={contactInfo.phoneLink}
                      className="text-primary hover:underline ml-1"
                    >
                      {contactInfo.phone}
                    </a>
                  </span>
                </p>
                <p className="flex items-center">
                  <MailIcon />
                  <span>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-primary hover:underline ml-1"
                    >
                      {contactInfo.email}
                    </a>
                  </span>
                </p>
                <p className="flex items-center">
                  <ClockIcon />
                  <span>
                    <strong>Часы работы:</strong> {contactInfo.workingHours}
                  </span>
                </p>
              </div>

              {/* Блок Обратная связь с формой */}
              <div className="pt-8 border-t">
                <h3 className="text-2xl font-heading font-semibold text-brand-dark mb-4">
                  Обратная связь
                </h3>
                <p className="text-gray-600 mb-4">
                  Если у вас остались вопросы или вы хотите сделать запрос,
                  заполните форму ниже:
                </p>
                {/* Вставляем компонент формы */}
                <ContactForm />
              </div>
            </div>

            {/* Правая колонка: Карта */}
            <div className="h-[400px] md:h-[500px] lg:h-full w-full min-h-[400px] rounded-lg overflow-hidden shadow-md sticky top-24">
              {" "}
              {/* Добавил sticky для карты */}
              {/* Убедимся что компонент карты импортирован и используется */}
              <YandexMap
                center={contactInfo.mapCenter} // Передаем координаты центра
                placemark={contactInfo.placemarkCoords} // Передаем координаты метки
                zoom={16} // Оптимальный зум для адреса
                mapHeight="100%" // Карта должна заполнить контейнер по высоте
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
