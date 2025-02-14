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

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

import { get } from '@/utils/request';

import { updateUser } from '#/state/application/reducer';
import { useAppDispatch } from '#/state/hooks';

export default function UserUpdater() {
  const dispatch = useAppDispatch();
  const { status } = useSession();
  useEffect(() => {
    const fetchUser = async () => {
      if (status === 'authenticated') {
        const data = await get('ts/v1/user/info');
        // console.log(data)
        // debugger
        if (data && data.code === 200) {
          dispatch(updateUser(data.data));
        } else if(data?.code === 401) {
          dispatch(updateUser(null));
          signOut();
        }
      }

    };
    fetchUser();

  }, [dispatch, status]);
  return null;
}
