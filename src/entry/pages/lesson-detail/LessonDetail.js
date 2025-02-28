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

import Content from './Content';
import LessonList from './LessonList';
import PostTime from './PostTime';

function LessonDetailPage({ collection, data, lessonData }) {
  const courseId = data?.base?.course_series_id;
  const lessonId = lessonData?.base.course_single_id;

  return courseId && lessonId && (
    <div className="px-6 lg:flex">
      <LessonList courseLink={`${collection.link}/${courseId}`} data={data} singleId={lessonId} />
      <Content collection={collection} id={courseId} single={lessonData} menuData={data} />
      <PostTime id={lessonId} />
    </div>
  );
}

export default LessonDetailPage;
