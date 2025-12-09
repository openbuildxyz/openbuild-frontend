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

import { useSession } from 'next-auth/react';

import useInterval from '@/hooks/useInterval';

import { updateWatchProgress } from '#/domain/course/repository';

function PostTime({ id }) {
  const { status } = useSession();
  useInterval(() => status === 'authenticated' && updateWatchProgress(id), 10000);
  return <></>;
}

export default PostTime;
