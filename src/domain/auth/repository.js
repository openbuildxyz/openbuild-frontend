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

async function signWallet(address) {
  return httpClient.post('/auth/user/verification/code/wallet', { public_address: address })
}

async function signInWithWallet({ id, signature, address} ) {
  return httpClient.post('/auth/user/wallet/login', { id, signature, public_address: address }, { isSetJwt: true })
}

async function bindWallet({ id, signature, address }) {
  return httpClient.post('/auth/user/wallet/bind', { id, signature, public_address: address }, { isSetJwt: true })
}

async function unbindWallet() {
  return httpClient.post('/auth/user/wallet/unbind')
}

async function sendEmailCode({ email, type }) {
  return httpClient.post('/auth/user/verification/code/email', { email, type })
}

async function fetchOauthClientInfo(client_id) {
  return httpClient.get('/oauth/client/info', { params: { client_id } })
}

async function fetchOauthClientCode(client_id) {
  return httpClient.get('/oauth/client/code', { params: { client_id } })
}

export {
  signWallet, signInWithWallet, bindWallet, unbindWallet,
  sendEmailCode,
  fetchOauthClientInfo , fetchOauthClientCode
}
