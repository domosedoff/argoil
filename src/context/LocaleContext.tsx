// src/context/LocaleContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { AbstractIntlMessages } from "next-intl"; // Используем тип

// Определяем возможные локали
export type Locale = "ru" | "en" | "kg";

// Определяем интерфейс для значения контекста
interface LocaleContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: AbstractIntlMessages;
  messagesLoaded: boolean; // Флаг, что сообщения загружены хотя бы раз
}

// Создаем контекст
const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

// --- Функции для работы с Cookie ---
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    // Проверяем, является ли значение валидной локалью
    if (cookieValue && ["ru", "en", "kg"].includes(cookieValue)) {
      return cookieValue;
    }
  }
  return null;
}

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === "undefined") return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

// Список локалей для проверки в setLocale
const availableLocales: Locale[] = ["ru", "en", "kg"];

// --- Компонент Провайдера ---
export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const cookieLocale = getCookie("NEXT_LOCALE");
    return (cookieLocale as Locale) || "ru";
  });
  const [messages, setMessages] = useState<AbstractIntlMessages>({});
  const [messagesLoaded, setMessagesLoaded] = useState(false); // Начальное состояние - false

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      // Не сбрасываем messagesLoaded здесь, чтобы избежать мерцания при каждой загрузке
      // setIsLoading(true); // Не используем isLoading

      try {
        // Проверяем путь! Если messages/ в КОРНЕ, путь ВЕРНЫЙ. Если в src/, то './../messages/'
        const loadedMessages = (await import(`../../messages/${locale}.json`))
          .default;
        if (isMounted) {
          setMessages(loadedMessages);
          if (!messagesLoaded) setMessagesLoaded(true); // Устанавливаем флаг только один раз
        }
      } catch (error) {
        console.error(
          `CONTEXT: Failed to load messages for locale: ${locale}`,
          error
        );
        if (locale !== "ru" && isMounted) {
          try {
            const fallbackMessages = (await import(`../../messages/ru.json`))
              .default;
            setMessages(fallbackMessages);
            setLocaleState("ru");
            setCookie("NEXT_LOCALE", "ru");
            if (!messagesLoaded) setMessagesLoaded(true);
          } catch (fbError) {
            console.error(
              "CONTEXT: Failed to load fallback messages:",
              fbError
            );
            setMessages({});
            if (!messagesLoaded) setMessagesLoaded(true);
          }
        } else if (isMounted) {
          setMessages({});
          if (!messagesLoaded) setMessagesLoaded(true);
        }
      }
      // finally { // Убираем finally с setIsLoading
      //     if (isMounted) setIsLoading(false);
      // }
    };

    loadMessages();

    return () => {
      isMounted = false;
    };
    // Зависимость только от locale. messagesLoaded не нужен в зависимостях.
  }, [locale, messagesLoaded]); // Добавил messagesLoaded в зависимости на всякий случай, чтобы сработал флаг при первой загрузке

  // Функция для смены локали
  const setLocale = (newLocale: Locale) => {
    // Проверяем, что такая локаль существует
    if (availableLocales.includes(newLocale)) {
      setCookie("NEXT_LOCALE", newLocale);
      setLocaleState(newLocale);
      // setMessagesLoaded(false); // Не сбрасываем флаг, чтобы контент не исчезал
    } else {
      console.warn(`Attempted to set invalid locale: ${newLocale}`);
    }
  };

  // Значение контекста
  const contextValue: LocaleContextProps = {
    locale,
    setLocale,
    messages,
    messagesLoaded,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      <HtmlLangUpdater locale={locale} />
      {/* Показываем заглушку только при самой первой загрузке, пока messagesLoaded=false */}
      {!messagesLoaded ? <div>Loading site translations...</div> : children}
    </LocaleContext.Provider>
  );
};

// --- Компонент для обновления lang в html ---
const HtmlLangUpdater = ({ locale }: { locale: Locale }) => {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
};

// --- Хук для использования контекста ---
export const useLocale = (): LocaleContextProps => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
