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
    textColor: 'text-[#17C489]',
    bgColor: 'bg-[rgba(23,196,137,0.08)]',
    borderColor: 'border-[#17C489]',
    isMatched: status => status === 3,
  },
  {
    label: 'Building',
    textColor: 'text-[#D672EF]',
    bgColor: 'bg-[rgba(214,114,239,0.08)]',
    borderColor: 'border-[#D672EF]',
    isMatched: status => status > 6 && status < 24,
  },
  {
    label: 'Completed',
    textColor: 'text-[#82ADD8]',
    bgColor: 'bg-[rgba(130,173,216,0.08)]',
    borderColor: 'border-[#82ADD8]',
    isMatched: status => status === 30,
  },
  {
    label: 'Closed',
    textColor: 'text-[#82ADD8]',
    bgColor: 'bg-[rgba(130,173,216,0.08)]',
    borderColor: 'border-[#82ADD8]',
    isMatched: status => status === 24 || status === 20,
  },
];

function StatusBadge({ status }) {
  const badge = badgeList.find(({ isMatched }) => isMatched(status));

  return badge && (
    <span className={`inline-flex items-center px-2 py-1.5 rounded-[6px] text-xs leading-[12px] border ${badge.textColor} ${badge.bgColor} ${badge.borderColor}`}>
      {badge.label}
    </span>
  );
}

export default StatusBadge;
