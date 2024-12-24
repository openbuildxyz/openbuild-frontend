// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  ...(process.env.NODE_ENV === 'production' ? {
    site: 'https://openbuildxyz.github.io',
    base: 'openbuild-frontend',
    trailingSlash: 'never',
  } : {
    site: 'https://example.com',
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
  },
  integrations: [
    react({ experimentalReactChildren: true }),
    tailwind({
      applyBaseStyles: false,
    }),
    starlight({
      title: 'OpenBuild Development',
      favicon: '/favicon.png',
      social: {
        github: 'https://github.com/openbuildxyz/openbuild-frontend',
      },
      customCss: [
        './src/shared/styles/tailwind-starlight.css',
        './src/shared/styles/doc.css',
      ],
      components: {
        SiteTitle: './src/shared/controls/astro-brand-logo',
        SocialIcons: './src/entry/layouts/default/NavMenu.astro',
      },
      sidebar: [
        {
          label: 'Guides',
          translations: { zh: '指南' },
          items: [
            'guides',
          ],
        },
        // {
        //   label: 'Reference',
        //   autogenerate: { directory: 'reference' },
        // },
      ],
    }),
  ],
});
