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
import { setOpenModal } from './reducer';
import { useCallback } from 'react';
import { useAppDispatch } from '#/state/hooks';

export function useModalOpen(modal) {
  const openModal = useSelector(state => state.application.openModal);
  return openModal === modal;
}

export function useToggleModal(modal) {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
}

export function useBindEmailModalToggle() {
  return useToggleModal('BIND_EMAIL');
}

export function useConnectWalletModalToggle() {
  return useToggleModal('CONNECT_WALLET');
}

export function useConfig() {
  return useSelector(state => state.application.config);
}

export function useMediaUrl() {
  const config = useSelector(state => state.application.config);
  return config?.find(f => f.config_name === 'media_url')?.config_value.url;
}

export function useAssetUrl(relativePath) {
  const baseUrl = useMediaUrl();
  return baseUrl && relativePath ? `${baseUrl}${relativePath}` : '';
}

export function useSlillhubChain() {
  const config = useSelector(state => state.application.config);
  return config?.find(f => f.config_name === 'blockchain')?.config_value.skills_hub?.find(sf => sf.available === true);
}

export function useAllSkills() {
  const config = useSelector(state => state.application.config);

  return config
    ?.find(f => f.config_id === 3)
    ?.config_value.skills?.map(i => {
      return {
        value: i.id,
        label: i.name,
      };
    });
}

export function useUser() {
  return useSelector(state => state.application.user);
}

export function useOpenFilter() {
  return useSelector(state => state.application.openFilter);
}
export function useLessonMenu() {
  return useSelector(state => state.application.lessonMenu);
}

export function useLessonMenuToggleStatus() {
  return useSelector(state => state.application.lessonMenuToggleStatus);
}
