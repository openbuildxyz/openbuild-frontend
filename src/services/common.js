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

import { post, get } from '@/utils/request';

export async function adsEmail(email, type) {
  const res = await post('v1/public/contact/email', { email, type });
  return res;
}

export async function upload(parmas) {
  const res = await post('v1/util/upload/file', parmas.file, {
    type: 'upload',
  });
  return res;
}

export async function ownedNFTs(address) {
  const res = await get(`ts/v1/nft/general/tools/address/owned?address=${address}`);
  return res;
}
