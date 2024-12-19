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

'use client'

import clsx from 'clsx'
import { useState, useEffect } from 'react'

const navWrapperBaseClassName = 'sticky z-10'
const navWrapperMobileClassName = 'top-[65px] right-0 left-0 -mx-4 mb-8 bg-gray-1000'
const navWrapperDesktopClassName = 'md:top-[120px] md:h-[280px] md:w-[300px] md:m-0 md:bg-transparent 2xl:w-[350px]'

const navListBaseClassName = 'overflow-auto'
const navListMobileClassName = 'grid grid-cols-4'
const navListDesktopClassName = 'md:block'

const navItemBaseClassName = 'text-gray-100 border-gray-600 cursor-pointer hover:text-gray'
const navItemMobileClassName = 'overflow-hidden px-2 py-4 border-b-2 whitespace-nowrap text-ellipsis text-sm text-center'
const navItemDesktopClassName = 'md:float-none md:h-[56px] md:border-b-0 md:border-l-2 md:pl-[38px] md:pr-0 md:py-0 md:text-medium md:leading-[48px] md:text-left'
const navItemActiveClassName = '!border-gray font-bold !text-gray'

const menus = [
  {
    name: 'About Me',
    linkId: 'about',
  },
  {
    name: 'My Skill',
    linkId: 'skill',
  },
  {
    name: 'Social Profiles',
    linkId: 'social',
  },
  {
    name: 'Setting',
    linkId: 'setting',
  },
]
export function ProfileNav() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop =
        document.documentElement.scrollTop + 170 || window.pageYOffset + 170 || document.body.scrollTop + 170
      const aboutOffsetTop = document.getElementById('about')?.offsetTop
      const skillOffsetTop = document.getElementById('skill')?.offsetTop
      const socialOffsetTop = document.getElementById('social')?.offsetTop
      const settingOffsetTop = document.getElementById('setting')?.offsetTop
      if (aboutOffsetTop && skillOffsetTop && socialOffsetTop && settingOffsetTop) {
        if (scrollTop >= aboutOffsetTop && scrollTop < skillOffsetTop) {
          setActive(0)
        } else if (scrollTop >= skillOffsetTop && scrollTop < socialOffsetTop) {
          setActive(1)
        } else if (scrollTop >= socialOffsetTop && scrollTop < settingOffsetTop) {
          setActive(2)
        } else if (scrollTop >= settingOffsetTop) {
          setActive(3)
        }
      }
    })
  })
  return (
    <div className={clsx(navWrapperBaseClassName, navWrapperMobileClassName, navWrapperDesktopClassName)}>
      <ul className={clsx(navListBaseClassName, navListMobileClassName, navListDesktopClassName)}>
        {menus.map((i, k) => (
          <li
            onClick={() => {
              window.scrollTo({
                left: 0,
                top: document.getElementById(i.linkId)?.offsetTop - 150,
                behavior: 'smooth',
              })
            }}
            className={clsx(navItemBaseClassName, navItemMobileClassName, navItemDesktopClassName, {
              [navItemActiveClassName]: active === k,
            })}
            key={`profile-nav-${i.name}`}
          >
            {i.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
