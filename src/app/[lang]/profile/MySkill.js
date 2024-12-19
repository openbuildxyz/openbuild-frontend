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

import { ProfileTitle, ProfileLable } from '#/styleds'
import { Select } from '@/components/Select'
import { useState, useMemo, useRef } from 'react'
import { UploadIcon } from '@/components/Icons'
import { useAllSkills, useConfig } from '#/state/application/hooks'
// import { Transition } from '@headlessui/react'
// import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { BASE_INPUT_STYLE } from '@/constants/config'
import { classNames } from '@/utils'
import { upload } from '#/services/common'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import { EXPERIENCE_OPTIONS } from '#/lib/user'
import clsx from 'clsx'
import { Button } from '@/components/Button'

import { ReactSelect } from '@/components/Select/ReactSelect'

export function MySkill({ forms, set, formsError }) {
  const allSkills = useAllSkills()

  // const [openSkills, setOpenSkills] = useState(false)
  // const [skillsInputValue, setSkillsInputValue] = useState('')
  // // const [delFlag, setDelFlag] = useState(0)
  // const [searchSkillOpts, setSearchSkillOpts] = useState<
  //   {
  //     key: number
  //     name: string
  //   }[]
  // >([])
  const [uploading, setUploading] = useState(false)
  const [uploadFileSizeError, setUploadFileSizeError] = useState(false)
  const uploadRef = useRef(null)
  const config = useConfig()
  const mediaUrl = config?.find(f => f.config_id === 2)?.config_value.url
  const allOpts = config?.find(f => f.config_id === 3)?.config_value

  const rolesOpts = useMemo(() => {
    return allOpts?.roles?.map(i => ({
      key: i.id,
      name: i.name,
    }))
  }, [allOpts])

  // const skillOpts = useMemo(() => {
  //   return allOpts?.skills?.map(i => ({
  //     key: i.id,
  //     name: i.name,
  //   }))
  // }, [allOpts])

  // useEffect(() => {
  //   if (skillOpts) {
  //     const _search = skillOpts.filter(f => f.name.toLocaleLowerCase().includes(skillsInputValue.toLocaleLowerCase()))
  //     setSearchSkillOpts(_search)
  //   }
  // }, [skillsInputValue, skillOpts])

  const handleFileChange = event => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      setUploadFileSizeError(false)
      if (file.size > 1024 * 1024 * 10) {
        event.target.value = ''
        setUploadFileSizeError(true)
        return
      }
      setUploading(true)
      const formData = new FormData()
      formData.append('file', files[0], files[0].name)
      formData.append('intent', 'resume')
      upload({ file: formData })
        .then(res => {
          setUploading(false)
          set('resume', res.data.user_upload_path)
          const current = uploadRef.current
          current.value = ''
        })
        .catch(() => {
          toast.error('Upload error')
          setUploading(false)
        })
    }
  }

  return (
    <div id="skill" className="mt-14">
      <ProfileTitle>My Skill</ProfileTitle>
      <div>
        <ProfileLable className="mt-9 text-gray-50">
          Role <span className="text-red">*</span>
        </ProfileLable>
        {rolesOpts && (
          <Select
            placeholder="Select your role"
            options={rolesOpts}
            selected={forms.roles}
            className={classNames('h-10', formsError && forms.roles === null && 'border-red')}
            change={e => set('roles', e)}
          />
        )}

        <ProfileLable className="mt-9 text-gray-50">
          Skills <span className="text-red">*</span>
        </ProfileLable>
        <ReactSelect
          value={forms.skills.map(i => allSkills?.find(f => f.value === i))}
          isMulti
          name="skills"
          options={allSkills}
          className="no-bg"
          styles={{
            control: () => ({
              height: 'auto !important',
              minHeight: '40px'
            })
          }}
          onChange={e => {
            const _skills = e.map(i => i.value)
            set('skills', _skills)
          }}
        />
        {/* <div className="relative">
          <div
            className={classNames(
              'relative flex w-full items-center overflow-x-auto rounded border border-gray-600 bg-transparent px-2 text-sm text-gray-1300',
              formsError && (forms.skills === null || forms.skills?.length === 0) && 'border-red'
            )}
          >
            {forms.skills?.map((i, k) => {
              const finded = skillOpts?.find(f => f.key === i)
              return (
                finded && (
                  <div
                    key={`user-skill-${i}`}
                    className="mr-2 flex items-center whitespace-nowrap rounded-md bg-gray-400 px-2 py-[3px] text-gray"
                  >
                    {finded?.name}
                    <XMarkIcon
                      onClick={() => {
                        const _sk = [...forms.skills]
                        set('skills', arrRemove(_sk, i))
                      }}
                      className="ml-3 h-4 w-4 cursor-pointer text-gray-50"
                    />
                  </div>
                )
              )
            })}
            <input
              type="text"
              onBlur={() => setOpenSkills(false)}
              onFocus={() => setOpenSkills(true)}
              value={skillsInputValue}
              onChange={e => {
                // if (e.target.value === '') {
                //   setDelFlag(1)
                // } else {
                //   setDelFlag(0)
                // }
                setSkillsInputValue(e.target.value)
              }}
              // onKeyUp={e => {
              //   console.log(delFlag > 0)
              //   setTimeout(() => {
              //     if (e.key === 'Backspace' && skillsInputValue === '' && delFlag > 0) {
              //       const _sk = [...forms.skills]
              //       if (_sk.length > 0) {
              //         _sk.length = _sk.length - 1
              //         set('skills', _sk)
              //       }
              //     }
              //   }, 1000)
              // }}
              className={classNames(BASE_INPUT_STYLE, 'border-0')}
            />
          </div>
          <Transition
            as={Fragment}
            show={openSkills}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute top-0 left-0 z-50 mt-[50px] max-h-60 w-full overflow-auto rounded-2xl bg-white py-4 px-3 shadow-lg">
              {searchSkillOpts &&
                searchSkillOpts.map((o, oIdx) => (
                  <div
                    key={oIdx}
                    className={
                      'relative cursor-default select-none rounded py-2 px-4 text-sm leading-6 hover:bg-gray-900 hover:text-gray'
                    }
                    onClick={() => {
                      // console.log(forms.skills)
                      const _skills = forms.skills === null ? [] : [...forms.skills]
                      _skills.push(o.key)
                      const _setSkills = Array.from(new Set(_skills))
                      set('skills', _setSkills)
                      setSkillsInputValue('')
                    }}
                  >
                    <div className="flex">
                      <span className={`block flex-1 truncate`}>{o.name}</span>
                      {forms.skills?.filter(f => f === o.key).length > 0 ? (
                        <span className="flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              {searchSkillOpts.length === 0 && <div className="text-center">No items</div>}
            </div>
          </Transition>
        </div> */}

        <p className="mt-2 text-xs opacity-40">Press enter after typing a skill</p>
        <div className="flex">
          <div className="mr-4 flex-1">
            <ProfileLable className="mt-9 text-gray-50">
              Experience <span className="text-red">*</span>
            </ProfileLable>
            {EXPERIENCE_OPTIONS && (
              <Select
                placeholder="Select your experience"
                options={EXPERIENCE_OPTIONS}
                selected={forms.experience}
                change={e => set('experience', e)}
                className={classNames('h-10', formsError && forms.experience === 0 && 'border-red')}
              />
            )}
          </div>
          <div className="flex-1">
            <ProfileLable className="mt-9 text-gray-50">
              Company <span className="text-red">*</span>
            </ProfileLable>
            <input
              value={forms.company}
              type="text"
              onChange={e => set('company', e.target.value)}
              className={classNames(BASE_INPUT_STYLE, formsError && forms.company === '' && 'border-red')}
            />
          </div>
        </div>

        <ProfileLable className="mt-9 text-gray-50">Resume</ProfileLable>
        <div className="group relative w-fit">
          <input
            className="hidden"
            ref={uploadRef}
            onChange={handleFileChange}
            accept=".pdf"
            id="upload-resume"
            type="file"
          />
          <label htmlFor="upload-resume" className="relative h-[158px] w-[320px]">
            <div
              className={clsx(
                'flex w-[320px] cursor-pointer items-center justify-between rounded border border-dashed  p-4 ',
                {
                  'h-[158px]': forms.resume === '',
                  'h-[88px]': forms.resume !== '',
                  'border-[#D9D9D9]': !uploadFileSizeError,
                  'border-[#E43150] bg-[rgba(228,49,80,0.02)]': uploadFileSizeError,
                  'bg-[#F3F3F3] hover:border-gray-100 hover:bg-[#EFEFEF]': forms.resume === '' && !uploadFileSizeError,
                }
              )}
            >
              {uploading && (
                <div className="absolute left-0 flex h-full w-full items-center justify-center rounded-2xl bg-gray-1100">
                  <span className="rounded-2xl bg-gray-1300 p-4">
                    <Loader width={'40px'} height={'40px'} color={'white'} />
                  </span>
                </div>
              )}

              {forms.resume === '' ? (
                <div className="flex h-[158px] w-[320px] cursor-pointer flex-col items-center justify-center">
                  <UploadIcon />
                  <p className="mt-4 ml-2 text-sm leading-[14px]">
                    <span className="border-b">Click to upload</span> your resume
                  </p>
                  <p className="mt-2 text-xs opacity-60">Maximum file size 10 MB</p>
                </div>
              ) : (
                <div className="flex items-center" onClick={() => window.open(mediaUrl + forms.resume)}>
                  <svg
                    className="mr-2"
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="56" height="56" rx="8" fill="#F3F3F3" />
                    <g clipPath="url(#clip0_1609_2352)">
                      <path
                        d="M40.4773 18.4838V44.0045H19.3638C17.1802 44.0045 15.4111 42.2353 15.4111 40.0518V12H33.6682L40.4773 18.4838Z"
                        fill="#D63C3C"
                      />
                      <path d="M33.668 12V19.1567H40.477V18.4793L33.668 12Z" fill="#A50E0E" />
                      <path d="M33.668 12V18.4838H40.477L33.668 12Z" fill="#F76969" />
                      <path
                        d="M34.1541 25.4195C33.8065 25.2323 33.1693 25.2724 32.2557 25.5309C31.6408 25.7047 30.9144 25.981 30.1658 26.3196C29.7558 26.2216 29.3325 26.1102 28.9715 25.9319C28.0001 25.4507 27.0776 24.653 26.3602 23.6905C26.3557 23.5835 26.3513 23.4855 26.3468 23.3919C26.3468 23.3919 26.0527 20.8385 25.6962 20.0498C25.6472 19.9428 25.6294 19.9116 25.5714 19.8314L25.5046 19.7467C25.3085 19.515 24.9966 19.2967 24.6445 19.417L24.4262 19.4749C24.0296 19.5952 23.7622 19.8938 23.7667 20.2236C23.789 21.2574 24.4841 22.6076 25.518 24.3143L25.4823 24.653C25.3843 25.6022 25.206 26.5826 25.0456 27.4471L25.0233 27.5585C24.854 28.4675 24.6846 29.2474 24.5242 29.9158L24.2346 30.201C24.2123 30.2233 23.7177 30.709 23.6062 30.8293C22.6437 31.8765 22.1045 32.897 22.1624 33.5654C22.1803 33.7793 22.2872 34.0244 22.5323 34.0823L22.9155 34.1492C23.0804 34.1804 23.2453 34.1715 23.3968 34.1225C24.2301 33.8729 24.8896 32.5494 25.5313 29.8311C26.9217 28.873 28.5482 27.9372 30.0143 27.251C31.3779 27.5629 32.9509 27.5941 33.86 27.3223C34.0204 27.2733 34.1541 27.2198 34.261 27.1529C34.4215 27.0549 34.5373 26.9123 34.5863 26.7519C34.6844 26.4355 34.6086 26.0567 34.4526 25.7002C34.4081 25.5933 34.2789 25.4863 34.1541 25.4195ZM23.0314 33.5476C23.0581 33.0886 23.4146 32.086 24.0875 31.0967C24.1276 31.0343 24.2301 30.865 24.3192 30.709C23.8335 32.4647 23.3879 33.2401 23.0314 33.5476ZM24.6936 19.8581C24.9609 19.7779 25.313 20.4063 25.5135 21.0346C25.714 21.6629 25.6962 22.1531 25.6115 22.5363C25.313 22.0952 25.0144 21.351 24.8629 20.8474C24.8674 20.8519 24.5732 19.8982 24.6936 19.8581ZM25.6918 28.9666C25.7809 28.5789 25.87 28.169 25.9547 27.7367C26.1686 26.6806 26.2577 25.874 26.3112 25.219C27.0063 25.9052 27.7773 26.44 28.6061 26.8009C28.7131 26.8499 28.82 26.89 28.9314 26.9346C27.6659 27.5986 26.6008 28.267 25.6918 28.9666ZM34.1541 26.3687C34.0872 26.4444 33.86 26.5424 33.7085 26.587C33.2227 26.7296 32.5498 26.6895 31.6007 26.5781C31.9171 26.4578 32.2112 26.3553 32.4786 26.2795C32.9687 26.1325 33.1113 26.0879 33.6283 26.0701C34.1407 26.0478 34.2209 26.2929 34.1541 26.3687Z"
                        fill="#A50E0E"
                      />
                      <path d="M42.8833 27.3594H13V40.0551H42.8833V27.3594Z" fill="#F76969" />
                      <path
                        d="M21.4756 29.6875C22.3089 29.6875 22.9416 29.9059 23.3739 30.3336C23.8017 30.7659 24.0156 31.3719 24.0156 32.1473C24.0156 32.9272 23.8017 33.5332 23.3739 33.9699C22.9461 34.4066 22.3133 34.6205 21.4756 34.6116H18.9444V38.0206H17.8438V29.6875H21.4756ZM21.1057 33.6803C21.734 33.6892 22.1885 33.5599 22.4782 33.297C22.7679 33.0341 22.9149 32.6509 22.9149 32.1518C22.9149 31.6527 22.7679 31.2739 22.4782 31.0154C22.1885 30.757 21.7296 30.6233 21.1057 30.6233H18.9489V33.6803H21.1057ZM28.2044 29.6875C29.4789 29.6875 30.4637 30.0128 31.15 30.6679C31.8362 31.3229 32.1838 32.3167 32.1838 33.658C32.1838 34.3576 32.1081 34.977 31.9521 35.5207C31.7961 36.0599 31.5555 36.5189 31.2346 36.8843C30.9093 37.2541 30.4949 37.5349 29.9914 37.7309C29.4878 37.927 28.8951 38.0251 28.2044 38.0251H25.3614V29.6875H28.2044ZM28.298 37.0893C28.4228 37.0893 28.5743 37.0803 28.7614 37.0581C28.9486 37.0402 29.1447 36.9912 29.3541 36.9199C29.5636 36.8442 29.7686 36.7372 29.9735 36.5991C30.1785 36.4609 30.3612 36.2693 30.5261 36.0287C30.6865 35.788 30.8202 35.485 30.9272 35.1241C31.0297 34.7631 31.0831 34.3264 31.0831 33.8095C31.0831 33.3104 31.0341 32.8648 30.9361 32.4726C30.838 32.0805 30.6821 31.7463 30.4593 31.47C30.2409 31.1937 29.9557 30.9843 29.6081 30.8417C29.2605 30.6991 28.8327 30.6278 28.3203 30.6278H26.462V37.0937H28.298V37.0893ZM38.9706 29.6875V30.6233H34.6303V33.2747H38.4359V34.2105H34.6303V38.0295H33.5296V29.6875H38.9706Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1609_2352">
                        <rect width="29.8833" height="32" fill="white" transform="translate(13 12)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <p className="max-w-[220px] truncate hover:underline">
                      {forms.resume.split('resume/')[1]?.split('-')[1] || ''}
                    </p>
                    {/* <p className="text-xs opacity-60">
                      {uploadFileSize && (uploadFileSize / 1024 / 1024).toFixed(3)}MB
                    </p> */}
                  </div>
                </div>
              )}
            </div>
          </label>
          {forms.resume !== '' && (
            <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center rounded-2xl bg-gray-1100 group-hover:flex">
              <Button onClick={() => set('resume', '')} variant="contained">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.33301 4.375H11.6663L10.7913 12.8333H3.20801L2.33301 4.375Z"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                  <path d="M5.83398 7.29688V10.2136" stroke="white" strokeLinecap="round" />
                  <path d="M8.16699 7.29688V10.2129" stroke="white" strokeLinecap="round" />
                  <path
                    d="M3.5 4.37497L8.26122 0.875L10.5 4.375"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Remove
              </Button>
            </div>
          )}
          {uploadFileSizeError && <p className="mt-2 text-xs text-[#E43150]">The file is bigger than 2MB</p>}
        </div>
      </div>
    </div>
  )
}
