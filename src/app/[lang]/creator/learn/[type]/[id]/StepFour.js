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

import { PlusIcon, MinusCircleIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/Button'
import { useState, useRef, useEffect } from 'react'
import { upload } from '#/services/common'
import Image from 'next/image'
import { useMediaUrl } from '#/state/application/hooks'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import { TwitterIcon } from '@/components/Icons'
import GithubIcon from 'public/images/svg/github_p.svg'
import { Modal } from '@/components/Modal'
import { NoData } from '@/components/NoData'
import  { BASE_INPUT_STYLE } from '@/constants/config'

const initSpeakers = {
  course_speaker_index: 0,
  course_speaker_img: '',
  course_speaker_from: '',
  course_speaker_name: '',
  course_speaker_github: '',
  course_speaker_x: '',
}

export function CreatorLearnStepFour({ params, data, change }) {
  const uploadRef = useRef(null)
  const mediaUrl = useMediaUrl()
  const [uploadAvatarLoading, setUploadAvatarLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentSpeaker, setCurrentSpeaker] = useState(initSpeakers)
  const [speakerFlag, setSpeakerFlag] = useState(initSpeakers)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [forms, setForms] = useState()

  useEffect(() => {
    if (data) {
      setForms(data)
    }
  }, [data])

  const handleImageFileChange = (event, index) => {
    setUploadAvatarLoading(true)
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      if (file.size > 1024 * 1024 * 2) {
        event.target.value = ''
        toast.error('The file is too large')
        return
      }
      const formData = new FormData()
      formData.append('file', files[0], files[0].name)
      formData.append('intent', 'course_series')
      upload({ file: formData }).then(res => {
        setUploadAvatarLoading(false)
        const _cs = Object.assign({ ...currentSpeaker }, {})
        _cs.course_speaker_img = res.data.user_upload_path
        setCurrentSpeaker(_cs)
        const current = uploadRef.current
        current.value = ''
      })
    }
  }

  const changeCurrentSpeaker = (value, type) => {
    const _cs = Object.assign({ ...currentSpeaker }, {})
    if (type === 'course_speaker_index') {
      console.log(value)
      _cs[type] = Number(value)
    } else {
      _cs[type] = value
    }
    setCurrentSpeaker(_cs)
  }

  const confirm = () => {
    const _forms = Object.assign({ ...forms }, {})
    if (speakerFlag === 'add') {
      if (_forms.speaker.find(f => f.course_speaker_name === currentSpeaker.course_speaker_name)){
        toast.error('Speaker already exists')
        return
      }
      if (_forms.speaker.find(f => f.course_speaker_index === currentSpeaker.course_speaker_index)) {
        toast.error('Position already exists')
        return
      }
    }
    if (speakerFlag === 'add') {
      _forms.speaker.push(currentSpeaker)
    } else {
      _forms.speaker.splice(currentIndex, 1, currentSpeaker)
    }
    // setForms(_forms)
    change('speaker', _forms.speaker)
    setModalOpen(false)
  }

  const deleteSpeaker = (i) => {
    const _speakers = forms.speaker.filter(f => f.course_speaker_name !== i.course_speaker_name)
    change('speaker', _speakers)
  }

  return (
    <>
      <div id="creator-four">
        <div className="mt-9 mb-4 flex items-center justify-between text-sm border-b border-gray-400 pb-2">
          <p>Speakers</p>
          <Button
            onClick={() => {
              setSpeakerFlag('add')
              setCurrentSpeaker(initSpeakers)
              setModalOpen(true)
            }}
            className="h-7 px-3 text-xs"
          >
            <PlusIcon className="h-4 w-4" />
            Add
          </Button>
        </div>
        {
          forms?.speaker?.length === 0 ?
            <NoData /> : <>
              <div className="flex justify-between text-xs opacity-60">
                <p>Name & Title</p>
                <p>Social accounts</p>
              </div>
              <div>
                {forms?.speaker.map((i, k) => (
                  <div
                    key={`speakers-${k}`}
                    className="mt-6 transition-all group flex justify-between items-center relative hover:bg-white px-3 py-2 rounded hover:drop-shadow-3xl"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSpeakerFlag('edit')
                      setCurrentSpeaker(i)
                      setCurrentIndex(k)
                      setModalOpen(true)
                    }}
                  >
                    <div className="flex items-center">
                      {i.course_speaker_img !== '' && (
                        <Image
                          width={50}
                          height={50}
                          className="mr-4 h-[50px] w-[50px] rounded-full object-fill"
                          src={mediaUrl + forms?.speaker[k].course_speaker_img}
                          alt=""
                        />
                      )}
                      <div>
                        <h6>{i.course_speaker_name}</h6>
                        <p className="text-sm mt-1">{i.course_speaker_from}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {i.course_speaker_x && i.course_speaker_x !== '' && <a href={i.course_speaker_x} target="_blank" rel="noreferrer">
                        <TwitterIcon className="h-4 w-4" />
                      </a>}
                      {i.course_speaker_github && i.course_speaker_github !== '' && <a className="ml-4" href={i.course_speaker_github} target="_blank" rel="noreferrer">
                        <Image src={GithubIcon} alt="" className="h-4 w-4" />
                      </a>}
                    </div>
                    <div className="flex itemtransition-all opacity-0 group-hover:opacity-40 absolute right-[-24px] cursor-pointer">
                      <MinusCircleIcon className="h-4 w-4" onClick={(e) => {
                        e.stopPropagation()
                        deleteSpeaker(i)
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
        }
      </div>

      <Modal mode="base" isOpen={modalOpen} title={'Editorial Speaker'} closeModal={() => setModalOpen(false)}>
        <div className="max-h-96 overflow-y-auto">
          <p className="mb-2 text-sm opacity-80">Avatar <span className="text-red">*</span></p>
          <div className="flex items-center">
            {currentSpeaker.course_speaker_img !== '' && (
              <Image
                width={96}
                height={96}
                className="mr-4 h-[96px] w-[96px] rounded-full object-cover"
                src={mediaUrl + currentSpeaker.course_speaker_img}
                alt=""
              />
            )}
            <input
              className="hidden"
              ref={uploadRef}
              onChange={e => handleImageFileChange(e)}
              accept="image/png, image/gif, image/jpeg, image/jpg,"
              id={'creator-upload-cover'}
              type="file"
            />
             <div>
              <label
                htmlFor={'creator-upload-cover'}
                className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full bg-[#EBEBEB] px-4 py-2 text-sm hover:opacity-80 disabled:opacity-20"
              >
                {uploadAvatarLoading && <Loader color={'#1a1a1a'} />} {currentSpeaker.course_speaker_img !== '' ? 'Replace' : 'Upload avatar'}
              </label>
              <p className="text-xs opacity-60 mt-2">
                Support PNG, JPG, or GIF, recommended size 400x400px, size within 2M
              </p>
            </div>
          </div>
          <p className="mb-2 mt-6 text-sm opacity-80">Name <span className="text-red">*</span></p>
          <input value={currentSpeaker.course_speaker_name} className={BASE_INPUT_STYLE} onChange={(e) => changeCurrentSpeaker(e.target.value, 'course_speaker_name')} />
          <p className="mb-2 mt-6 text-sm opacity-80">Title <span className="text-red">*</span><span className="text-xs opacity-60">(Title @ Company)</span></p>
          <input value={currentSpeaker.course_speaker_from} className={BASE_INPUT_STYLE} onChange={(e) => changeCurrentSpeaker(e.target.value, 'course_speaker_from')} />
          <p className="mb-2 mt-6 text-sm opacity-80">Index <span className="text-red">*</span></p>
          <input value={currentSpeaker.course_speaker_index} type="number" className={BASE_INPUT_STYLE} onChange={(e) => changeCurrentSpeaker(Number(e.target.value), 'course_speaker_index')} />
          <p className="mb-2 mt-6 text-sm opacity-80">X <span className="text-xs opacity-60">(Twitter)</span></p>
          <div className="px-4 mt-2 flex items-center rounded border border-gray-600 bg-transparent hover:border hover:border-gray transition-all">
            <TwitterIcon className="h-6 w-6" />
            <input
              type="text"
              value={currentSpeaker.course_speaker_x}
              onChange={(e) => changeCurrentSpeaker(e.target.value, 'course_speaker_x')}
              className={`${BASE_INPUT_STYLE} !border-0`}
            />
          </div>
          <p className="mb-2 mt-6 text-sm opacity-80">GitHub</p>
          <div className="px-4 mt-2 flex items-center rounded border border-gray-600 bg-transparent hover:border hover:border-gray transition-all">
            <Image src={GithubIcon} alt="" />
            <input
              type="text"
              value={currentSpeaker.course_speaker_github}
              onChange={(e) => changeCurrentSpeaker(e.target.value, 'course_speaker_github')}
              className={`${BASE_INPUT_STYLE} !border-0`}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outlined" className="mr-2 w-[142px]" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={
                currentSpeaker.course_speaker_index === '' ||
                currentSpeaker.course_speaker_img === '' ||
                currentSpeaker.course_speaker_from === '' ||
                currentSpeaker.course_speaker_name === ''
              }
              onClick={confirm}
              className="w-[142px]"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
