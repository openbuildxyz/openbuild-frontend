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

'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Logo from 'public/images/svg/logo-black.svg';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import CloudflareTurnstile from '@/components/control/cf-turnstile';
import { SvgIcon } from '@/components/Image';
import Loader from '@/components/Loader';
import useMounted from '@/hooks/useMounted';
import { getCopyrightText } from '@/utils/app';

import { setOauthSource } from '#/domain/auth/helper';
import { fetchOauthClientInfo, fetchOauthClientCode } from '#/domain/auth/repository';

import Link from './Link';
import NoteItem from './NoteItem';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clientId = searchParams?.get('client_id');
  const redirectUri = searchParams?.get('redirect_uri');

  const { status } = useSession();

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [clientInfo, setClientInfo] = useState(null);

  function authorize() {
    setDisabled(true);

    fetchOauthClientCode(clientId)
      .then(res => {
        const url = decodeURIComponent(redirectUri);
        const tag = url.includes('?') ? '&' : '?';
        const code = res.data.code ? `${tag}code=${res.data.code}` : '';
        window.location.href = `${url}${code}`;
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  function handleCancel() {
    window.location.href = decodeURIComponent(redirectUri);
  }

  useMounted(() => {
    if (clientId) {
      setLoading(true);
      fetchOauthClientInfo(clientId)
        .then(({ data }) => {
          setClientInfo(data);

          if (data?.action === 1) {
            authorize();
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  useEffect(() => {
    if (status !== 'loading' && status !== 'authenticated') {
      const oauthSrcKey = Date.now().toString(36);
      const encodedParams = `client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      setOauthSource(oauthSrcKey, encodeURIComponent(`${pathname}?${encodedParams}`));
      router.push(`/signin?ob_oauth_src=${oauthSrcKey}`);
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleVerify = token => {
    if (!token)  {
      return;
    }

    setDisabled(false);
  };

  return (
    loading ? <Loader /> : (
      <div className="flex min-h-screen flex-col items-center pt-9 md:pt-[60px] p-4 font-['Nunito_Sans'] relative">
        <div className="relative w-[192px] md:w-[320px]">
          <div className="absolute top-1/2 left-0 w-full border-b-2 border-dashed border-[#d1d9e0]" />
          <div className="flex items-center justify-between py-9">
            <div className="relative bg-white rounded-full size-[60px] md:size-[100px]">
              <Image src={clientInfo?.icon} alt="Logo" className="!size-full" fill />
            </div>
            <div className="flex items-center gap-2 relative">
              <SvgIcon name="circle-check" size={20} />
            </div>
            <div className="relative bg-white rounded-full size-[60px] md:size-[100px]">
              <SvgIcon name="oauth-logo" size={100} className="!size-full" />
            </div>
          </div>
        </div>
        <h1 className="text-[1.5rem] text-center pb-4">Authorize <span>{clientInfo?.name}</span></h1>
        <div className="flex flex-col items-center justify-center text-base md:text-lg leading-6 text-center pb-6 md:pb-9">
          <p className="text-[#1A1A1ACC]">
          Log in with OpenBuild, Authorizing will redirect to
          </p>
          <Link url={clientInfo?.url}>
            {clientInfo?.url}
          </Link>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm mb-[210px] md:w-[500px]">
          <div className="space-y-4 rounded-md mb-6">
            <NoteItem icon="personal" title="Personal user data" description="Email addresses (read-only), profile information (read-only)" />
            <NoteItem icon="international" title="Public data only" description="Limited access to your public data" />
          </div>
          <div className="mx-[-24px] p-6 border-y border-gray-600">
            <CloudflareTurnstile className="mb-2" onVerify={handleVerify} />
            <div className="flex gap-3">
              <Button variant="outlined" className="flex-1" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" className="flex-1" onClick={authorize} disabled={disabled}>
                Authorize
              </Button>
            </div>
          </div>
          <div className="pt-6 flex items-center gap-3">
            <SvgIcon name="lock" size={16} />
            <span className="text-sm leading-6 text-[#1A1A1A99]">
            Developer&apos;s <Link url="#">Privacy Policy</Link> and <Link url="#">Terms</Link> of Service
            </span>
          </div>
        </div>
        <footer className="flex absolute bottom-9 gap-3 items-center">
          <Image className="h-4 w-auto" src={Logo} alt="" />
          <span className="text-sm leading-[24px] opacity-60">{getCopyrightText()}</span>
        </footer>
      </div>
    )
  );
}
