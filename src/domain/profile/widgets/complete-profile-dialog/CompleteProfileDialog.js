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

import Link from 'next/link';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { NotCompleteIcon, CompleteIcon } from '@/components/Icons';

import WalletBinderWidget from '../../../auth/widgets/wallet-binder';

function CompleteProfileDialogWidget({ open, close, title, notBindWallet, notComplete }) {
  return (
    <Modal title={title} isOpen={open} closeModal={close} mode={'base'}>
      <div>
        <div className="rounded-lg bg-gray-1400 p-4">
          <div className="text-sm flex justify-between items-center">
            <p className="flex items-center">
              {notComplete ? <NotCompleteIcon className="mr-2" /> : <CompleteIcon className="mr-2" />}
              Complete your Profile
            </p>
            {notComplete && <Link href="/profile"><Button className="h-6 px-2 rounded-md">Complete</Button></Link>}
          </div>
          <div className="mt-4 text-sm flex justify-between items-center">
            <p className="flex items-center">
              {notBindWallet ? <NotCompleteIcon className="mr-2" /> : <CompleteIcon className="mr-2" />}
              Bind your web3 wallet
            </p>
            {notBindWallet && (
              <Button className="h-6 p-0 rounded-md">
                <WalletBinderWidget className="inline-block px-2" onBind={() => window.location.reload()}>Bind</WalletBinderWidget>
              </Button>
            )}
          </div>
        </div>

        <Link href="/profile" className="mt-4 flex w-full justify-center">
          <Button fullWidth >
            Go to my profile
          </Button>
        </Link>
      </div>
    </Modal>
  );
}

export default CompleteProfileDialogWidget;
