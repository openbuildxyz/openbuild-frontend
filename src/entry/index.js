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

import { ReduxProviders } from '#/state/provider';

import setInterceptorsForHttpClients from './aspects/http';

import { Providers } from './components/Providers';
import { Toast } from './components/Toast';
import { RouterProgress } from './components/RouterProgress';
import { RouteIntercept } from './components/RouteIntercept';

setInterceptorsForHttpClients();

function ClientEntry({ config, children }) {
  return (
    <Providers>
      <RouterProgress>
        <Toast />
        <ReduxProviders datas={{ configs: config }}>
          {children}
          <RouteIntercept />
        </ReduxProviders>
      </RouterProgress>
    </Providers>
  );
}

export default ClientEntry;
