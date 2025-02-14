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
import { ConnectModal } from '@mysten/dapp-kit';
import { useState } from 'react';

import { NoData } from '@/components/NoData';
import { Skeleton } from '@/components/Skeleton/NftSkeleton';
import useMounted from '@/hooks/useMounted';

import { fetchGainedAchievements } from '../../repository';
import GainedAchievement from './GainedAchievement';

export default function GainedAchievements () {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  useMounted(() => {
    fetchAchieements();
  });

  const fetchAchieements = () => {
    setLoading(true);
    fetchGainedAchievements()
      .then(res => setList(res.data.list || []))
      .finally(() => setLoading(false));
  };

  return (
    <div className="pb-12">
      <ConnectModal
        open={open}
        onOpenChange={isOpen => setOpen(isOpen)}
      />

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Achievements</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {loading && [...new Array(6).fill('')].map((i, k) => <Skeleton key={`achievement-skeleton-${k}`} />)}
        {list?.map(i => (
          <GainedAchievement key={`achievement-${i.id}`} i={i} setOpen={setOpen} reFetch={fetchAchieements} />
        ))}
      </div>
      {list && list.length === 0 && <NoData />}
    </div>
  );
}
