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

// import { Content } from './Content'
import { get } from '@/utils/request'

import { Banner } from './Banner'
import InfoCard from './InfoCard'

export default async function UserProfileLayout({ params, children }) {
  const { data } = await get(`ts/v1/user/info/handle/${params.handle}`, {isServer: true})

  return (
    <>
      <Banner data={data} />
      <div className="relative max-w-[1440px] min-h-[620px] mx-auto p-6 bg-white md:p-0 md:bg-transparent">
        <InfoCard data={data} />
        <div className="pt-6">{children}</div>
      </div>
    </>
  )
}
