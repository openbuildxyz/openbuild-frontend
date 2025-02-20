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

import ContentEditable from 'react-contenteditable';

import { ClockIcon } from '@/components/icon/outlined';
import { HTMLDecode } from '@/utils';
import { formatTime } from '@/utils/date';

import { BuilderListWidget } from '../../../course';
import StepList from './StepList';

function RoadmapDetailView({ data, permission, actionBar, executeEnroll }) {
  return (
    <div className="">
      <div className="w-full bg-black text-white">
        <div className="mx-auto p-6 max-w-[1080px]">
          {actionBar && <div className="flex justify-between">{actionBar}</div>}
          <h3 className="my-6 text-[36px] font-bold leading-9 md:text-[36px] md:leading-[48px]">
            <ContentEditable html={HTMLDecode(data?.title)} disabled />
          </h3>
          <div className="flex items-center">
            <div className="flex items-center">
              <ClockIcon className="h-[18px] w-[18px] mr-2 text-base" />
              {formatTime(data?.created_at * 1000)}
            </div>
            <span className="opacity-40">｜</span>
            <BuilderListWidget
              className="justify-between py-6 !text-base"
              dataSource={data?.enrool_users}
              total={data?.builder_num}
              dataKeys={{ id: 'user_nick_name', avatar: 'user_avatar' }}
            >
              <p className="ml-2">{data?.builder_num} Builders</p>
            </BuilderListWidget>
          </div>
          <p>{data.info}</p>
        </div>
      </div>
      <div className="mx-auto p-6 max-w-[1080px]">
        <StepList data={data?.step_list} permission={permission} roadmapId={data.id} executeEnroll={executeEnroll} />
      </div>
    </div>
  );
}

export default RoadmapDetailView;
