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

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Image, { SvgIcon } from '@/components/Image'

import { BuilderListWidget } from '../../../course'

function PublishedChallengeItem({ data, viewingSelf }) {
  const router = useRouter()

  return data ? (
    <div className="flex flex-col gap-6 pb-6 border-b border-gray-400 mb-6 group md:flex-row">
      <div className="relative">
        <Image
          width={180} height={100}
          onClick={() => router.push(`/learn/challenges/${data.base.course_series_id}`)}
          className="w-full h-auto aspect-19/10 object-cover rounded-lg cursor-pointer transition-all group-hover:scale-110 md:w-[180px] md:h-[100px]"
          src={data?.base.course_series_img} alt=""
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3
            className="mb-2 cursor-pointer hover:underline"
            onClick={() => router.push(`/learn/challenges/${data.base.course_series_id}`)}
          >
            {data?.base.course_series_title}
          </h3>
          <BuilderListWidget
            className="gap-2"
            dataSource={data?.enrool_users}
            total={data?.base.course_series_learn_num}
            dataKeys={{ id: 'user_id', avatar: 'user_avatar' }}
          />
        </div>
        <p className="mt-4 text-sm opacity-80 md:mt-0">
          Course Sections <strong>{data?.base.course_series_single_num}</strong>
           {/* <span className="opacity-40">|</span> <strong>2,132</strong> Builders View */}
        </p>
      </div>
      {viewingSelf && (
        <Link
          href={`/creator/learn/challenges/${data.base.course_series_id}`}
          className="hidden text-sm md:flex items-center cursor-pointer font-bold gap-2"
        >
          Edit
          <SvgIcon name="arrow-right-top" size={16} />
        </Link>
      )}
    </div>
  ) : null
}

export default PublishedChallengeItem
