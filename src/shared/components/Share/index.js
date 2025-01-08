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

import { useMemo, useState } from 'react'
import { Modal } from '@/components/Modal'
import Image from 'next/image'

import { ModalCloseIcon, CopyIcon } from '@/components/Icons'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import FacebookSvg from 'public/images/svg/share-facebook.svg'
import XSvg from 'public/images/svg/share-x.svg'
import copy from 'copy-to-clipboard'
import { useMediaUrl, useUser } from '#/state/application/hooks'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'
import useSWR from 'swr'
import { fetcher } from '@/utils/request'
import { Button } from '../Button'
import { formatTime } from '@/utils/date'
import { NoData } from '@/components/NoData'
import { toast } from 'react-toastify'
import ContentEditable from 'react-contenteditable'
import { HTMLDecode } from '@/utils'
import { resolvePathWithSearch } from '@/utils/url'

const combineUrl = (type, user_code, summary) => {
  let baseUrl = ''

  if(type === 'facebook') {
    baseUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  }else {
    let text = summary ? `text=${encodeURIComponent(summary)}&` : ''
    baseUrl = `https://twitter.com/intent/tweet?${text}url=${encodeURIComponent(window.location.href)}`
  }

  return user_code ? `${baseUrl}?code=${encodeURIComponent(user_code)}` : baseUrl
}

export function Share({ img, title, type, id, excerpt }) {
  const [open, setOpen] = useState(false)
  const [recordOpen, setRecordOpen] = useState(false)
  const mediaUrl = useMediaUrl()
  const user = useUser()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const link = useMemo(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(searchParams)
      user?.base.user_code && params.set('code', user?.base.user_code)
      return `${window.location.origin}${resolvePathWithSearch(pathname, params)}`
    }
  }, [user, pathname, searchParams])
  const { data, isLoading } = useSWR((id && recordOpen) ? `ts/v1/user/invite/export?type=challenges&id=${id}` : null, fetcher)
  
  const invitationRecordsAvailable = type === 'challenges'
  const handleViewRecords = invitationRecordsAvailable ? () => {
    if (user) {
      setOpen(false)
      setRecordOpen(true)
    } else {
      router.push(`/signin?from=${encodeURIComponent(resolvePathWithSearch(pathname, searchParams))}`)
    }
  } : undefined

  return <>
    <div onClick={() => setOpen(true)} className={clsx('inline-flex items-center py-2 px-4 text-sm rounded cursor-pointer hover:opacity-80 transition-opacity', {
      'bg-[#EFEFEF]': type !== 'career_path',
      'bg-[rgba(255,255,255,0.1)]': type === 'career_path',
    })}>
      <svg className="mr-[6px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8.66667 1.33301L14.6667 7.33301L8.66667 12.9997V9.33301C4 9.33301 2 14.333 2 14.333C2 8.66634 3.66667 4.99967 8.66667 4.99967V1.33301Z" stroke={type === 'career_path' ? 'white': '#1A1A1A'} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Share
    </div>
    <Modal isOpen={open} closeModal={() => setOpen(false)} container className="!w-[380px]">
      <ModalCloseIcon onClick={() => setOpen(false)} className="absolute top-[-32px] right-[-32px] cursor-pointer" />
      {img && <div className="h-[160px] rounded-t-2xl bg-[#F4F4F4] absolute left-0 top-0 w-full z-50">
        {mediaUrl && <Image
          className="aspect-[16/9] w-[320px] ml-[30px] mt-[-50px] rounded-2xl object-cover transition-all group-hover:scale-110"
          width={500}
          height={281}
          src={mediaUrl + img} alt="" />}
      </div>}
      <div className="flex flex-col items-center">
        <h5 className={`text-xl text-center max-w-xs mb-4 ${img ? 'mt-[184px]' : 'mt-[24px]'}`}>
          <ContentEditable
            html={HTMLDecode ? HTMLDecode(title) : ''} // innerHTML of the editable div
            disabled={true}
          />
        </h5>
        <div className="flex items-center justify-center gap-4">
          <Image className="cursor-pointer" src={FacebookSvg} alt=""  onClick={() => window.open(combineUrl('facebook', user?.base.user_code, excerpt))} />
          <Image className="cursor-pointer" src={XSvg} alt="" onClick={() => window.open(combineUrl('x', user?.base.user_code, excerpt))} />
        </div>
        <p className="mt-6 text-sm opacity-40 w-full pl-[30px]">or use your invitation code</p>
        <div className="flex bg-[#F3F3F3] rounded h-12 items-center justify-between px-4 w-[320px] mt-3 mb-9">
          <p className="text-[13px] opacity-60 truncate mr-4">{link}</p>
          <CopyIcon onClick={() => {
            copy(link)
            toast.success('Copied')
          }} className="w-5 h-5 cursor-pointer hover:opacity-80 [&>g]:opacity-100" />
        </div>
        {invitationRecordsAvailable && (
          <p className="text-sm underline mb-9 cursor-pointer" onClick={handleViewRecords}>Invitation record</p>
        )}
      </div>
    </Modal>
    {invitationRecordsAvailable && (
      <Modal isOpen={recordOpen} closeModal={() => setRecordOpen(false)} container className="!w-[380px]">
        <ModalCloseIcon onClick={() => setOpen(false)} className="absolute top-[-32px] right-[-32px] cursor-pointer" />
        <div className="py-4 px-6">
          <div className="flex items-center">
            <ArrowLeftIcon className="w-5 h-5 cursor-pointer relative z-10" onClick={() => {
              setOpen(true)
              setRecordOpen(false)
            }}/>
            <h6 className="flex-1 text-center ml-[-10px]">Invitation record</h6>
          </div>
          <div className="bg-[#F3F3F3] rounded text-center py-4 mt-4 mb-2">
            <p className="text-sm">Invited friends</p>
            <h4 className="text-[32px]">{data?.sum}</h4>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {data?.invites.length === 0 && !isLoading && <NoData />}
            {data?.invites.map((i, k) => (
              <div key={`user-invites-${k}`} className="flex justify-between items-center py-4 border-b border-gray-400 last:border-0">
                <div className="flex items-center">
                  {mediaUrl && <Image
                    className="mr-3 rounded-full object-fill"
                    width={48}
                    height={48}
                    src={mediaUrl + i.invite_user.user_avatar}
                    alt=""
                  />}
                  <div>
                    <h6>
                      <a href={`/u/${i.invite_user?.user_handle}`}>{i.invite_user.user_nick_name}</a>
                    </h6>
                    <p className="text-xs opacity-40 mt-1">{formatTime(i.created_at * 1000)}</p>
                  </div>
                </div>
                <span className={clsx('text-sm', {
                  'opacity-80': '',
                })}>Joined</span>
              </div>
            ))}
          </div>
          <Button fullWidth className="mt-6" onClick={() => setRecordOpen(false)}>OK</Button>
        </div>
      </Modal>
    )}
  </>
}
