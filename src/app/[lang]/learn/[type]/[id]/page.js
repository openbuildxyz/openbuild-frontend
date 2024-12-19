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

import { get } from '@/utils/request'
import { Author } from './Author'
import { Tabs } from './Tabs'
import { Chapters } from '../../Chapters'
import { Speaker } from '../../Speaker'
import { LearnInfo } from './LearnInfo'
import { LearnRightCard } from './RightCard'
import { Back } from './Back'
import { Share } from '@/components/Share'
import { ChallengesTags } from './Tags'
import { PreviewAlert } from '@/components/PreviewAlert'
import { Summary, Title } from './Summary'
import { GrowPath } from './GrowPath'

export async function generateMetadata({ params }) {
  // fetch data
  const { data } = await get(`v1/learn/course/${params.type === 'courses' ? 'opencourse' : 'challenges'}/${params.id}`, {isServer: true})
  const previousImages = `https://file-cdn.openbuild.xyz${data?.base?.course_series_img}` || ''
  return {
    title: data?.base?.course_series_title,
    description: data?.base?.course_series_summary,
    openGraph: {
      title: data?.base?.course_series_title,
      description: data?.base?.course_series_summary,
      images: [previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.base?.course_series_title,
      description: data?.base?.course_series_summary,
      images: previousImages,
    },
  }
}
export default async function LearnDetailsPage({ params, searchParams }) {
  let datas
  if (params.type === 'career_path') {
    datas = await Promise.all([
      get(`ts/v1/learn/general/course/grow_path/${params.id}`, {isServer: true}),
      get(`ts/v1/learn/general/course/grow_path/${params.id}/permission`, {isServer: true})
    ])
  } else {
    datas = await Promise.all([
      get(`v1/learn/course/${params.type === 'courses' ? 'opencourse' : 'challenges'}/${params.id}`, {isServer: true}),
      get(`ts/v1/learn/general/course/series/${params.id}/permission`, {isServer: true})
    ])
  }
  const [{ data }, { data: permission }] = [...datas]

  // console.log(data, 'data')

  return params.type !== 'career_path' ? (
    <>
      <PreviewAlert searchParams={searchParams} />
      <div className="mx-auto px-6 lg:flex max-w-[1400px] justify-center">
        <div className="flex flex-1 border-gray-400 pt-6 lg:border-r lg:pr-14">
          <div className="w-full">
            <div className="flex justify-between">
              <Back params={params} />
              <Share img={data?.base?.course_series_img} title={data?.base?.course_series_title} type={params.type} id={params.id} />
            </div>
            <Title data={data} />
            {params.type === 'challenges' && <ChallengesTags data={data} />}
            {data?.base?.course_series_summary && <Summary data={data} />}
            {data && <Author data={data} />}
            {data && <Tabs data={data} />}
            {data && <LearnInfo data={data} />}
            {data && data?.courses?.length > 0 && <Chapters type={params.type} data={data} id={data?.base?.course_series_id} />}
            <div className="h-6"></div>
            {data && data?.speaker?.length > 0 && <Speaker data={data?.speaker} />}
            <div className="h-[72px]"></div>
          </div>
        </div>
        <LearnRightCard data={data} type={params.type} permission={permission} />
      </div>
    </>
  ) : <GrowPath params={params} data={data} permission={permission} />
}
