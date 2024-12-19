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

import { useMediaUrl } from '#/state/application/hooks'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { EyeIcon } from '@heroicons/react/24/outline'
import { UsersModal } from '../../UsersModal'
import { ButtonGroup, Status } from './ListItem'
import ContentEditable from 'react-contenteditable'
import { HTMLDecode } from '@/utils'

export function OpenCourseList({ data, mutate, operation, itemTags }) {
  const [openModal, setOpenModal] = useState(false)
  const [currentId, setCurrentId] = useState()

  const mediaUrl = useMediaUrl()

  return (
    <div className="mt-6">
      <div className="mb-6 grid grid-cols-11 items-center gap-2 text-xs font-bold [&>*]:text-center">
        <p>Banner</p>
        <p className="col-span-2">Title</p>
        <p className="col-span-2">Completed / Registered</p>
        <p className="col-span-2">Chapters</p>
        <p>Status</p>
        <p className="col-span-3">Operation</p>
      </div>
      {data?.list?.map((i, k) => (
        <div key={`creator-learn-${k}`}>
          <div className="grid grid-cols-11 items-center gap-2 text-xs [&>*]:text-center">
            <div>
              {mediaUrl && i.base.course_series_img && (
                <Image width={90} height={50.63} className="rounded w-[90px] aspect-video object-cover" src={mediaUrl + i.base.course_series_img} alt="" />
              )}
              {i.base.course_series_img === '' && <div className="rounded w-[90px] aspect-video bg-gray-400 flex items-center justify-center text-gray-50">No image</div>}
            </div>

            <div className="col-span-2">
              <Link target="_blank" href={`/learn/courses/${i.base.course_series_id}${i.base.course_series_status && '?mode=preview'}`}>
                <h3 className="mb-2 font-bold hover:underline">
                  <ContentEditable
                    html={HTMLDecode ? HTMLDecode(i.base.course_series_title) : ''} // innerHTML of the editable div
                    disabled={true}
                  />
                </h3>

              </Link>
              <p className="text-sm opacity-80">
                {itemTags(i.base.course_series_label_ids).map(
                  t =>
                    t?.name && (
                      <span
                        key={`creator-list-tag-${t?.name}`}
                        className="mr-2 rounded-sm bg-gray-600 px-1 py-[2px] text-xs text-gray"
                      >
                        {t?.name}
                      </span>
                    )
                )}
              </p>
            </div>
            <strong className="col-span-2 flex items-center justify-center">
              {i.base.course_series_learn_finished} / {i.base.course_series_learn_num}
              <EyeIcon
                onClick={() => {
                  setCurrentId(i.base.course_series_id)
                  setOpenModal(true)
                }}
                className="ml-2 h-4 w-4 cursor-pointer"
              />
            </strong>
            <p className="col-span-2">
              {i.base.course_series_chapter_num} / {i.base.course_series_single_num}
            </p>
            <Status status={i.base.course_series_status} />
            <ButtonGroup type="opencourse" status={i.base.course_series_status} id={i.base.course_series_id} loading={operation.operationLoading} mutate={mutate} />
          </div>
          <hr className="my-6 border-gray-400" />
        </div>
      ))}
      {currentId && <UsersModal id={currentId} open={openModal} closeModal={() => setOpenModal(false)} />}
    </div>
  )
}
