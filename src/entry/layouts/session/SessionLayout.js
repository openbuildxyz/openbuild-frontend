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

import Image from 'next/image';
import Link from 'next/link';

import { getCopyrightText } from '@/utils/app';

import { Header } from '../../components/Header';
import { Close } from './Close';
import bgImage from './login_bg.png';
import brandLogo from './logo-g.svg';
import { UCTop } from './Top';

function SessionLayout({ children }) {
  return (
    <div className="flex max-md:flex-col">
      <div className="md:hidden">
        <Header />
      </div>
      <div className="hidden flex-1 flex-col justify-between bg-gray md:flex md:h-screen">
        <Image className="h-[calc(100%-85px)] object-cover" src={bgImage} alt="" />
        <p className="relative mb-4 hidden text-center text-sm text-white md:block">
          {getCopyrightText()}
        </p>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center bg-white px-6 md:relative md:w-[43.75%]">
        <Close />
        <div className="mx-auto w-full max-md:pb-6 md:max-w-[440px]">
          <Link href="/" className="hidden md:block">
            <Image src={brandLogo} alt={''} className="w-[280px]" />
          </Link>
          <UCTop />
          {children}
        </div>
      </div>
    </div>
  );
}

export default SessionLayout;
