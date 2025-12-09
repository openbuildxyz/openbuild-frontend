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

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/Button';

import type { PublishActionProps } from './typing';

function PublishAction({ className, entityId, collectionUrl, updateAction }: PublishActionProps) {
  const [publishing, setPublishing] = useState(false);
  const { push } = useRouter();

  const publish  = async () => {
    setPublishing(true);
    const res = await updateAction({ id: entityId, status: 4 });
    setPublishing(false);
    if (res.success) {
      push(collectionUrl);
    }
  };

  return (
    <Button loading={publishing} onClick={() => publish()} className={clsx('w-[142px]', className)}>
      Publish
    </Button>
  );
}

export default PublishAction;
