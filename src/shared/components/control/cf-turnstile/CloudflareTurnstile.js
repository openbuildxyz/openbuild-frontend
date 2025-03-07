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

import Script from 'next/script';

import { isFunction } from '../../../utils';

const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;

function CloudflareTurnstile({ className, onVerify }) {
  const handleScriptLoad = () => {
    window.turnstile.render('#cfTurnstile', {
      sitekey,
      callback: token => isFunction(onVerify) && onVerify(token),
    });
  };

  return sitekey && (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div id="cfTurnstile" className={className} />
    </>
  );
};

export default CloudflareTurnstile;
