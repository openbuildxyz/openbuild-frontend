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

import clsx from 'clsx';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import { Button } from '@/components/Button';
import { Confirm } from '@/components/Modal/Confirm';
import { BASE_INPUT_STYLE } from '@/constants/config';
import { shorten } from '@/utils';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import { authWithGoogle, authWithGithub } from '#/domain/auth/helper';
import { useBindWallet } from '#/domain/auth/hooks';
import { unbindWallet } from '#/domain/auth/repository';

function BindableField({ data }) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [unbinding, setUnbinding] = useState(false);
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const bindWallet = useBindWallet();

  useEffect(() => {
    if (!unbinding) {
      return;
    }

    unbindWallet()
      .then(res => {
        if (res.success) {
          setConfirmModalVisible(false);
          window.location.reload();
        }
      })
      .finally(() => setUnbinding(false));
  }, [unbinding]);

  let boundValue = data.bindInfo?.auth_user_bind_key;
  let placeholder;
  let handleBind;
  let handleUnbind;
  let unbindAction;

  const authType = data.name.toLocaleLowerCase();

  switch(authType) {
  case 'wallet':
    handleBind = bindWallet.bind(null, () => window.location.reload());
    break;
  case 'google':
    handleBind = authWithGoogle.bind(null, '/profile');
    break;
  case 'github':
    handleBind = authWithGithub.bind(null, '/profile');
    break;
  default:
    handleBind = () => {};  // eslint-disable-line no-empty-function
  }

  if (authType === 'wallet') {
    boundValue = shorten(boundValue);

    handleUnbind = () => {
      if (!isConnected) {
        openConnectModal();
        return;
      }

      setUnbinding(true);
    };

    unbindAction = data.unbindable ? (
      <>
        <Button variant="outlined" className="h-9 rounded" onClick={() => setConfirmModalVisible(true)}>Disconnect</Button>
        <Confirm
          title={`Disconnect ${data.name}`}
          info="Are you sure to disconnect wallet?"
          open={confirmModalVisible}
          loading={unbinding}
          closeModal={() => setConfirmModalVisible(false)}
          confirmEvt={handleUnbind}
        />
      </>
    ) : null;
  } else {
    placeholder = 'https://';
  }

  const bound = !!data.bindInfo;

  return (
    <div className="relative mb-9 rounded-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Image width={24} height={24} src={data.icon} alt={data.name} />
      </div>
      <input
        type="text"
        readOnly
        value={boundValue}
        className={clsx(BASE_INPUT_STYLE, 'h-12 pr-[210px] pl-12 !text-gray')} // "block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
      {(!bound || unbindAction) && (
        <div className="absolute inset-y-0 right-1 flex items-center">
          {!bound ? (
            <Button variant="contained" className="h-9 rounded" onClick={handleBind}>Connect</Button>
          ) : unbindAction}
        </div>
      )}
    </div>
  );
}

export default BindableField;
