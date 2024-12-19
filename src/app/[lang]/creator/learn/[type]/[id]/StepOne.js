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

import { useConfig, useMediaUrl } from '#/state/application/hooks'
import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import ContentEditable from 'react-contenteditable'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { toast } from 'react-toastify'
import { Select } from '@/components/Select'

import { UploadIcon } from '@/components/Icons'
import { upload } from '#/services/common'
import clsx from 'clsx'
import Loader from '@/components/Loader'

import { ChllengesForms } from './Chllenges'
import { HTMLDecode } from '@/utils'
import { BASE_INPUT_STYLE } from '@/constants/config'

const bodyTypeOptions = [
  {
    name: 'Video',
    key: 'video',
  },
  {
    name: 'Text',
    key: 'text',
  },
]

const langOptions = [
  {
    name: '中文',
    key: 'zh',
  },
  {
    name: 'English',
    key: 'en',
  },
]

export function CreatorLearnStepOne({change, data, type, id}) {

  const config = useConfig()
  const mediaUrl = useMediaUrl()
  const uploadRef = useRef(null)

  const [uploading, setUploading] = useState(false)

  const [ecosystem, setEcosystem] = useState('')
  const [language, setLanguage] = useState('')
  const [direction, setDirection] = useState('')

  // const [lang, setLang] = useState('')
  // const [bodyType, setBodyType] = useState('')

  const [forms, setForms] = useState()

  useEffect(() => {
    if (data) {
      setForms(data)
    }
  }, [data])


  const labels = useMemo(() => {
    return config?.find(f => f.config_id === 1)
  }, [config])

  const memoOpts = useCallback((name) => {
    return labels?.config_value[forms?.base.course_series_type]?.map(i => {
        return i.name === name ? i.labels.map(j => ({ name: j.name, key: j.id, img: mediaUrl + j.img })) : []
      })
      .flat(2)
  }, [labels, mediaUrl, forms])

  const ecosystemOpts = useMemo(() => {
    return memoOpts('Ecosystem')
  }, [memoOpts])

  const directionOpts = useMemo(() => {
    return memoOpts('Direction')
  }, [memoOpts])

  const languageOpts = useMemo(() => {
    return memoOpts('Language')
  }, [memoOpts])

  useEffect(() => {
    const lableIds = Array.from(new Set(data?.base?.course_series_label_ids))
    if (ecosystemOpts && directionOpts && languageOpts) {
      const _ecosystem = lableIds.find(f => {
        return ecosystemOpts.filter(sf => sf.key === f).length > 0 ? f : ''
      })
      const _direction = lableIds.find(f => {
        return directionOpts.filter(sf => sf.key === f).length > 0 ? f : ''
      })
      const _language = lableIds.find(f => {
        return languageOpts.filter(sf => sf.key === f).length > 0 ? f : ''
      })
      setEcosystem(_ecosystem)
      setDirection(_direction)
      setLanguage(_language)
    }
  }, [ecosystemOpts, directionOpts, languageOpts, data, type])

  const [uploadFileSizeError, setUploadFileSizeError] = useState(false)
  const handleImageFileChange = async event => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      setUploadFileSizeError(false)
      if (file.size > 1024 * 1024 * 2) {
        event.target.value = ''
        setUploadFileSizeError(true)
        return
      }
      setUploading(true)
      const formData = new FormData()
      formData.append('file', files[0], files[0].name)
      formData.append('intent', 'course_series')
      const res = await upload({ file: formData })
      setUploading(false)
      if (res.code === 200) {
        change('course_series_img', res.data.user_upload_path)
        const current = uploadRef.current
        current.value = ''

      } else {
        toast.error(res.message)
      }
    }
  }

  return (
    <>
      <div id="creator-one">
        <div>
          <ContentEditable
            html={HTMLDecode ? HTMLDecode(forms?.base?.course_series_title) : ''} // innerHTML of the editable div
            disabled={false}
            className="!text-[40px] font-bold"
            placeholder={'Untitled'}
            onChange={e => change('course_series_title', e.currentTarget.textContent)}
          />
        </div>
      </div>
      <div className="mt-9">
        <h4 className="text-sm font-normal mb-2 opacity-80">Cover </h4>
        <div className="group relative w-fit">
          <input
            className="hidden"
            ref={uploadRef}
            onChange={handleImageFileChange}
            accept="image/png, image/gif, image/jpeg, image/jpg,"
            id="upload-course_series_img"
            type="file"
          />
          <label htmlFor="upload-course_series_img" className="relative h-[180px] w-[320px]">
            <div
              className={clsx(
                'flex w-[320px] h-[180px] cursor-pointer items-center justify-between rounded border border-dashed',
                {
                  'border-[#D9D9D9]': !uploadFileSizeError,
                  'border-[#E43150] bg-[rgba(228,49,80,0.02)]': uploadFileSizeError,
                  'bg-[#F3F3F3] hover:border-gray-100 hover:bg-[#EFEFEF]': forms?.base?.course_series_img === '' && !uploadFileSizeError,
                }
              )}
            >
              {uploading && (
                <div className="absolute left-0 flex h-full w-full items-center justify-center rounded bg-gray-1100">
                  <span className="rounded-2xl bg-gray-1300 p-4">
                    <Loader width={'40px'} height={'40px'} color={'white'} />
                  </span>
                </div>
              )}

              {forms?.base?.course_series_img === '' ? (
                <div className="flex h-[180px] w-[320px] cursor-pointer flex-col items-center justify-center">
                  <UploadIcon />
                  <p className="mt-4 ml-2 text-sm leading-[14px]">
                    <span>Upload cover</span>
                  </p>
                  <p className="mt-4 text-xs opacity-40">Files Supported: jpg, png  |  Size: 900*486px</p>
                  <p className="mt-1 text-xs opacity-40">Maximum file size 2 MB</p>
                </div>
              ) : (
                <div className="flex items-center">
                  {mediaUrl && !!forms?.base?.course_series_img && (
                    <Image width={320} height={180} className="rounded aspect-video object-cover" src={mediaUrl + forms?.base?.course_series_img} alt="" />
                  )}
                </div>
              )}
            </div>
          </label>
          {!!forms?.base.course_series_img && (
            <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center rounded-2xl bg-gray-1100 group-hover:flex">
              <Button onClick={() => change('course_series_img', '')} variant="contained">
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
      {
        type !== 'challenges' && (
          <div className={clsx('mt-9 grid gap-2 grid-cols-2')}>
            <div className="flex-1">
              <h5 className="text-sm font-normal mb-2 opacity-80">Course language</h5>
              {ecosystemOpts && <Select options={langOptions} selected={forms?.base.course_series_lang} change={e => change('course_series_lang', e)} />}
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-normal mb-2 opacity-80">Content form</h5>
              {directionOpts && <Select options={bodyTypeOptions} selected={forms?.base.course_series_body_type} change={e =>  change('course_series_body_type', e)} />}
            </div>
          </div>
        )
      }

      <div className="mt-9">
        <h4 className="text-sm font-normal mb-2 opacity-80">Summary</h4>
        <div className="">
          <textarea
            name="title"
            value={forms?.base.course_series_summary}
            placeholder="Please Enter Summary..."
            onChange={e => change('course_series_summary', e.target.value)}
            className={`${BASE_INPUT_STYLE} h-[70px] py-2`}
          />
        </div>
      </div>
      <div className={clsx('mt-9 grid gap-2', {
        'grid-cols-3': type !== 'challenges',
        'grid-cols-2': type === 'challenges',
      })}>
        <div className="flex-1">
          <h5 className="text-sm font-normal mb-2 opacity-80">Ecosystem</h5>
          {ecosystemOpts && <Select options={ecosystemOpts} selected={ecosystem} change={e =>  change('course_series_label_ids', [e, direction, language])} />}
        </div>
        <div className="flex-1">
          <h5 className="text-sm font-normal mb-2 opacity-80">Direction</h5>
          {directionOpts && <Select options={directionOpts} selected={direction} change={e =>  change('course_series_label_ids', [ecosystem, e, language])} />}
        </div>
        {type !== 'challenges' && (
          <div className="flex-1">
            <h5 className="text-sm font-normal mb-2 opacity-80">Programming Language</h5>
            {languageOpts && <Select options={languageOpts} selected={language} change={e =>  change('course_series_label_ids', [ecosystem, direction, e])} />}
          </div>
        )}
      </div>

      {type === 'challenges' && <ChllengesForms forms={forms?.challenges_extra} change={change} />}
      {type !== 'challenges' && (
        <div className="mt-9 flex justify-between">
          <div>
            <h4 className="text-sm font-normal opacity-80">Featured Courses</h4>
          </div>
          <input
            type="checkbox"
            className="toggle publish-toggle"
            onChange={() => change('course_series_recommend_type', forms?.base.course_series_recommend_type === 'choice' ? 'default' : 'choice')}
            checked={forms?.base?.course_series_recommend_type === 'choice'}
          />
        </div>
      )}
    </>
  )
}
