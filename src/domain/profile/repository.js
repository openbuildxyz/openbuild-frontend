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

import httpClient from '@/utils/http'
import { unwrapBlockData, wrapBlockData } from '@/components/block-editor'

async function fetchBlockContent(uid) {
  return httpClient.get('/user/devplaza', { params: { uid } }).then(res => res.success ? ({
    ...res,
    data: res.data ? unwrapBlockData(res.data.body) : null,
  }) : res)
}

async function updateBlockContent(data) {
  return httpClient.post('/user/devplaza', { body: wrapBlockData(data) })
}

export { fetchBlockContent, updateBlockContent }
