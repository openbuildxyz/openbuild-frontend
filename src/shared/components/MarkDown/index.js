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

import 'bytemd/dist/index.css'
import { Editor, Viewer } from '@bytemd/react'

import { upload } from '#/services/common'
import { useMediaUrl } from '#/state/application/hooks'

import { getPlugins, sanitize } from '../../utils/markdown'

export function OEditor({ onChange, ...props }) {
  const mediaUrl = useMediaUrl()
  const uploadCallback = async file => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('intent', 'course_series')
    const res = await upload({ file: formData })
    return { url: mediaUrl + res.data.user_upload_path }
  }

  return (
    <Editor
      sanitize={sanitize}
      mode="split"
      value={props.value}
      plugins={getPlugins()}
      onChange={onChange}
      uploadImages={files => {
        const mapedUpload = files.map(async i => {
          const res = await uploadCallback(i)
          return res
        })
        return Promise.all(mapedUpload)
      }}
    />
  )
}

export function OViewer({ ...props }) {
  return <Viewer sanitize={sanitize} value={props.value} plugins={getPlugins()} />
}
