import type { SupportedLocale, LocaleValue } from '../types/locale';

const defaultLocale: SupportedLocale = 'en';

let currentLocale: SupportedLocale = defaultLocale;

function getCurrentLocale(): SupportedLocale {
  return currentLocale;
}

function setCurrentLocale(locale: string = defaultLocale) {
  currentLocale = locale as SupportedLocale;
}

function getDefaultLocale(): SupportedLocale {
  return defaultLocale;
}

function unwrapLocalValue<VT = string>(data: LocaleValue<VT>, locale: SupportedLocale = currentLocale): VT {
  return data[locale] || data.en;
}

export { getCurrentLocale, setCurrentLocale, getDefaultLocale, unwrapLocalValue };
