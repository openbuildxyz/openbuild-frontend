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

import { get, post } from '@/utils/request';
export async function nftSign(id) {
  return await get(`ts/v1/nft/general/infos/${id}/sign`);
}

export async function suiNftSign(id) {
  return await get(`ts/v1/nft/general/infos/${id}/sign/move`);
}

export async function sendMintedHash(id, hash, chainId) {
  return await post(`ts/v1/nft/general/infos/${id}/hash`, {mint_hash: hash, mint_chain_id: chainId});
}
