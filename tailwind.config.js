// tailwind.config.js
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ----- РАСШИРЕННАЯ ПАЛИТРА -----
      colors: {
        // Основные фирменные
        primary: "#684fff", // Яркий фиолетово-синий
        accent: "#39c7ff", // Светлый голубой
        "brand-dark": "#27254c", // Темный сине-фиолетовый

        // Базовые цвета контента и фона
        "base-100": "#ffffff", // Белый (основной фон страниц)
        "base-200": "#f9fafb", // Очень светлый серый (фон секций 1)
        "base-300": "#f3f4f6", // Светлый серый (фон секций 2)
        "base-content": "#1f2937", // Основной темный текст (чуть темнее, чем был)
        muted: "#6b7280", // Приглушенный серый (второстепенный текст)

        // Семантические цвета (примеры)
        success: "#10b981", // Зеленый для успеха
        error: "#ef4444", // Красный для ошибок
        warning: "#f59e0b", // Оранжевый для предупреждений

        // Дополнительные акцентные (примеры, можно настроить)
        "primary-focus": "#573bdb", // Чуть темнее primary для focus/active
        "accent-soft": "#a6dffd", // Мягкий голубой
      },
      // ----- ШРИФТЫ -----
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"], // Основной текст
        heading: ["var(--font-montserrat)", "sans-serif"], // Заголовки
      },
      // ----- РАЗМЕРЫ ШРИФТОВ (Увеличенные) -----
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px (для основного текста?)
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["2rem", { lineHeight: "2.5rem" }], // 32px (увеличили)
        "4xl": ["2.5rem", { lineHeight: "1.2" }], // 40px (увеличили)
        "5xl": ["3.25rem", { lineHeight: "1.15" }], // 52px (увеличили)
        "6xl": ["4rem", { lineHeight: "1.1" }], // 64px (увеличили)
      },
    },
  },
  plugins: [
    typography, // Плагин для стилизации текста через класс .prose
  ],
};

module.exports = config;
