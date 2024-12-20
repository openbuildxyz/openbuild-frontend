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

import { RepositioningIcon, TriangleIcon, InformationIcon } from '@/components/Icons'
import { Button } from '@/components/Button'
import Avatar from '@/components/Avatar'
import { Modal } from '@/components/Modal'
import { useState } from 'react'
import { baseInputStyles } from '#/styleds'
import { useAllSkills } from '#/state/application/hooks'
import { countries } from '#/lib/countries'
import { useDetailsPermission } from '#/services/shilling/hooks'
import { applyGetContact } from '#/services/shilling'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { toast } from 'react-toastify'
import { ReactSelect } from '@/components/Select/ReactSelect'
import { ContactModal } from '../ContactModal'
import { HireOnChainModal } from '../HireOnChainModal'
import { HireConfirmModal } from '../HireConfirmModal'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

export function Author({ data }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [hireOnChainModalOpen, setHireOnChainModalOpen] = useState(false)
  const [hireConfirmModalOpen, setHireConfirmModalOpen] = useState(false)

  const [cmOpen, setCMOpen] = useState(false)
  const [comment, setComment] = useState('')
  const { data: permission, doFetch } = useDetailsPermission(data?.uid)
  const [applyLoading, setApplyLoading] = useState(false)
  const [openToken, setOpenToken] = useState(false)
  const [token, setToken] = useState('')
  const skills = useAllSkills()
  const [selectSkills, setSelectSkills] = useState()
  const getContact = token => {
    setOpenToken(false)
    if (token) {
      setContactModalOpen(true)
      setToken(token)
    }
  }

  return (
    <div className="w-[320px] ml-14 pt-14 mb-9">
      <Avatar size={80} user={data?.skill_user} />
      <h6 className="my-3 text-2xl">
        <a href={`/u/${data?.skill_user?.user_handle}`}>{data?.skill_user.user_nick_name}</a>
      </h6>
      <div className="flex items-center">
        <RepositioningIcon className="mr-1" />
        <p className="text-sm opacity-60">
          {data?.skill_user.user_city}, {countries.find(f => f.code === data?.skill_user.user_country)?.name}
        </p>
      </div>
      {permission?.status === 1 && (
        <Button disabled fullWidth  className="my-6">
          Under review
        </Button>
      )}
      {permission?.status === -1 && (
        <Button disabled fullWidth  className="my-6">
          Deny
        </Button>
      )}
      {(permission?.status === 0 || permission?.status === 3 || !permission) && (
        <div className="my-6 grid grid-cols-2 gap-2">
          <Button

            onClick={() => {
              if (status === 'unauthenticated') {
                router.push(`/signin?from=${pathname}`)
                return
              }
              if (permission?.status === 3) {
                setCMOpen(true)
              } else {
                setOpenToken(true)
              }
            }}
          >
            Get Contact
          </Button>
          <Button  variant="outlined" onClick={() => {
            if (status === 'unauthenticated') {
              router.push(`/signin?from=${pathname}`)
              return
            }
              setHireOnChainModalOpen(true)}
          }>
            Hire on-chain
          </Button>
        </div>
      )}

      <div>
        <h5 className="mb-2 text-sm">About</h5>
        <p className="text-sm">{data?.skill_user.user_bio}</p>
        <hr className="my-6 border-gray-400" />
      </div>

      <div className="flex justify-between">
        <p className="text-[13px]">
          <span className="mr-1 inline-block h-[6px] w-[6px] rounded-full bg-green"></span>
          <span className="opacity-60">Contact got by</span> {data?.get_num} People
        </p>
        <p className="flex items-center">
          <TriangleIcon />
          <span className="ml-[6px] text-[13px] opacity-60">Report</span>
        </p>
      </div>
      <Modal
        title={'Get Contact'}
        isOpen={contactModalOpen}
        closeModal={() => setContactModalOpen(false)}
        mode={'base'}
      >
        <div>
          <div>
            <p className="mb-1 text-sm opacity-60">Choose the Skill you interested</p>
            <ReactSelect
              isMulti
              options={skills}
              onChange={e => {
                const _skills = e.map(i => i.value)
                setSelectSkills(_skills)
              }}
              className="react-select-container !min-h-12 border-0"
            />
          </div>
          <div className="mt-4">
            <p className="mb-1 text-sm opacity-60">The developer need you provide your introduction & demand</p>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              // formsError && forms.company === '' && 'border-red'
              className={baseInputStyles}
            />
          </div>
          <div className="mt-4 mb-6 rounded-lg bg-gray-1400 p-2">
            <p className="flex items-start text-sm">
              <InformationIcon className="mt-[2px]" />
              <span className="ml-2 opacity-40">I agree send my profie and contact information the employer</span>
            </p>
          </div>
          <Button
            loading={applyLoading}
            onClick={async () => {
              setApplyLoading(true)
              if (!data || !selectSkills) return
              const res = await applyGetContact(data.uid, comment, selectSkills, token)
              if (res.code === 200) {
                doFetch()
                setContactModalOpen(false)
              } else {
                toast.error(res.message)
              }
            }}
            fullWidth
            variant="contained"
            disabled={!selectSkills || selectSkills.length === 0 || comment === '' || !data}
          >
            Apply
          </Button>
        </div>
      </Modal>
      <ContactModal open={cmOpen} closeModal={() => setCMOpen(false)} permission={permission} />
      {openToken && <GoogleReCaptcha onVerify={token => getContact(token)} />}
      <HireOnChainModal
        id={data?.uid}
        data={data?.skill_datas}
        open={hireOnChainModalOpen}
        closeModal={() => setHireOnChainModalOpen(false)}
        callback={() => setHireConfirmModalOpen(true)}
      />
      <HireConfirmModal open={hireConfirmModalOpen} closeModal={() => setHireConfirmModalOpen(false)} />
    </div>
  )
}
