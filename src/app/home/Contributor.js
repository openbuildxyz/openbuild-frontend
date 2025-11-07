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

'use client';

import P14 from 'public/images/home/AlongHudson.png';
import P11 from 'public/images/home/Frank.png';
import P3 from 'public/images/home/Fred.png';
import P17 from 'public/images/home/Gabin.jpeg';
import P13 from 'public/images/home/galois.png';
import P16 from 'public/images/home/GianM.png';
import P15 from 'public/images/home/hiCaptainZ.png';
import P8 from 'public/images/home/HitchhikerW3.png';
import P18 from 'public/images/home/Ivan.jpeg';
import P4 from 'public/images/home/jason.svg';
import P19 from 'public/images/home/Leo.jpg';
import P10 from 'public/images/home/pseudoyu.jpeg';
import P7 from 'public/images/home/qc_qizhou.png';
import P1 from 'public/images/home/shooter.jpeg';
import P5 from 'public/images/home/Sinka.png';
import P2 from 'public/images/home/Skyhigh.png';
import P9 from 'public/images/home/uvd.png';
import P6 from 'public/images/home/xhyumiracle.png';

import { SvgIcon } from '@/components/Image';

const DATAS = [
  { name: 'NPC_Leo', picture: P19, x: 'NPC_Leo', title: 'Founder of DevBase @DevBase' },
  { name: 'justin', picture: P15, x: 'hiCaptainZ', title: 'Researcher. Focusing on Onchain Game' },
  { name: 'GianM', picture: P16, x: 'gianmalarcon', title: 'Developer @Cairo/Rust, Blockchain engineer @Quantum3 Labs' },
  { name: 'Gabin', picture: P17, x: 'gabinmarignier', title: 'Founder @Focus Tree' },
  { name: 'Ivan', picture: P18, x: 'Ivan_SpaceShard', title: '' },
  { name: 'shooter', picture: P1, x: 'liushooter', title: 'Co-Founder @Rebase' },
  { name: 'Skyhigh', picture: P2, x: 'skyh20', title: 'AA Community Initiator' },
  { name: '大葱 Fred', picture: P3, x: 'Dacongfred', title: 'Ryze Labs Venture' },
  { name: 'jason', picture: P4, x: 'jason_movebit', title: 'Security research @ScaleBit' },
  { name: 'Sinka', picture: P5, x: 'sinka2022', title: 'Founder @Delphinuslab' },
  { name: '于晓航', picture: P6, x: 'xhyumiracle', title: 'Core Researcher @Hyper Oracle' },
  { name: '周期博士', picture: P7, x: 'qc_qizhou', title: 'Founder @EthStorage' },
  { name: '任泓毅', picture: P8, x: 'HitchhikerW3', title: 'Co-founder & research @W3.Hitchhiker' },
  { name: 'uvd', picture: P9, x: 'wangtxxl', title: 'Technical ambassador @Sui ' },
  { name: 'pseudoyu', picture: P10, x: 'pseudo_yu', title: 'Back-end & Smart Contract Developer @RSS3 & Crossbell' },
  { name: 'Frank@Beosin', picture: P11, x: 'BeosinAlert', title: 'Security Researcher & Leader @Beosin Security Incident Team' },
  { name: 'galois', picture: P13, x: 'YQ996CO28254695', title: 'Backend Developer / EVM & MEV Researcher' },
  { name: 'Frank', picture: P14, x: 'AlongHudson', title: 'Developer advocate @Chainlink' },
];

export function Contributor() {
  return (
    <div className="pt-14 rounded-t-2xl bg-home-contributor-bg !px-0">
      <div className="max-md:flex-col flex justify-between items-end mb-10 max-md:mb-6 px-11">
        <h1 className="max-md:text-center max-md:text-[28px] max-md:leading-9 text-[42px] leading-[52px] max-w-lg" data-aos="fade-right" data-aos-delay="500">OpenBuild Community Contributor</h1>
        <p className="max-md:text-center max-md:mt-4 text-xl leading-8 line-clamp-2 max-w-[768px] hyphens-auto text-right" data-aos="fade-left" data-aos-delay="500">Provide high-quality Web3 technical content.Share job opportunities/bounties with developers.Build an open community together.</p>
      </div>
      <div className="px-11 mb-[160px] max-md:mb-14" data-aos="zoom-in-up" data-aos-delay="800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {DATAS.map((contributor, index) => (
            <div
              key={`contributor-card-${index}`}
              className="relative bg-white rounded-xl shadow-sm flex flex-col hover:shadow-md transition-shadow border border-gray-600 overflow-hidden"
            >
              {/* External link icon in top-right */}
              <a
                href={`https://twitter.com/${contributor.x}`}
                target="_blank"
                rel="noreferrer"
                className="absolute top-1 right-1 z-10 w-7 h-7 flex items-center justify-center rounded-[30px] bg-gray-800 hover:bg-gray transition-colors group"
                aria-label="External link"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.9095 7.23138L7.2312 15.9097" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors"/>
                  <path d="M10.1254 7.23157H15.9109V13.0171" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors"/>
                </svg>
              </a>

              {/* Upper section with padding */}
              <div className="px-3 pt-5 pb-3 flex flex-col items-center flex-1">
                {/* Profile picture */}
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-gray-100 flex-shrink-0">
                  <img
                    src={contributor.picture.src || contributor.picture}
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-center mb-1 w-full truncate font-bold text-base leading-4">
                  {contributor.name}
                </h3>

                {/* Title */}
                {contributor.title && (
                  <p className="text-center w-full truncate font-normal text-sm leading-4">
                    {contributor.title}
                  </p>
                )}
              </div>

              {/* Social links section - full width */}
              <div className="w-full h-9 flex justify-center items-center gap-3 rounded-b-xl bg-gray-800">
                <a
                  href={`https://twitter.com/${contributor.x}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  aria-label={`${contributor.name} on X (Twitter)`}
                >
                  <SvgIcon name="contributor-x" size={16} />
                </a>
                {/* GitHub link - placeholder for future use */}
                {contributor.github && (
                  <a
                    href={`https://github.com/${contributor.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                    aria-label={`${contributor.name} on GitHub`}
                  >
                    <SvgIcon name="contributor-github" size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
