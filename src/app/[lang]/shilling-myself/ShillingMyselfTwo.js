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

'use client'

import { classNames } from '@/utils'
import { baseInputStyles } from '#/styleds'
// import Switch from '@/components/Switch'
import { EditIcon, DeleteIcon } from '@/components/Icons'
import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/Button'
import { useConfig, useUser } from '#/state/application/hooks'
import { ReactSelect } from '@/components/Select/ReactSelect'
// import { DropdownIndicator, ClearIndicator } from '@/components/ReactSelectComponents'
import { useDashDetails } from '#/services/shilling/hooks'
import { addSkillTwo } from '#/services/shilling'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
export const Estimated = [
  {
    label: 'Months',
    value: 2,
  },
  {
    label: 'Days',
    value: 1,
  },
]
const times = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  },
  {
    label: '7',
    value: 7,
  },
  {
    label: '8',
    value: 8,
  },
  {
    label: '9',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
]

export function ShillingMyselfTwo() {
  const router = useRouter()
  const user = useUser()
  const [contactsVisible, setContactsVisible] = useState()
  const [resumeVisible, setResumeVisible] = useState()

  const [emailReadonly, setEmailReadonly] = useState(true)
  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const [loading, setLoading] = useState(false)
  const config = useConfig()
  const [editShow, setEditShow] = useState(false)
  const [usageTime, setUsageTime] = useState()
  const [skillList, setSkillList] = useState([])
  const [editKey, setEditKey] = useState(null)
  const [skill, setSkill] = useState()
  const [skillLevel, setSkillLevel] = useState('')
  const { data } = useDashDetails(user?.base.user_id)
  const [estimatedType, setEstimatedType] = useState(Estimated[0])
  const [costMin, setCostMin] = useState()
  const [costMax, setCostMax] = useState()
  // const [defaultSkillIndex, setDefaultSkillIndex] = useState<number | undefined>()
  // const [defaultTimeIndex, setDefaultTimeIndex] = useState<number | undefined>()

  useEffect(() => {
    if (data) {
      setEmail(data.email)
      setTelegram(data.telegram)
      setDiscord(data.discord)
      setSkillList(data.skill_datas)
      setContactsVisible(
        data.contacts_show ? { label: 'Don\'t need my approval', value: 2 } : { label: 'Requires my approval', value: 1 }
      )
      setResumeVisible(
        data.resume_show ? { label: 'Show with contacts', value: 1 } : { label: 'Do not show contacts', value: 2 }
      )
    }
    if (!data || data.email === '') {
      const bindEmail = user?.binds.find(f => f.auth_user_bind_type === 'email')
      if (bindEmail) {
        setEmail(bindEmail?.auth_user_bind_key)
      }
    }
  }, [user, data])
  const opts = useMemo(() => {
    return config
      ?.find(f => f.config_id === 3)
      ?.config_value.skills?.map(i => {
        return {
          value: i.id,
          label: i.name,
        }
      })
  }, [config])
  const save = async () => {
    setLoading(true)
    if (user?.base.user_id === undefined) return
    const res = await addSkillTwo(user?.base.user_id, {
      email,
      telegram,
      discord,
      contacts_show: contactsVisible.value === 1 ? false : true,
      resume_show: resumeVisible === 1 ? true : false,
      skills: skillList,
    })
    if (res.code === 200) {
      router.push(`/shilling/${user?.base.user_id}`)
    } else {
      toast.error(res.message)
    }
  }

  const saveAndUpdate = () => {
    if (!skill) {
      toast.error('Please select a skill')
    } else if (!usageTime) {
      toast.error('Please select usage time')
    } else if (skillLevel === '') {
      toast.error('Please select skill level')
    } else if (costMin === '' || !costMin || costMax === '' || !costMax) {
      toast.error('Please enter estimated cost')
    } else {
      const skillarr = [...skillList]
      const rate = estimatedType.value === 2 ? 22 * 8 : 8
      const _minHour = (Number(costMin) / rate).toString()
      const _maxHour = (Number(costMax) / rate).toString()
      const _obj = {
        skill: skill.value,
        level: skillLevel,
        time: usageTime.value,
        cost_min: _minHour,
        cost_max: _maxHour,
        cost_show_type: estimatedType.value,
        cost_coin_id: 1,
      }
      if (editKey === null) {
        skillarr.push(_obj)
      } else {
        skillarr[editKey] = _obj
      }
      setSkillList(skillarr)
      setEditShow(false)
      setEditKey(null)
    }
  }

  useEffect(() => {
    if (editShow && editKey !== null) {
      const _item = skillList[editKey]
      const _skill = opts?.find(f => f.value === _item.skill)
      setSkill(_skill)
      const _time = times.find(f => f.value === _item.time)
      setUsageTime(_time)
      setSkillLevel(_item.level)
      // setEstimatedType(Estimated.find(f => f.value === _item.cost_show_type))
      setCostMin(
        estimatedType.value === 1
          ? (Number(_item.cost_min) * 8).toString()
          : (Number(_item.cost_min) * 22 * 8).toString()
      )
      setCostMax(
        estimatedType.value === 1
          ? (Number(_item.cost_max) * 8).toString()
          : (Number(_item.cost_max) * 22 * 8).toString()
      )
    }
  }, [editShow, editKey, skillList, opts, estimatedType])
  return (
    <>
      <div className="mb-9 flex items-center justify-between text-2xl">
        <h6>My Contacts and Resume</h6>
        <p className="text-base">
          2 / <span className="opacity-60">2</span>
        </p>
      </div>
      <div className="mb-9">
        <p className="mb-2 text-sm">Email</p>
        <div className="relative">
          <input
            readOnly={emailReadonly}
            autoFocus={emailReadonly}
            type="text"
            value={email}
            maxLength={50}
            onBlur={() => setEmailReadonly(true)}
            className={classNames(baseInputStyles)}
          />
          <EditIcon onClick={() => setEmailReadonly(false)} className="absolute top-4 right-6 cursor-pointer" />
        </div>
      </div>
      <div className="mb-9 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-sm">
            Telegram<span className="opacity-60">（Optional）</span>
          </p>
          <input
            placeholder="Please enter a username"
            type="text"
            value={telegram}
            onChange={e => setTelegram(e.target.value)}
            maxLength={50}
            className={classNames(baseInputStyles)}
          />
        </div>
        <div>
          <p className="mb-2 text-sm">
            Discord<span className="opacity-60">（Optional）</span>
          </p>
          <input
            placeholder="Please enter a username"
            type="text"
            value={discord}
            onChange={e => setDiscord(e.target.value)}
            maxLength={50}
            className={classNames(baseInputStyles)}
          />
        </div>
      </div>
      <div className="mb-9 grid grid-cols-2 gap-4">
        <div className="">
          <p className="mb-2 text-sm">Contacts Visible</p>
          <ReactSelect
            value={contactsVisible}
            className="showDropdownIndicator w-full"
            onChange={e => setContactsVisible(e)}
            options={[
              { label: 'Requires my approval', value: 1 },
              { label: 'Don\'t need my approval', value: 2 },
            ]}
          />
          {/* <Switch checked={contactsVisible} onChange={() => setContactsVisible(!contactsVisible)} /> */}
        </div>
        <div className="">
          <p className="mb-2 text-sm">Resume Visible</p>
          {/* <Switch checked={resumeVisible} onChange={() => setResumeVisible(!resumeVisible)} /> */}
          <ReactSelect
            value={resumeVisible}
            className="showDropdownIndicator w-full"
            onChange={e => setResumeVisible(e)}
            options={[
              { label: 'Show with contacts', value: 1 },
              { label: 'Do not show contacts', value: 2 },
            ]}
          />
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm">My Skills</p>
        <span
          onClick={() => {
            setEditShow(true)
            setEditKey(null)
            setSkillLevel('')
            setUsageTime(undefined)
            setSkill(undefined)
            setCostMin('')
            setCostMax('')
            setEstimatedType(Estimated[0])
          }}
          className="cursor-pointer rounded-md bg-gray-300 px-5 py-1 text-xs hover:opacity-80"
        >
          + Add
        </span>
      </div>
      <hr className="my-2 border-gray-400" />
      {editShow && (
        <div className="ml-[-3.5rem] w-[800px]">
          <div className="mb-6 bg-[#F3F3F3] px-14 py-4">
            <div className="flex">
              <div className="mr-4 flex-1">
                <p className="mb-2 text-sm">Skill</p>

                {opts && (
                  <ReactSelect
                    value={skill}
                    className="react-select-container"
                    options={opts}
                    onChange={e => setSkill(e)}
                    styles={{
                      control: base => ({
                        ...base,
                        boxShadow: 'none',
                      }),
                    }}
                  />
                )}
              </div>
              <div>
                <p className="mb-2 text-sm"> Usage time (Y)</p>
                <ReactSelect
                  value={usageTime}
                  className="showDropdownIndicator w-[160px]"
                  onChange={e => setUsageTime(e)}
                  options={times}
                />
                {/* <input
                  placeholder="Please enter Usage time"
                  type="text"
                  value={usageTime}
                  maxLength={50}
                  onChange={e => setUsageTime(e.target.value)}
                  className={classNames(baseInputStyles, '!bg-white')}
                /> */}
              </div>
            </div>
            <p className="mb-2 mt-4 text-sm">Estimated cost</p>
            <div className="flex items-center">
              <div className="flex items-center">
                <input
                  placeholder="0.0"
                  type="text"
                  value={costMin}
                  onChange={e => {
                    const val = e.target.value.replace(/[^\d]/g, '')
                    setCostMin(val)
                  }}
                  maxLength={50}
                  className={classNames(baseInputStyles, 'w-[160px] !bg-white')}
                />
                <span className="mx-3 opacity-80">-</span>
                <input
                  placeholder="0.0"
                  type="text"
                  value={costMax}
                  onChange={e => {
                    const val = e.target.value.replace(/[^\d]/g, '')
                    setCostMax(val)
                  }}
                  maxLength={50}
                  className={classNames(baseInputStyles, 'w-[160px] !bg-white')}
                />
              </div>
              <div className="flex items-center text-sm opacity-60">
                <span className="ml-7">$&nbsp;&nbsp;/</span>
                <ReactSelect
                  value={estimatedType}
                  placeholder="Monthly"
                  className="react-select-noborder no-bg showDropdownIndicator w-[110px] bg-transparent"
                  onChange={e => setEstimatedType(e)}
                  options={Estimated}
                />
              </div>
            </div>

            <p className="mb-2 mt-4 text-sm">Skill level</p>
            <div className="mt-3 flex items-center">
              <div className="mr-10 flex items-center gap-x-2">
                <input
                  id="myself-generally"
                  name="myself-radio"
                  type="radio"
                  value="generally"
                  className="h-4 w-4 text-gray !ring-transparent !ring-offset-0 checked:bg-[length:12px_12px] hover:border-gray"
                  onChange={e => setSkillLevel(e.target.value)}
                  checked={skillLevel === 'generally'}
                />
                <label htmlFor="myself-generally" className="block text-sm leading-6 ">
                  Generally
                </label>
              </div>
              <div className="mr-10 flex items-center gap-x-2">
                <input
                  id="myself-well"
                  name="myself-radio"
                  type="radio"
                  value="well"
                  className="h-4 w-4 text-gray !ring-transparent !ring-offset-0 checked:bg-[length:12px_12px] hover:border-gray"
                  onChange={e => setSkillLevel(e.target.value)}
                  checked={skillLevel === 'well'}
                />
                <label htmlFor="myself-well" className="block text-sm leading-6 ">
                  Well
                </label>
              </div>
              <div className="mr-10 flex items-center gap-x-2">
                <input
                  id="myself-proficient"
                  name="myself-radio"
                  type="radio"
                  className="h-4 w-4 text-gray !ring-transparent !ring-offset-0 checked:bg-[length:12px_12px] hover:border-gray"
                  onChange={e => setSkillLevel(e.target.value)}
                  value="proficient"
                  checked={skillLevel === 'proficient'}
                />
                <label htmlFor="myself-proficient" className="block text-sm leading-6 ">
                  Proficient
                </label>
              </div>
              <div className="mr-10 flex items-center gap-x-2">
                <input
                  id="myself-skilled"
                  name="myself-radio"
                  type="radio"
                  className="h-4 w-4 text-gray !ring-transparent !ring-offset-0 checked:bg-[length:12px_12px] hover:border-gray"
                  onChange={e => setSkillLevel(e.target.value)}
                  value="skilled"
                  checked={skillLevel === 'skilled'}
                />
                <label htmlFor="myself-skilled" className="block text-sm leading-6 ">
                  Skilled
                </label>
              </div>
            </div>
            <div className="mt-4 flex justify-start">
              <Button onClick={() => setEditShow(false)} variant="outlined" className="mr-2 !h-10 w-[142px]">
                Cancel
              </Button>
              <Button onClick={saveAndUpdate} variant="contained" className="!h-10 w-[142px]">
                Save and Update
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="ml-[-5%] w-[110%]">
        <ul className="mb-2 mt-6 grid grid-cols-6 gap-4 pl-[5%] text-xs opacity-60">
          <li>Skills</li>
          <li>Skill level</li>
          <li>Usage time (Y)</li>
          <li className="col-span-2">Estimated cost</li>
        </ul>
        <div>
          {skillList.map((i, k) => (
            <ul
              key={`edit-skill-${k}`}
              className="group mb-2 grid h-10 grid-cols-6 items-center gap-4 rounded-xl pl-[5%] text-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            >
              <li>{opts?.find(f => f.value === i.skill)?.label}</li>
              <li className="capitalize">{i.level}</li>
              <li>{i.time}</li>
              <li className="col-span-2">
                ${Number(i.cost_min).toFixed(2)}-${Number(i.cost_max).toFixed(2)} / Hourly
              </li>
              <li className="hidden justify-center group-hover:flex">
                <span
                  onClick={() => {
                    const skillarr = Object.assign([...skillList], [])
                    skillarr.splice(k, 1)
                    setSkillList(skillarr)
                  }}
                  className="flex cursor-pointer items-center text-green"
                >
                  <DeleteIcon className="mr-1" />
                </span>
                <span
                  onClick={() => {
                    setEditKey(k)
                    setEditShow(true)
                  }}
                  className="ml-4 flex cursor-pointer items-center"
                >
                  <EditIcon className="mr-1" />
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div
        style={{ boxShadow: '0px -4px 14px 0px #1A1A1A14' }}
        className="absolute left-0 mt-[72px] flex w-full justify-center py-[26px]"
      >
        <Button
          disabled={!contactsVisible?.value || !resumeVisible?.value}
          loading={loading}
          onClick={save}
          variant="contained"
          className="!h-12 w-[142px] text-sm font-bold"
        >
          Save
        </Button>
      </div>
    </>
  )
}
