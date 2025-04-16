// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import LogisticsSection from "@/components/sections/LogisticsSection";
import ClientsPartnersSection from "@/components/sections/ClientsPartnersSection"; // Импорт

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <LogisticsSection />
      <ClientsPartnersSection />
    </>
  );
}
