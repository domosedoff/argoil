// tailwind.config.js

// Импортируем плагин с использованием import
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  // Используем const для объекта конфигурации
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#684fff",
        accent: "#39c7ff",
        "brand-dark": "#27254c",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [
    typography, // <-- Передаем импортированный плагин как переменную
  ],
};

module.exports = config; // Экспортируем объект конфигурации
