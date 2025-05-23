/**
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '@/styles/all.scss';

import 'animate.css';
import 'react-toastify/scss/main.scss';
import 'highlight.js/styles/vs.css';
import 'github-markdown-css/github-markdown-light.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { getAppConfig } from '@/utils/app';

import { fetchConfig } from '#/domain/system/repository';
import { nunito_sans } from '#/lib/font';
import { siteConfig } from '#/lib/site';

import ClientEntry from '../entry';
import DefaultLayout from '../entry/layouts/default';

export const metadata = {
  metadataBase: new URL('https://openbuild.xyz'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['OpenBuild web3 build bounty developer community'],
  authors: [
    {
      name: 'An open-source community and platform for Web3 developers',
      url: 'https://openbuild.com',
    },
  ],
  creator: 'An open-source community and platform for Web3 developers',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/t_image.jpg`],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/t_image.jpg`],
  },
  appleWebApp: {
    title: siteConfig.name,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
      type: 'image/x-icon',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await fetchConfig();

  return (
    <html lang="en" data-theme="light" className={`${nunito_sans.className} light`} suppressHydrationWarning>
      <body>
        <ClientEntry config={{ static: getAppConfig(), dynamic: config }}>
          <DefaultLayout>{children}</DefaultLayout>
        </ClientEntry>
        <GoogleAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
