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
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Select } from '@/components/Select'
import { useAllSkills, useConfig, useMediaUrl } from '#/state/application/hooks'
// import SelectSkills from '@/components/SelectSkills'
import { Button } from '@/components/Button'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { publishBounty, editBounty } from '#/services/creator'
import { ReactSelect } from '@/components/Select/ReactSelect'
import { OEditor } from '@/components/MarkDown'
import { BASE_INPUT_STYLE } from '@/constants/config'
import { get } from '@/utils/request'

const options = [
  {
    label: 'Fixed',
    value: 'fixed',
  },
]

const chatOptions = [
  {
    name: 'Email',
    key: 'email',
  },
  {
    name: 'Discord',
    key: 'discord',
  },
  {
    name: 'Telegram',
    key: 'telegram',
  },
  {
    name: 'Twitter',
    key: 'twitter',
  },
]

export default function Page({params: { id }}) {
  const router = useRouter()
  const config = useConfig()
  const mediaUrl = useMediaUrl()
  const allSkills = useAllSkills()

  const [ecosystem, setEcosystem] = useState('')
  const [skills, setSkills] = useState([])
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [detail, setDetail] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [chatProvide, setChatProvide] = useState('')
  const [chatHandle, setChatHandle] = useState('')
  const [skillsErr, setSkillsErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [bounty, setBounty] = useState()

  useEffect(() => {
    const getDetails = async () => {
      if (id !== 'publish') {
        const _data = await get(`ts/v1/build/general/bounties/${id}`, {isServer: false})
        setBounty(_data.data)
        console.log(_data)
        if (_data.code === 200) {
          const _b = _data.data
          setEcosystem(_b.ecosystem)
          setSkills(_b.skills)
          setTitle(_b.title)
          setSummary(_b.summary)
          setDetail(_b.detail)
          setType(_b.type)
          setAmount((_b.amount / 100).toString())
          setChatProvide(_b.chat_provide)
          setChatHandle(_b.chat_handle)
        }
      }
    }
    getDetails()
  }, [id])


  const labels = useMemo(() => {
    return config?.find(f => f.config_id === 1)
  }, [config])
  const ecosystemOpts = useMemo(() => {
    return labels?.config_value['bounty']?.map((i) => {
        return i.name === 'Ecosystem'
          ? i.labels.map((j) => ({ name: j.name, key: j.id, img: mediaUrl + j.img }))
          : []
      })
      .flat(2)
  }, [labels, mediaUrl])

  useEffect(() => {
    if (skills.length > 3) {
      setSkillsErr(true)
    } else {
      setSkillsErr(false)
    }
  }, [skills])

  const submit = async (submitType) => {
    if (title === '') {
      toast.error('Please enter title')
    }else if (summary === '') {
      toast.error('Please enter summary')
    }
    else if (detail === '') {
      toast.error('Please enter bounty details')
    }
    else if (ecosystem === '') {
      toast.error('Select a ecosystem')
    } else if (skillsErr) {
      toast.error('Select up to 3 items')
    } else if (skills.length === 0) {
      toast.error('Select skills')
    } else if(type === '') {
      toast.error('Select a Bounty type')
    } else if(amount === '') {
      toast.error('Enter bounty amount')
    } else if(chatProvide === '') {
      toast.error('Select a chat type')
    } else if(chatHandle === '') {
      toast.error('Please enter the chat URL')
    } else {
      if (submitType === 'save') {
        setSaving(true)
      } else {
        setLoading(true)
      }
      let res
      const params = {
        title,
        type,
        detail,
        ecosystem,
        summary,
        skills,
        amount: Number(amount) * 100,
        chat_provide: chatProvide,
        chat_handle: chatHandle
      }
      if (id === 'publish') {
        res = await publishBounty(params)
      } else {
        const _b = bounty ? bounty : null
        res = await editBounty(_b?.id, params)
      }
      setLoading(false)
      if (submitType === 'save') {
        setSaving(false)
        toast.success('Saving successful')
        return
      }
      if (res.code === 200) {
        router.push('/creator/build/bounty/')
      } else {
        toast.error(res.message)
      }
    }
  }


  return (
    <div className="flex-1 p-8">
      <h3 className="text-xl mb-6">Publish new Bounty</h3>
      <div>
        <h4>
          <label className="block text-sm leading-6">Title</label>
        </h4>
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={BASE_INPUT_STYLE}
          />
        </div>
      </div>
      <div className="mt-4">
        <h4>
          <label className="block text-sm leading-6">Summary</label>
        </h4>
        <div>
          <input
            type="text"
            name="title"
            value={summary}
            onChange={e => setSummary( e.target.value)}
            className={BASE_INPUT_STYLE}
          />
        </div>
      </div>
      <div className="mt-4">
        <h4>Bounty Detail</h4>
        <OEditor
          value={detail}
          onChange={(e) => setDetail(e)}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <h5>Ecosystem</h5>
          {ecosystemOpts && <Select options={ecosystemOpts} selected={ecosystem} change={setEcosystem} />}
        </div>
        <div className="col-span-2">
          <h5>Required Skills <span className={clsx('text-xs font-normal', {' opacity-60': !skillsErr, 'text-red': skillsErr}) }>Select up to 3 items </span></h5>
          <ReactSelect
            value={skills.map(i => allSkills?.find(f => f.value === i))}
            isMulti
            name="skills"
            options={allSkills}
            className="no-bg"
            onChange={e => {
              const _skills = e.map((i) => i.value)
              setSkills(_skills)
            }}
          />

          {/* <SelectSkills skills={skills} setSkills={setSkills} /> */}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h5 className="mr-3">Bounty Type</h5>
          <ReactSelect
            name="skills"
            value={options.find(f => f.value === type)}
            options={options}
            onChange={e => setType(e.value)}
            placeholder={'Select bounty type'}
            className="no-bg hauto"
          />
          {/* <Select className="w-full" options={options} selected={type} change={setType} /> */}
          <p className="text-xs opacity-60 mt-2">After completion and confirmation, the smart contract will be paid in full once, and the bounry amount needs to be deposited in the smart contract first.</p>
        </div>
        <div>
          <h5 className="mr-3">Bounty Amount</h5>
          <input
              type="text"
              name="title"
              placeholder="bounty amount you provide(USDT)"
              value={amount}
              onChange={e => {
                const val = e.target.value.replace(/[^\d]/g, '')
                setAmount(val)
              }}
              className={BASE_INPUT_STYLE}
            />
        </div>
      </div>

      <div className="mt-4">
        <h5 className="mr-3">Chat with me fisrt</h5>
        <div className="flex">
          <div className="w-[200px] mr-2">
            <Select options={chatOptions} selected={chatProvide} change={setChatProvide} />
          </div>
          <input
            type="text"
            name="title"
            placeholder={chatProvide === 'email' ? 'Please input your Email': `Please input your ${chatProvide} username`}
            value={chatHandle}
            onChange={e => setChatHandle(e.target.value)}
            className={`${BASE_INPUT_STYLE} !w-[280px]`}
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button  variant="outlined" className="mr-2">Cancel</Button>
        {id !== 'publish' && <Button loading={saving} onClick={() => submit('save')}  className="mr-2">Save</Button>}

        <Button loading={loading} onClick={() => submit()} >Submit to Review</Button>
      </div>
    </div>
  )
}
