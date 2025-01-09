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

import Image from 'next/image';
import { SvgIcon } from '@/components/Image'
import { Button } from '@/components/Button'
import Logo from 'public/images/svg/logo-black.svg';

function LogoComponent({url}) {
  return (
    <div className="relative bg-white rounded-full size-[60px] md:size-[100px]">
      <img src={url} alt="Logo" className="" />
    </div>
  )
}

function NoteItem({title, description, icon}) {
  return (
    <div className="flex items-start gap-3">
      <SvgIcon name={icon} size={24} className="mt-1" />
      <div className="leading-6">
        <div className="text-base font-bold">{title}</div>
        <div className="text-sm text-[#1A1A1ACC]">{description}</div>
      </div>
    </div>
  )
}

function Link({url, children}) {
  return (
    <a href={url} className="text-[#4000E0]">{children}</a>
  )
}

function Oauth() {
  const name = 'Midjourney Bot'
  
  return (
    <div className="flex min-h-screen flex-col items-center pt-9 md:pt-[60px] p-4 font-['Nunito_Sans'] relative">
      <div className="relative w-[192px] md:w-[320px]">
        <div className="absolute top-1/2 left-0 w-full border-b-2 border-dashed border-[#d1d9e0]" />
        <div className="flex items-center justify-between py-9">
          <LogoComponent url="/favicon.ico" />
          <div className="flex items-center gap-2 relative">
            <SvgIcon name='circle-check' size={20} />
          </div>
          <LogoComponent url="/favicon.ico" />
        </div>
      </div>
      <h1 className="text-[1.5rem] text-center pb-4">Authorize <span>{name}</span></h1>
      <div className="flex flex-col items-center justify-center text-base md:text-lg leading-6 text-center pb-6 md:pb-9">
        <p className="text-[#1A1A1ACC]">
          Log in with OpenBuild, Authorizing will redirect to
        </p>
        <Link url='https://midjourney.com'>
          midjourney.com
        </Link>
      </div>
      <div className="rounded-lg border border-gray-600 bg-white p-6 shadow-lg mb-[210px]">
        <div className="space-y-4 rounded-md mb-6">
          <NoteItem icon='personal' title="Personal user data" description="Email addresses (read-only), profile information (read-only)" />
          <NoteItem icon='international' title="Public data only" description="Limited access to your public data" />
        </div>
        <div className="flex gap-3 border-y border-gray-600 p-6 mx-[-24px]">
            <Button variant='outlined' className='flex-1'>
              Cancel
            </Button>
          <Button variant='contained' className='flex-1'>
            Authorize
          </Button>
        </div>
        <div className='py-6 flex items-center gap-3'>
          <SvgIcon name='lock' size={16} />
          <span className="text-sm leading-6 text-[#1A1A1A99]">
            Developer's <Link url='https://midjourney.com'>Privacy Policy</Link> and <Link url='https://midjourney.com'>Terms</Link> of Service
          </span>
        </div>
      </div>
      <footer className='flex absolute bottom-9 gap-3 items-center'>
        <Image className="h-4 w-auto" src={Logo} alt="" />
        <span className="text-sm leading-[24px] opacity-60">
          © 2023 OpenBuild, All rights reserved.
        </span>
      </footer>
    </div>
  )
}

export default Oauth