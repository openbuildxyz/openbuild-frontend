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

import { useMemo, useState, useEffect } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Slider from 'react-slick'
import { useMediaUrl } from '#/state/application/hooks'
import MorePic from 'public/images/svg/more.svg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import NProgress from 'nprogress'

function CardVerticalSlider({data, type, href}) {
  const mediaUrl = useMediaUrl()
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    adaptiveHeight: true
  };

  const [isClient, setIsClient] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
  }
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient && <div
    onClick={handleClick}
    className={
      clsx('flex-1 truncate px-3 py-2 text-xs text-gray-50 bg-[rgba(255,255,255,0.2)] rounded-full',
        { '!text-white opacity-80': type === 'Community' }
      )
    }
  >
    <Slider {...settings}>
      {data?.map((i, k) => (
        (type === 'Community' && mediaUrl) ? <div key={`BuilderWay-CardVerticalSlider-${k}`} className="!flex items-center">
          <Image className={clsx('mr-[6px] border-1 rounded-full object-cover aspect-square border-white')} width={16} height={16} src={mediaUrl + i.user_avatar} alt="" />
          <p>
            {i.user_handle ? <a className="underline" href={`/u/${i.user_handle}`}>{i.user_nick_name}</a> : <span className='underline'>{i.user_nick_name}</span>}
          </p>

        </div> : <div  key={`BuilderWay-CardVerticalSlider-${k}`}>
          <Link href={`${href}/${i.id}`}>{i.title}</Link>
        </div>
      ))}
    </Slider>
  </div>
}

function Card({onMouseEnter, onMouseLeave, active, item, index}) {
  const router = useRouter()
  const mediaUrl = useMediaUrl()
  
  return (
    <div
      onClick={() => {
        NProgress.start()
        router.push(item.href)
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx('group p-8 overflow-hidden rounded-xl cursor-pointer', {
        'text-white': item.type === 'Community',
        'h-[400px] pb-0 transition-all !duration-500 mt-[-50px]': active === index,
        'h-[350px] p-8 transition-all !duration-500 mt-0': active !== index,
        'bg-[#01DB83]': item.type === 'Learn',
        'bg-[#0A0A0A]': item.type === 'Community',
        'bg-[#CB9BFA]': item.type === 'Bounties',
        'bg-[#F8FD91]': item.type === 'SkillHub'
      },
      )}
    >
      <div className="h-[41px] flex justify-between items-center [&>div]:flex-1 [&>div]:truncate">
        <span className="opacity-60 leading-[30px] font-bold uppercase mr-9">Step {index + 1}</span>
        {item.type !== 'SkillHub' && <CardVerticalSlider type={item.type} href={item.href} color={item.color} data={item.type === 'Community' ? item.data.users : item.data?.last} />}
      </div>
      <h3 className="font-extrabold text-[34px] leading-[42px] mt-2 mb-3">{item.title}</h3>
      <p className="text-sm line-clamp-2 my-7">{item.desc}</p>
      <hr className={clsx('my-7', item.type === 'Community' ? 'border-[rgba(255,255,255,0.2)]' : 'border-gray-1100')} />
      {item.type === 'Learn' ? <div className="flex opacity-80">
        <p className="w-[80px]">{item.subTitle}</p>
        <p className="w-[80px]">Challenges</p>
      </div> : <div className="opacity-80">
        <p>{item.subTitle}</p>
      </div>}

      <div className="flex items-center justify-between mt-2">
        {
          item.type === 'Community' ? <>
            {item.data?.users?.slice(0, 5).map((i, k) => (
              mediaUrl && <Image className={clsx('border-1 rounded-full object-cover aspect-square border-white', { 'ml-[-70px]': k !== 0})} width={40} height={40} src={mediaUrl + i.user_avatar} alt={i.user_nick_name} key={`developers-item-${k}`} />
            ))}
            <Image className={clsx('rounded-full object-cover aspect-square ml-[-70px]')} width={40} height={40} src={MorePic} alt={''} />
          </> :
            item.type === 'Learn' ? <div className="flex flex-1">
              <strong className="inline-block text-[34px] leading-10 w-[80px]">{item.data.open_course_sum}+</strong>
              <strong className="inline-block text-[34px] leading-10 w-[80px]">{item.data.challenges_sum}+</strong>
            </div> : <strong className="text-[34px] leading-10">{item.data?.sum}+</strong>
        }

        <span className={clsx('inline-flex h-10 w-10 justify-center items-center rounded', {
          'bg-gray': item.type !== 'Community',
          'bg-white': item.type === 'Community'
        })}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12L12 1" stroke={item.type === 'Community' ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.57143 1H12V10.4286" stroke={item.type === 'Community' ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <div className="">
        <hr className={clsx('mt-[30px] mb-[14px]', item.type === 'Community' ? 'border-[rgba(255,255,255,0.2)]' : 'border-gray-1100')} />
        Get started your {item.title}
      </div>
    </div>
  )
}

const dataBase = [
  {
    title: 'Learn',
    desc: 'One-stop online learning and hands-on experience',
    type: 'Learn',
    href: '/learn/courses',
    subTitle: 'Courses',
  },
  {
    title: 'Community',
    desc: 'Join the community, co-building Web3, win reputation',
    type: 'Community',
    href: 'https://t.me/OpenBuildxyz/1',
    subTitle: 'Developers',
  },
  {
    title: 'Bounties',
    desc: 'Assisting developers in applying skills for commercial success',
    type: 'Bounties',
    href: '/bounties',
    subTitle: 'Bounties',
  },
  {
    title: 'SkillHub',
    desc: 'Helping developers build decentralized reputation systems and monetize skills',
    type: 'SkillHub',
    href: '/shilling',
    subTitle: 'Skills',
  },
]

export function BuilderWay({data}) {
  const [active, setActive] = useState()
  const media = useMediaQuery('(max-width: 768px)')

  const DATA_BASE = useMemo(() => {
    const _dataBase = [...dataBase]
    _dataBase[0].data = data?.learn
    _dataBase[1].data = data?.community
    _dataBase[2].data = data?.bounties
    _dataBase[3].data = data?.skill_hub
    return { data: _dataBase, }
  }, [data])

  return (
    <div className="mb-[30px]" data-aos="fade-up" data-aos-delay="800">
      <h1 className="text-[22px] md:text-[42px] max-md:text-center leading-[42px] font-extrabold md:mb-[82px] mb-6">Growth Path for Developers</h1>
      <div className="grid md:grid-cols-4 grid-cols-1 md:gap-10 gap-6 items-end transition-height duration-1000">
        {DATA_BASE.data.map((i, k) => (
          <Card
            key={`BuilderWay-card-${k}`}
            onMouseEnter={() => !media && setActive(k)}
            onMouseLeave={() => !media && setActive(-1)}
            active={active}
            item={i}
            index={k}
          />
        ))}
      </div>
    </div>
  )
}
