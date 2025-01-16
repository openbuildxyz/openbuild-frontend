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

'use client';
import { ToastContainer } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/outline';
export function Toast() {
  return (
    <ToastContainer
      autoClose={3000}
      icon={
        <>
          <svg
            className="success"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#01DB83" />
            <path
              d="M16.75 8.75L10.2187 15.25L7.25 12.2955"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="error"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#FF4868" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 5.5C12.6904 5.5 13.25 6.05965 13.25 6.75C13.25 7.44035 12.6904 8 12 8C11.3097 8 10.75 7.44035 10.75 6.75C10.75 6.05965 11.3097 5.5 12 5.5Z"
              fill="white"
            />
            <path
              d="M12.25 17V10H11.75H11.25"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M10.5 17H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg
            className="info"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#EFE37F" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 5.5C12.6904 5.5 13.25 6.05965 13.25 6.75C13.25 7.44035 12.6904 8 12 8C11.3097 8 10.75 7.44035 10.75 6.75C10.75 6.05965 11.3097 5.5 12 5.5Z"
              fill="white"
            />
            <path
              d="M12.25 17V10H11.75H11.25"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M10.5 17H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      }
      closeButton={({ closeToast }) => <XMarkIcon onClick={closeToast} className="h-4 w-4" />}
    />
  );
}
