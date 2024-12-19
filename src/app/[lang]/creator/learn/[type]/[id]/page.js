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

import clsx from 'clsx'
// import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { CreatorLearnStepOne } from './StepOne'
import { CreatorLearnStepTwo } from './StepTwo'
import { CreatorLearnStepThree } from './StepThree'
import { CreatorLearnStepFour } from './StepFour'
import { CreatorLearnStepFive } from './StepFive'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@/components/Icons'
import { ChevronDoubleLeftIcon } from '@heroicons/react/20/solid'
// import PreviewIcon from 'public/images/svg/preview.svg'

import useSWR from 'swr'
import { fetcher } from '@/utils/request'
import { addSeries, seriesStatus } from '#/services/creator'
import { Button } from '@/components/Button'
import { toast } from 'react-toastify'

import { Sections } from './Sections'
// import { useDebouncedCallback } from 'use-debounce'
import { useAsyncState } from '@/hooks/useAsyncState'
import useInterval from '@/hooks/useInterval'

export default function LearnPublish({ params }) {
  const [open, setOpen] = useState(true)
  const { replace, push } = useRouter()

  const { data, isLoading } = useSWR(`v1/learn/course/${params.type}/${params.id}`, fetcher)
  const [contents, setContents] = useAsyncState()
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const saveCallback = useCallback(async(isLoading) => {
    if (isLoading) {
      setSaving(true)
    }
    setSaved(false)
    // console.log(contents)
    const res = await addSeries({...contents})
    setSaving(false)
    if (res.code !== 200) {
      toast.error(res.message)
      setSaved(false)
    } else {
      // await mutate({ ...res.data })
      setSaved(true)
    }
  }, [contents])

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  })

  useEffect(() => {
    setContents(data)
  }, [data, setContents])

  const change = useCallback(
    async (key, value, type) => {
      let forms = { ...data }
      if (type === 'challenges') {
        forms.challenges_extra[key] = value
      } else if (key === 'courses') {
        forms.courses = value
      } else if (key === 'speaker') {
        forms.speaker = value
      } else if (key === 'survey') {
        console.log(value, 'valuevaluevaluevaluevaluevalue')
        forms = value

      } else {
        if (key === 'course_series_label_ids') {
          const _val = value.filter(f => f !== '')
          forms.base[key] = Array.from(new Set(_val))
        } else {
          forms.base[key] = value
        }
      }
      await setContents(prevState => ({...prevState, ...forms}))
    }, [data, setContents]
  )

  const Tabs = useMemo(() => {
    const _menus = [{
      name: 'Basic Information',
      id: 'one',
    },
    {
      name: 'Edit Content',
      id: 'two',
    },
    {
      name: 'Chapters',
      id: 'three',
    },{
      name: 'Editorial Speaker',
      id: 'four',
    }]
    params.type === 'challenges' && _menus.push({ name: 'Application Forms', id: 'five', })
    return _menus
  }, [params])

  const sections = [
    {
      title: 'one',
      content: CreatorLearnStepOne
    },
    {
      title: 'two',
      content: CreatorLearnStepTwo
    },
    {
      title: 'three',
      content: CreatorLearnStepThree
    },
    {
      title: 'four',
      content: CreatorLearnStepFour
    },
    {
      title: 'five',
      content: CreatorLearnStepFive
    }
  ]

  const [visibleSection, setVisibleSection] = useState('one');
  const tabsRef = useRef()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop
      const twoTop = document.getElementById('two')?.offsetTop
      const threeTop = document.getElementById('three')?.offsetTop
      const fourTop = document.getElementById('four')?.offsetTop
      const fiveTop = document.getElementById('five')?.offsetTop

      if (scrollTop <= 32) {
        setVisibleSection('one')
      }
      if (scrollTop >= twoTop && scrollTop < threeTop) {
        setVisibleSection('two')
      }
      if (scrollTop >= threeTop && scrollTop < fourTop) {
        setVisibleSection('three')
      }
      if (scrollTop >= fourTop) {
        setVisibleSection('four')
      }
      if (scrollTop >= fiveTop) {
        setVisibleSection('five')
      }
    })
  }, [])

  useInterval(() => {
    if (contents) {
      addSeries({...contents})
        // FIXME:
        // I don't know how to prevent accessing page when user has no permissions for now,
        // so I prevent by this a little tricky way.
        .then(res => {
          if (res.code === 403) {
            toast.error(res.message, {
              onClose: () => replace('/')
            })
          }
        })
    }
  }, 10000)

  const publish  = async () => {
    setPublishing(true)
    const res = await seriesStatus({ id: params.id, status: 4 })
    setPublishing(false)
    if (res?.code === 200) {
      push(`/creator/learn/${params.type}`)
      console.log('success')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div id="creator" className="relative flex w-full">
      {isLoading && <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-[999999999] bg-gray-1100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>}
      <div onClick={() => setOpen(!open)} className={clsx('fixed z-10 left-[405px] top-[110px] w-9 h-9 transition-all !duration-500 border border-gray-400 rounded-full flex items-center justify-center bg-[#F8F8F8] cursor-pointer', {
        'left-[337px]': open
      })}>
        <ChevronDoubleLeftIcon className={clsx('h-[14px] w-[14px] opacity-40 transition-all !duration-500', { 'rotate-180': !open })} />
      </div>
      <div className="w-[355px] relative">
        <div className={clsx(
          'fixed overflow-hidden border-r border-gray-400 pt-6 transition-all !duration-500 w-[355px] h-screen pl-[1px]',
        )}>
          <div className={clsx('overflow-hidden transition-all !duration-500 pl-1', {
            'w-full': open,
            'w-0': !open
          })}>
            <div className="flex items-center mb-6 text-sm cursor-pointer" onClick={() => {
              replace(`/creator/learn/${params.type}`)
            }}>
              <ArrowLeftIcon className="mr-2" />
              Back
            </div>
            <div ref={tabsRef}>
              {Tabs.map((i, k) => (
                <div
                  onClick={() => {
                    const ele = document.getElementById(i.id)
                    window.scrollTo({
                      left: 0,
                      top: ele.offsetTop,
                      behavior: 'smooth',
                    })
                  }}
                  key={`learn-creator-tab-${k}`}
                  className={clsx(
                    'w-[355px] relative flex items-start pb-12 before:absolute before:left-[21px] before:top-[3px] before:h-full before:border-l-2 before:border-[#E8E8E8]',
                    {
                      '!pb-0 before:border-none': k === Tabs.length - 1,

                    }
                  )}
                >
                  <span className={clsx(
                      'h-[42px] w-[42px] top-[5px] z-10 mr-3 flex items-center justify-center rounded-full bg-[#F8F8F8] ring-1 ring-gray text-sm font-bold',
                      {
                        '!bg-[#ECECEC] !ring-0': visibleSection !== i.id,
                        '!bg-gray text-white': visibleSection === i.id,
                      }

                    )}>
                      {
                        visibleSection === i.title ?
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.16669 10.0007L8.33335 14.1673L16.6667 5.83398" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        : k + 1
                      }

                  </span>
                  <div className="flex-1">
                    <h5 className={clsx({'opacity-40': visibleSection === i.title})}>{i.name}</h5>
                    <p className="text-sm opacity-40">{params.type === 'opencourse' ? 'Open course' : 'Challenge'} step {k + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 max-w-3xl w-full min-h-screen pr-14 border-r border-gray-400 pb-[120px]">
        {sections.map((section, index) => (
          params.type === 'opencourse' && index === 4 ?
            null :
            // setStatus={setStatus}
            <Sections {...{ section, setVisibleSection, tabsRef }}  change={change} data={contents} type={params.type} id={params.id} key={index} />
        ))}
      </div>
      <div className="drop-shadow-4xl fixed z-[50] bottom-0 left-0 flex h-[100px] w-full items-center justify-center bg-white">
        <span className="inline-block w-10 mr-[250px] text-xs opacity-40">{saved && 'Saved'}</span>
        <Button variant="outlined" loading={saving} onClick={() => saveCallback(true)} className="w-[142px] mr-3">
          Save
        </Button>
        <Link
          target="_blank"
          href={`/learn/${params.type === 'opencourse' ? 'courses' : 'challenges'}/${params.id}?mode=preview`}
        >
          <Button variant="outlined" className="w-[142px] mr-3">
            Preview
          </Button>
        </Link>
        <Button loading={publishing} onClick={() => publish()} className="w-[142px]">
          Publish
        </Button>
      </div>
    </div>
  )
}
