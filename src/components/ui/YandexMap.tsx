// src/components/common/YandexMap.tsx
"use client"; // Карте нужна интерактивность - это клиентский компонент

import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

interface YandexMapProps {
  center: [number, number]; // Координаты центра карты [широта, долгота]
  zoom?: number; // Масштаб карты
  placemark?: [number, number]; // Координаты метки [широта, долгота]
  mapHeight?: string; // Высота карты (например, '400px', '100%')
}

const YandexMap: React.FC<YandexMapProps> = ({
  center,
  zoom = 15, // Масштаб по умолчанию
  placemark,
  mapHeight = "400px", // Высота по умолчанию
}) => {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Yandex Maps API key is not defined in .env.local");
    return (
      <div
        style={{
          height: mapHeight,
          background: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Ошибка: Ключ API Яндекс.Карт не найден.
      </div>
    );
  }

  return (
    // Обязательно указываем apikey в YMaps
    <YMaps query={{ apikey: apiKey, lang: "ru_RU" }}>
      <Map
        defaultState={{ center: center, zoom: zoom }}
        width="100%"
        height={mapHeight}
        modules={["control.ZoomControl", "control.FullscreenControl"]} // Добавляем контролы
      >
        {/* Добавляем метку, если координаты переданы */}
        {placemark && <Placemark defaultGeometry={placemark} />}

        {/* Можно добавить другие контролы */}
        {/* <ZoomControl options={{ float: "right" }} /> */}
        {/* <FullscreenControl /> */}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
