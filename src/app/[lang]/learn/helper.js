/*
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

function resolveChapter(chapter, course) {
  if (!chapter || !course) {
    return { isLock: true }
  }

  if ((chapter.base.course_single_content || '').trim() === '') {
    return { ...chapter, isLock: true }
  }

  if (course?.challenges_extra?.course_challenges_extra_course_check && [1, 4].includes(course?.base?.course_series_status)) {
    return { ...chapter, isLock: true, isCheck: true }
  }

  return { ...chapter, isLock: false }
}

export { resolveChapter }
