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

import { Share } from '@/components/Share';

import ChallengeDetailViewWidget from '#/domain/challenge/views/challenge-detail';
import CourseDetailViewWidget from '#/domain/course/views/course-detail';

import Back from './Back';
import LearnRightCard from './RightCard';

const viewWidgetMap = {
  courses: CourseDetailViewWidget,
  challenges: ChallengeDetailViewWidget,
};

function CourseDetailPage({ params, data, permission, related }) {
  const learnType = params.type;
  const DetailViewWidget = viewWidgetMap[learnType];

  if (!DetailViewWidget) {
    return null;
  }

  const actionBar = (
    <>
      <Back params={params} />
      <Share img={data?.base?.course_series_img} title={data?.base?.course_series_title} type={learnType} id={params.id} excerpt={data?.base?.course_series_summary}/>
    </>
  );

  return (
    <div className="mx-auto px-6 lg:flex max-w-[1400px] justify-center">
      <div className="flex flex-1 border-gray-400 pt-6 lg:border-r lg:pr-14">
        <DetailViewWidget params={params} data={data} actionBar={actionBar} />
      </div>
      <LearnRightCard data={data} type={learnType} permission={permission} related={related} />
    </div>
  );
}

export default CourseDetailPage;
