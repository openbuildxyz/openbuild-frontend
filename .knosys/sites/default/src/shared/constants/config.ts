// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { LocaleValue, LocaleConfig } from '../types';

const SITE_TITLE = 'OpenBuild Dev Docs';
const SITE_DESCRIPTION = 'All about developing the OpenBuild official website';

const I18N_CONFIG: LocaleValue<LocaleConfig> = {
  en: {
    site: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
    navs: {
      guides: 'Guides',
    },
  },
  zh: {
    site: {
      title: 'OpenBuild 开发文档',
      description: '关于开发 OpenBuild 官网的一切',
    },
    navs: {
      guides: '指南',
    },
  },
};

const OFFICIAL_WEBSITE_URL = 'https://openbuild.xyz';
const DEV_DOC_WEBSITE_URL = import.meta.env.SITE;

export {
  SITE_TITLE,
  SITE_DESCRIPTION,
  I18N_CONFIG,
  OFFICIAL_WEBSITE_URL, DEV_DOC_WEBSITE_URL,
};
