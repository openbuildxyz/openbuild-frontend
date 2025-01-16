/*
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

import { Nunito_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const nunito_sans = Nunito_Sans({
  weight: ['200', '300', '400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const PT_Mono = localFont({
  src: [
    {
      path: '../../public/font/pt-mono.regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/pt-mono.bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const AvenirNext = localFont({
  src: [
    {
      path: '../../public/font/AvenirNext-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/AvenirNext-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});
