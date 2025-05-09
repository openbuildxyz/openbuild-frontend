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

import { useCallback, useEffect } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { useAppDispatch } from '../hooks';
import { updateConfig, updateOpenFilter, updateLessonMenu } from './reducer';

export default function Updater({ datas }) {
  const dispatch = useAppDispatch();
  const isMobile = !useMediaQuery('(min-width: 768px)');
  const isNotLg = useMediaQuery('(min-width: 1024px)');
  const gc = useCallback(async () => {
    if (datas?.configs?.success) {
      dispatch(updateConfig(datas.configs.data.list));
    }
  }, [dispatch, datas]);
  useEffect(() => {
    gc();
  }, [gc]);
  useEffect(() => {
    isMobile && dispatch(updateOpenFilter(false));
  }, [isMobile, dispatch]);
  useEffect(() => {
    isNotLg && dispatch(updateLessonMenu(true));
  }, [isNotLg, dispatch]);
  return null;
}
