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

import Link from 'next/link';

import Avatar from '@/components/Avatar';
import { ArrowRightLineIcon } from '@/components/Icons';
import { fromNow } from '@/utils/date';

import StatusBadge from './StatusBadge';

// import { useConfig } from '#/state/application/hooks';


function BountyItem({ data }) {
  // const config = useConfig();
  // const filters = config?.find(f => f.config_id === 1)?.config_value['bounty'];
  // const ecosystem = filters?.find(f => f.name === 'Ecosystem')?.labels.find(f => f.id === data.ecosystem);

  // 根据状态确定顶部边框颜色
  const getBorderColor = status => {
    if (status === 3) return 'border-t-[#17C489]'; // Recruiting - 绿色
    if (status > 6 && status < 24) return 'border-t-[#D672EF]'; // Building - 紫色
    if (status === 30 || status === 24 || status === 20) return 'border-t-[#82ADD8]'; // Completed/Closed - 蓝色
    return 'border-t-[#D1D5DB]';
  };

  return (
    <Link
      href={`/bounties/${data.id}`}
      className={`
        group flex flex-col relative cursor-pointer overflow-hidden rounded-xl
        bg-white border border-[#E5E7EB] border-t-[3px] ${getBorderColor(data.status)}
        transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1
      `}
    >
      {/* 顶部状态标签区域 */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={data.status} />
          {/* 这里可以添加其他标签，如 Front-end, Part-time 等 */}
        </div>
      </div>

      {/* 标题和描述 */}
      <div className="px-6 pb-4 flex-1 min-h-[162px]">
        <h3 className="mb-2 text-[24px] font-extrabold line-clamp-2 leading-[26px]">
          {data.title}
        </h3>
        <p className="text-[16px] font-normal line-clamp-2 leading-[20px] opacity-80">
          {data.summary}
        </p>
      </div>

      {/* Bounty Amount */}
      <div className="px-6 py-6 border-t border-[#1a1a1a0f]">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold leading-[24px]">Bounty Amount</span>
          <span className="text-[20px] font-extrabold text-[#111827] leading-[24px]">${data.amount / 100}</span>
        </div>
      </div>

      {/* 底部发布者信息 */}
      <div className="p-6 border-t border-[#1a1a1a0f]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar size={24} user={data?.employer_user} />
            <div className="text-[14px] leading-[24px] truncate text-[#00000066]">
              <span className="text-gray">By {data.employer_user?.user_nick_name}</span>
              <span className="mx-1">·</span>
              <span>{fromNow(data.created_at * 1000)}</span>
            </div>
          </div>
          <ArrowRightLineIcon className="h-5 w-5 flex-shrink-0 -rotate-45" />
        </div>
      </div>
    </Link>
  );
}

export default BountyItem;
