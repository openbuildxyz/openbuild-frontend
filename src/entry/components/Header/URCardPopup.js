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

import Image from 'next/image';

import { Modal } from '@/components/Modal';

export function URCardPopup({ open, closeModal }) {
  return (
    <Modal 
      isOpen={open}
      closeModal={closeModal}
      title=""
      className="relative !w-[380px] !h-[369px] max-md:!w-[340px] max-md:!h-[340px] !p-0 flex flex-col overflow-hidden !rounded-3xl"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={closeModal}
        className="absolute -right-4 -top-3 z-10 max-md:-right-3 max-md:-top-2 bg-white rounded-full p-0 border-0 shadow-sm hover:bg-white focus:outline-none focus:ring-0 active:bg-white"
      >
        <Image src="/images/UR-close.svg" alt="Close modal" width={32} height={32} className="max-md:w-7 max-md:h-7" />
      </button>

      <div className="bg-[#F4F4F4] px-6 pt-6 pb-[30px] max-md:px-4 max-md:pt-4 max-md:pb-[20px] flex justify-center rounded-t-3xl">
        <Image
          src="/images/UR-card-2.png"
          alt="UR Card"
          width={320}
          height={172}
          sizes="320px"
          className="rounded-2xl w-[320px] h-[172px] max-md:w-[280px] max-md:h-[150px] -mt-14 max-md:-mt-10"
        />
      </div>

      <div className="bg-white px-6 pb-6 pt-4 max-md:px-4 max-md:pt-3 max-md:pb-4 flex flex-col items-left rounded-b-3xl">
        <Image
          src="/images/UR-card-3.svg"
          alt="UR Card mini"
          width={161}
          height={24}
        />
        <h2 className="text-[20px] max-md:text-[18px] font-bold text-[#1a1a1a] mt-2 mb-3 max-md:mt-2 max-md:mb-2 leading-6 max-md:leading-5" style={{ fontFamily: 'Nunito Sans' }}>
          Freedom and Efficiency in every
          <br />
          transaction
        </h2>

        <p className="text-[#484848] max-md:text-[14px] mb-8 max-md:mb-6" style={{ fontFamily: 'Nunito Sans' }}>
          By <span className="font-semibold text-[#1a1a1a]">UR</span> · Deadline{' '}
          <span className="font-semibold text-[#1a1a1a]">30days</span>
        </p>

        <button
          type="button"
          onClick={() => window.open('https://ur.app/', '_blank')}
          className="self-center p-0 m-0 border-none bg-transparent shadow-none outline-none focus:outline-none focus:ring-0 hover:opacity-95 hover:scale-105 transition-transform duration-200"
        >
          <Image
            src="/images/UR-card-4.png"
            alt="UR Card CTA"
            width={640}
            height={80}
            sizes="348px"
            className="w-[348px] max-md:w-[300px] h-auto"
          />
        </button>
      </div>
    </Modal>
  );
}
