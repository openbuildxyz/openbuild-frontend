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

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import { SvgIcon } from '@/components/Image';
import LoadableList from '@/components/loadable-list';

import { useUser } from '#/state/application/hooks';

import useAuthGuard from '../../../auth/hooks/useAuthGuard';
import { fetchFollowerList, fetchFollowedList, followUser, unfollowUser } from '../../repository';
import TabBarWidget from '../../widgets/tab-bar';

const followFetchMap = {
  followers: fetchFollowerList,
  following: fetchFollowedList,
};

function FollowerList({ list, followType, update }) {
  const user = useUser();
  const { withAuth } = useAuthGuard();
  const [followLoading, setFollowLoading] = useState(false);

  const wrapHandler = updateStatus => (item, index, type) => withAuth(async () => {
    setFollowLoading(index);
    const res = await updateStatus(item.user.user_id);
    setFollowLoading(null);
    if (res.success) {
      const _prevList = [...list];
      _prevList[index].mutual = type;
      update(_prevList);
    }
  });

  const follow = wrapHandler(followUser);
  const unfollow = wrapHandler(unfollowUser);

  return (
    <div>
      <ul>
        {list?.map((i, k) => <li key={`user-follow-${followType}-${i.user_id}`} className="flex items-center mt-6">
          <Avatar size={60} user={i.user} />
          <div className="flex-1 h-12 ml-4 mr-8">
            <h6>
              <a href={`/u/${i.user.user_handle}`}>{i.user.user_nick_name}</a>
            </h6>
            <p>{i.user.user_handle}</p>
          </div>
          {user?.base.user_id === i.user.user_id ? <></> : i.mutual ? (
            <Button
              className="!h-10 group"
              variant="outlined"
              loading={followLoading === k}
              onClick={() => unfollow(i, k, false)}
            >
              <span className="!font-bold block group-hover:hidden">Following</span>
              <span className="!font-bold hidden group-hover:block">Unfollow</span>
            </Button>
          ) : (
            <Button
              loading={followLoading === k}
              variant="contained"
              className="!h-10"
              onClick={() => follow(i, k, true)}
            >
              <SvgIcon name="plus" size={16} />
              <span className="!font-bold">Follow</span>
            </Button>
          )}
        </li>)}
      </ul>
    </div>
  );
}

function FollowerListView({ userHandle, followType }) {
  const router = useRouter();
  const tabs = ['Followers', 'Following'];

  return (
    <div className="md:pl-[410px] md:pb-14 md:pr-14">
      <TabBarWidget
        tabs={tabs}
        tabClassName="h-14 md:h-9 md:px-6"
        current={tabs.findIndex(tab => tab.toLowerCase() === followType)}
        onChange={tabIndex => router.push(`/u/${userHandle}/${tabs[tabIndex].toLowerCase()}`)}
      />
      <LoadableList
        params={{ handle: userHandle }}
        fetch={followFetchMap[followType]}
        resolveResponse={res => ({ list: res.data.list, total: res.data.count })}
        renderList={(list, update) => <FollowerList followType={followType} list={list} update={update} />}
      />
    </div>
  );
}

export default FollowerListView;
