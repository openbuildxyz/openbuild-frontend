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

import { get } from '@/utils/request';

import ProjectPersonal from './ProjectPersonal';

export default async function UserProfile({ params }) {
  const config = { isServer: true };
  const { data } = await get(`ts/v1/user/info/handle/${params.handle}`, config);

  if (data?.social.user_wallet && data?.base.user_show_wallet) {
    data.web3Bio = await get(`https://api.web3.bio/profile/${data?.social.user_wallet}`, {
      ...config,
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_WEB3BIO,
      },
    });
  }
  return <ProjectPersonal data={data} />;
}
