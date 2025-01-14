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
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import Typed from 'react-typed'
import Image from 'next/image'
import topPic from 'public/images/banner-top.png'
import bottomPic from 'public/images/banner-bottom.png'
import ballPic from 'public/images/svg/ball.svg'
import obPic from 'public/images/ob.png'
import obmPic from 'public/images/openbuild-m.png'
import scrollDownPic from 'public/images/svg/scroll-down.svg'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Pointer = () => {
  return <span className='inline-block w-[10px] h-[10px] border border-white rotate-45 mr-[10px] [&:last-child]:mr-0' />
}

export function Banner() {
  const [showTyped, setShowTyped] = useState(true)
  useEffect(() => {
    window.addEventListener('scroll', e => {
      if (window.scrollY > 500) {
        setShowTyped(false)
      } else {
        setShowTyped(true)
      }
    })
  }, [])
  return (
    <div
      // id="offer"
      className="relative mt-[-114px] flex flex-col justify-between pt-[40px] pb-11 max-md:mt-[-50px] max-md:px-4 md:h-screen md:pt-[190px]"
    >
      <Image className="absolute top-0 left-0 w-full object-cover max-md:top-[70px]" src={topPic} alt="" />
      <Image className="absolute top-[20%] right-[20%] z-[1] max-md:w-12" src={ballPic} alt="" />
      <Image className="absolute top-[50%] hidden translate-y-[-50%] md:block" src={obPic} alt="" />
      <Image
        className="absolute left-0 top-[50%] block max-h-full w-full translate-y-[-50%] md:hidden"
        src={obmPic}
        alt=""
      />
      <Image
        className="absolute top-[50%] left-[36px] hidden translate-y-[-50%] animate-[bounce_2s_infinite] md:block"
        src={scrollDownPic}
        alt=""
      />
      <div className="relative z-10 mt-[50px] text-center text-[32px] leading-10 tracking-tight md:text-[76px] md:leading-[96px]">
        <h1>An open community</h1>
        {showTyped && (
          <Typed
            className="text-global-primary"
            strings={['bridges Web2 to Web3', 'connects builders and business', 'empowers builders worldwide']}
            typeSpeed={120}
            loop
          />
        )}

        <h1>help builders to succeed</h1>
      </div>
      <div className="flex justify-center max-md:mt-4 max-md:mb-14">
        <Pointer />
        <Pointer />
        <Pointer />
      </div>
      <div className="relative z-50 mb-4 flex justify-center md:hidden">
        <Link href={'/learn/courses'}>
          <button className="h-12 w-[240px] rounded-full bg-global-primary text-sm font-bold text-[#003D31] hover:opacity-90">
            Go Beta
          </button>
        </Link>
      </div>
      <p className="flex items-center justify-center text-center text-[26px] text-global-primary max-md:text-[13px]">
        Beta version now. Looking forward to co-building with you.
        <span className="relative z-50 ml-4 hidden items-center md:flex">
          <ArrowRightIcon className="mr-2 h-4 w-4" />
          <Link href="/learn/courses" className="cursor-pointer underline">
            Go Beta
          </Link>
        </span>
      </p>
      <Image className="absolute bottom-[-20%] left-0 w-full object-cover md:bottom-[-35%]" src={bottomPic} alt="" />
      {/* <p className="mb-5 text-xl text-white">🤟 Help Web3 Builder get on the way to success!</p> */}
      {/* <button
        onClick={async () => {
          const res = await getProfile()
        }}
        className="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
      >
        Join Community
      </button> */}
    </div>
  )
}
