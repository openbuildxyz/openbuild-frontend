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
import Link from 'next/link'
// import { Button } from '@/components/Button'

import { Confirm } from '@/components/Modal/Confirm'

export function ButtonGroup({type, status, id, loading, mutate}) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const confirm = async () => {
    // console.log(id)
    await mutate(id, 4, 'delete')
    setConfirmOpen(false)
  }

  return (
    <div className="col-span-3 flex justify-center">
        <div className="dropdown dropdown-hover">
          <div tabIndex="0" role="button" className="m-1">
            <svg
              className="cursor-pointer"
              width="15"
              height="3"
              viewBox="0 0 15 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.2">
                <rect width="3" height="3" rx="1.5" fill="black" />
                <rect x="6" width="3" height="3" rx="1.5" fill="black" />
                <rect x="12" width="3" height="3" rx="1.5" fill="black" />
              </g>
            </svg>
          </div>
          <ul tabIndex="0" className="dropdown-content z-[30] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href={`/learn/${type === 'opencourse' ? 'courses' : 'challenges'}/${id}?mode=preview`}>
                Preview
              </Link>
            </li>
            {status === 5 && <li><span className="mr-2">Deny</span></li>}
            <li className="text-start px-4 py-2 rounded hover:bg-gray-600 cursor-pointer" onClick={() => {setConfirmOpen(true)}}>
              Delete
            </li>
            <li>
              <Link href={`/creator/learn/${type}/${id}`}>
                Edit
              </Link>
            </li>
            {status === 1 && (
              <li className="flex flex-row items-center justify-start px-4 py-2 rounded hover:bg-gray-600 cursor-pointer" onClick={() => mutate(id, 4)}>
                {loading === id && !confirmOpen && <span className="loading loading-spinner loading-xs h-3 !mask"></span>}
                Publish
              </li>
            )}
            {status === 2 && (
              <li className="flex flex-row items-center justify-start px-4 py-2 rounded hover:bg-gray-600 cursor-pointer" onClick={() => mutate(id, 3)}>
                {loading === id && !confirmOpen && <span className="loading loading-spinner loading-xs h-3 !mask"></span>}
                Offline
              </li>
            )}
            {status === 3 && (
              <li className="flex flex-row items-center justify-start px-4 py-2 rounded hover:bg-gray-600 cursor-pointer" onClick={() => mutate(id, 2)}>
                {loading === id && !confirmOpen && <span className="loading loading-spinner loading-xs h-3 !mask"></span>}
                Online
              </li>
            )}
            {status === 4 && (
              <li className="flex flex-row items-center justify-start px-4 py-2 rounded hover:bg-gray-600 cursor-pointer" onClick={() => mutate(id, 1)}>
                {loading === id && !confirmOpen && <span className="loading loading-spinner loading-xs h-3 !mask"></span>}
                Cancel
              </li>
            )}
            {type === 'challenges' && (
              <li>
                <Link href={`/creator/learn/challenges/${id}/email-template`}>Edit E-mail template</Link>
              </li>
            )}
          </ul>
        </div>


        {/* <Button size="sm" variant="outlined" className="mr-2" >Delete</Button> */}
        {/* <Link href={`/creator/learn/${type}/${id}`}>
          <Button size="sm" variant="outlined" className="mr-2">Edit</Button>
        </Link> */}
        {/* {status === 1 && (
          <Button
            size="sm"
            onClick={() => mutate(id, 4)}
            loading={loading === id && !confirmOpen}

          >
            Publish
          </Button>
        )} */}
        {/* {status === 2 && (
          <Button
            onClick={() => mutate(id, 3)}
            loading={loading=== id && !confirmOpen}
            size="sm"
          >
            Offline
          </Button>
        )}
        {status === 3 && (
          <Button
            onClick={() => mutate(id, 2)}
            loading={loading === id && !confirmOpen}
            size="sm"
          >
            Online
          </Button>
        )}
        {status === 4 && (
          <Button
            onClick={() => mutate(id, 1)}
            loading={loading === id && !confirmOpen}
            size="sm"
          >
            Cancel
          </Button>
        )} */}
        <Confirm
          title="Are you sure?" info={`After confirming, the ${type === 'opencourse' ? 'course' : 'challenge'} you selected will be deleted.`}
          open={confirmOpen}
          closeModal={() => {
            setConfirmOpen(false)
          }}
          confirmEvt={confirm}
          loading={loading === id}
        />
      </div>

  )
}

export function Status({status}) {
  return <p className="col-span-1">
    {status === 1 && <span>Draft</span>}
    {status === 2 && <span>Online</span>}
    {status === 3 && <span>Offline</span>}
    {status === 4 && <span>Under review</span>}
    {status === 5 && <span>Deny</span>}
  </p>
}
