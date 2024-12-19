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

import { useState, useEffect } from 'react'
import  { BASE_INPUT_STYLE } from '@/constants/config'

import { OEditor } from '@/components/MarkDown'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MinusCircleIcon } from '@heroicons/react/24/outline'

export function CreatorLearnStepTwo({data, change}) {

  const [forms, setForms] = useState()

  useEffect(() => {
    if (data) {
      setForms(data.base)
    }
  }, [data])

  const changeRequirementsOrBuilders = (key, type, index, value) => {
    const _forms = Object.assign({ ...forms }, {})
    const arr = _forms[key]
    if (type === 'plus') {
      arr.push('')
    } else if (type === 'change') {
      arr[index] = value
    } else {
      arr.splice(index, 1)
    }
    change(key, arr)
  }

  return forms ? (
    <>
      <div id="creator-two" className="mt-9 grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="opacity-80 text-sm">Requirements</p>
            <PlusCircleIcon
              onClick={() => changeRequirementsOrBuilders('course_series_requirement', 'plus')}
              className="h-6 w-6 mr-3 cursor-pointer "
            />
          </div>
          <div>
            {new Array(forms.course_series_requirement.length).fill('').map((i, k) => (
              <div key={`requirements-${k}`} className="mt-2 flex items-center rounded border border-gray-600 bg-transparent hover:border hover:border-gray transition-all">
                <input
                  type="text"
                  value={forms.course_series_requirement[k]}
                  onChange={e => changeRequirementsOrBuilders('course_series_requirement', 'change', k, e.target.value,)}
                  className={`${BASE_INPUT_STYLE} !border-0`}
                />
                {forms.course_series_requirement.length > 1 && (
                  <MinusCircleIcon
                    onClick={() => changeRequirementsOrBuilders('course_series_requirement', 'minus', k)}
                    className="ml-2 mr-3 h-6 w-6 cursor-pointer text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="opacity-80 text-sm">Builders can take away</p>
            <PlusCircleIcon
              onClick={() => changeRequirementsOrBuilders('course_series_what_content', 'plus')}
              className="h-6 w-6 mr-3 cursor-pointer "
            />
          </div>
          <div>
            {new Array(forms.course_series_what_content.length).fill('').map((i, k) => (
              <div key={`requirements-${k}`} className="mt-2 flex items-center rounded border border-gray-600 bg-transparent hover:border hover:border-gray transition-all">
                <input
                  type="text"
                  value={forms.course_series_what_content[k]}
                  onChange={e => changeRequirementsOrBuilders('course_series_what_content', 'change', k, e.target.value,)}
                  className={`${BASE_INPUT_STYLE} !border-0`}
                />
                {forms.course_series_what_content.length > 1 && (
                  <MinusCircleIcon
                    onClick={() => changeRequirementsOrBuilders('course_series_what_content', 'minus', k)}
                    className="ml-2 mr-3 h-6 w-6 cursor-pointer text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-9">
        <p className="mb-2 opacity-80 text-sm">Intrduction</p>
        <OEditor
          value={forms.course_series_introduction}
          onChange={e => {
            change('course_series_introduction', e)
          }}
        />
      </div>
    </>
  ) : null
}
