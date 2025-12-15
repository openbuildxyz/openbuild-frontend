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
import { useState } from 'react';

import { URCardPopup } from '../Header/URCardPopup';

function DifyWidget() {
  const [showFrame, setShowFrame] = useState(false);
  const [isURPopupOpen, setIsURPopupOpen] = useState(false);

  const handleToggleFrame = () => {
    setShowFrame(!showFrame);
  };

  return (
    <>
      {showFrame && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="w-full h-full max-w-4xl max-h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden relative">
            <button
              onClick={handleToggleFrame}
              className="absolute right-3 top-3 z-10 h-6 w-6 cursor-pointer rounded border border-gray-400 fill-gray p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src="https://ai.openbuild.xyz/chatbot/IjylvCt33JZvfyRF"
              className="w-full h-full min-h-[600px] border-none"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleToggleFrame}
        className="fixed bottom-6 right-6 z-50 hover:opacity-80 transition-all transform hover:scale-110"
      >
        <Image src="/cat.svg" alt="Chat icon" width={64} height={64} />
      </button>

      <button
        type="button"
        onClick={() => setIsURPopupOpen(true)}
        className="fixed bottom-24 right-8 z-50 h-10 w-10 p-0 border-none bg-transparent shadow-none outline-none focus:outline-none focus:ring-0 hover:opacity-90 hover:scale-110 transition-transform duration-200"
      >
        <Image src="/images/UR-card-6.png" alt="UR" width={80} height={80} className="h-10 w-10" />
      </button>

      <URCardPopup open={isURPopupOpen} closeModal={() => setIsURPopupOpen(false)} />
    </>
  );
}

export default DifyWidget;
