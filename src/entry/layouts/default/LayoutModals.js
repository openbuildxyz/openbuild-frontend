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

'use client';

import { BindEmailModal } from './BindEmailModal';
import { useUser } from '#/state/application/hooks';
import { useEffect } from 'react';
import { useModalOpen, useBindEmailModalToggle } from '#/state/application/hooks';
import { setOpenModal } from '#/state/application/reducer';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '#/state/hooks';
import { usePathname } from 'next/navigation';

export function LayoutModals() {
  const pathname = usePathname();
  const { status } = useSession();
  const bindEmailModalToggle = useBindEmailModalToggle();
  const modalOpen = useModalOpen('BIND_EMAIL');
  const user = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLandingPage = pathname === '/';
    const isSign = pathname?.includes('signin') || pathname?.includes('signup');
    const bindEmail = user?.binds.find(f => f.auth_user_bind_type === 'email');
    if (user !== null && !isLandingPage && !isSign) {
      if (!bindEmail && status === 'authenticated') {
        !modalOpen && bindEmailModalToggle();
      } else {
        dispatch(setOpenModal(false));
      }
    }
  }, [user, bindEmailModalToggle, modalOpen, status, dispatch, pathname]);

  return (
    <div>
      <BindEmailModal />
    </div>
  );
}
