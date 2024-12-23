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

import Image from 'next/image'
import Link from 'next/link'
import HomeTopBg from 'public/images/home-top-bg.png'

import { BuilderWay } from './BuilderWay'
import { MarqueeContent } from './Marquee'
import { Contributor } from './Contributor'
import { BuildWith } from './BuildWith'
import { Newest } from './Newest'
import { Trusted } from './Trusted'
import { StartOnOpenBuild } from '../learn/StartOnOpenBuild'
import Aos from 'aos'
import Spin from './Spin'

import { useEffect } from 'react'
import Typed from 'react-typed'

export function HomeMain({data}) {
  useEffect(() => {
    Aos.init({
      delay: 100, // values from 0 to 3000, with step 50ms
      duration: 800, // values from 0 to 3000, with step 50ms
    })
  }, [])
  return (
    <div className="mt-14 [&>div]:px-6 md:[&>div]:px-11 bg-white" >
      <div data-aos="fade-up">
        <Image className="opacity-10 absolute top-[-100px] z-[-1]" src={HomeTopBg} alt="" />
        <div className="text-[28px] leading-9 md:text-[58px] font-bold md:leading-[64px] text-center">
          <h1>Help ✦ Developers ✦</h1>
          <h1>get on the Success Way to Web3</h1>
        </div>
        <div className="mt-4 md:mt-5 text-lg md:text-[26px] leading-9 text-center">
          <Typed
              strings={['Learn, Connect, Build, Grow','Bridge Web2 to Web3','Connect Developers and Business']}
              typeSpeed={80}
              loop={true}
          />
          {/* <p>Learn, Connect, Build, Grow</p> */}
          {/* <p>Want submit a course?</p> */}
        </div>
        <div className="flex max-md:flex-col justify-center md:mt-9 md:mb-[100px] mt-8 mb-14">
          <a href="https://t.me/OpenBuildxyz/1" target="_blank" rel="noreferrer">
            <button className="max-md:w-full max-md:font-normal h-14 text-lg btn btn-outline btn-primary hover:bg-gray hover:text-white md:mr-3 px-9">🎉 Join Community</button>
          </a>
          <Link href="/learn/courses">
            <button className="max-md:relative max-md:mt-3 max-md:w-full max-md:font-normal h-14 text-lg relative btn btn-primary text-white pl-9 pr-2 hover:!opacity-90">
              Get Started
              <span className="max-md:absolute max-md:top-3 max-md:right-3 p-2 bg-white rounded ml-14">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12L12 1" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.57143 1H12V10.4286" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <svg className="max-md:hidden absolute right-[-15px] top-[-20px]" xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 15 19" fill="none">
                <path d="M11.774 7.6202L12.837 6.6604L11.584 6.6908L5.841 6.5427L2.02802 2.7393L1.168 1.8501L1.14899 3.0161L1.01999 15.7924L1 16.9584L1.76599 16.2852L11.774 7.6202Z" fill="#1A1A1A" stroke="#1A1A1A" strokeLinecap="square"/>
              </svg>
              <span className="max-md:hidden absolute text-xs bg-primary right-[-53px] top-[-40px] p-[2px]">Builder</span>
            </button>
          </Link>

          <div className="absolute ml-[900px] w-[152px] h-[152px] bg-green rounded-full hidden md:flex justify-center items-center">
            <Spin/>

            <div className="w-[80px] h-[80px] bg-home-green-ball-gradient-l-r rounded-full  flex justify-center items-center">
              <div className="w-[52px] h-[52px] bg-[#f8f8f8] rounded-full  flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11.5 4.72173L11.5 20.2781" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.167 13.6111L11.5 20.2781L4.83299 13.6111" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
      <BuilderWay data={data?.items} />
      <MarqueeContent data={data?.ecosystem} />
      <Contributor data={data.contributor} />
      <BuildWith />
      <Newest data={data?.items} />
      <Trusted />
      <StartOnOpenBuild />
    </div>
  )
}
