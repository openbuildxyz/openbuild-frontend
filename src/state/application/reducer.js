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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openModal: null,
  config: null,
  user: null,
  openFilter: false,
  lessonMenu: false,
  lessonMenuToggleStatus: true,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    updateConfig(state, action) {
      state.config = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    updateOpenFilter(state, action) {
      state.openFilter = action.payload;
    },
    updateLessonMenu(state, action) {
      state.lessonMenu = action.payload;
    },
    updateLessonMenuToggleStatus(state, action) {
      state.lessonMenuToggleStatus = action.payload;
    },
  },
});

export const { updateConfig, updateUser, updateOpenFilter, setOpenModal, updateLessonMenu, updateLessonMenuToggleStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
