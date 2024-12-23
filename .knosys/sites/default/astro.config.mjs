// @ts-check
import { defineConfig } from 'astro/config';
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
    starlight({
      title: 'OpenBuild Official Website Dev Docs',
      social: {
        github: 'https://github.com/openbuildxyz/openbuild-frontend',
      },
      customCss: [
        './src/shared/styles/doc.css',
      ],
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
