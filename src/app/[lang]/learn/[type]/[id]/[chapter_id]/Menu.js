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

/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { useEffect, useState } from 'react';
import { ListBulletIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import { Transition } from '@headlessui/react'

export function Menu({data}) {
  const [anchors, setAnchors] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
      const article = document.querySelector('.markdown-body');
      const hs = article.querySelectorAll('h1, h2')
      const anchor = []
      hs.forEach((item, idx) => {
        const h = item.nodeName.substring(0, 2).toLowerCase();
        item.setAttribute('id', `Anchor-${h}-${idx}`);
        anchor.push({id: `Anchor-${h}-${idx}`, text: item.textContent});
      })
      setAnchors(anchor)
    }, 500)
  }, [])

  const scrollToElement = (id) => {
    window.scrollTo({
      left: 0,
      top: document.getElementById(id)?.offsetTop - 24,
      behavior: 'smooth',
    })
    setIsOpen(false)
  }

  return (
    <div className={clsx('relative')}>
      <div onClick={() => setIsOpen(!isOpen)} className="bg-[#EFEFEF] py-2 px-3 text-sm rounded cursor-pointer hover:opacity-80 transition-opacity marker:hidden">
        <ListBulletIcon className="h-5 w-5"/>
      </div>
      <Transition 
        show={isOpen} 
        enter="ease-out duration-300" 
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ul className="absolute top-12 right-0 menu bg-base-100 rounded-box z-[1] w-96 p-2 shadow">
          {
            anchors.map(i => (
              <li 
                key={i.id}
                className={clsx('break-all py-2 cursor-pointer rounded hover:bg-gray-400', {
                  'pl-4 text-sm font-bold': i.id[8] === '1',
                  'pl-4 ml-4 text-xs text-gray-100': i.id[8] === '2'
                })}
                onClick={() => scrollToElement(i.id)}
              >
              {i.text}
              </li>
            ))
          }
        </ul>
      </Transition>
      {/* { && } */}
    </div>
  )
}