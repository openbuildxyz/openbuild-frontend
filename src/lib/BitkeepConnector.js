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

import { InjectedConnector } from 'wagmi/connectors/injected';

export class BitkeepConnector extends InjectedConnector {
  constructor({ chains = [], options_ = {} }) {
    const options = {
      name: 'BitKeep',
      ...options_,
    };
    super({ chains, options });

    this.id = 'Bitkeep';
    this.ready = typeof window != 'undefined' && !!this.findProvider(window?.bitkeep?.ethereum);
  }
  async getProvider() {
    if (typeof window !== 'undefined') {
      // TODO: Fallback to `ethereum#initialized` event for async injection
      // https://github.com/BitKeep/detect-provider#synchronous-and-asynchronous-injection=
      this.provider = window.bitkeep?.ethereum;
    }
    return this.provider;
  }
  getReady(ethereum) {
    if (!window.ethereum?.isBitKeep || !window.ethereum) return;
    // Brave tries to make itself look like BitKeep
    // Could also try RPC `web3_clientVersion` if following is unreliable
    if (window.ethereum.isBraveWallet && !ethereum._events && !ethereum._state) return;
    if (window.ethereum.isTokenPocket) return;
    if (window.ethereum.isTokenary) return;
    return ethereum;
  }
  findProvider(ethereum) {
    if (ethereum?.providers) return ethereum.providers.find(this.getReady);
    return this.getReady(ethereum);
  }
}
