import type { StarlightPageProps } from '@astrojs/starlight/components/StarlightPage.astro';

import type { SupportedLocale, LocaleValue } from '@/types';

type SidebarKey = 'about';
type SidebarItems = StarlightPageProps['sidebar'];

const sidebarMap: Record<SidebarKey, LocaleValue<SidebarItems>> = {
  about: {
    en: [
      {
        label: 'About',
        items: [
          { label: 'Community', link: '/community/' },
          { label: 'Meet the Team', link: '/team/' },
        ],
      }
    ],
    zh: [
      {
        label: '关于',
        items: [
          { label: '社区', link: '/community/' },
          { label: '团队', link: '/team/' },
        ],
      }
    ],
  },
};

function getSidebar(key: SidebarKey, locale: SupportedLocale = 'en') {
  return sidebarMap[key] && sidebarMap[key][locale] || [];
}

export { getSidebar };
