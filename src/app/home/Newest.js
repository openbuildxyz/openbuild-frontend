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
import Image from 'next/image'
import { useMemo } from 'react'
import { useMediaUrl } from '#/state/application/hooks'
import Link from 'next/link'

export function Newest({data}) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '60px',
        }
      }
    ]
  }

  const newest = useMemo(() => {
    if (data.bounties.last.length > 0) {
      return data.learn.last.concat(data.bounties.last[0])
    } else {
      return data.learn.last
    }
  }, [data])

  const mediaUrl = useMediaUrl()
  return (
    <div className="text-center newest" >
      <h1 className="text-[42px] leading-[52px] mb-9 max-md:text-[28px] max-md:leading-9" data-aos="fade-up" data-aos-delay="300">Newest on OpenBuild</h1>
      <Slider {...settings} >
        {newest.map((i, k) => (
          <div key={`home-Newest-${k}`} data-aos="flip-left" data-aos-delay="300" className="">
            <div className="h-[50px] ph max-md:hidden"></div>
            {mediaUrl && <Image className="rounded-xl w-[95%] aspect-video object-cover" width={500} height={281} src={mediaUrl + i.img} alt="" />}
            <div className="md:opacity-0 newest-card-desc md:mt-[60px] mt-8">
              <p className="text-lg text-gray-50 flex items-center justify-center"><span className="text-xs text-gray px-2 my-[3px] mr-2 bg-green rounded-md h-6 leading-6">{i.type}</span></p>
              <h6 className="mt-2 md:text-[28px] md:leading-[42px] text-lg hover:underline">
                <Link href={`${i.type === 'bounty' ? '/bounties' :  i.type === 'open_course' ? '/learn/courses' : '/learn/challenges'}/${i.id}`}>{i.title}</Link>
              </h6>
            </div>
            <div className="h-[50px] ph max-md:hidden"></div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
