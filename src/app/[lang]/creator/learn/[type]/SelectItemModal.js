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


import { useState } from 'react'
import Image from 'next/image'
import { Modal } from '@/components/Modal'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import useSWR from 'swr'
import { NoData } from '@/components/NoData'
import { CommonListSkeleton } from '@/components/Skeleton/CommonListSkeleton'
import { fetcher } from '@/utils/request'
import { Button } from '@/components/Button'
import clsx from 'clsx'
import { useMediaUrl } from '#/state/application/hooks'
import { formatTime } from '@/utils/date'
import { toast } from 'react-toastify'
import { addSeries } from '#/services/creator'
import { useRouter } from 'next/navigation'

export function SelectItemModal({type, open, close, back}) {
  const { push } = useRouter();
  const mediaUrl = useMediaUrl()
  const [active, setActive] = useState(null)
  const { data, isLoading } = useSWR(`v1/learn/creator/series?series_type=${type === 'challenges' ? 'open_course' : 'challenges'}&skip=0&take=10000&order=latest`, fetcher)
  const [confirmLoading, setConfirmLoading] = useState(false)


  const confirm = async () => {
    if (active) {
      setConfirmLoading(true)
      const item = data.list.find(f => f.base.course_series_id === active)
      // res = await addSeries({ base: _forms })
      let res
      const _forms = {...item.base}
      _forms.course_series_id = 0
      _forms.course_series_type = type === 'opencourse' ? 'open_course' : 'challenges'
      if (type === 'opencourse') {
        res = await addSeries({ base: _forms })
      } else {
        res = await addSeries({ base: _forms, challenges_extra: item.challenges_extra })
      }
      if (res.code === 200) {
        push(`/creator/learn/${type}/${res.data.base.course_series_id}`)
      } else {
        toast.error(res.message)
      }
      setConfirmLoading(false)
    } else {
      toast.error('Please select a item')
    }
  }

  return (
    <Modal isOpen={open} title={'Create new Content'} closeModal={close}>
      <>
        {isLoading && <CommonListSkeleton />}
        {data?.count === 0 && !isLoading && (
          <div className="flex justify-center min-h-[300px] items-center">
            <NoData />
          </div>
        )}
        <div className="max-h-[500px] overflow-y-auto">
          {data?.list?.map(i => (
            <div
              key={i.base.course_series_id}
              onClick={() => setActive(i.base.course_series_id)}
              className={clsx('relative mb-4 after:absolute after:bottom-[-8px] after:right-0 after:block after:w-[78%] after:h-[1px] after:border-b after:border-gray-400 px-3 py-4 flex cursor-pointer justify-between items-center rounded', {
                'bg-[#F3F3F3]': active === i.base.course_series_id
              })}
            >
              <div className="flex items-center">
                {mediaUrl && <Image className="rounded-md w-[104] aspect-video object-cover" width={104} height={56} src={mediaUrl + i.base.course_series_img} alt="" />}

                <div className="ml-4">
                  <h6 className="text-sm">{i.base.course_series_title}</h6>
                  {
                    i.base.course_series_type === 'challenges' ?
                    <p className="text-sm opacity-60 mt-2">{formatTime(i.challenges_extra.course_challenges_extra_start_date * 1000)} - {formatTime(i.challenges_extra.course_challenges_extra_end_date * 1000)} | {i.challenges_extra.course_challenges_extra_online ? 'Online' : 'Offline'}</p>
                    : <p className="text-sm opacity-60 mt-2">{i.base.course_series_chapter_num} Chapters</p>
                  }
                </div>
              </div>
              {active === i.base.course_series_id && <CheckCircleIcon className="h-6 w-6 mr-6" />}
            </div>
          ))}

        </div>
        <div className="flex justify-end mt-6">
          <Button variant="outlined" className="w-[160px] mr-4 !font-bold" onClick={back}>Back</Button>
          <Button loading={confirmLoading} className="w-[160px] mr-4 !font-bold" onClick={confirm}>Confirm</Button>
        </div>
      </>
    </Modal>
  )
}
