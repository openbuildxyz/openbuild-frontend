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

import { useMemo } from 'react';

import { SvgIcon } from '@/components/Image';

import SocialLink from './SocialLink';
import PublishedCountList from './PublishedCountList';

function socialsInfo(type, link) {
  switch(type) {
  case 'user_github':
    return {
      name: 'GitHub',
      icon: 'github-black',
      link: link && `https://github.com/${link}`,
      enableKey: 'user_show_github',
    };
  case 'user_x':
    return {
      name: 'X',
      icon: 'x-black',
      link: link && `https://x.com/${link}`,
      enableKey: 'user_show_x',
    };
  case 'user_discord':
    return {
      name: 'Discord',
      icon: 'discord-black',
      link: link && `https://discord.com/invite/${link}`,
      enableKey: 'user_show_discord',
    };
  case 'user_wallet':
    return {
      name: 'web3.bio',
      icon: 'web3bio',
      link: link && `https://web3.bio/${link}`,
      extra: <div style={{ fontSize: '12px' }}><span className="opacity-40">Built with</span> <span>Next.ID</span></div>,
      enableKey: 'user_show_wallet',
    };
  default:
    return null;
  }
}

function SocialInfoWidget({ className, data }) {
  const socials = useMemo(() => Object.keys(data.social).map(i => socialsInfo(i, data.social[i])).filter(s => {
    if (!s) {
      return false;
    }

    const enabled = s.enableKey ? data.base[s.enableKey] : true;

    return enabled && !!s.link;
  }), [data]);

  return (
    <div className={className}>
      {socials.length > 0 && (
        <>
          <p className="mt-6 uppercase text-xs opacity-60 font-bold">Social Profiles</p>
          <div className="border border-gray-600 rounded overflow-hidden mt-2">
            {socials.map(i => (
              <SocialLink key={`user-social-${i.name}`} url={i.link} icon={i.icon} extra={i.extra}>{i.name}</SocialLink>
            ))}
          </div>
        </>
      )}
      {data.base?.user_project_owner && (
        <PublishedCountList published={data?.num} />
      )}
      {data.base?.user_show_email && data?.social?.user_email !== '' && (
        <>
          <hr className="border-t border-gray-600 mt-6 mb-4" />
          <a href={`mailto:${data?.social?.user_email}`} className="flex justify-center opacity-60 cursor-pointer">
            <SvgIcon name="mail" size={14} />
            <span className="ml-2 text-sm">Message</span>
          </a>
        </>
      )}
    </div>
  );
}

export default SocialInfoWidget;
