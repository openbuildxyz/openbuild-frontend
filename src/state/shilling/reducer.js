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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requiredSkills: null,
  experience: null,
  sortBy: '',
};

const shillingSlice = createSlice({
  name: 'shilling',
  initialState,
  reducers: {
    setRequiredSkills(state, action) {
      state.requiredSkills = action.payload;
    },
    setExperience(state, action) {
      state.experience = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export const { setRequiredSkills, setExperience, setSortBy } = shillingSlice.actions;
export default shillingSlice.reducer;
