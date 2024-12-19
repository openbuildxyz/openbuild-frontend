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

import ContentEditable from 'react-contenteditable'
import { HTMLDecode } from '@/utils'
import clsx from 'clsx'

export function Title({data, type}) {
  return <h3 className="my-6 text-[36px] font-bold leading-9 md:text-[36px] md:leading-[48px]">
    <ContentEditable
      html={HTMLDecode ? HTMLDecode(type === 'GrowPath' ? data?.title : data?.base?.course_series_title) : ''} // innerHTML of the editable div
      disabled={true}
    />
  </h3>
}

export function Summary({data, type}) {
  return (
    <div className={clsx('mt-6 rounded text-base', {
      'bg-[#f0f0f0] p-6': type !== 'career_path'
    })}>
      <ContentEditable
        html={HTMLDecode ? HTMLDecode(data?.base?.course_series_summary): ''} // innerHTML of the editable div
        disabled={true}
      />
    </div>
  )
}
