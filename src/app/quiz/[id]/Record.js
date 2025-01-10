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

import { Modal } from '@/components/Modal'
import { ModalCloseIcon } from '@/components/Icons'
import useSWR from 'swr'
import { fetcher } from '@/utils/request'
import Image from 'next/image'
import { useMediaUrl } from '#/state/application/hooks'
import { formatTime, fromUtcOffset, formatTimeMeridiem } from '@/utils/date'
// import clsx from 'clsx'
import { NoData } from '@/components/NoData'
import Link from 'next/link'

export function Record({id, openModal, closeModal}) {
  const mediaUrl = useMediaUrl()
  const { data } = useSWR(openModal ? `/ts/v1/quiz/${id}/answer` : null, fetcher)
  // console.log(data)
  return (
    <Modal isOpen={openModal} closeModal={closeModal} container mode="640">
      <div >
        <ModalCloseIcon onClick={closeModal} className="absolute top-[-48px] md:top-[-32px] right-0 md:right-[-32px] cursor-pointer" />
        <div>
          <h3 className="text-center py-4 border-b border-gray-600">
            Challenge Record
          </h3>
          <div className="px-6 py-4">
            <ul className="hidden md:grid grid-cols-4 gap-4 text-xs opacity-60">
              <li className="col-span-2">Quiz</li>
              <li className="text-right">Time</li>
              <li className="text-right">Score</li>
            </ul>
            <div className="max-h-[300px] mt-2 md:mt-4 overflow-y-auto">
              {data?.map((i, k) => (
                <div key={`challenge-record-${k}`} className=" mb-4 ">
                  <ul className="grid md:grid-cols-4 max-md:gap-y-4 md:gap-x-4 items-center">
                    <li className="md:col-span-2">
                      <Link href={`/quiz/${i.quiz_id}`} className="text-sm font-bold hover:underline">{i.quiz_info.title}</Link>
                      <div className="flex items-center mt-1">
                        {mediaUrl && <Image
                          className="h-[18px] w-[18px] rounded object-cover mr-2"
                          height={18}
                          width={18}
                          alt={'user_avatar'}
                          src={mediaUrl + i.quiz_user?.user_avatar}
                        />}
                        <p className="opacity-90 text-xs">by  <a href={`/u/${i.quiz_user?.user_handle}`}><strong>{i.quiz_user?.user_nick_name}</strong></a> </p>
                      </div>

                    </li>
                    <li className="flex md:block justify-between md:text-right text-xs">
                      <div>
                        <p className='md:hidden opacity-60 mb-1'>Time</p>
                        <p>{formatTime(i.created_at * 1000, 'YYYY-MM-DD hh:mm:ss')}&nbsp;
                          <span className='max-md:hidden'>{formatTimeMeridiem(i.created_at * 1000)}  
                            <span className="text-xs">
                              (UTC+{fromUtcOffset()})
                            </span>
                          </span>
                          </p>
                      </div>
                      <div className='md:hidden'>
                        <p className='opacity-60 mb-1'>Score</p>
                        <p className='text-right'><strong>{i.score}</strong></p>
                      </div>
                    </li>
                    <li className="max-md:hidden text-right">
                      <strong>{i.score}</strong>
                    </li>
                  </ul>
                  <hr className="border-t border-gray-600 mt-4" />
                </div>
              ))}
            </div>
          </div>
          {data?.length === 0 && <div className="pb-12"><NoData /></div>}
        </div>
      </div>
    </Modal>
  )
}
