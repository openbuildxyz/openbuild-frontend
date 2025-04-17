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
import { useState, useCallback, useEffect } from 'react';

import { Button } from '@/components/Button';

import type { SaveActionProps } from './typing';

function SaveAction({ className, entity, updateAction }: SaveActionProps) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const saveCallback = useCallback(async isLoading => {
    if (isLoading) {
      setSaving(true);
    }
    setSaved(false);
    const res = await updateAction({...entity});
    setSaving(false);
    setSaved(res.success);
  }, [entity, updateAction]);

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  return (
    <>
      <span className="inline-block w-10 mr-[250px] text-xs opacity-40">{saved && 'Saved'}</span>
      <Button variant="outlined" loading={saving} onClick={() => saveCallback(true)} className={clsx('w-[142px]', className)}>
        Save
      </Button>
    </>
  );
}

export default SaveAction;
