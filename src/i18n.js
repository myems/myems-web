import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Related Parameters": "Related Parameters",
      "Welcome to": "Welcome to",
      "the Leading Free and Open Source Energy Management System": "the Leading Free and Open Source Energy Management System",

    }
  },
  zh: {
    translation: {
      "Related Parameters": "相关参数",
      "Welcome to": '欢迎使用',
      "the Leading Free and Open Source Energy Management System": "领先的免费开源能源管理系统",

    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;