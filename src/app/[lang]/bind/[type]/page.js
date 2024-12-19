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
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { bindOAuth } from '#/services/auth'
import Loader from '@/components/Loader'
import { toast } from 'react-toastify'

import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Bind({ params }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    const code = searchParams?.get('code')
    if (searchParams && router && status !== 'authenticated') {
      if (code && params.type) {
        window.localStorage.setItem('signType', params.type)
        const redirectUri = `${window.location.origin}/bind/${params.type}`
        bindOAuth(code, params.type, redirectUri)
          .then(async res => {
            if (res.code === 200) {
              if (status !== 'authenticated') {
                await signIn('credentials', {
                  token: res.data.token,
                })
              }
              let from
              if (params.type === 'google' || params.type === 'aspecta') {
                from = searchParams?.get('state')
              } else {
                from = searchParams?.get('from')
              }
              window.location.href = window.location.origin + from
            } else {
              toast.error(res.message)
            }
            if (res.code === 401) {
              signOut()
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader color={'#1a1a1a'} />
      <p className="ml-2">Logging in</p>
    </div>
  )
}
