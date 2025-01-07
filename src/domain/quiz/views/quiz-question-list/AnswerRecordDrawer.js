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

import clsx from 'clsx'

import { Button } from '@/components/Button'

const AnswerIcon = (props) => {
  return (
    <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66666 3.33203H14.6667" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66666 8H14.6667" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66666 12.668H14.6667" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.66668 9.33464C3.40306 9.33464 4.00001 8.73768 4.00001 8.0013C4.00001 7.26492 3.40306 6.66797 2.66668 6.66797C1.9303 6.66797 1.33334 7.26492 1.33334 8.0013C1.33334 8.73768 1.9303 9.33464 2.66668 9.33464Z" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.66668 13.9987C3.40306 13.9987 4.00001 13.4017 4.00001 12.6654C4.00001 11.929 3.40306 11.332 2.66668 11.332C1.9303 11.332 1.33334 11.929 1.33334 12.6654C1.33334 13.4017 1.9303 13.9987 2.66668 13.9987Z" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.33334 3.33203L2.33334 4.33203L4.33334 2.33203" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AnswerRecordDrawer({ questions = [], result, submitting, onSubmit }) {
  return (
    <div className="drawer drawer-end z-10">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn-outline btn btn-primary border-gray-600 hover:!bg-transparent hover:!text-gray hover:!opacity-80">
          <AnswerIcon />
          Answer record
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" ariaLabel="close sidebar" className="drawer-overlay"></label>
        <div className="p-6 w-full md:w-96 min-h-full bg-white text-base-content flex flex-col justify-between">
          <div>
            <div className='flex justify-between'>
              <div className="flex items-center">
                <AnswerIcon className="mr-2" />
                Answer record
              </div>
              <label htmlFor="my-drawer-4" ariaLabel="close sidebar">
                <ModalCloseIcon className="md:hidden cursor-pointer" />
              </label>
            </div>
            <div className="grid grid-cols-5 gap-2 my-6">
              {questions.map((i, k) =>
                <span
                  key={`Answer-record-${k}`}
                  className={clsx('inline-flex w-12 h-12 items-center justify-center border rounded', {
                    'border-gray-600': i.answer.length === 0,
                    '!border-[#0084FF] bg-[rgba(76,163,255,0.06)] text-[#0084FF]': i.answer.length > 0 && !result,
                    '!border-[#009C8E] bg-[rgba(0,156,142,0.06)] text-[#009C8E]': i.judgment,
                    '!border-[#E43150] bg-[rgba(228,49,80,0.06)] text-[#E43150]': !i.judgment && result,
                  })}
                >{k + 1}</span>)
              }
            </div>
            <hr className="border-gray-400" />
            {!result ? <div className="flex mt-7">
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect opacity="0.16" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#1A1A1A"/>
                </svg>
                <span className="opacity-60 ml-2">No answer</span>
              </div>
              <div className="flex ml-4 items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="#4CA3FF" fillOpacity="0.06" stroke="#0084FF"/>
                </svg>
                <span className="opacity-60 ml-2">Answered</span>
              </div>
            </div> : <div className="flex mt-7">
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="#009C8E" fillOpacity="0.06" stroke="#009C8E"/>
                </svg>
                <span className="opacity-60 ml-2">Right</span>
              </div>
              <div className="flex ml-4 items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="#E43150" fillOpacity="0.06" stroke="#E43150"/>
                </svg>
                <span className="opacity-60 ml-2">Wrong</span>
              </div>
            </div>}
          </div>
          {!result && <Button fullWidth onClick={onSubmit} loading={submitting} className="!font-bold text-base">Confirm and Submit</Button>}
        </div>
      </div>
    </div>
  )
}

export default AnswerRecordDrawer

function ModalCloseIcon(props = {}) {
  return (
    <svg {...props} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
      <path d="M14 14L22 22" stroke="#1A1A1A" stroke-linecap="round" strokeLinejoin="round"/>
      <path d="M14 22L22 14" stroke="#1A1A1A" stroke-linecap="round" strokeLinejoin="round"/>
      </g>
      <path d="M35.5 12C35.5 5.64873 30.3513 0.5 24 0.5H12C5.64872 0.5 0.5 5.64873 0.5 12V24C0.5 30.3513 5.64873 35.5 12 35.5H24C30.3513 35.5 35.5 30.3513 35.5 24V12Z" stroke="#F1F1F1"/>
    </svg>
  )
}