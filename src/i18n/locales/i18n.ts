import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./lang/en.json";
import ko from "./lang/ko.json";
import ja from "./lang/ja.json";
import zh from "./lang/zh.json";
import zh2 from "./lang/zh2.json";
import es from "./lang/es.json";

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
  ja: {
    translation: ja,
  },
  zh: {
    translation: zh,
  },
  zh2: {
    translation: zh2,
  },
  es: {
    translation: es,
  },
};

i18n
  .use(LanguageDetector) // 언어 감지 및 저장 플러그인 사용
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ko",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // 언어를 감지할 순서 (localStorage를 우선 사용)
      order: ["localStorage", "navigator"],
      // localStorage에 저장할 키 이름
      caches: ["localStorage"],
    },
  });

export default i18n;
export const language = ["en", "ko", "ja", "zh", "zh2", "es"] as const;
export type Language = (typeof language)[number];
