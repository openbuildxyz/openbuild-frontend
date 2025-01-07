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

import { isPlainObject } from 'lodash'

const BLOCK_DATA_SPEC_VERSION = '0.0.1'

function getInitialBlockData() {
  return { type: 'doc', content: [] }
}

function isBlockDataValid(data) {
  return isPlainObject(data) && data.type === 'doc' && Array.isArray(data.content)
}

function unwrapBlockData({ data }) {
  return data
}

function wrapBlockData(data) {
  return { version: BLOCK_DATA_SPEC_VERSION, data }
}

export { getInitialBlockData, isBlockDataValid, wrapBlockData, unwrapBlockData }
