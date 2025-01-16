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

import { useSession, signIn } from 'next-auth/react';

import { signInWithWallet } from '../repository';
import useSignWallet from './useSignWallet';

function useSignInWithWallet() {
  const { status } = useSession();
  const signWallet = useSignWallet();

  return async ({ pathname, search }) => {
    if (status !== 'unauthenticated') {
      return;
    }

    signWallet(async payload => {
      const signRes = await signInWithWallet(payload);

      if (!signRes.success) {
        return;
      }

      // router.push(`/bind/wallet?nonce=${_nonce.id}&signature=${signature}&account=${account}`)
      const cUrl = pathname.includes('/signin') ? decodeURIComponent(search?.get('from') || '/profile') : window.location.href;

      window.localStorage.setItem('signType', 'wallet');

      const data = await signIn('credentials', {
        token: signRes.data.token,
        redirect: false,
        callbackUrl: cUrl,
      });

      // console.log(data)
      if (data?.ok && data.url) {
        window.location.href = data?.url;
      }
    });
  };
}

export default useSignInWithWallet;
