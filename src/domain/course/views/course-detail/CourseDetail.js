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

import { OViewer } from '@/components/MarkDown';
import { HTMLDecode } from '@/utils';

import ChapterSection from './ChapterSection';
import CourseMeta from './CourseMeta';
import SectionNavBar from './SectionNavBar';
import SpeakerSection from './SpeakerSection';

function CourseDetailView({ params, data, actionBar, extraMeta }) {
  const learnType = params.type;

  return (
    <div className="w-full">
      {actionBar && <div className="flex justify-between">{actionBar}</div>}
      {data && (
        <>
          <h3 className="my-6 text-[36px] font-bold leading-9 md:text-[36px] md:leading-[48px]">
            <ContentEditable html={HTMLDecode(data?.base?.course_series_title)} disabled />
          </h3>
          {extraMeta}
          {data?.base?.course_series_summary && (
            <div className="mt-6 rounded text-base bg-[#f0f0f0] p-6">
              <ContentEditable html={HTMLDecode(data?.base?.course_series_summary)} disabled />
            </div>
          )}
          <CourseMeta data={data} />
          <SectionNavBar data={data} />
          <div id="learn-info" className="[&>div>a]:font-bold [&>div>a]:underline">
            <OViewer value={data?.base?.course_series_introduction} />
          </div>
          {data?.courses?.length > 0 && <ChapterSection type={learnType} data={data} id={data?.base?.course_series_id} />}
          <div className="h-6" />
          {data?.speaker?.length > 0 && <SpeakerSection data={data?.speaker} />}
          <div className="h-[72px]" />
        </>
      )}
    </div>
  );
}

export default CourseDetailView;
