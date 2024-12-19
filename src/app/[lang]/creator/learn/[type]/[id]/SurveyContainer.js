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

import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import { useCallback, useEffect, useState } from 'react'
import { ReactSelect } from '@/components/Select/ReactSelect'
import { useSyncState } from '@/hooks/useSyncState'

export const surveyJSON = {
  showPrevButton: true,
  showQuestionNumbers: false,
}

const RegistrationMethods = [
  {
    label: 'Registration requires logging into OpenBuild',
    value: 3,
  },
  {
    label: 'Registration does not require logging into OpenBuild',
    value: 2,
  },
  {
    label: 'Register via a third-party page',
    value: 1,
  },
]

const options = {
  showJSONEditorTab: false,
  showLogicTab: false,
  isAutoSave: true,
  questionTypes: ['text', 'checkbox', 'radiogroup', 'dropdown', 'file', 'image', 'multipletext', 'comment'],
}

export default function SurveyContainer({ data, change }) {

  const [forms, setForms] = useState()
  const [creator, setCreator] = useState(null)
  const [registrationMethod, setRegistrationMethod] = useSyncState()
  const [externalUrl, setExternalUrl] = useSyncState()

  useEffect(() => {
    if (data && !forms) {
      setForms(data)
      if (data.challenges_extra.course_challenges_extra_need_login) {
        setRegistrationMethod(RegistrationMethods[0])
      } else {
        if (data.challenges_extra?.course_challenges_extra_external_url !== '') {
          setExternalUrl(data.challenges_extra?.course_challenges_extra_external_url)
          setRegistrationMethod(RegistrationMethods[2])
        } else {
          setRegistrationMethod(RegistrationMethods[1])
        }
      }
      if (
        data.challenges_extra?.course_challenges_extra_check_schema &&
        data.challenges_extra?.course_challenges_extra_check_schema !== ''
      ) {
        creator.JSON = JSON.parse(data.challenges_extra?.course_challenges_extra_check_schema)
      }

    }
  }, [data, forms, setRegistrationMethod, creator, setExternalUrl])

  const saveForms = useCallback(async (val, assignObj, url, json) => {
    const _forms = Object.assign({ ...assignObj }, {})
    if (val) {
      if (val?.value === 2 || val?.value === 1) {
        _forms.challenges_extra.course_challenges_extra_need_login = false
      } else {
        _forms.challenges_extra.course_challenges_extra_need_login = true
      }
      // _forms.challenges_extra.course_challenges_extra_need_login = val?.value === 3 ? true : false
      if (val?.value === 2) {
        _forms.challenges_extra.course_challenges_extra_external_url = ''
      } else {
        _forms.challenges_extra.course_challenges_extra_external_url = url
      }
    }

    if (json) {
      delete json.logoPosition
      if (JSON.stringify(json).length < 10) {
        _forms.challenges_extra.course_challenges_extra_check_schema = ''
      } else {
        _forms.challenges_extra.course_challenges_extra_check_schema = JSON.stringify(json)
      }
    }

    console.log(_forms, '_forms')

    change('survey', _forms)
  }, [change])


  if (!creator) {
    const _creator = new SurveyCreator(options)
    setCreator(_creator)
  }
  useEffect(() => {
    if (creator) {
      const _c = creator
      _c.isAutoSave = true
      _c.saveSurveyFunc = (saveNo, callback) => {
        callback(saveNo, true)
        saveForms(forms.challenges_extra.course_challenges_extra_need_login, forms, externalUrl, creator.JSON)
      }
      setCreator(_c)
    }
  }, [creator, saveForms, forms, externalUrl])

  // Add event handlers, survey JSON, and customizations here
  // ...
  return (
    <div className="h-fit w-full">
      <div className="bg-white p-6 rounded">
        <p>Please choose the registration method for developers:</p>
        <ReactSelect
          value={registrationMethod}
          className="no-bg showDropdownIndicator mt-4 w-[600px] bg-transparent"
          onChange={e => {
            setRegistrationMethod(e, (val) => {
              console.log(val, 'val')
              if (val.value === 2) {
                setExternalUrl('')
                saveForms(val, data, '')
              } else {
                saveForms(val, data, externalUrl)
              }

            })
          }}
          options={RegistrationMethods}
        />
        {registrationMethod?.value === 1 && (
          <input
            type="text"
            placeholder="Please enter a link"
            onChange={e => {
              setExternalUrl(e.target.value)
              // console.log(e.target.value)
              setTimeout(saveForms(registrationMethod, data, e.target.value), 500)

            }}
            value={externalUrl}
            className="mt-4 px-4 block h-12 w-[600px] rounded border border-gray-600 bg-transparent py-1.5  placeholder:text-gray-100 sm:text-sm sm:leading-6"
          />
        )}
      </div>
      {registrationMethod?.value !== 1 && <SurveyCreatorComponent creator={creator} />}
    </div>
  )
}
