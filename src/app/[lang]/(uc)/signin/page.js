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

import { useState } from 'react'
import { isEmpty } from 'lodash'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import { signin } from '#/services/auth'
import { wrapOnChange } from '@/utils/form'
import Loader from '@/components/Loader'

export function NavButtonStyle() {
  return 'h-12 relative rounded-t-xl text-gray-100 px-6 [&.active]:bg-gray-1400 [&.active]:!text-gray'
}
const SigninAfterStyle = 'after:content-[\'\'] after:absolute after:right-[-12px] after:bottom-0 after:w-3 after:h-3 after:bg-signin-gradient'

export default function Login() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const watchAllFields = watch()
  const onSubmit = async data => {
    setLoading(true)
    try {
      const signRes = await signin(data.Email, data.Password)
      if (signRes.code === 200) {
        window.localStorage.setItem('signType', 'email')
        const data = await signIn('credentials', {
          token: signRes.data.token,
          redirect: false,
          callbackUrl: decodeURIComponent(searchParams?.get('from') || searchParams?.get('callbackUrl') || '/profile'),
        })
        if (data?.ok && data.url) {
          window.location.href = data?.url
        }
      } else {
        toast.error(signRes.message)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const emailField = register('Email', { required: true, pattern: /^\S+@\S+$/i })
  emailField.onChange = wrapOnChange(emailField.onChange)

  const pwdField = register('Password', { required: true, minLength: 6, maxLength: 20 })
  pwdField.onChange = wrapOnChange(pwdField.onChange)

  return (
    <>
      <div>
        <div>
          <button className={clsx(NavButtonStyle(), SigninAfterStyle, 'active')}>Sign in</button>
          <Link href="/signup">
            <button className={clsx(NavButtonStyle())}>Sign up</button>
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className={'h-12 w-full rounded-tr-xl border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100'}
              placeholder="Email Address"
              {...emailField}
            />
            <div className="mt-[2px] flex items-center bg-[#f1f1f1] pr-3 ">
              <input
                type={passwordType}
                placeholder="Password"
                {...pwdField}
                className="mt-[2px] h-12 w-full border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100"
              />
              {passwordType === 'password' ? (
                <EyeIcon onClick={() => setPasswordType('text')} className="h-5 w-5 cursor-pointer" />
              ) : (
                <EyeSlashIcon onClick={() => setPasswordType('password')} className="h-5 w-5 cursor-pointer" />
              )}
            </div>
            <button
              type="submit"
              disabled={
                watchAllFields.Email === '' || watchAllFields.Password === '' || isEmpty(watchAllFields) || loading
              }
              className="flex h-12 w-full items-center justify-center rounded-xl rounded-t-none bg-gray text-white disabled:opacity-20"
            >
              {loading && <Loader classname="mr-2" />}
              <span>Continue</span>
            </button>
          </form>

          {!isEmpty(errors) && watchAllFields.Email !== '' && watchAllFields.Password !== '' && (
            <p className="mt-4 text-center text-xs text-red">The email or password is wrong.</p>
          )}
          <div className="mt-6 text-center">
            Forget your password?&nbsp;
            <Link href="/forgot" className="cursor-pointer text-sm font-bold text-[#01DB83] hover:underline">
              Reset
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
