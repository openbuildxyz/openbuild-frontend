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

import Link from 'next/link'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { registerEmail, sendCode } from '#/services/auth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import { useAccount } from 'wagmi'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import isEmail from 'validator/lib/isEmail'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import { NavButtonStyle } from '../signin/page'
const SignupAfterStyle = 'after:content-[\'\'] after:absolute after:left-[-12px] after:bottom-0 after:w-3 after:h-3 after:bg-signup-gradient'

export default function SignUp() {
  const { status } = useSession()
  const router = useRouter()
  const [cdMss, setCdMss] = useState(0)
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()
  const searchParams = useSearchParams()
  const [sendLoading, setSendLoading] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  useEffect(() => {
    if (cdMss > 0) {
      const timerId = setInterval(() => setCdMss(cdMss - 1), 1000)
      return () => clearInterval(timerId)
    }
  }, [cdMss])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const watchAllFields = watch()
  const onSubmit = async data => {
    setLoading(true)
    const res = await registerEmail(data.Email, data.Password, data.VerificationCode)
    if (res.code === 200) {
      toast.success('🎉 Congratulations, you have successfully registered')
      if (address && searchParams?.get('from') !== null && status === 'authenticated') {
        router.push(searchParams?.get('from'))
      } else {
        router.push('/signin')
      }
    } else {
      toast.error(res.message)
    }
    setLoading(false)
  }
  return (
    <>
      <div>
        <div>
          <Link href="/signin">
            <button className={clsx(NavButtonStyle())}>Sign in</button>
          </Link>
          <button className={clsx(NavButtonStyle(), SignupAfterStyle, 'active')}>Sign up</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Email"
            {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
            className="h-12 w-full rounded-t-xl border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100"
          />
          <div className="mt-[2px] flex items-center bg-[#f1f1f1] pr-3 ">
            <input
              type={passwordType}
              placeholder="Password"
              {...register('Password', { required: true, minLength: 6, maxLength: 20 })}
              className="mt-[2px] h-12 w-full border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100"
            />
            {passwordType === 'password' ? (
              <EyeIcon onClick={() => setPasswordType('text')} className="h-5 w-5 cursor-pointer" />
            ) : (
              <EyeSlashIcon onClick={() => setPasswordType('password')} className="h-5 w-5 cursor-pointer" />
            )}
          </div>
          <div className="mt-[2px] flex items-center bg-[#f1f1f1] pr-3 ">
            <input
              type={confirmPasswordType}
              placeholder="Confirm Password"
              {...register('ConfirmPassword', { required: true, minLength: 6, maxLength: 20 })}
              className="mt-[2px] h-12 w-full border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100"
            />
            {confirmPasswordType === 'password' ? (
              <EyeIcon onClick={() => setConfirmPasswordType('text')} className="h-5 w-5 cursor-pointer" />
            ) : (
              <EyeSlashIcon onClick={() => setConfirmPasswordType('password')} className="h-5 w-5 cursor-pointer" />
            )}
          </div>
          <div className="mt-[2px] flex bg-[#f1f1f1] pr-3">
            <input
              type="text"
              placeholder="Verify Code"
              className="h-12 w-full flex-1 border-0 bg-[#f1f1f1] px-6 text-sm placeholder:text-gray-1100"
              {...register('VerificationCode', { required: true })}
            />
            {cdMss === 0 && (
              <button
                disabled={(watchAllFields.Email === '' && !isEmail(watchAllFields.Email)) || sendLoading}
                className="w-[76px] text-sm hover:opacity-80 disabled:opacity-20"
                onClick={async () => {
                  setSendLoading(true)
                  const res = await sendCode(watchAllFields.Email, 'register')
                  setSendLoading(false)
                  if (res.code === 200) {
                    setCdMss(59)
                  } else {
                    toast.error(res.message)
                  }
                }}
              >
                Send Code
              </button>
            )}

            {cdMss !== 0 && <p className="text-sm leading-[48px]">{cdMss}s</p>}
          </div>

          <button
            type="submit"
            disabled={
              watchAllFields.Email === '' ||
              watchAllFields.ConfirmPassword === '' ||
              watchAllFields.VerificationCode === '' ||
              watchAllFields.Password === '' ||
              loading
            }
            className="flex h-12 w-full items-center justify-center rounded-xl rounded-t-none bg-gray text-white disabled:opacity-20"
          >
            {loading && <Loader classname="mr-2" />}

            <span>Sign Up Now</span>
          </button>
          {errors.Email && <p className="mt-4 text-center text-xs text-red">E-mail format is incorrect</p>}
          {errors?.Password?.type && <p className="mt-4 text-center text-xs text-red">Password length limit is 6-20</p>}
          {watchAllFields.ConfirmPassword !== watchAllFields.Password && (
            <p className="mt-4 text-center text-xs text-red">The passwords entered twice are inconsistent</p>
          )}

          <div className="mt-6 text-center">
            Already have an account?&nbsp;
            <span
              onClick={() => router.push('/signin')}
              className="cursor-pointer text-sm font-bold text-[#01DB83] hover:underline"
            >
              Sign in
            </span>
          </div>
        </form>
      </div>
    </>
  )
}
