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

import { ArrowLeftIcon } from '@/components/Icons'
import { Button } from '@/components/Button'
import { Share } from '@/components/Share'
import Link from 'next/link'
import { Modal } from '@/components/Modal'
import { Employers } from './Employers'
import { useState } from 'react'

export function BountiesHeader({data, employers}) {
  const [employersModalOpen, setEmployersModalOpen] = useState(false)
  return (
    <div className="mb-12 flex justify-between">
      <Link href="/bounties" className="flex cursor-pointer items-center">
        <ArrowLeftIcon />
        <span className="ml-4 text-sm">Back to Bounties</span>
      </Link>

      <div className="flex items-center">
        {(
          <Button color={'primary'} className="mr-2 lg:hidden" onClick={() => setEmployersModalOpen(true)}>

            Apply
          </Button>
        )}
        <Share img={null} title={data.title} />
      </div>
      <Modal isOpen={employersModalOpen} closeModal={() => setEmployersModalOpen(false)}>
        <div className="pt-4">
          <Employers mobile id={employers.id} data={employers.data} list={employers.list} />
        </div>
      </Modal>
    </div>
  )
}
