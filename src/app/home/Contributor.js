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

import Slider from 'react-slick'
import { createRef } from 'react'
import { chunk } from 'lodash'
import { clsx } from 'clsx'
// import { LocationIcon } from '@/components/Icons'
// import { useMediaUrl } from '#/state/application/hooks'

import P1 from 'public/images/home/shooter.png'
import P2 from 'public/images/home/Skyhigh.png'
import P3 from 'public/images/home/Fred.png'
import P4 from 'public/images/home/jason.svg'
import P5 from 'public/images/home/Sinka.png'
import P6 from 'public/images/home/xhyumiracle.png'
import P7 from 'public/images/home/qc_qizhou.png'
import P8 from 'public/images/home/HitchhikerW3.png'
import P9 from 'public/images/home/uvd.png'
import P10 from 'public/images/home/pseudoyu.png'
import P11 from 'public/images/home/Frank.png'
import P13 from 'public/images/home/galois.png'
import P14 from 'public/images/home/AlongHudson.png'
import P15 from 'public/images/home/hiCaptainZ.png'
import P16 from 'public/images/home/GianM.png'
import P17 from 'public/images/home/Gabin.png'
import P18 from 'public/images/home/Ivan.png'
import P19 from 'public/images/home/Leo.jpg'

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
]

export function Contributor({data}) {
  // const mediaUrl = useMediaUrl()
  const customSlider = createRef()

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 7,
    speed: 800,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  }

  const next = () => {
    customSlider.current.slickNext()
  }

  const prev = () => {
    customSlider.current.slickPrev()
  }

  const chunkData = chunk(DATAS, 2)

  return (
    <div className="pt-14 rounded-t-2xl bg-home-contributor-bg !px-0">
      <div className="max-md:flex-col flex justify-between mb-4 max-md:mb-6 px-11">
        <h1 className="max-md:text-center max-md:text-[28px] max-md:leading-9 text-[42px] leading-[52px] max-w-lg" data-aos="fade-right" data-aos-delay="500">OpenBuild Contributor</h1>
        <p className="max-md:text-center max-md:mt-4 text-base line-clamp-2 max-w-xl hyphens-auto" data-aos="fade-left" data-aos-delay="500">Help more developers get into Web3 and grow with the community, earning reputation and equity, and build a better Web3 together. <a target="_blank" rel="noreferrer" href="https://github.com/openbuildxyz/build_web3_together" className="underline">See more details</a></p>
      </div>
      <div className="contributor-slider" data-aos="zoom-in-up" data-aos-delay="800">
        <div className="flex justify-end max-md:justify-center md:pr-11">
          <span onClick={prev} className="flex w-10 h-10 justify-center items-center cursor-pointer rounded border border-gray mr-4">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.278 8.49988H0.72168" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.38869 1.83287L0.72168 8.49988L7.38869 15.1669" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span onClick={next} className="flex w-10 h-10 justify-center items-center cursor-pointer rounded bg-gray">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.721972 8.49988H16.2783" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.61131 1.83287L16.2783 8.49988L9.61131 15.1669" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        <div className="mt-[50px] max-md:mt-8 mb-[150px] max-md:mb-14 pl-11">
          <Slider {...settings} ref={customSlider}>
            {chunkData.map((i, k) => (
              <div key={`contributor-slider-box-${k}`} className="!grid grid-cols-1 gap-10 pr-11">
                {i.map((j, t) => (
                  <div
                    key={`contributor-slider-item-${k}-${t}`}
                    className={clsx('relative group w-full rounded-full hover:w-[calc(100%)]')}
                  >
                    <img src={j.picture.src} alt="" className={clsx('w-full aspect-square object-cover rounded-full relative z-[2] group-hover:z-10')} />

                    <div className={clsx('text-white box-border py-6  absolute top-[1px] left-[1px] w-[99%] h-[99%] transition-width !duration-300 overflow-hidden bg-gray rounded-full z-0',
                      'group-hover:w-[calc(200%+40px)] group-hover:pl-[100%] group-hover:ml-2 group-hover:z-[3]',
                    {

                    })}>
                      <div className="hidden h-full group-hover:flex flex-col justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h6 className="text-lg truncate">{j.name}</h6>
                            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M8.89274 0C9.34746 0 9.80218 0.172126 10.149 0.518947L11.7521 2.12203H13.964C14.9454 2.12203 15.7392 2.91586 15.7392 3.89724V4.63455H15.7521V5.86256H15.7392V6.10918L17.2652 7.6352C17.9589 8.32884 17.9589 9.45151 17.2652 10.1451L15.7392 11.6712V13.9602C15.7392 14.9416 14.9454 15.7354 13.964 15.7354H11.675L10.149 17.2614C9.80218 17.6057 9.34746 17.7778 8.89274 17.7778C8.43802 17.7778 7.9833 17.6056 7.63648 17.2588L6.11047 15.7328H3.89852C2.91715 15.7328 2.12331 14.939 2.12331 13.9576V11.7457L0.520231 10.1426C-0.17341 9.44894 -0.17341 8.32627 0.520231 7.63263L2.12331 6.02954V3.89467C2.12331 2.91329 2.91715 2.11946 3.89852 2.11946H6.0334L7.63648 0.516378C7.9833 0.172126 8.43802 0 8.89274 0Z" fill="#01DB83"/>
                              <path d="M11.6747 7.0549C11.9136 7.29382 11.9136 7.68431 11.6747 7.92323L8.32978 11.2681C8.16023 11.4377 7.9136 11.4891 7.6978 11.4171C7.59247 11.3914 7.49485 11.3375 7.41777 11.263L5.75047 9.6522C5.50641 9.41585 5.4987 9.02792 5.73505 8.78386C5.9714 8.5398 6.35933 8.5321 6.60339 8.76845L7.86736 9.98874L10.8012 7.0549C11.0453 6.81341 11.4332 6.81341 11.6747 7.0549Z" fill="#1A1A1A"/>
                            </svg>
                          </div>

                          <p className="my-1 text-sm">{j.title}</p>
                          <a className="flex items-center" href={`https://twitter.com/${j.x}`} target="_blank" rel="noreferrer">
                            <svg className="opacity-60" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                              <path d="M10.6433 0.3125H12.5729L8.35717 5.13083L13.3167 11.6875H9.43342L6.39192 7.71092L2.91176 11.6875H0.980922L5.49009 6.53375L0.732422 0.3125H4.71426L7.46351 3.94725L10.6433 0.3125ZM9.96601 10.5325H11.0353L4.13326 1.40683H2.98584L9.96601 10.5325Z" fill="white"/>
                            </svg>
                            <p className="text-sm ml-1 opacity-50">@{j.x}</p>
                          </a>
                        </div>

                        {/* <div>
                          <p className="text-sm opacity-50 mb-1">Honor</p>
                          <div className="flex gap-2">
                            {j.honor.map((hi, hk) => <img key={`honor-${k}-${t}-${hk}`} className="h-9 w-9 rounded-full" src={hi} alt="" />)}
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
