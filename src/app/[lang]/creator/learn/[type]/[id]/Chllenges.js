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



import range from 'lodash/range'
import { getTime } from '@/utils/date'
import clsx from 'clsx'

import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ReactSelect } from '@/components/Select/ReactSelect'
import { TIME_ZONE } from '@/constants/timezone'
import  { BASE_INPUT_STYLE } from '@/constants/config'
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { SelectCountry } from '../../../../profile/SelectCountry'

const RenderCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    className={`${BASE_INPUT_STYLE} !border-0 text-left flex justify-between items-center`}
    onClick={onClick}
    ref={ref}
  >
    <span className="flex-1">{value}</span>
    <CalendarDaysIcon className="h-5 w-5 mr-2" />
  </button>
))

const renderCustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <div className="my-3 flex justify-between" >
    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      <ChevronLeftIcon className="h-4 w-4" />
    </button>
    <select className="flex-1 text-center text-sm" value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
      {years.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <select
      className="flex-1 text-center text-sm"
      value={months[date.getMonth()]}
      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
    >
      {months.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      <ChevronRightIcon className="h-4 w-4" />
    </button>
  </div>
)
const years = range(new Date().getFullYear()-5, new Date().getFullYear() + 10)
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function ChllengesForms({forms, change}) {
  return (
    <div>
      <div className="mt-9">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-normal opacity-80">Type</h4>
          <div className="border border-[#D9D9D9] rounded p-1 pt-[5px] pb-[6px] items-center cursor-pointer">
            <span
              onClick={() => change('course_challenges_extra_online', true, 'challenges')}
              className={clsx('py-1 px-6 rounded text-sm', {
                'bg-gray text-white': forms?.course_challenges_extra_online
              })}
            >Online</span>
            <span
              onClick={() => change('course_challenges_extra_online', false, 'challenges')}
              className={clsx('py-1 px-6 rounded text-sm', {
                'bg-gray text-white': !forms?.course_challenges_extra_online
              })}
            >Offline</span>
          </div>
        </div>

        <div className="rounded mt-2 p-4 text-sm border border-[#D9D9D9]">
          {!forms?.course_challenges_extra_online && (
            <div>
              <div className="flex items-center gap-4">
                <div className="mb-2 flex-1">
                  <p className="text-sm mb-2 opacity-80">Address</p>
                  <SelectCountry
                    selected={forms?.course_challenges_extra_country}
                    setSelected={e => change('course_challenges_extra_country', e, 'challenges')}
                    placeholder="Select country"
                    className={clsx(BASE_INPUT_STYLE)}
                  />
                </div>
                <div className="mb-2 flex-1">
                  <p className="text-sm mb-2 opacity-80">City/State</p>
                  <input
                    type="text"
                    placeholder="address"
                    onChange={e => change('course_challenges_extra_city', e.target.value, 'challenges')}
                    value={forms?.course_challenges_extra_city}
                    className={BASE_INPUT_STYLE}
                  />
                </div>
              </div>
              <div className="mb-2">
                <p className="text-sm mb-2 opacity-80">Address</p>
                <input
                  type="text"
                  placeholder="address"
                  onChange={e => change('course_challenges_extra_offline_address', e.target.value, 'challenges')}
                  value={forms?.course_challenges_extra_offline_address}
                  className={BASE_INPUT_STYLE}
                />
              </div>
            </div>

          )}

          <div>
            <p className="text-sm mb-2 opacity-80">Time zone</p>
            <ReactSelect
              value={TIME_ZONE.find(f => f.value === forms?.course_challenges_extra_time_zone?.value) || null}
              name="time-zone"
              options={TIME_ZONE}
              className="no-bg menu-timezone z-20"
              onChange={e => change('course_challenges_extra_time_zone', e, 'challenges')}
            />
          </div>
          {forms && <div className="flex mt-4">
            <div className="flex-1">
              <p className="text-sm mb-2 opacity-80">Time Range</p>
              <div className="h-12 w-full rounded border border-gray-600 bg-transparent hover:border hover:border-gray transition-all [&>div]:w-full">
                <DatePicker
                  showTimeSelect
                  dateFormat="MMMM d, yyyy HH:mm"
                  selected={new Date(forms?.course_challenges_extra_start_date * 1000)}
                  onChange={date => change('course_challenges_extra_start_date', getTime(date), 'challenges')}
                  selectsStart
                  startDate={new Date(forms?.course_challenges_extra_start_date * 1000)}
                  endDate={new Date(forms?.course_challenges_extra_end_date * 1000)}
                  customInput={<RenderCustomInput />}
                  renderCustomHeader={renderCustomHeader}
                />

              </div>
            </div>
            <p className="text-sm mx-2 pt-[38px]">-</p>
            <div className="flex-1 [&>div]:w-full">
              <p className="text-sm mb-2 opacity-80">End Time</p>
              <div className=" h-12 w-full rounded border border-gray-600 bg-transparent hover:border hover:border-gray transition-all [&>div]:w-full">
                <DatePicker
                  showTimeSelect
                  dateFormat="MMMM d, yyyy HH:mm"
                  selected={new Date(forms?.course_challenges_extra_end_date * 1000)}
                  onChange={date => change('course_challenges_extra_end_date', getTime(date), 'challenges')}
                  selectsEnd
                  startDate={new Date(forms?.course_challenges_extra_start_date)}
                  endDate={new Date(forms?.course_challenges_extra_end_date * 1000)}
                  minDate={new Date(forms?.course_challenges_extra_start_date * 1000)}
                  customInput={<RenderCustomInput />}
                  renderCustomHeader={renderCustomHeader}
                />
              </div>
            </div>
          </div>}
        </div>
      </div>
      <div className="mt-9">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-normal opacity-80">Fees</h4>
          <div className="border border-[#D9D9D9] rounded py-[6px] px-1 items-center cursor-pointer">
            <span
              onClick={() => change('course_challenges_extra_feeds_type', 'free', 'challenges')}
              className={clsx('py-1 px-6 rounded text-sm', {
                'bg-gray text-white': forms?.course_challenges_extra_feeds_type === 'free'
              })}
            >Free</span>
            <span
              onClick={() => change('course_challenges_extra_feeds_type', 'pay', 'challenges')}
              className={clsx('py-1 px-6 rounded text-sm', {
                'bg-gray text-white': forms?.course_challenges_extra_feeds_type === 'pay'
              })}
            >Pay</span>
             <span
              onClick={() => change('course_challenges_extra_feeds_type', 'deposit', 'challenges')}
              className={clsx('py-1 px-6 rounded text-sm', {
                'bg-gray text-white': forms?.course_challenges_extra_feeds_type === 'deposit'
              })}
            >Deposit</span>
          </div>
        </div>
        {(forms?.course_challenges_extra_feeds_type === 'pay' ||
          forms?.course_challenges_extra_feeds_type === 'deposit') && (
          <div className="rounded mt-2 p-4 text-sm border border-[#D9D9D9]">
            <div>
              <p className="text-sm opacity-80 mb-2">Paid courses</p>
              <div className="flex bg-white h-12 w-full rounded border border-gray-600 bg-transparent hover:border hover:border-gray transition-all [&>div]:w-full">
                <span className="inline-block w-[46px] h-[46px] bg-[#F8F8F8] rounded-l opacity-60 text-center leading-[48px]">$</span>
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={forms?.course_challenges_extra_feeds_amount}
                  onChange={e => {
                    const val = e.target.value.replace(/[^\d]/g, '')
                    change('course_challenges_extra_feeds_amount', val, 'challenges')
                  }}
                  className={`${BASE_INPUT_STYLE} !border-0`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-9 flex justify-between">
        <div>
          <h4 className="text-sm font-normal opacity-80">Builders Registration Review</h4>
          <p className="text-xs font-normal text-gray-500 mt-2">Does Builders registration need to be reviewed</p>
        </div>
        <input
          type="checkbox"
          className="toggle publish-toggle"
          onChange={() => change('course_challenges_extra_builders_check', !forms?.course_challenges_extra_builders_check, 'challenges')}
          checked={forms?.course_challenges_extra_builders_check}
        />
      </div>
      <div className="mt-9 flex justify-between">
        <div>
          <h4 className="text-sm font-normal opacity-80">Do Builders need to be reviewed to view the course</h4>
        </div>
        <input
          type="checkbox"
          className="toggle publish-toggle"
          onChange={() => change('course_challenges_extra_course_check', !forms?.course_challenges_extra_course_check, 'challenges')}
          checked={forms?.course_challenges_extra_course_check}
        />
      </div>
    </div>
  )
}
