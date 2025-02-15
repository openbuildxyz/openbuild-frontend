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

import useMounted from '@/hooks/useMounted';

import { fetchMyReputationList } from '../../repository';
import Skeleton from '../../widgets/nft-skeleton';
import MyReputationItem from './MyReputationItem';

export default function MyReputationListView({ list, setOpen, loading, setLoading, setList }) {

  useMounted(() => {
    fetchData();
  });

  const fetchData = () => {
    setLoading(true);
    fetchMyReputationList()
      .then(res => setList(res.data.list || []))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && [...new Array(6).fill('')].map((i, k) => <Skeleton key={`achievement-skeleton-${k}`} />)}
      {list?.map(i => (
        <MyReputationItem key={`achievement-${i.id}`} dataSource={i} onNotConnected={setOpen} onMint={fetchData} />
      ))}
    </>
  );
}
