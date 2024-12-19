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

import copy from 'copy-to-clipboard'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { ArrowTopRightIcon, CopyIcon } from '@/components/Icons'

export function ContactModal({ open, closeModal, permission }) {
  return (
    <Modal title={'Get Contact'} isOpen={open} closeModal={closeModal} mode={'base'}>
      {permission && (
        <div>
          <div className="mb-4">
            <p className="mb-1 text-sm opacity-60">E-mail</p>
            <div className="flex h-9 items-center rounded-lg border border-gray-400 bg-gray-1400 px-3">
              <p className="flex-1 text-sm ">{permission?.extra?.email}</p>
              <CopyIcon className="cursor-pointer" onClick={() => copy(permission.extra.email)} />
              <ArrowTopRightIcon
                onClick={() => {
                  window.location.href = `mailto:${permission?.extra?.email}`
                }}
                className="ml-2 cursor-pointer"
              />
            </div>
          </div>
          {permission?.extra?.telegram !== '' && (
            <div className="mb-4">
              <p className="mb-1 text-sm opacity-60">Telegram</p>
              <div className="flex h-9 items-center rounded-lg border border-gray-400 bg-gray-1400 px-3">
                <p className="flex-1 text-sm ">{permission?.extra?.telegram}</p>
                <CopyIcon className="cursor-pointer" onClick={() => copy(permission?.extra?.telegram)} />
                <ArrowTopRightIcon
                  onClick={() => {
                    window.open(`https://t.me/${permission?.extra?.telegram}`)
                  }}
                  className="ml-2 cursor-pointer"
                />
              </div>
            </div>
          )}
          {permission?.extra?.discord !== '' && (
            <div className="mb-4">
              <p className="mb-1 text-sm opacity-60">Discord</p>
              <div className="flex h-9 items-center rounded-lg border border-gray-400 bg-gray-1400 px-3">
                <p className="flex-1 text-sm ">{permission?.extra?.discord}</p>
                <CopyIcon className="cursor-pointer" onClick={() => copy(permission?.extra?.discord)} />
                <ArrowTopRightIcon
                  onClick={() => {
                    window.open(`https://discordapp.com/users/${permission?.extra?.discord}`)
                  }}
                  className="ml-2 cursor-pointer"
                />
              </div>
            </div>
          )}

          <Button onClick={closeModal} fullWidth variant="contained">
            Got it
          </Button>
        </div>
      )}
    </Modal>
  )
}
