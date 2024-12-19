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

import { ArrowLeftIcon, EditIcon } from '@/components/Icons'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { Share } from '@/components/Share'
import Link from 'next/link'
import { useUser } from '#/state/application/hooks'

export function Header({ id, setOpen, data }) {
  const router = useRouter()
  const user = useUser()
  // console.log(data)
  return (
    <div className="mb-8 flex justify-between">
      <div onClick={() => router.push('/shilling')} className="flex cursor-pointer items-center">
        <ArrowLeftIcon />
        <span className="ml-4 text-sm">Back to SkillHub</span>
      </div>
      <div className="flex items-center">
        {user?.base.user_id === Number(id) && (
          <Link
            href="/shilling-myself"
            className="mr-2 flex h-8  cursor-pointer items-center justify-center rounded-md bg-gray-900 px-2 py-1 text-sm"
          >
            <EditIcon className="mr-2" /> Shilling Myself
          </Link>
        )}

        {setOpen && (
          <Button variant="contained" className="mr-2 h-8 lg:hidden" onClick={() => setOpen(true)}>
            Apply
          </Button>
        )}
        <Share img={null} title={data.title} />
      </div>
    </div>
  )
}
