import { setupI18n } from "@lingui/core";
import linguiConfig from "../../lingui.config";
import "server-only";

export const { locales, sourceLocale } = linguiConfig;

async function loadCatalog(locale) {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return {
    [locale]: messages,
  };
}
const catalogs = await Promise.all(locales.map(loadCatalog));

export const allMessages = catalogs.reduce((acc, oneCatalog) => {
  return { ...acc, ...oneCatalog };
}, {});


export const allI18nInstances = locales.reduce(
  (acc, locale) => {
    const messages = allMessages[locale] ?? {};
    const i18n = setupI18n({
      locale,
      messages: { [locale]: messages },
    });
    return { ...acc, [locale]: i18n };
  },
  {},
);

export const getI18nInstance = (locale) => {
  if (!allI18nInstances[locale]) {
    console.warn(`No i18n instance found for locale "${locale}"`);
  }

  return allI18nInstances[locale] || allI18nInstances.en;
};
