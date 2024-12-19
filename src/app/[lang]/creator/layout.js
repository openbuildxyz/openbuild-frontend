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
import { useUser } from '#/state/application/hooks'

import { Tabs } from './Tabs'

export default function Layout({ children }) {
  const user = useUser()

  return (
    <>
      {/* <Header /> */}
      {user?.roles.find(f => f.auth_user_roles_name === 'creator') ? (
        <div className="flex px-[68px] pb-10">
          <Tabs />
          {children}
        </div>
        ) : (
          <div className="text-center text-xl py-7">You have no permissions, go to <Link className="text-red-50 underline" href="/">home page</Link> to continue your journey please.</div>
        )}
      {/* <Footer /> */}
    </>
  )
}
