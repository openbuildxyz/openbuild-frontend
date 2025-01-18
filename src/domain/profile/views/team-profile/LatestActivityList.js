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

import { formatTime } from '@/utils/date';

const typeTextMap = {
  open_course: 'Open Course',
  bounty: 'Bounty',
  challenges: 'Challanges',
  quiz: 'Quiz',
};

function LatestActivityList({ activities }) {
  return (
    <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-4 md:gap-4">
      {activities?.map(i => (
        <div
          key={`user-profile-activities-${i.created_at}`}
          className="border border-gray-600 p-6 rounded break-all relative"
        >
          {/* <Image className="absolute top-0 right-0" width={44} height={20} src={'/images/svg/profile-activities-new.svg'} alt="" /> */}
          {i.type !== '' && <p className="text-sm text-[#3AAB76]">{typeTextMap[i.type]}</p>}
          <h5 className="my-2">{i.title}</h5>
          <p className="text-sm opacity-80 truncate">Posted on {formatTime(i.created_at * 1000)}</p>
        </div>
      ))}
    </div>
  );
}

export default LatestActivityList;
