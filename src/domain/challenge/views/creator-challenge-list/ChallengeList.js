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

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ContentEditable from 'react-contenteditable';

import { EyeIcon } from '@/components/icon/outlined';
import { HTMLDecode } from '@/utils';
import { formatTime } from '@/utils/date';

import { useConfig, useMediaUrl } from '#/state/application/hooks';

import CreatorButtonGroup from '../../../course/widgets/creator-button-group';
import CreatorStatusFieldCellWidget from '../../../course/widgets/creator-status-field-cell';
import CreatorUsersModalWidget from '../../../course/widgets/creator-users-modal';

function ChallengeList({ data, mutate, operation }) {
  const [openModal, setOpenModal] = useState(false);
  const [current, setCurrent] = useState();

  const config = useConfig();
  const mediaUrl = useMediaUrl();

  const resolveLabels = tagIds => {
    const filters = config?.find(f => f.config_id === 1)?.config_value.challenges;
    const allLabels = filters?.map(f => f.labels).flat(2);
    const _tags = tagIds?.map(s => allLabels?.find(f => f.id === Number(s)));
    return Array.from(new Set(_tags));
  };

  return (
    <div className="mt-6">
      <div className="mb-6 grid grid-cols-12 items-center gap-2 text-xs font-bold [&>*]:text-center">
        <p className="col-span-1">Banner</p>
        <p className="col-span-2">Title</p>
        <p className="col-span-3">Type</p>
        <p className="col-span-1">Registered</p>
        <p className="col-span-1">Fees</p>
        <p className="col-span-1">Status</p>
        <p className="col-span-3">Operation</p>
      </div>
      {data.map((i, k) => (
        <div key={`creator-learn-${k}`}>
          <div className="grid grid-cols-12 items-center gap-2 text-xs [&>*]:text-center">
            <div>
              {mediaUrl && i.base.course_series_img && (
                <Image width={90} height={50.63} className="rounded w-[90px] aspect-video object-cover" src={mediaUrl + i.base.course_series_img} alt="" />
              )}
              {i.base.course_series_img === '' && <div className="rounded w-[90px] aspect-video bg-gray-400 flex items-center justify-center text-gray-50">No image</div>}
            </div>

            <div className="col-span-2">
              <Link href={`/learn/challenges/${i.base.course_series_id}${i.base.course_series_status && '?mode=preview'}`}>
                <h3 className="mb-2 font-bold hover:underline">
                  <ContentEditable
                    html={HTMLDecode ? HTMLDecode(i.base.course_series_title) : ''} // innerHTML of the editable div
                    disabled={true}
                  />
                  {/* {i.base.course_series_title} */}
                </h3>
              </Link>
              <p className="text-sm opacity-80">
                {resolveLabels(i.base.course_series_label_ids).map(
                  t =>
                    t?.name && (
                      <span
                        key={`creator-list-tag-${t?.name}`}
                        className="mr-2 rounded-sm bg-gray-600 px-1 py-[2px] text-xs text-gray"
                      >
                        {t?.name}
                      </span>
                    )
                )}
              </p>
            </div>
            <div className="col-span-3">
              <p>{i.challenges_extra.course_challenges_extra_online ? 'Online' : 'Offline'}</p>
              <p>
                {formatTime(i.challenges_extra.course_challenges_extra_start_date * 1000, 'MMM D, YYYY HH:mm')} -{' '}
                {formatTime(i.challenges_extra.course_challenges_extra_end_date * 1000, 'MMM D, YYYY')}
              </p>
            </div>

            <p className="col-span-1 flex items-center justify-center">
              <strong>{i.base.course_series_learn_num}</strong>
              <EyeIcon
                onClick={() => {
                  setCurrent(i);
                  setOpenModal(true);
                }}
                className="ml-2 h-4 w-4 cursor-pointer"
              />
            </p>
            <p className="col-span-1 flex items-center justify-center">
              {i.challenges_extra.course_challenges_extra_feeds_type === 'free' && 'Free'}
              {i.challenges_extra.course_challenges_extra_feeds_type === 'pay' &&
                `$${i.challenges_extra.course_challenges_extra_feeds_amount}`}
              {i.challenges_extra.course_challenges_extra_feeds_type === 'deposit' && (
                <span className="flex items-center">
                  $ {i.challenges_extra.course_challenges_extra_feeds_amount}
                  {/* <LinkIcon
                    onClick={() =>
                      window.open(
                        `https://etherscan.io/address/${i.challenges_extra.course_challenges_extra_feeds_receive}`
                      )
                    }
                    className="ml-2 h-4 w-4"
                  /> */}
                </span>
              )}
            </p>
            <CreatorStatusFieldCellWidget status={i.base.course_series_status} />
            <CreatorButtonGroup type="challenges" status={i.base.course_series_status} id={i.base.course_series_id} loading={operation.operationLoading} mutate={mutate} />
          </div>
          <hr className="my-6 border-gray-400" />
        </div>
      ))}
      {current && (
        <CreatorUsersModalWidget
          challenges={current}
          type="challenges"
          id={current.base.course_series_id}
          open={openModal}
          closeModal={() => {
            setOpenModal(false);
            setCurrent(undefined);
          }}
        />
      )}
    </div>
  );
}

export default ChallengeList;
