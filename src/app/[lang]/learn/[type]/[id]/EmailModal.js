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

import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/Modal'
import { baseInputStyles } from '#/styleds'

import { toast } from 'react-toastify'
import isEmail from 'validator/lib/isEmail'
import { sendCode, emailCodeLogin } from '#/services/auth'
import { Button } from '@/components/Button'
import { revalidatePathAction } from './actions'
import { signIn } from 'next-auth/react'
import clsx from 'clsx'

export function EmailModal({ open, closeModal, successCallback, data }) {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [cdMss, setCdMss] = useState(0)
  const [sendLoading, setSendLoading] = useState(false)
  const [emailVerifyLoading, setEmailVerifyLoading] = useState(false)

  useEffect(() => {
    if (cdMss > 0) {
      const timerId = setInterval(() => setCdMss(cdMss - 1), 1000)
      return () => clearInterval(timerId)
    }
  }, [cdMss])

  const emailVerify = async () => {
    if (email === '' || verificationCode === '') {
      toast.error('Please enter your email and verification code')
      return
    }
    setEmailVerifyLoading(true)
    const signInRes = await emailCodeLogin(email, verificationCode)
    if (signInRes.code === 200) {
      setCdMss(0)
      closeModal()
      window.localStorage.setItem('signType', 'email')
      const data = await signIn('credentials', {
        token: signInRes.data.token,
        redirect: false,
      })
      if (data?.ok) {
        await revalidatePathAction()
        successCallback()
      }
    }
    setEmailVerifyLoading(false)
  }

  return (
    <Modal isOpen={open} closeModal={closeModal}>
      <div className="max-h-[500px] overflow-auto">
        <div>
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={clsx(baseInputStyles, 'h-10 rounded !border-0 !bg-[#f8f8f8]')}
          />
          <div className="mt-2 flex h-10 w-full rounded border-0 border-gray-600 bg-[#f8f8f8] text-sm text-gray  placeholder:text-gray-500">
            <input
              type="text"
              placeholder="Verify Code"
              className={'flex-1 border-0 min-w-[100px] bg-transparent text-sm pl-[1rem] placeholder:text-gray-500'}
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
            />
            {cdMss === 0 && (
              <button
                disabled={email === '' || !isEmail(email) || sendLoading}
                className="w-[76px] text-sm hover:opacity-80 disabled:opacity-20"
                onClick={async () => {
                  setSendLoading(true)
                  const res = await sendCode(email, 'login')
                  setSendLoading(false)
                  if (res.code === 200) {
                    setCdMss(59)
                  } else {
                    toast.error(res.message)
                  }
                }}
              >
                Send
              </button>
            )}

            {cdMss !== 0 && <p className="text-sm leading-[48px]">{cdMss}s</p>}
          </div>
          <Button
            disabled={email === '' || verificationCode === ''}
            loading={emailVerifyLoading}
            onClick={() => emailVerify()}
            fullWidth
            className="mt-4"

          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}
