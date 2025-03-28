/**
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

import { revalidatePathAction } from '#/app/actions';
import { fetchUser } from '#/domain/profile/repository';

import BannerWidget from './Banner';
import InfoCard from './InfoCard';

export default async function UserProfileLayout({ params, children }) {
  const { data } = await fetchUser(params.handle);

  return data ? (
    <>
      <BannerWidget data={data} onUpload={revalidatePathAction} />
      <div className="relative max-w-[1440px] min-h-[620px] mx-auto p-6 bg-white md:p-0 md:bg-transparent">
        <InfoCard className="md:absolute md:top-[-161px]" data={data} />
        <div className="pt-6">{children}</div>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center py-12">
      <div className="text-3xl font-bold text-gray-500">User not found</div>
    </div>
  );
}
