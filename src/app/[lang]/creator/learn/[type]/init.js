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

import { currentTime } from '@/utils/date'

export const InitForms = {
  course_series_title: '',
  course_series_img: '',
  course_series_label_ids: [],
  course_series_summary: '',
  course_series_requirement: [''],
  course_series_what_content: [''],
  course_series_introduction: '',
  course_series_id: null,
  course_series_discussion: [],
  course_series_type: ''
}

export const InitChallengesForms = {
  course_challenges_extra_online: true,
  course_challenges_extra_builders_check: true,
  course_challenges_extra_course_check: false,
  course_challenges_extra_end_date: currentTime(),
  course_challenges_extra_feeds_amount: 0,
  course_challenges_extra_feeds_receive: '',
  course_challenges_extra_feeds_type: 'free',
  course_challenges_extra_id: 0,
  course_challenges_extra_offline_address: '',
  course_challenges_extra_start_date: currentTime(),
  course_challenges_extra_time_zone: {
    'utc': [
        'Asia/Hong_Kong',
        'Asia/Macau',
        'Asia/Shanghai'
    ],
    'abbr': 'CST',
    'isdst': false,
    'label': '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
    'value': 'China Standard Time',
    'offset': 8
  }
}
