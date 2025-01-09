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

import { SvgIcon } from '@/components/Image'

function Logo({url}) {
  return (
    <div className="relative bg-white rounded-full size-[100px]">
      <img src={url} alt="Logo" className="" />
    </div>
  )
}

function Oauth() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-[60px] p-4">
      <div className="relative w-[320px]">
        <div className="absolute top-1/2 left-0 w-full border-b-2 border-dashed border-[#d1d9e0]" />
        <div className="flex items-center justify-between py-5">
          <Logo url="/favicon.ico" />
          <div className="flex items-center gap-2 relative">
            <SvgIcon name='circle-check' size={20} />
          </div>
          <Logo url="/favicon.ico" />
        </div>
      </div>
    <h1 className="text-[1.5rem] text-center py-4">Authorize Midjourney Bot</h1>
    <div className="flex flex-col items-center justify-center text-lg font-['Nunito_Sans'] leading-6 text-center pb-9">
      <p className="">
        Log in with OpenBuild, Authorizing will redirect to
      </p>
      <a className="text-[#4000E0]" href='https://midjourney.com'>
        midjourney.com
      </a>
    </div>
    <div className="w-full max-w-md rounded-lg border border-gray-600 bg-white p-8 shadow-lg">
      <div className="mb-6 space-y-4 rounded-md p-4">
        <div className="flex items-center gap-3">
          <SvgIcon name='personal' size={24} />
          <span className="text-sm ">Access to your basic profile information</span>
        </div>
        <div className="flex items-center gap-3">
        <SvgIcon name='international' size={24} />
          <span className="text-sm ">Limited access to your public data</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button className="h-12 w-full rounded-lg bg-gray text-sm font-semibold text-white transition-colors hover:bg-gray-700">
          Authorize
        </button>
        <button className="h-12 w-full rounded-lg border border-gray-600 text-sm font-semibold text-gray transition-colors hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default Oauth