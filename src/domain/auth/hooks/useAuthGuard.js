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

import { useCallback } from 'react';
import { isFunction } from 'lodash';
import { useSession } from 'next-auth/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { resolvePathWithSearch } from '@/utils/url';

const useAuthGuard = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { status } = useSession();

  const withAuth = useCallback(callback => {
    if (status !== 'authenticated') {
      const signInPath = `/signin?from=${encodeURIComponent(resolvePathWithSearch(pathname, searchParams))}`;
      router.push(signInPath);
    } else {
      isFunction(callback) && callback();
    }
  }, [status, pathname, searchParams, router]);

  return {
    withAuth,
    status,
  };
};

export default useAuthGuard;
