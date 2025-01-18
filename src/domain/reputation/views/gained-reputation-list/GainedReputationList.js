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

import { useState, useEffect } from 'react';

import { NoData } from '@/components/NoData';

import { fetchGainedReputationList } from '../../repository';
import GainedReputationItem from './GainedReputationItem';

function ControlledGainedReputationList({ list }) {
  return list && list.length > 0 ? (
    <div className="grid grid-cols-2 gap-5 md:flex md:gap-6 mt-6">
      {list.map(item => (
        <GainedReputationItem key={`reputation-${item.id}`} data={item} />
      ))}
    </div>
  ) : <NoData className="mt-6" />;
}

function GainedReputationList({ userId }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || loading) {
      return;
    }

    setLoading(true);
    fetchGainedReputationList(userId)
      .then(res => setList(res.data.list || []))
      .finally(() => setLoading(false));
  }, [userId]);

  return <ControlledGainedReputationList list={list} />;
}

function GainedReputationListView({ userId, data }) {
  return Array.isArray(data) ? (
    <ControlledGainedReputationList list={data} />
  ) : (
    <GainedReputationList userId={userId} />
  );
}

export default GainedReputationListView;
