// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import LogisticsSection from "@/components/sections/LogisticsSection";
import ClientsPartnersSection from "@/components/sections/ClientsPartnersSection";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

// Метаданные для главной страницы (не нужны, т.к. есть default в layout)
// export const metadata = { ... };

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Оборачиваем секции в анимацию скролла */}
      {/* Отступы между секциями задаются через py-* внутри самих компонентов секций */}
      <AnimateOnScroll amount={0.2}>
        <AboutSection />
      </AnimateOnScroll>

      <AnimateOnScroll amount={0.2} delay={0.1}>
        <ProductsSection />
      </AnimateOnScroll>

      <AnimateOnScroll amount={0.2} delay={0.2}>
        <LogisticsSection />
      </AnimateOnScroll>

      <AnimateOnScroll amount={0.2}>
        <ClientsPartnersSection />
      </AnimateOnScroll>
    </>
  );
}
