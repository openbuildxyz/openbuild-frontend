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

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { isFunction } from 'lodash';
import React, { Fragment } from 'react';

export function Modal({
  isOpen,
  closeModal,
  title,
  children,
  big,
  mode,
  container,
  className,
  containerClassName,
  titleClassName,
  closeExplicitly = false,  // 阻止点击遮罩层或按 ESC 键时关闭
}) {
  const handleClose = () => {
    if (closeExplicitly === true || !isFunction(closeModal)) {
      return;
    }

    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="common-modal relative z-[88]" onClose={handleClose}>
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
          <div className={clsx('flex min-h-full items-center justify-center p-6 text-center', containerClassName)}>
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
                className={clsx(
                  'min-h-[176px] w-full transform overflow-visible rounded-2xl bg-white px-6 py-6 text-left align-middle shadow-xl transition-all',
                  {
                    'max-h-[600px] min-h-[600px] max-w-[1060px] !overflow-auto': big,
                    'max-w-full md:max-w-[440px]': mode === 'base',
                    'md:max-w-[640px]': (!big && !mode && !container) || mode === '640',
                    'max-h-[600px] max-w-[1060px] !p-0 md:!p-0': container,
                  },
                  className,
                )}
              >
                {!container && title && (
                  <Dialog.Title
                    as="h3"
                    className={clsx(`${
                      !title ? 'justify-end' : 'justify-center'
                    } mb-6 flex text-center md:text-base md:font-bold`, titleClassName)}
                  >
                    {title && <>{title}</>}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute right-3 top-4 z-10 h-6 w-6 cursor-pointer rounded border border-gray-1400 fill-gray p-1"
                      onClick={closeModal}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Dialog.Title>
                )}

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
