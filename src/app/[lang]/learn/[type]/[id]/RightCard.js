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

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect, Fragment, useRef, useMemo } from 'react'
import { Button } from '@/components/Button'
import { useSession } from 'next-auth/react'
import { CheckIcon } from '@heroicons/react/20/solid'
// import { currentTime } from '@/utils/date'
import { useMediaUrl } from '#/state/application/hooks'
import { joinChallengesEnrool, pay } from '#/services/learn/'

// import { USDTIcon } from '@/components/Icons'
import { EmailModal } from './EmailModal'

import { enrollAction, revalidatePathAction } from './actions'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import { waitForTransaction } from '@wagmi/core'

import { useConnectModal } from '@rainbow-me/rainbowkit'

import { useAccount, useNetwork, useSwitchNetwork, erc20ABI } from 'wagmi'
// import { getBalance } from '@wagmi/core'
// import { prepareWriteContract, writeContract } from '@wagmi/core'
import { parseUnits } from '@ethersproject/units'
import clsx from 'clsx'
import { writeContract } from '@wagmi/core'
import { TimeAndLocation } from '../ChallengesCard'
import { USDTIcon } from '@/components/Icons'

import { Dialog, Transition } from '@headlessui/react'
import TicketEPic from 'public/images/ticket-e.svg'
import TicketBgPic from 'public/images/ticket-bg.svg'
import { TwitterIcon, DownloadIcon } from '@/components/Icons'
import QRCode from 'react-qr-code';
import { toBlob } from 'html-to-image';

import { formatTime } from '@/utils/date'
import { saveAs } from 'file-saver'

import { resolvePathWithSearch } from '@/utils/url'

const EnrollModal = dynamic(() => import('./EnrollModal'), {
  ssr: false,
})

function ButtonGroup({ data, permission, loading, type, apply, enroll, switchLoading, payLoading, isPay, payment }) {
  const router = useRouter()
  const { status } = useSession()

  // const chainid = data.challenges_extra.course_challenges_extra_chain_id
  // const { chain } = useNetwork()
  // console.log(chain?.id)
  // console.log(chainid)

  // const balance = getBalance(config, {
  //   address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  // })

  // console.log(data)

  return <div>
    {data?.challenges_extra && data?.challenges_extra.course_challenges_extra_time_order === 0 ? (
      <div className="pb-6">
        <Button disabled fullWidth className={'flex-1'} >
          Closed
        </Button>
      </div>
    ) : (
      <div className="pb-6 flex gap-2">
        {data.base.course_series_quiz_id !== 0 && <Button
          onClick={() => window.open(`/quiz/${data.base.course_series_quiz_id}`)}
          fullWidth
          variant={'outlined'}
          className={'flex-1'}
        >
          Quiz
        </Button>}
        {(permission?.course_user_permission_status === 0 || status === 'unauthenticated') &&(
          <Button
            loading={loading}
            onClick={() => type === 'challenges' ? apply() : enroll()}
            fullWidth
            className={'flex-1'}
          >
            {type === 'challenges' ? 'Apply to Join ' : 'Enroll'}
            {type === 'challenges' && (
              data.challenges_extra?.course_challenges_extra_feeds_type === 'free' ? '(Free)' :
              <div className="flex items-center">
                <USDTIcon className="h-[14px] w-[14px] mr-1" /> {data.challenges_extra?.course_challenges_extra_feeds_amount} USDT
              </div>
            )}
          </Button>
        )}
        {permission?.course_user_permission_status === 3 && status === 'authenticated' && data.challenges_extra?.course_challenges_extra_feeds_type === 'deposit' && (
          <div>
            <Button
              loading={switchLoading || payLoading}
              disabled={isPay}
              onClick={() =>
                data.challenges_extra &&
                payment(
                  data.challenges_extra.course_challenges_extra_chain_id,
                  data.challenges_extra.course_challenges_extra_feeds_receive,
                  Number(data.challenges_extra.course_challenges_extra_feeds_amount)
                )
              }
              fullWidth
              className={'flex-1'}
            >
              {switchLoading ? 'Switching...' : 'Payment'}
            </Button>
            <p className="mt-2 text-center text-xs text-red">
              Pay amount: {data.challenges_extra?.course_challenges_extra_feeds_amount} USDT
            </p>
          </div>
        )}

        {permission?.course_user_permission_status === 1 && type === 'courses' && (
          <Button
            onClick={() => {
              if (data?.courses?.length > 0) {
                if (data.courses[0].base.course_single_content === '') {
                  toast.info('The content has not been made public, please contact the publisher')
                } else {
                  router.push(`/learn/${type}/${data.base.course_series_id}/${data.courses[0].base.course_single_id}`)
                }
              } else {
                toast.error('There is no course for the time being')
              }
            }}
            fullWidth
            className={'flex-1'}
          >
            Proceed to course
          </Button>
        )}
        {(permission?.course_user_permission_status === 1 && type === 'challenges') && (
          <Button disabled fullWidth className={'flex-1'} >
            Applied
          </Button>
        )}
        {(permission?.course_user_permission_status === 2 || permission?.course_user_permission_status === 4) && (
          <Button disabled fullWidth className={'flex-1'} >
            Completed
          </Button>
        )}
        {permission?.course_user_permission_status === -1 && (
          <Button disabled fullWidth className={'flex-1'} >
            Under review
          </Button>
        )}
        {permission?.course_user_permission_status === -2 && (
          <Button disabled fullWidth className={'flex-1'} >
            Audit failed
          </Button>
        )}
      </div>
    )}
  </div>
}

