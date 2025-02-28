/**
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

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { waitForTransaction } from '@wagmi/core';
import { writeContract } from '@wagmi/core';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useNetwork, useSwitchNetwork, erc20ABI } from 'wagmi';

import { Button } from '@/components/Button';
// import { getBalance } from '@wagmi/core'
// import { prepareWriteContract, writeContract } from '@wagmi/core'
import { CheckIcon } from '@/components/icon/solid';
import { USDTIcon } from '@/components/Icons';
import useMounted from '@/hooks/useMounted';
import { resolvePathWithSearch } from '@/utils/url';
import { parseTokenUnits } from '@/utils/web3';

import DatePlaceWidget from '#/domain/challenge/widgets/date-place';
import { joinChallengesEnrool, pay } from '#/services/learn/';
// import { currentTime } from '@/utils/date'
import { useMediaUrl } from '#/state/application/hooks';

import { enrollAction, revalidatePathAction } from '../../../app/learn/[type]/[id]/actions';
// import { USDTIcon } from '@/components/Icons'
import EmailModal from './EmailModal';

const EnrollModal = dynamic(() => import('./EnrollModal'), { ssr: false });

function ButtonGroup({
  data,
  permission,
  loading,
  type,
  apply,
  enroll,
  switchLoading,
  payLoading,
  isPay,
  payment,
  related,
}) {
  const router = useRouter();
  const { status } = useSession();

  // const chainid = data.challenges_extra.course_challenges_extra_chain_id
  // const { chain } = useNetwork()
  // console.log(chain?.id)
  // console.log(chainid)

  // const balance = getBalance(config, {
  //   address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  // })

  // console.log(data)

  if (data?.challenges_extra && data?.challenges_extra.course_challenges_extra_time_order === 0) {
    let buttonText = 'Closed';
    let handleClick;

    if (related) {
      buttonText = 'Enroll in course';
      handleClick = () => router.push(`/learn/courses/${related.link}`);
    }

    return (
      <div>
        <div className="pb-6">
          <Button disabled={!handleClick} fullWidth className="flex-1" onClick={handleClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-6 flex gap-2">
        {data.base.course_series_quiz_id !== 0 && (
          <Button
            onClick={() => window.open(`/quiz/${data.base.course_series_quiz_id}`)}
            fullWidth
            variant={'outlined'}
            className={'flex-1'}
          >
            Quiz
          </Button>
        )}
        {(permission?.course_user_permission_status === 0 || status === 'unauthenticated') && (
          <Button
            loading={loading}
            onClick={() => (type === 'challenges' ? apply() : enroll())}
            fullWidth
            className={'flex-1'}
          >
            {type === 'challenges' ? 'Apply to Join ' : 'Enroll'}
            {type === 'challenges' &&
              (data.challenges_extra?.course_challenges_extra_feeds_type === 'free' ? (
                '(Free)'
              ) : (
                <div className="flex items-center">
                  <USDTIcon className="h-[14px] w-[14px] mr-1" />{' '}
                  {data.challenges_extra?.course_challenges_extra_feeds_amount} USDT
                </div>
              ))}
          </Button>
        )}
        {permission?.course_user_permission_status === 3 &&
          status === 'authenticated' &&
          data.challenges_extra?.course_challenges_extra_feeds_type === 'deposit' && (
          <div>
            <Button
              loading={switchLoading || payLoading}
              disabled={isPay}
              onClick={() =>
                data.challenges_extra &&
                  payment(
                    data.challenges_extra.course_challenges_extra_chain_id,
                    data.challenges_extra.course_challenges_extra_feeds_receive,
                    Number(data.challenges_extra.course_challenges_extra_feeds_amount),
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
                  toast.info('The content has not been made public, please contact the publisher');
                } else {
                  router.push(`/learn/${type}/${data.base.course_series_id}/${data.courses[0].base.course_single_id}`);
                }
              } else {
                toast.error('There is no course for the time being');
              }
            }}
            fullWidth
            className={'flex-1'}
          >
            Proceed to course
          </Button>
        )}
        {permission?.course_user_permission_status === 1 && type === 'challenges' && (
          <Button disabled fullWidth className={'flex-1'}>
            Applied
          </Button>
        )}
        {(permission?.course_user_permission_status === 2 || permission?.course_user_permission_status === 4) && (
          <Button disabled fullWidth className={'flex-1'}>
            Completed
          </Button>
        )}
        {permission?.course_user_permission_status === -1 && (
          <Button disabled fullWidth className={'flex-1'}>
            Under review
          </Button>
        )}
        {permission?.course_user_permission_status === -2 && (
          <Button disabled fullWidth className={'flex-1'}>
            Audit failed
          </Button>
        )}
      </div>
    </div>
  );
}

export default function LearnRightCard({ data, type, permission, related }) {
  // const { data: walletClient } = useWalletClient()
  const searchParams = useSearchParams();
  const mediaUrl = useMediaUrl();
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const { isConnected } = useAccount();

  const [loading, setLoading] = useState(false);

  const [surveyOpen, setSurveyOpen] = useState(false);
  const [surveyJson, setSurveyJson] = useState('');
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [isEmailVerify, setIsEmailVerify] = useState(false);

  const [payLoading, setPayLoading] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const { chain } = useNetwork();
  const { isLoading: switchLoading, switchNetwork } = useSwitchNetwork();
  const { openConnectModal } = useConnectModal();
  const sourceFrom = useMemo(
    () => encodeURIComponent(resolvePathWithSearch(pathname, searchParams)),
    [pathname, searchParams],
  );

  const enroll = async () => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${sourceFrom}`);
    }
    setLoading(true);
    const res = await enrollAction(data.base.course_series_id);
    if (res) {
      toast.error(res.message);
    }
    setLoading(false);
  };
  const apply = useCallback(async () => {
    const cExtra = data?.challenges_extra;
    const cExtraSchema = cExtra?.course_challenges_extra_check_schema;
    if (cExtra?.course_challenges_extra_external_url !== '') {
      window.open(data.challenges_extra?.course_challenges_extra_external_url);
      return;
    }
    if (status === 'unauthenticated') {
      if (cExtra?.course_challenges_extra_need_login) {
        router.push(`/signin?from=${sourceFrom}`);
      } else {
        setEmailModalOpen(true);
        return;
      }
    } else {
      if (cExtraSchema === '' || cExtraSchema === '{"logoPosition":"right"}' || cExtraSchema === '{}') {
        setLoading(true);
        const res = await joinChallengesEnrool(data.base.course_series_id, '', {
          code: window.localStorage.getItem('shareCode') || '',
        });
        if (res?.code === 200) {
          toast.success('Apply successfully');
          revalidatePathAction();
        } else {
          toast.error(res.message);
        }
      } else {
        setSurveyOpen(true);
        setSurveyJson(cExtra.course_challenges_extra_check_schema);
        setLoading(false);
      }
    }
  }, [data, pathname, router, status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isEmailVerify && permission?.course_user_permission_status === 0) {
      apply();
    }
  }, [isEmailVerify, apply, permission]);

  const payment = async (chainId, toAddress, amount) => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${sourceFrom}`);
    }
    if (!isConnected) {
      openConnectModal();
      return;
    }
    if (chain?.id !== chainId) {
      switchNetwork?.(chainId);
      return;
    }
    const _amount = parseTokenUnits(amount.toString(), 18);
    setPayLoading(true);
    try {
      if (!data.challenges_extra?.course_challenges_extra_feeds_contract || !data.base.course_series_id) return;
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
      });
      await waitForTransaction({ hash });
      setIsPay(true);
      const res = await pay(data.base.course_series_id, hash);
      if (res.code === 200) {
        revalidatePathAction();
        toast.success('Transaction successful');
      } else {
        toast.error('Transaction failed');
      }
      setPayLoading(false);
    } catch {
      setPayLoading(false);
      toast.error('Insufficient balance');
    }
  };

  const [width, setWidth] = useState();
  const [enrollModalOpen, setEnrollModalOpen] = useState(width < 1024 ? false : true);

  useMounted(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    const shareCode = searchParams.get('code');
    if (shareCode && shareCode !== '') {
      window.localStorage.setItem('shareCode', shareCode);
    }
    setWidth(window.innerWidth);
  }, [searchParams]);

  useEffect(() => {
    if (width > 1024) {
      setEnrollModalOpen(true);
    } else {
      setEnrollModalOpen(false);
    }
  }, [width]);

  return (
    <div
      className={clsx(
        'w-[320px] min-w-[320px] lg:top-[110px] lg:h-fit rounded-t-xl transition-all max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:z-[11] max-lg:w-full max-lg:overflow-auto max-lg:bg-white max-lg:px-6 max-lg:shadow-2xl lg:ml-14 lg:mt-6',
        {
          'max-lg:pt-4': enrollModalOpen,
          'max-lg:h-[calc(100vh-85px)]': enrollModalOpen,
          'max-lg:pt-2': !enrollModalOpen,
          'max-lg:h-[120px]': !enrollModalOpen,
        },
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
            related={related}
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
          {type === 'challenges' && (
            <div className="my-4">
              <DatePlaceWidget
                data={data}
                showTicket={!data?.challenges_extra.course_challenges_extra_online && (permission?.course_user_permission_status === 1)}
              />
            </div>
          )}
          {data.base.course_series_learn_num > 0 && (
            <div>
              <hr className="border-gray-400" />
              <div className="flex items-center justify-between py-6 text-sm">
                <div
                  suppressHydrationWarning
                  className="flex [&>img]:ml-[-8px] [&>img]:rounded-full [&>img]:border [&>img]:border-white [&>img:first-child]:ml-0"
                >
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
                  {data.enrool_users.length > 10 && (
                    <span className="ml-[-8px] w-6 h-6 inline-block rounded-full bg-white text-center leading-4">
                      ...
                    </span>
                  )}
                </div>
                <p>{data.base.course_series_learn_num} Builders</p>
              </div>
            </div>
          )}

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
            related={related}
          />

          <hr className="border-gray-400" />
          {data?.base?.course_series_requirement?.length > 0 && (
            <div className="py-4">
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
            </div>
          )}
          {data?.base?.course_series_requirement?.length > 0 && <hr className="border-gray-400" />}
          {data?.base?.course_series_what_content?.length > 0 && (
            <div className="py-4 pb-14">
              <h6 className="font-bold leading-6 ">Take Away</h6>
              {data?.base?.course_series_what_content?.map(
                (i, k) =>
                  i !== '' && (
                    <div key={`requirements-${k}`} className="mt-3 flex items-start text-sm">
                      <CheckIcon className="mr-1 h-4 w-4 relative top-[3px]" />
                      <p className="flex-1">{i}</p>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      )}

      <EmailModal
        open={emailModalOpen}
        closeModal={() => setEmailModalOpen(false)}
        data={data}
        successCallback={() => {
          setEmailModalOpen(false);
          setIsEmailVerify(true);
          setSurveyJson(data.challenges_extra?.course_challenges_extra_check_schema);
        }}
      />
      {surveyJson !== '' && surveyJson && (
        <EnrollModal
          open={surveyOpen}
          closeModal={() => setSurveyOpen(false)}
          id={data.base.course_series_id}
          json={surveyJson}
          successCallback={() => {
            setSurveyOpen(false);
            revalidatePathAction();
          }}
        />
      )}
    </div>
  );
}
