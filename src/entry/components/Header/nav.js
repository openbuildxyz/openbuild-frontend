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

import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, Bars3Icon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Account } from './account';
import Link from 'next/link';
import clsx from 'clsx'
import { useHeaderAndFooterDisplay } from '@/hooks/useHeaderAndFooterDisplay'

import Logo from 'public/images/svg/logo-black.svg';
import { useEffect, useState } from 'react';

export function Navs({data}) {
  const pathname = usePathname()
  const hidden = useHeaderAndFooterDisplay()
  const [openMenu, setOpenMenu] = useState(false)

  const [fullHeader, setFullHeader] = useState(true)

  useEffect(() => {
    if (pathname === '/') {
      setFullHeader(false)
    } else {
      setFullHeader(true)
    }
  }, [pathname])

  // console.log(data)

  return (
    <header
      className={
        clsx('sticky bg-white z-50 items-center rounded-lg border-[rgba(26,26,26,0.06)]', {
          hidden,
          'flex': !hidden,
          'md:border md:mt-4 md:mx-11 md:top-4 top-0 px-4 py-3 h-[64px]': !fullHeader,
          'px-6 top-0 py-4 border-b': fullHeader,
        })}
    >
      <div className="md:hidden">
        {openMenu ? <XMarkIcon className="h-5 w-5" onClick={() => setOpenMenu(!openMenu)} /> : <Bars3Icon className="h-5 w-5" onClick={() => setOpenMenu(!openMenu)} />}

        <div className={clsx(
          'fixed w-full left-0 transition-all !duration-500 px-6 bg-white',
          {
            'h-0 overflow-hidden top-[73px]': !openMenu,
            'h-[calc(100vh-73px)] overflow-y-auto top-[72px] pt-6': openMenu
          }
        )}>
          <ul>
            {data.map((i, k) =>
              !i.children ?
              <Link
                key={`header-menu-${k}`}
                className={clsx('', {
                })}
                onClick={() => setOpenMenu(!openMenu)}
                href={i.link}
              >
                <li className="flex justify-between items-center font-bold h-14 text-sm">
                  {i.name}
                  <ChevronRightIcon className="h-4 w-4 opacity-60" />
                </li>
              </Link> : (
                <div key={`header-menu-${k}`} className="collapse">
                  <input type="radio" name={`my-accordion-${k}`} checked="checked" readOnly />
                  <div className="collapse-title collapse-title-sm min-h-0 h-14 text-sm font-bold flex justify-between items-center">
                    {i.name}
                    <ChevronDownIcon className="h-4 w-4 opacity-60" />
                  </div>
                  <div className="collapse-content no-p">
                    <ul className="z-[1] menu p-2">
                      {i.children.map((ci, ck) => <li key={`header-menus-dropdownItem-${ck}`}>
                        <a onClick={() => setOpenMenu(!openMenu)} href={ci.link} target={ci.slug === 'community' ? '_blank' : '_self'} rel="noreferrer" className="flex items-start">
                          <Image src={ci.icon} alt="" className="mt-[3px] mr-2" />
                          <div>
                            <h6 className="mb-1 text-sm">{ci.name}</h6>
                            <p className="text-xs opacity-60 text-pretty whitespace-break-spaces">{ci.desc}</p>
                          </div>
                        </a>
                      </li>)}
                    </ul>
                  </div>
                </div>
              )
            )}
          </ul>
        </div>
      </div>
      <Link href="/" className="flex sm:mr-12 max-md:flex-1 max-md:justify-center">
         <Image className="h-6 w-auto md:h-[36px]" src={Logo} alt="" />
         <span
           className="text-xs border-gray ml-2 rounded-md border-1 h-4 w-9 inline-block text-center"
         >
           BETA
         </span>
      </Link>
      <nav className="flex-1 max-md:hidden">
        {data.map((i, k) =>
          !i.children ?
          <Link
            key={`header-menu-${k}`}
            className={clsx('inline-block px-4 h-10 rounded leading-10 mr-4 transition-all', {
              'bg-gray opacity-100 text-white': !pathname.includes('creator') && pathname.includes(i.slug),
              'hover:bg-gray-400': !pathname.includes(i.slug)
            })}
            href={i.link}
          >
            {i.name}
          </Link> : (
            <div key={`header-menu-${k}`} className={
              clsx('dropdown dropdown-hover inline-block px-4 h-10 rounded leading-10 mr-4 transition-all', {
                'bg-gray !opacity-100 text-white': !pathname.includes('creator') && pathname.includes(i.slug),
                'hover:bg-gray-400': !pathname.includes(i.slug)
              })
            }>
              <div className={clsx('flex items-center cursor-pointer', {
                '!opacity-100 text-white': !pathname.includes('creator') && pathname.includes(i.slug),
              })}>
                {i.name}
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </div>
              <ul tabIndex="0" className="dropdown-content ml-[-12px] z-[9999] menu p-2 shadow bg-base-100 rounded-box w-[280px] text-gray">
                {i.children.map((ci, ck) => <li key={`header-menus-dropdownItem-${ck}`}>
                  <a href={ci.link} target={ci.slug === 'community' ? '_blank' : '_self'}  rel="noreferrer" className="flex items-start">
                    <Image src={ci.icon} alt="" className="mt-[3px] mr-2" />
                    <div>
                      <h6 className="mb-1 text-sm">{ci.name}</h6>
                      <p className="text-xs opacity-60 text-pretty whitespace-break-spaces">{ci.desc}</p>
                    </div>
                  </a>
                </li>)}
              </ul>
            </div>
          )
        )}
      </nav>
      <div>
        <Account />
      </div>


    </header>
  );
}
