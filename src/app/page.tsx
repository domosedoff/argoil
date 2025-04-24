// src/app/page.tsx [КЛИЕНТСКИЙ ВАРИАНТ для ПЛАНА Б]
"use client"; // ОБЯЗАТЕЛЬНО

import React from "react";
// Импорты секций (убедитесь, что пути верны)
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import LogisticsSection from "@/components/sections/LogisticsSection";
import ClientsPartnersSection from "@/components/sections/ClientsPartnersSection";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";
// import { useLocale } from '@/context/LocaleContext'; // Можно использовать, если нужно

export default function HomePage() {
  // const { messagesLoaded } = useLocale();

  // if (!messagesLoaded) {
  //   return <div>Загрузка главной страницы...</div>;
  // }

  return (
    <>
      {/* Секции должны быть 'use client' и использовать useLocale */}
      <HeroSection />
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
