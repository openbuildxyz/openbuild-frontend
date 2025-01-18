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

import soonIcon from 'public/images/svg/soon.svg';
import closedIcon from 'public/images/svg/closed.svg';
import ongoingIcon from 'public/images/svg/ongoing.svg';

export const bountyFilterList = [
  {
    name: 'Status',
    open: true,
    labels: [
      {
        img: soonIcon,
        name: 'Recruiting',
        key: '3',
      },
      {
        img: ongoingIcon,
        name: 'Building',
        key: '7',
      },
      {
        img: closedIcon,
        name: 'Completed',
        key: '30',
      },
    ],
  },
];
