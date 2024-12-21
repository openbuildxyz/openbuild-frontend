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

import { Button } from '@/components/Button'
import { useEffect, useRef, useState } from 'react'
import { ProfileNav } from './Navs'
import Image from 'next/image'
import { SelectCountry } from './SelectCountry'
import { MySkill } from './MySkill'
import SocialSettingsFormView from '#/domain/profile/views/social-settings-form'
import { Setting } from './Setting'
import { ProfileTitle, ProfileLabel } from '#/styleds'
import { BASE_INPUT_STYLE } from '@/constants/config'
import { useUser } from '#/state/application/hooks'
import { postUserInfo } from '#/services/user'
import { upload } from '#/services/common'
import { useConfig } from '#/state/application/hooks'
import { classNames } from '@/utils'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import clsx from 'clsx'
import Switch from '@/components/Switch'

export default function Profile() {
  const info = useUser()
  const uploadRef = useRef(null)
  const config = useConfig()
  const [showSave, setShowSave] = useState(false)
  const [formsError, setFromError] = useState(false)
  const mediaUrl = config?.find(f => f.config_id === 2)
  const [uploading, setUploading] = useState(false)
  const [userAvatarLoaded, setUserAvatarLoaded] = useState(false)
  const [forms, setForms] = useState({
    showavatar: '',
    avatar: '',
    email: '',
    fullName: '',
    userHandle: '',
    country: '',
    city: '',
    bio: '',
    roles: null,
    skills: [],
    experience: null,
    company: '',
    resume: '',
    twitter: '',
    twitterVisible: false,
    discord: '',
    discordVisible: false,
    walletVisible: false,
    emailVisible: false,
    githubVisible: false,
  })

  useEffect(() => {
    if (info !== null) {
      const email = info.binds.find(f => f.auth_user_bind_type === 'email')
      setForms({
        showavatar: mediaUrl ? mediaUrl.config_value.url + info.base.user_avatar : '',
        avatar: info.base.user_avatar,
        email: email?.auth_user_bind_key || '',
        fullName: info.base.user_nick_name,
        userHandle: info.base.user_handle,
        country: info.base.user_country,
        city: info.base.user_city,
        bio: info.base.user_bio,
        roles: info.base.user_roles,
        skills: info.base.user_skills,
        experience: info.base.user_experience,
        company: info.base.user_company,
        resume: info.base.user_resume,
        twitter: info.base.user_x,
        twitterVisible: info.base.user_show_x,
        discord: info.base.user_discord,
        discordVisible: info.base.user_show_discord,
        walletVisible: info.base.user_show_wallet,
        emailVisible: info.base.user_show_email,
        githubVisible: info.base.user_show_github,
      })
    }
  }, [info, mediaUrl?.config_value.url, mediaUrl])

  const handleImageFileChange = event => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      if (file.size > 1024 * 1024 * 2) {
        toast.error('The file is too large')
        event.target.value = ''
        return
      }
      setUploading(true)
      const formData = new FormData()
      formData.append('file', files[0], files[0].name)
      formData.append('intent', 'avatar')
      upload({ file: formData })
        .then(res => {
          setUploading(false)
          const _forms = Object.assign({ ...forms }, {})
          _forms.showavatar = mediaUrl?.config_value.url + res.data.user_upload_path
          _forms.avatar = res.data.user_upload_path
          setForms(_forms)
          const current = uploadRef.current
          current.value = ''
        })
        .catch(() => {
          toast.error('Upload error')
          setUploading(false)
        })
    }
  }

  const changeForms = (type, value) => {
    const _forms = Object.assign({ ...forms }, {})
    _forms[type] = value
    setForms(_forms)
  }

  const save = async () => {
    if (
      forms.country === '' ||
      forms.city === '' ||
      forms.company === '' ||
      forms.fullName === '' ||
      forms.userHandle === '' ||
      forms.roles === null ||
      forms.skills === null ||
      forms.skills?.length === 0 ||
      forms.experience === 0
    ) {
      setFromError(true)
    } else {
      const res = await postUserInfo({
        user_avatar: forms.avatar,
        user_bio: forms.bio,
        user_city: forms.city,
        user_company: forms.company,
        user_country: forms.country,
        user_experience: forms.experience,
        user_handle: forms.userHandle,
        user_id: info?.base.user_id,
        user_nick_name: forms.fullName,
        user_resume: forms.resume,
        user_roles: forms.roles,
        user_skills: forms.skills,
        user_x: forms.twitter,
        user_show_x: forms.twitterVisible,
        user_discord: forms.discord,
        user_show_discord: forms.discordVisible,
        user_show_wallet: forms.walletVisible,
        user_show_email: forms.emailVisible,
        user_show_github: forms.githubVisible,
      })
      if (res.code === 200) {
        toast.success('Saved successfully')
        setShowSave(false)
        // doFetch()
      } else {
        toast.error(res.message)
      }
    }
  }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (info) {
      setLoading(false)
      if (
        forms.avatar !== info.base.user_avatar ||
        forms.bio !== info.base.user_bio ||
        forms.city !== info.base.user_city ||
        forms.company !== info.base.user_company ||
        forms.experience !== info.base.user_experience ||
        forms.country !== info.base.user_country ||
        forms.fullName !== info.base.user_nick_name ||
        forms.resume !== info.base.user_resume ||
        forms.roles !== info.base.user_roles ||
        forms.skills !== info.base.user_skills ||
        forms.userHandle !== info.base.user_handle ||
        forms.twitter !== info.base.user_x ||
        forms.twitterVisible !== info.base.user_show_x ||
        forms.discord !== info.base.user_discord ||
        forms.discordVisible !== info.base.user_show_discord ||
        forms.walletVisible !== info.base.user_show_wallet ||
        forms.emailVisible !== info.base.user_show_email ||
        forms.githubVisible !== info.base.user_show_github ||
        forms.country === ''
      ) {
        setShowSave(true)
      } else {
        setShowSave(false)
      }
    }
  }, [forms, info])

  return (
    <div className="flex flex-col md:flex-row min-h-screen px-4 pb-12 md:px-[67px]">
      {loading && <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-[999999999] bg-gray-1100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>}
      <ProfileNav />
      <div className="mb-14 mt-2 max-w-[736px] flex-1 md:pl-10">
        <div id="about">
          <ProfileTitle>About Me</ProfileTitle>
          <div className="mt-6">
            <ProfileLabel className="text-gray-50">Avatar</ProfileLabel>
            <div className="flex items-center">
              {!userAvatarLoaded && (
                <span className="mr-9 inline-block h-[96px] w-[96px] rounded-full bg-gray-400"></span>
              )}
              <Image
                width={96}
                height={96}
                className={clsx('mr-9 h-[96px] w-[96px] rounded-full', {
                  hidden: !userAvatarLoaded,
                })}
                src={forms.showavatar}
                alt=""
                onLoad={e => {
                  setTimeout(() => setUserAvatarLoaded(true), 1000)
                }}
              />

              <input
                className="hidden"
                ref={uploadRef}
                onChange={handleImageFileChange}
                accept="image/png, image/gif, image/jpeg, image/jpg,"
                id="upload-cover"
                type="file"
              />
              <div>
                <button className="mb-2 block h-9 w-[100px] rounded-full bg-gray-1200 text-sm hover:bg-[#e0e0e0]">
                  <label htmlFor="upload-cover" className="flex items-center justify-center">
                    {uploading && <Loader color={'#1a1a1a'} classname="mr-1" />}
                    <span className="cursor-pointer">Upload</span>
                  </label>
                </button>
                <span className="text-xs opacity-60">
                  Support PNG, JPG, or GIF, recommended size 400x400px, size within 2M
                </span>
              </div>
            </div>

            <ProfileLabel className="mt-9 text-gray-50 flex items-center justify-between">
              <span>E-mail</span>
              <Switch checked={forms.emailVisible} onChange={checked => changeForms('emailVisible', checked)} />
            </ProfileLabel>
            <input
              type="text"
              value={forms.email}
              readOnly
              // onChange={e => changeForms('email', e.target.value)}
              className={`${BASE_INPUT_STYLE}`}
            />
            <div>
              <ProfileLabel className="mt-9 flex justify-between text-gray-50">
                <span>
                  Full Name <span className="text-red">*</span>
                </span>
                <span className="text-xs opacity-80">{forms.fullName.length}/50</span>
              </ProfileLabel>
              <input
                type="text"
                value={forms.fullName}
                maxLength={50}
                onChange={e => changeForms('fullName', e.target.value)}
                className={classNames(BASE_INPUT_STYLE, formsError && forms.fullName === '' && 'border-red')}
              />
            </div>
            <ProfileLabel className="mt-9 text-gray-50">
              Username<span className="text-red"> *</span><span className="text-xs opacity-60"> (Allows input of uppercase and lowercase letters plus numbers and _-)</span>

            </ProfileLabel>
            <input
              type="text"
              value={forms.userHandle}
              onChange={e => {
                const pattern = /^([a-zA-Z0-9]([-_]?[a-zA-Z0-9])*)?$/
                const r = pattern.test(e.target.value)
                console.log(r)
                if (r) {
                  changeForms('userHandle', e.target.value)
                }

              }}
              placeholder={'Please enter your username'}
              className={classNames(BASE_INPUT_STYLE, formsError && forms.userHandle === '' && 'border-red')}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ProfileLabel className="mt-9 text-gray-50">
                  Country/Area <span className="text-red">*</span>
                </ProfileLabel>
                <SelectCountry
                  selected={forms.country}
                  setSelected={s => changeForms('country', s)}
                  placeholder="Select country"
                  className={classNames(BASE_INPUT_STYLE, formsError && forms.country === '' && 'border-red')}
                />
              </div>
              <div>
                <ProfileLabel className="mt-9 text-gray-50">
                  City/State <span className="text-red">*</span>
                </ProfileLabel>
                <input
                  type="text"
                  value={forms.city}
                  onChange={e => changeForms('city', e.target.value)}
                  className={classNames(BASE_INPUT_STYLE, formsError && forms.city === '' && 'border-red')}
                />
              </div>
            </div>
            <ProfileLabel className="mt-9 text-gray-50">Your Bio</ProfileLabel>
            <textarea
              value={forms.bio}
              onChange={e => changeForms('bio', e.target.value)}
              placeholder={'Brief description for your profile.'}
              className={classNames(BASE_INPUT_STYLE, 'h-14 pt-2 focus:!ring-0')}
            />
          </div>
        </div>
        <MySkill formsError={formsError} forms={forms} set={(type, val) => changeForms(type, val)} />
        <SocialSettingsFormView
          id="social"
          className="mt-14"
          binds={info?.binds}
          values={forms}
          onFieldChange={changeForms}
        />
        <Setting />
      </div>
      {showSave && (
        <div className="fixed bottom-0 left-0 flex h-[100px] w-full items-center justify-center bg-white">
          <Button variant="contained" onClick={save} className="h-[48px] w-[142px]">
            Save
          </Button>
        </div>
      )}
    </div>
  )
}
