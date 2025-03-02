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

import MyReputationListView from '#/domain/reputation/views/my-reputation-list';

export default function Page() {
  return (
    <div className="pb-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Achievements</h1>
      </div>
      <MyReputationListView />
    </div>
  );
}
