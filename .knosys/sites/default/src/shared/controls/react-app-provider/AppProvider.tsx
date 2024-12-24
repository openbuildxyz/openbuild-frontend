import { useEffect } from 'react';

import type { SupportedLocale } from '../../types';
import { setCurrentLocale } from '../../utils';

type AppProviderProps = {
  locale: SupportedLocale;
};

function AppProvider({ locale }: AppProviderProps) {
  useEffect(() => {
    setCurrentLocale(locale);
  }, []);

  return <></>;
}

export default AppProvider;
