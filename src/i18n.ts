import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import translationPT from './locales/pt/translationPT.json';
import translationEN from './locales/en/translationEN.json';

const resources = {
  pt: {
    translation: translationPT,
  },
  en: {
    translation: translationEN,
  },
};

const language = window.navigator.language.split('-')[0];

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;