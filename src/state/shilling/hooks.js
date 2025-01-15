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

import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from '#/state/hooks';
import { setRequiredSkills } from './reducer';

export function useSetRequiredSkills(skills) {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setRequiredSkills(skills)), [dispatch, skills]);
}

export function useRequiredSkills() {
  return useSelector(state => state.shilling.requiredSkills);
}
export function useExperience() {
  return useSelector(state => state.shilling.experience);
}
export function useSortBy() {
  return useSelector(state => state.shilling.sortBy);
}
