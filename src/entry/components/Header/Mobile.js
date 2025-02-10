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
import Logo from 'public/images/svg/logo-black.svg';

// import { LanguageSwither } from './languageSwitcher'
import { classNames } from '@/utils';
import { Bars3Icon } from '@heroicons/react/24/outline';

export function MobileHeader({ className }) {
  return (
    <div className={classNames('sticky top-0 z-20 flex items-center justify-center bg-white py-6', className)}>
      <Link href={'/'} className="flex">
        <Image className="h-[30px] w-auto" src={Logo} alt="" />
        <span className="ml-2 inline-block h-4 w-9 rounded-md border border-gray text-center text-xs font-normal leading-4 text-gray">
          BETA
        </span>
      </Link>
      <Bars3Icon className="absolute right-6 h-5 w-5" />
    </div>
  );
}
