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
import { isEmail } from 'validator'
import { toast } from 'react-toastify'

import { wrapOnChange } from '@/utils/form'
import { sendCode } from '#/services/auth'

export default function VerifyCodeLogin({ register, loginType, email }) {
  const [sendLoading, setSendLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setInterval(() => setCountdown(countdown - 1), 1000)
      return () => clearInterval(timerId)
    }
  }, [countdown])

  const verifyCodeField = register('VerifyCode', {
    required: loginType === 'verifyCode'
  })
  verifyCodeField.onChange = wrapOnChange(verifyCodeField.onChange)

  const handleSendCode = async () => {
    if (!email || !isEmail(email)) {
      toast.error('Please enter a valid email address.')
      return
    }
    setSendLoading(true)

    try {
      const res = await sendCode(email, 'bind')
      if (res.code === 200) {
        setCountdown(59)
        toast.success('Code sent successfully!')
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error('Failed to send code.')
    } finally {
      setSendLoading(false)
    }
  }

  return (
    <div className="mt-[2px] flex items-center bg-[#f1f1f1] pr-3">
      <input
        type="text"
        className="h-12 w-full flex-1 border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100"
        placeholder="Verify Code"
        {...verifyCodeField}
      />
      {countdown === 0 ? (
        <button
          type="button"
          disabled={sendLoading}
          onClick={handleSendCode}
          className="w-[76px] text-sm hover:opacity-80 disabled:opacity-20"
        >
          {sendLoading ? 'Sending...' : 'Send Code'}
        </button>
      ) : (
        <p className="text-sm leading-[48px]">{countdown}s</p>
      )}
    </div>
  )
}