export function LearnRightCard({ data, type, permission }) {
  // const { data: walletClient } = useWalletClient()
  const searchParams = useSearchParams()
  const mediaUrl = useMediaUrl()
  const { status } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const { isConnected } = useAccount()

  const [loading, setLoading] = useState(false)

  const [surveyOpen, setSurveyOpen] = useState(false)
  const [surveyJson, setSurveyJson] = useState('')
  const [emailModalopen, setEmailModalopen] = useState(false)
  const [isEmailVerify, setIsEmailVerify] = useState(false)

  const [payLoading, setPayLoading] = useState(false)
  const [isPay, setIsPay] = useState(false)
  const { chain } = useNetwork()
  const { isLoading: switchLoading, switchNetwork } = useSwitchNetwork()
  const { openConnectModal } = useConnectModal();
  const sourceFrom = useMemo(() => encodeURIComponent(resolvePathWithSearch(pathname, searchParams)), [pathname, searchParams])

  const enroll = async () => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${sourceFrom}`)
    }
    setLoading(true)
    const res = await enrollAction(data.base.course_series_id)
    if (res) {
      toast.error(res.message)
    }
    setLoading(false)
  }
  const apply = useCallback(async () => {
    const cExtra = data?.challenges_extra
    const cExtraSchema = cExtra?.course_challenges_extra_check_schema
    if (cExtra?.course_challenges_extra_external_url !== '') {
      window.open(data.challenges_extra?.course_challenges_extra_external_url)
      return
    }
    if (status === 'unauthenticated') {
      if (cExtra?.course_challenges_extra_need_login) {
        router.push(`/signin?from=${sourceFrom}`)
      } else {
        setEmailModalopen(true)
        return
      }
    } else {
      if ( cExtraSchema === '' || cExtraSchema === '{"logoPosition":"right"}' || cExtraSchema === '{}' ) {
        setLoading(true)
        const res = await joinChallengesEnrool(data.base.course_series_id, '', { code: window.localStorage.getItem('shareCode') || '' })
        if (res?.code === 200) {
          toast.success('Apply successfully')
          revalidatePathAction()
        } else {
          toast.error(res.message)
        }
      } else {
        setSurveyOpen(true)
        setSurveyJson(cExtra.course_challenges_extra_check_schema)
        setLoading(false)
      }
    }
  }, [data, pathname, router, status])

  useEffect(() => {
    if (isEmailVerify && permission?.course_user_permission_status === 0) {
      apply()
    }
  }, [isEmailVerify, apply, permission])

  const payment = async (chainId, toAddress, amount) => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${sourceFrom}`)
    }
    if (!isConnected) {
      openConnectModal()
      return
    }
    if (chain?.id !== chainId) {
      switchNetwork?.(chainId)
      return
    }
    const _amount = parseUnits(amount.toString(), 18)
    setPayLoading(true)
    try {
      if (!data.challenges_extra?.course_challenges_extra_feeds_contract || !data.base.course_series_id) return
      // const config = await prepareWriteContract({
      //   address: data.challenges_extra?.course_challenges_extra_feeds_contract,
      //   abi: erc20ABI,
      //   functionName: 'transfer',
      //   args: [toAddress, _amount],
      // })
      const { hash } = await writeContract({
        address: data.challenges_extra?.course_challenges_extra_feeds_contract,
        abi: erc20ABI,
        functionName: 'transfer',
        args: [toAddress, _amount],
      })
      await waitForTransaction({ hash })
      setIsPay(true)
      const res = await pay(data.base.course_series_id, hash)
      if (res.code === 200) {
        revalidatePathAction()
        toast.success('Transaction successful')
      } else {
        toast.error('Transaction failed')
      }
      setPayLoading(false)
    } catch {
      setPayLoading(false)
      toast.error('Insufficient balance')
    }
  }

  const [width, setWidth] = useState()
  const [enrollModalOpen, setEnrollModalOpen] = useState(width < 1024 ? false : true)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    const shareCode = searchParams.get('code')
    if (shareCode && shareCode !== '') {
      window.localStorage.setItem('shareCode', shareCode)
    }
    setWidth(window.innerWidth)
  }, [searchParams])

  useEffect(() => {
    if (width > 1024) {
      setEnrollModalOpen(true)
    } else {
      setEnrollModalOpen(false)
    }
  }, [width])

  const [open, setOpen] = useState(false)

  const elementRef = useRef(null)
  const download = useCallback(() => {
    // console.log(elementRef)
    toBlob(elementRef.current, { cacheBust: true }).then(function (blob) {
      console.log(blob)
      saveAs(blob, 'openbuild-ticket.png');
    })
  }, [elementRef])

  return (
    <div
      className={clsx(
        'w-[320px] min-w-[320px] lg:top-[110px] lg:h-fit rounded-t-xl transition-all max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:z-[11] max-lg:w-full max-lg:overflow-auto max-lg:bg-white max-lg:px-6 max-lg:shadow-2xl lg:ml-14 lg:mt-6',
        {
          'max-lg:pt-4': enrollModalOpen,
          'max-lg:h-[calc(100vh-85px)]': enrollModalOpen,
          'max-lg:pt-2': !enrollModalOpen,
          'max-lg:h-[120px]': !enrollModalOpen,
        }
      )}
    >
      {!enrollModalOpen && (
        <div>
          <div onClick={() => setEnrollModalOpen(true)} className="flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <path d="M12 12L8 8L4 12" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8L8 4L4 8" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <span className="my-3 opacity-40">More</span>
          </div>

          <ButtonGroup
            data={data}
            permission={permission}
            loading={loading}
            type={type}
            apply={apply}
            enroll={enroll}
            switchLoading={switchLoading}
            payLoading={payLoading}
            isPay={isPay}
            payment={payment}
          />
        </div>
      )}
      {enrollModalOpen && (
        <div className="mb-4 flex justify-end lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8 cursor-pointer rounded border border-gray-1400 p-1"
            onClick={() => setEnrollModalOpen(false)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" className="text-gray-100" />
          </svg>
        </div>
      )}
      {enrollModalOpen && (
        <div>
          <div suppressHydrationWarning={true} className="relative aspect-[16/9] overflow-hidden mb-6">
            {mediaUrl && data.base.course_series_img && (
              <Image
                width={500}
                height={281}
                src={mediaUrl + data.base.course_series_img}
                alt=""
                className="aspect-[16/9] w-full rounded object-cover transition-all group-hover:scale-110"
              />
            )}
          </div>
          {type === 'challenges' && <div className="my-4">
            <TimeAndLocation data={data} from={'rc'} openTicket={() => setOpen(true)} permission={permission} type={type}  />
            <Transition appear show={open} as={Fragment}>
              <Dialog as="div" className="relative z-[999]" onClose={() => setOpen(false)}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-[#1A1A1A] bg-opacity-60" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Dialog.Panel className="w-[800px] pr-4 pt-4 transform overflow-hidden rounded-2xl bg-transparent text-left align-middle shadow-xl transition-all">
                        <div className="relative flex download_viewport items-center"  ref={elementRef}>
                          <svg
                            onClick={() => setOpen(false)}
                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-[-6px] top-[-16px] z-[10000] cursor-pointer">
                            <path d="M2.6665 2.66797L13.3332 13.3346" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.6665 13.3346L13.3332 2.66797" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <div className="w-[464px] h-[280px] relative">
                            <Image src={TicketBgPic} alt="" className="absolute z-[1000] w-full h-full top-0 left-0" />
                            {
                              mediaUrl && data &&
                              <Image
                                width={400}
                                height={216}
                                src={mediaUrl + data?.base.course_series_img}
                                alt=""
                                className="w-[400px] h-[216px] absolute z-[1001] left-8 top-8 object-fill rounded-lg"
                              />
                            }

                            <Image src={TicketEPic} alt="" className="absolute z-[1002] top-0 left-0" />
                          </div>
                          <svg width="2" height="248" viewBox="0 0 2 248" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="1" x2="0.999989" y2="247" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5"/>
                          </svg>

                          <div className="h-[280px] flex-1 w-auto bg-ticketLocation rounded-lg p-5 flex flex-col">
                            <div className="flex-1">
                              <h3 className="text-xl leading-6">{data?.base.course_series_title}</h3>
                              <div className="flex mr-3 mt-3">
                                <i className="w-[45px] mr-3 text-xs">Time</i>
                                <p className="text-sm text-gray">
                                  {formatTime(data.challenges_extra.course_challenges_extra_start_date * 1000, 'YYYY/MM/DD')} -{' '}
                                  {formatTime(data.challenges_extra.course_challenges_extra_end_date * 1000, 'MM/DD')}
                                  {data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11) && <span className="text-xs h-4 py-[2px]">{data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11)}</span>}
                                </p>
                                {/* <p className="text-sm font-bold">2023/05/05 06/06 <span className="text-xs">(UTC+8)</span></p> */}
                              </div>
                              <div className="flex mt-2">
                                <i className="w-[45px] mr-3 text-xs">Location</i>
                                <p className="text-sm font-bold">
                                  {
                                    data?.challenges_extra.course_challenges_extra_online ?
                                    'Online'
                                    :
                                    data?.challenges_extra.course_challenges_extra_country + ', ' +
                                    data?.challenges_extra.course_challenges_extra_city + ', ' +
                                    data?.challenges_extra.course_challenges_extra_offline_address
                                  }
                                </p>
                              </div>
                            </div>

                            <hr className="border-t border-dashed border-black my-4" />
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                {<Image className="border-2 mr-[5px] border-white rounded-full w-[42px] h-[42px]" width={42} height={42} src={mediaUrl + data?.team_user?.user_avatar} alt="" />}
                                <div>
                                  <p className="text-xs">
                                    <a href={`/u/${data?.team_user?.user_handle}`}>{data?.team_user?.user_nick_name}</a>
                                  </p>
                                  <p className="text-xs font-bold mr-1">Booking ID</p>
                                </div>
                              </div>
                              <div className="h-[60px] w-[60px] rounded bg-white p-1 overflow-hidden">
                                <QRCode size={256}  style={{ maxWidth: '100%', width: '100%', height: '100%' }} value={window.location.href} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div className="h-[64px] mt-8 flex text-sm w-[470px] bg-white rounded-xl p-[6px]">
                            <span
                              onClick={
                                () => window.open(`https://twitter.com/intent/tweet?&url=${window.location.href}`)
                              }
                              className="flex items-center flex-1 justify-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer">
                              <TwitterIcon className="w-4 h-4 mr-2" /> Share with Twitter
                            </span>
                            <span onClick={() => download()} target="_blank" className="flex items-center flex-1 justify-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer">
                              <DownloadIcon className="mr-2" /> Download pictures
                            </span>
                          </div>
                        </div>
                        {/* <div ></div> */}
                      </Dialog.Panel>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>}
          {data.base.course_series_learn_num > 0 && <div>
            <hr className="border-gray-400" />
            <div className="flex items-center justify-between py-6 text-sm">
              <div suppressHydrationWarning className="flex [&>img]:ml-[-8px] [&>img]:rounded-full [&>img]:border [&>img]:border-white [&>img:first-child]:ml-0">
                {mediaUrl &&
                  data.enrool_users
                    .slice(0, 10)
                    .map(i => (
                      <Image
                        key={`courses-enrool-users-${i.user_nick_name}`}
                        width={24}
                        height={24}
                        src={mediaUrl + i.user_avatar}
                        alt=""
                        className="h-6 w-6 object-cover"
                      />
                    ))}
                {data.enrool_users.length > 10 && <span className="ml-[-8px] w-6 h-6 inline-block rounded-full bg-white text-center leading-4">...</span>}
              </div>
              <p>{data.base.course_series_learn_num} Builders</p>
            </div>
          </div>}


          {/* {type === 'challenges' && (
            <>
              <hr className="border-gray-400" />
              <div className="flex items-center justify-between py-6">
                <p className="text-sm">
                  By <strong>{data.team_user.user_nick_name}</strong>
                </p>
                {data.challenges_extra?.course_challenges_extra_feeds_type === 'free' ? (
                  <span className="text-lg leading-6 font-bold">Free</span>
                ) : (
                  <div className="flex">
                    <USDTIcon className="h-5 w-5" />
                    <p className="ml-[6px] mr-1 text-[22px] font-bold leading-6">
                      {data.challenges_extra?.course_challenges_extra_feeds_amount}
                    </p>
                    <span className="text-sm">USDT</span>
                  </div>
                )}
              </div>
            </>
          )} */}
          <ButtonGroup
            data={data}
            permission={permission}
            loading={loading}
            type={type}
            apply={apply}
            enroll={enroll}
            switchLoading={switchLoading}
            payLoading={payLoading}
            isPay={isPay}
            payment={payment}
          />

          <hr className="border-gray-400" />
          {data?.base?.course_series_requirement?.length > 0 && <div className="py-4">
            <h6 className="font-bold leading-6 ">Requirements</h6>
            {data?.base?.course_series_requirement?.map((i, k) => (
              <div key={`requirements-${k}`} className="mt-3 flex items-center text-sm">
                {i !== '' && (
                  <div className="flex items-start text-sm">
                    <span className="mr-3 relative top-[1px]">•</span>
                    <p className="flex-1 text-sm">{i}</p>
                  </div>
                )}
              </div>
            ))}
          </div>}
          {data?.base?.course_series_requirement?.length > 0 && <hr className="border-gray-400" />}
          {
            data?.base?.course_series_what_content?.length > 0 && <div className="py-4 pb-14">
              <h6 className="font-bold leading-6 ">Take Away</h6>
              {data?.base?.course_series_what_content?.map(
                (i, k) =>
                  i !== '' && (
                    <div key={`requirements-${k}`} className="mt-3 flex items-start text-sm">
                      <CheckIcon className="mr-1 h-4 w-4 relative top-[3px]" />
                      <p className="flex-1">{i}</p>
                    </div>
                  )
              )}
            </div>
          }

        </div>
      )}

      <EmailModal
        open={emailModalopen}
        closeModal={() => setEmailModalopen(false)}
        data={data}
        successCallback={() => {
          setEmailModalopen(false)
          setIsEmailVerify(true)
          setSurveyJson(data.challenges_extra?.course_challenges_extra_check_schema)
        }}
      />
      {surveyJson !== '' && surveyJson && (
        <EnrollModal
          open={surveyOpen}
          closeModal={() => setSurveyOpen(false)}
          id={data.base.course_series_id}
          json={surveyJson}
          successCallback={() => {
            setSurveyOpen(false)
            revalidatePathAction()
          }}
        />
      )}
    </div>
  )
}
