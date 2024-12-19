'use client';
import { setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useState } from 'react';

export function LinguiClientProvider({
  children,
  initialLocale,
  initialMessages,
}) {

  const [i18n] = useState(() => {
    return setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    });
  });

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}