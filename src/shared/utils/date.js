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

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import utc from 'dayjs/plugin/utc';
import BigNumber from 'bignumber.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(timezone);


dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: '1 minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years',
  },
});

export function ts() {
  return Math.round(Date.now() / 1000);
}
export function addZero(val) {
  if (val > 9) {
    return val;
  } else if (val === 0) {
    return 0;
  } else {
    return `0${val}`;
  }
}

export function millisecondFormat(surplus) {
  if (surplus === undefined) return '0 Min';
  const hour = Math.floor(new BigNumber(surplus).div(60 * 60).toNumber());

  surplus = Number(surplus) % (60 * 60);

  const minute = Math.floor(new BigNumber(surplus).div(60).toNumber());

  surplus = surplus % 60;

  if (hour > 0) {
    return `${hour}H ${minute}${minute > 1 ? 'Mins' : 'Min'}`;
  } else {
    return `${minute}${minute > 1 ? 'Mins' : 'Min'}`;
  }
}

export function messageDateFormat(date) {
  const _day = dayjs(date);
  if (_day.isToday()) {
    return `Today ${_day.format('HH:mm')}`;
  }
  if (_day.isYesterday()) {
    return `Yesterday ${_day.format('HH:mm')}`;
  }
  if (_day.year() !== dayjs(new Date()).year()) {
    return `${_day.format('YYYY-MM-DD HH:mm')}`;
  } else {
    return `${_day.format('MM-DD HH:mm')}`;
  }
}

export function formatTime(time, format) {
  const _f = format || 'MMM D, YYYY HH:mm';
  return dayjs(time).format(_f);
}

export function formatTimeMeridiem(time) {
  const hour = dayjs(time).hour();
  return hour < 12 ? 'AM' : 'PM';
}

// Func = locale.meridiem || function (hour, isLowercase) {
//   var m = hour < 12 ? 'AM' : 'PM';
//   return isLowercase ? m.toLowerCase() : m;
// }

export function currentTime() {
  return dayjs().unix();
}

export function utcOffsetTime(time, offset) {
  return dayjs(time).utcOffset(offset, true).valueOf();
  //.unix()
}

export function localTime() {
  return dayjs.utc().local().unix();
}

export function getTime(time) {
  return dayjs(time).unix();
}

export function fromNow(time) {
  return dayjs(time).fromNow();
}
export function fromUtcOffset() {
  // console.log(dayjs.tz)
  return dayjs().utcOffset() / 60;
}
