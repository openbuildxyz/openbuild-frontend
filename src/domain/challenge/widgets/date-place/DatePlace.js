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
import { useState } from 'react';

import { formatTime } from '@/utils/date';

import { countries } from '#/lib/countries';

import LocationIcon from './location.svg';
import TicketPic from './ticket.png';
import TicketDialog from './TicketDialog';
import TimeIcon from './time.svg';

function DatePlace({ data, showTicket = false }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="my-2 flex items-center justify-between">
        <div className="flex items-center">
          <Image src={TimeIcon} alt="" />
          <p className="text-sm opacity-60 ml-2">Time</p>
        </div>
        <div className="h-4">
          <p className="text-sm text-gray">
            {formatTime(data.challenges_extra.course_challenges_extra_start_date * 1000, 'YYYY/MM/DD')} -{' '}
            {formatTime(data.challenges_extra.course_challenges_extra_end_date * 1000, 'MM/DD')}
            {data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11) && <span className="text-xs h-4 py-[2px]">{data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11)}</span>}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-10">
        <div className="flex items-center">
          <Image src={LocationIcon} alt="" />
          <p className="text-sm opacity-60 ml-2">Location</p>
        </div>
        <p className="text-sm text-gray flex-1 text-right flex items-center justify-end gap-1">
          {
            data?.challenges_extra.course_challenges_extra_online ?
              'Online'
              :
              data?.challenges_extra.course_challenges_extra_country ?
                countries.find(f => f.code === data?.challenges_extra.course_challenges_extra_country)?.name
            + ', ' + data?.challenges_extra.course_challenges_extra_city : ''
          }
          {showTicket && <Image onClick={() => setOpen(true)} height={12} src={TicketPic} alt="" className="cursor-pointer" />}
        </p>
      </div>
      {showTicket && <TicketDialog data={data} open={open} onClose={() => setOpen(false)} />}
    </>
  );
}

export default DatePlace;
