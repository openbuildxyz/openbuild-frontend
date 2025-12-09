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

import clsx from 'clsx';
import Link from 'next/link';
import ContentEditable from 'react-contenteditable';

import { USDTIcon } from '@/components/Icons';
import { ArrowRightLineIcon } from '@/components/Icons';
import { HTMLDecode } from '@/utils';

import { CardTitleWidget } from '../../../course';
import DatePlaceWidget from '../../widgets/date-place';
import TagListWidget from '../../widgets/tag-list';

function ChallengeItem({ data }) {
  return (
    <Link
      href={`/learn/challenges/${data.base?.course_series_id}`}
      className="flex flex-col group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-lg md:shadow-none"
    >
      <CardTitleWidget
        img={data.base?.course_series_img}
        // online={data.challenges_extra.course_challenges_extra_online}
        data={data}
        showStatus
      />
      <TagListWidget className="flex-wrap px-6 mt-4" data={data} />
      <div className="border-b border-gray-400 px-6 pb-4 pt-2 flex-1">
        <h6 className="text-lg font-bold leading-6 line-clamp-2">
          <ContentEditable
            html={HTMLDecode ? HTMLDecode(data?.base?.course_series_title) : ''} // innerHTML of the editable div
            disabled={true}
          />
        </h6>
        <DatePlaceWidget data={data} />
      </div>
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-14">
          <div>
            <p className="text-sm font-bold">Fees</p>
            {data.challenges_extra.course_challenges_extra_feeds_type === 'free' && (
              <span className="text-sm">Free</span>
            )}
            {data.challenges_extra.course_challenges_extra_feeds_type === 'pay' ||
              (data.challenges_extra.course_challenges_extra_feeds_type === 'deposit' && (
                <div className="flex text-sm items-center">
                  <USDTIcon className="h-[14px] w-[14px]" />
                  <p
                    className={clsx('mx-1')}
                  >
                    {data.challenges_extra.course_challenges_extra_feeds_amount}
                    <span> USDT</span>
                  </p>
                </div>
              ))}
          </div>
          <div>
            <p className="text-sm font-bold">Builders</p>
            <p className="text-sm">{data.base.course_series_learn_num === 0 ? '--' : data.base.course_series_learn_num}</p>
          </div>
        </div>
        <div>
          <ArrowRightLineIcon className="h-6 w-6 rotate-[-45deg]" />
        </div>
      </div>
    </Link>
  );
}

export default ChallengeItem;
