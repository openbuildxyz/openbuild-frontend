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
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { isFunction } from '@/utils';

const signedInRequired = [
  'profile',
  'dashboard',
  pathname => pathname.includes('creator') && !pathname.startsWith('/u'),
  'shilling-myself',
];

export function RouteIntercept() {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      status === 'unauthenticated' &&
      // FIXME: use a more precise way to judge instead of `includes`
      signedInRequired.some(checker => isFunction(checker) ? checker(pathname) : pathname.includes(checker))
    ) {
      router.push(`/signin?from=${pathname}`);
    }
    // if (status === 'authenticated' && (pathname.startsWith('/signin') || pathname.startsWith('/signup'))) {
    //   router.push('/profile')
    // }
  }, [pathname, router, status]);

  return null;
}
