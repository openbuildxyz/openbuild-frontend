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

import { SvgIcon } from '@/components/Image';

import { isBountyFinished } from '../../helper';

function AppliedBountyAction({ status }) {
  return isBountyFinished(status) ? (
    <div style={{ padding: '0 8px', fontWeight: 'bolder', lineHeight: '34px', color: '#3aab76', backgroundColor: 'rgba(58, 171, 118, 0.1)', borderRadius: '6px', textTransform: 'uppercase' }}>You make it !</div>
  ) : (
    <>
      <span style={{ marginRight: 8, textTransform: 'uppercase' }}>Continue</span>
      <SvgIcon name="arrow-right-top" size={20} />
    </>
  );
}

export default AppliedBountyAction;
