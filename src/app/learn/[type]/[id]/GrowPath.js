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

import { Share } from '@/components/Share';

import { RoadmapDetailViewWidget } from '#/domain/roadmap';

import { growPathEnrollAction } from './actions';
import { Back } from './Back';

function GrowPath({ params, data, permission }) {
  const actionBar = (
    <>
      <Back params={params} />
      <Share img={data?.img} title={data?.title} type={params.type} id={params.id} />
    </>
  );

  return (
    <RoadmapDetailViewWidget id={params.id} data={data} permission={permission} actionBar={actionBar} executeEnroll={growPathEnrollAction} />
  );
}

export default GrowPath;
