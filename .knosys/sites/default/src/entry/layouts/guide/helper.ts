import type { StarlightPageProps } from '@astrojs/starlight/components/StarlightPage.astro';

type SidebarKey = 'about';
type SidebarItems = StarlightPageProps['sidebar'];

const sidebarMap: Record<SidebarKey, SidebarItems> = {
  about: [
    {
      label: '关于',
      items: [
        { label: '社区', link: '/community/' },
        { label: '团队', link: '/team/' },
      ],
    }
  ],
};

function getSidebar(key: SidebarKey) {
  return sidebarMap[key] || [];
}

export { getSidebar };
