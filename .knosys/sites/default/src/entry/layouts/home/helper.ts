import type { SupportedLocale, LocaleValue } from '@/types';
import { I18N_CONFIG } from '@/constants/config';

import type { HomeLocale } from './typing';

const locales: LocaleValue<HomeLocale> = {
  en: {
    heading: I18N_CONFIG.en.site.title,
    slogan: 'All about developing the OpenBuild official website',
    getStarted: 'Get Started',
  },
  zh: {
    heading: I18N_CONFIG.zh.site.title,
    slogan: '关于开发 OpenBuild 官网的一切',
    getStarted: '快速了解',
  },
};

function resolveLocale(locale: SupportedLocale): HomeLocale {
  return locales[locale];
}

export { resolveLocale };
