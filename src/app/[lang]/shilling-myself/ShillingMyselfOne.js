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

import { useEffect, useMemo, useState } from 'react'
import { classNames } from '@/utils'
import { baseInputStyles } from '#/styleds'
import Switch from '@/components/Switch'
import { Button } from '@/components/Button'
import { AspectaIcon, SkillsWalletIcon } from '@/components/Icons'

import { useUser } from '#/state/application/hooks'
import { useDetails } from '#/services/shilling/hooks'
import { addSkillOne } from '#/services/shilling'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import { authWithAspecta } from '#/domain/auth/helper'
import SkillInsight from '#/domain/skill/widgets/skill-insight'

const SelfRecommendationMarkdown = dynamic(() => import('./SelfRecommendationMarkdown'), {
  ssr: false,
})

export function ShillingMyselfOne() {
  const router = useRouter()
  const user = useUser()
  const [githubSkillEnabled, setGithubSkillEnabled] = useState(false)
  const [chainbaseEnabled, setChainbaseEnabled] = useState(false)
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [rec, setRec] = useState('')
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [aspecta, setAspecta] = useState('')
  const { data } = useDetails(user?.base.user_id)

  const bindAspecta = useMemo(() => {
    return user?.binds.find(f => f.auth_user_bind_type === 'aspecta')
  }, [user])

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setBio(data.bio)
      setRec(data.rec)
      setAddress(data.onchain_address)
      setChainbaseEnabled(data.onchain_show)
      setGithubSkillEnabled(data.aspecta_show)
      setAspecta(data.aspecta)
    }
    if (user) {
      if (data?.bio === '') {
        setBio(user.base.user_bio)
      }
      if (data?.onchain_address === '') {
        const address = user?.binds.find(f => f.auth_user_bind_type === 'wallet')?.auth_user_bind_key
        address && setAddress(address)
      }
    }
  }, [data, user])

  const save = async () => {
    setLoading(true)
    if (title === '') {
      toast.error('Please enter a title')
      return
    }
    if (user?.base.user_id === undefined) return
    const res = await addSkillOne(user.base.user_id, {
      title,
      bio,
      rec,
      aspecta,
      aspecta_show: githubSkillEnabled,
      onchain_address: address,
      onchain_show: chainbaseEnabled,
    })
    setLoading(false)
    if (res.code === 200) {
      router.push('/shilling-myself?step=2')
    } else {
      toast.error(res.message)
    }
  }
  return (
    <>
      <div className="mb-9 flex items-center justify-between text-2xl">
        <h6>Shilling Myself</h6>
        <p className="text-base">
          1 / <span className="opacity-60">2</span>
        </p>
      </div>
      <div className="mb-9">
        <p className="mb-2 text-sm">Title</p>
        <input
          placeholder="Please input yourself in one word, for example: Senior Engineer proficient in Web3 development"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={50}
          className={classNames(baseInputStyles)}
        />
      </div>
      <div className="mb-9">
        <p className="mb-2 text-sm">Your Bio</p>
        <textarea
          placeholder={'Please summarize your core skills'}
          value={bio}
          onChange={e => setBio(e.target.value)}
          className={classNames(baseInputStyles, 'focus:!ring-0')}
        />
      </div>
      <div className="mb-9">
        <p className="mb-2 text-sm">Self-recommendation</p>
        <SelfRecommendationMarkdown value={rec} onChange={e => setRec(e)} />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm">Github Skill insight</p>
          <Switch checked={githubSkillEnabled} onChange={() => setGithubSkillEnabled(!githubSkillEnabled)} />
        </div>
        <div className="relative mb-9 rounded">
          <div className="absolute top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#3965BF]">
            <AspectaIcon />
          </div>
          <input
            type="text"
            readOnly
            value={`Connect to: ${bindAspecta !== undefined ? bindAspecta?.auth_user_bind_key : ''}`}
            className={classNames(baseInputStyles, 'pr-[210px] pl-12 !text-gray')} // "block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {bindAspecta === undefined && (
            <div className="absolute inset-y-0 right-1 flex items-center">
              <Button onClick={() => authWithAspecta('/shilling-myself')} variant="contained" className="h-9">
                Connect to Aspecta ID
              </Button>
            </div>
          )}
          {githubSkillEnabled && bindAspecta !== undefined && (
            <SkillInsight data={user?.base.user_extra_skills} hideHeader />
          )}
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm">OnChain Reputation</p>
          <Switch checked={chainbaseEnabled} onChange={() => setChainbaseEnabled(!chainbaseEnabled)} />
        </div>
        <div className="relative mb-9 rounded">
          <div className="absolute top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-black">
            <SkillsWalletIcon />
          </div>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className={classNames(baseInputStyles, 'pr-[210px] pl-12 !text-gray')} // "block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {/* <div className="absolute inset-y-0 right-1 flex items-center">
            <Button variant="contained" className="h-9" onClick={async () => {}}>
              Connect to Chainbase
            </Button>
          </div> */}
        </div>
      </div>
      <div
        style={{ boxShadow: '0px -4px 14px 0px #1A1A1A14' }}
        className="absolute left-0 mt-[72px] flex w-full justify-center py-[26px]"
      >
        <Button loading={loading} onClick={save} variant="contained" className="!h-12 w-[165px] text-sm font-bold">
          Save and Next
        </Button>
      </div>
    </>
  )
}
