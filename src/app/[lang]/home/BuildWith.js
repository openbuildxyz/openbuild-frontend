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

import build1Pic from 'public/images/build-1.svg'
import build2Pic from 'public/images/build-2.svg'
import build3Pic from 'public/images/build-3.svg'
import build4Pic from 'public/images/build-4.svg'

const data = [
  {
    icon: build1Pic,
    text: 'Developer Contents',
    href:'https://github.com/openbuildxyz/build_web3_together?tab=readme-ov-file#developer-contents',
  },
  {
    icon: build2Pic,
    text: 'Bounty & Grants',
    href:'https://github.com/openbuildxyz/build_web3_together?tab=readme-ov-file#bounty--grants',
  },
  {
    icon: build3Pic,
    text: 'Open-Source Contribution',
    href:'https://github.com/openbuildxyz/build_web3_together?tab=readme-ov-file#bounty--grants',
  },
  {
    icon: build4Pic,
    text: 'OpenBuild SIG',
    href:'https://github.com/openbuildxyz/build_web3_together?tab=readme-ov-file#bounty--grants',
  },
]

export function BuildWith() {
  return (
    <div className="text-center md:mb-[120px] mb-14">
      <h1 className="text-[42px] leading-[52px] max-md:mb-4 mb-6 max-md:text-[28px] max-md:leading-9" data-aos="fade-up" data-aos-delay="500">Ways to Contribute</h1>
      <p className="text-[26px] leading-[36px] max-md:text-lg max-w-2xl m-auto mb-6" data-aos="fade-up" data-aos-delay="800">Contribute to Web3 with OpenBuild, establish community reputation, and earn SBT.</p>
      <a href="https://github.com/openbuildxyz/build_web3_together" target="_blank" rel="noreferrer" className="inline-block mb-[60px]" data-aos="fade-up" data-aos-delay="800">
        <button className="max-md:font-normal h-14 text-lg relative btn btn-primary text-white pl-9 pr-2 hover:!opacity-90">
          Let&#39;s dive in
          <span className="p-2 bg-white rounded ml-4">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12L12 1" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.57143 1H12V10.4286" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </a>
      <div className="grid grid-cols-4 max-md:grid-cols-1 md:gap-10">
        {data.map((i, k) => (
          <a href={i.href} target="_blank" rel="noreferrer" data-aos={k === 1 || k === 3 ? 'fade-up' :'fade-down'} data-aos-delay="1000" key={`home-build-item-${k}`} className="group relative flex items-center flex-col hover:drop-shadow-4xl hover:bg-white rounded-lg pt-[38.5px] pb-[42px]">
            <Image src={i.icon} alt="" className="h-[140px] mb-10 w-auto transition-all !duration-500 scale-110 group-hover:scale-125" />
            <h6 className="relative text-2xl font-extrabold max-w-[240px] text-center top-0 transition-all !duration-500 group-hover:top-4">{i.text}</h6>
            <svg className="absolute left-[50%] translate-x-[-50%] bottom-[-40px] group-hover:bottom-[-20px] opacity-0 group-hover:opacity-100 transition-all !duration-500" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" fill="#1A1A1A" stroke="black"/>
              <path d="M14 26L25 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.5714 15H25V24.4286" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
