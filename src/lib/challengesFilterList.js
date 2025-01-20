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

import freeIcon from 'public/images/svg/free.svg';
import depositIcon from 'public/images/svg/deposit.svg';
import paidIcon from 'public/images/svg/paid.svg';
import soonIcon from 'public/images/svg/soon.svg';
import closedIcon from 'public/images/svg/closed.svg';
import ongoingIcon from 'public/images/svg/ongoing.svg';

export const challengesFilterList = [
  {
    name: 'Fees',
    open: true,
    labels: [
      {
        img: freeIcon,
        name: 'Free',
        key: 'free',
      },
      {
        img: paidIcon,
        name: 'Paid',
        key: 'paid',
      },
      {
        img: depositIcon,
        name: 'Deposit',
        key: 'deposit',
      },
    ],
  },
  {
    name: 'Status',
    open: true,
    labels: [
      {
        img: soonIcon,
        name: 'Soon',
        key: 'soon',
      },
      {
        img: ongoingIcon,
        name: 'Ongoing',
        key: 'ongoing',
      },
      {
        img: closedIcon,
        name: 'Closed',
        key: 'closed',
      },
    ],
  },
];
