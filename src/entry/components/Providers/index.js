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

'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RainbowKitProviders } from './RainbowKitProviders';
import { SuiProviders } from './SuiProviders';
import { SessionProvider } from 'next-auth/react';


import { wagmiConfig } from '@/constants/chain';
import { WagmiConfig } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';

export function Providers({ children }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_GA_KEY || ''}>
      <SessionProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProviders>
            <SuiProviders>
              {children}
            </SuiProviders>
          </RainbowKitProviders>
        </WagmiConfig>
      </SessionProvider>
    </GoogleReCaptchaProvider>
  );
}
