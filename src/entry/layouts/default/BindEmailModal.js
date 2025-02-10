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

'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import LinkIcon from 'public/images/svg/link.svg';
import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import { useAccount } from 'wagmi';

import Loader from '@/components/Loader';
import { shortenAddress } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { disconnect } from '@wagmi/core';

import { bindEmail, sendCode } from '#/services/auth';
import { useModalOpen } from '#/state/application/hooks';

export function BindEmailModal() {
  const modalOpen = useModalOpen('BIND_EMAIL');
  const { address } = useAccount();
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [cdMss, setCdMss] = useState(0);
  const [inputErr, setInputErr] = useState(false);
  const [errMsg, setMsg] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cdMss > 0) {
      const timerId = setInterval(() => setCdMss(cdMss - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [cdMss]);

  useEffect(() => {
    if (email === '' && !isEmail(email)) {
      setInputErr(true);
      setMsg('E-mail format is incorrect');
    } else {
      setInputErr(false);
      setMsg('');
    }
  }, [email]);

  const bind = async () => {
    setLoading(true);
    const res = await bindEmail(email, verificationCode);
    if (res.code === 200) {
      toast.success('🎉 Congratulations, You have successfully bind the email');
      window.location.reload();
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog as="div" className="common-modal relative z-[999]" onClose={() => false}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0D0D0D] bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${'min-h-[176px] max-w-full md:max-w-[440px]'} w-full transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title as="h3" className={'relative mb-[16px] text-center font-bold'}>
                  Bind E-mail
                  <XMarkIcon onClick={() => signOut()} className="absolute top-0 right-0 h-5 w-5 cursor-pointer" />
                </Dialog.Title>
                <div>
                  <p className="text-sm opacity-40">For better interaction, please bind your email address</p>
                  {address && status === 'authenticated' && (
                    <div className="mt-3 mb-6 flex items-center justify-between rounded border border-gray-400 px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <Image src={LinkIcon} alt="" />
                        <span className="ml-4">{shortenAddress(address)}</span>
                      </div>

                      <ArrowRightOnRectangleIcon
                        onClick={async () => {
                          await disconnect();
                          signOut();
                        }}
                        className="h-4 w-4 cursor-pointer"
                      />
                    </div>
                  )}
                  <hr className="my-6 border-b-2 border-t-0 border-gray-400" />
                  <div>
                    <input
                      type="text"
                      placeholder="E-mail"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="mt-[2px] h-12 w-full rounded rounded-b-none border-0 bg-[#f1f1f1] px-6 text-sm placeholder:opacity-40"
                    />
                    <div className="mt-[2px] flex bg-[#f1f1f1] pr-3">
                      <input
                        type="text"
                        placeholder="Verify Code"
                        className="h-12 w-full flex-1 border-0 bg-[#f1f1f1] px-6 text-sm placeholder:opacity-40"
                        value={verificationCode}
                        onChange={e => setVerificationCode(e.target.value)}
                      />
                      {cdMss === 0 && (
                        <button
                          disabled={email === '' || !isEmail(email) || sendLoading}
                          className="w-[76px] text-sm hover:opacity-80 disabled:opacity-20"
                          onClick={async () => {
                            setSendLoading(true);
                            const res = await sendCode(email, 'bind');
                            setSendLoading(false);
                            if (res.code === 200) {
                              setCdMss(59);
                            }
                            //  else {
                            //   toast.error(res.message)
                            // }
                          }}
                        >
                          Send Code
                        </button>
                      )}

                      {cdMss !== 0 && <p className="text-sm leading-[48px]">{cdMss}s</p>}
                    </div>

                    <button
                      disabled={inputErr || loading}
                      onClick={bind}
                      className="flex h-12 w-full items-center justify-center rounded rounded-t-none bg-gray text-white disabled:opacity-20"
                    >
                      {loading && <Loader classname="mr-2" />}
                      Bind
                      <span />
                    </button>
                    {errMsg !== '' && verificationCode !== '' && (
                      <p className="mt-4 text-center text-xs text-red">{errMsg}</p>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
