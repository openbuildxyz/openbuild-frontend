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

import { useUser } from '#/state/application/hooks'
import { upload } from '#/services/common'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import { changeBanner } from '#/services/user'
import { revalidatePathAction } from '#/app/actions'
import clsx from 'clsx'
import Image from '@/components/Image'

export function Banner({data}) {
  const user = useUser()
  const uploadRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const handleImageFileChange = event => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      if (file.size > 1024 * 1024 * 20) {
        toast.error('The file is too large')
        event.target.value = ''
        return
      }
      // setUploading(true)
      const formData = new FormData()
      formData.append('file', files[0], files[0].name)
      formData.append('intent', 'avatar')
      setLoading(true)
      upload({ file: formData })
        .then(async res => {
          await changeBanner(res.data.user_upload_path)
          setLoading(false)
          revalidatePathAction()
        })
        .catch(() => {
          toast.error('Upload error')
          // setUploading(false)
          setLoading(false)
        })
    }
  }

  return <div className="relative">
    <div className="h-[160px] md:h-[200px]">
      <Image
        width={1920}
        height={200}
        className="w-full h-full object-cover"
        src={data.base.user_background_image}
        defaultSrc="/images/profile-banner.png"
        alt=""
      />
    </div>

    {data?.base.user_id === user?.base.user_id && (
      <button className="absolute top-3 right-3 md:top-4 md:right-[60px]">
        <label htmlFor="upload-cover" className="flex items-center text-white gap-2 bg-[rgba(26,26,26,0.6)] hover:bg-[rgba(26,26,26,0.8)] rounded px-3 py-2 cursor-pointer">
          <img className={clsx({'animate-spin': loading})} src={'/images/svg/refetch.svg'} alt="" />
          Change cover
        </label>
        <input
          className="hidden"
          ref={uploadRef}
          onChange={handleImageFileChange}
          accept="image/png, image/gif, image/jpeg, image/jpg,"
          id="upload-cover"
          type="file"
        />
      </button>
    )}
  </div>
}
