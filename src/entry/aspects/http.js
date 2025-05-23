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

import { toast } from 'react-toastify';

import httpClient, { legacyClient } from '@/utils/http';

let alreadySet = false;

function handleResponse(res, config) {
  if (!res.success && config.noToast !== true) {
    toast.error(res.message);
  }

  return res;
}

function setInterceptors() {
  if (alreadySet) {
    return;
  }

  httpClient.use(handleResponse);
  legacyClient.use(handleResponse);

  alreadySet = true;
}

export default setInterceptors;
