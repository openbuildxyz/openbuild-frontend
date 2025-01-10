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

const publishedTypes = [
  { key: 'open_course_num', text: 'Open Course' },
  { key: 'bounty_num', text: 'Bounty' },
  { key: 'challenge_num', text: 'Challange' },
  { key: 'quiz_num', text: 'Quiz' },
]

function PublishedCountList({ published }) {
  return published ? (
    <div>
      {publishedTypes.map((t, i) => (
        <p key={t.key} className={`${i === 0 ? 'mt-6' : 'mt-3'} flex justify-between text-sm`}>
          <span>{t.text}</span>
          <strong>{published[t.key]}</strong>
        </p>
      ))}
    </div>
  ) : null
}

export default PublishedCountList
