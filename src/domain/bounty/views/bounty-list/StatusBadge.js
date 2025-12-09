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

const badgeList = [
  {
    label: 'Recruiting',
    emoji: '🧱',
    textColor: 'text-[#807DFB]',
    bgColor: 'bg-[#807DFB]',
    borderColor: 'border-[#807DFB]',
    isMatched: status => status === 3,
  },
  {
    label: 'Building',
    emoji: '🔫',
    textColor: 'text-[#00C475]',
    bgColor: 'bg-[#01DB83]',
    borderColor: 'border-[#01DB83]',
    isMatched: status => status > 6 && status < 24,
  },
  {
    label: 'Completed',
    emoji: '🔚',
    textColor: 'text-[#82ADD8]',
    bgColor: 'bg-[#82ADD8]',
    borderColor: 'border-[#82ADD8]',
    isMatched: status => status === 30,
  },
  {
    label: 'Termination',
    emoji: '🔚',
    textColor: 'text-[#82ADD8]',
    bgColor: 'bg-[#82ADD8]',
    borderColor: 'border-[#82ADD8]',
    isMatched: status => status === 24 || status === 20,
  },
];

function StatusBadge({ status }) {
  const badge = badgeList.find(({ isMatched }) => isMatched(status));

  return badge && (
    <div className={`inline-flex items-center gap-2 p-[3px] ${badge.bgColor} bg-opacity-10 rounded-full`}>
      <span className={`size-6 text-xs rounded-full text-center leading-[22px] border-1 ${badge.borderColor}`}>
        {badge.emoji}
      </span>
      <span className={`text-xs font-semibold ${badge.textColor} font-nunito leading-[12px] text-left pr-2`}>
        {badge.label}
      </span>
    </div>
  );
}

export default StatusBadge;
