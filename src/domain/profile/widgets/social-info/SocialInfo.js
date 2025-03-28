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

import { useMemo } from 'react';

import { SvgIcon } from '@/components/Image';

import GainedReputationListView from '../../../reputation/views/gained-reputation-list';
import SocialLink from './SocialLink';
import Web3BioProfile from './Web3BioProfile';

const web3BioSocialKeyMap = {
  user_github: 'github',
  user_discord: 'discord',
  user_x: 'twitter',
};

function resolveSocialsInfo(type, link, web3BioLink) {
  const showWeb3Bio = !link && !!web3BioLink;

  switch (type) {
  case 'user_github':
    return {
      name: 'GitHub',
      icon: 'github-black',
      link: link ? `https://github.com/${link}` : web3BioLink,
      enableKey: 'user_show_github',
      showWeb3Bio,
    };
  case 'user_x':
    return {
      name: 'X',
      icon: 'x-black',
      link: link ? `https://x.com/${link}` : web3BioLink,
      enableKey: 'user_show_x',
      showWeb3Bio,
    };
  case 'user_discord':
    return {
      name: 'Discord',
      icon: 'discord-black',
      link: link ? `https://discord.com/invite/${link}` : web3BioLink,
      enableKey: 'user_show_discord',
      showWeb3Bio,
    };
  default:
    return null;
  }
}

function SocialInfoWidget({ className, data }) {
  const socials = useMemo(() => {
    const web3BioSocials = (data?.web3Bio ?? []).reduce((p, c) => (c.links ? { ...p, ...c.links } : p), {});

    return Object.keys(data.social)
      .map(i => resolveSocialsInfo(i, data.social[i], web3BioSocials[web3BioSocialKeyMap[i]]?.link))
      .filter(s => {
        if (!s) {
          return false;
        }

        let enabled = true;

        if (s.enableKey) {
          enabled = data.base[s.enableKey] || s.showWeb3Bio;
        }

        return enabled && !!s.link;
      });
  }, [data]);

  return (
    <div className={className}>
      {socials.length > 0 && (
        <>
          <p className="mt-6 uppercase text-xs opacity-60 font-bold">Social Profiles</p>
          <div className="border border-gray-600 rounded overflow-hidden mt-2">
            {socials.map(i => (
              <SocialLink key={`user-social-${i.name}`} url={i.link} icon={i.icon} showWeb3Bio={i.showWeb3Bio}>
                {i.name}
              </SocialLink>
            ))}
          </div>
        </>
      )}
      {data?.extra?.reputationList?.length > 0 && (
        <>
          <p className="mt-6 uppercase text-xs opacity-60 font-bold">Reputation</p>
          <GainedReputationListView data={data?.extra?.reputationList} compact />
        </>
      )}
      <Web3BioProfile data={data} />
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
