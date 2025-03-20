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

import { SvgIcon } from '@/components/Image';
import { capitalize } from '@/utils';

const socialKeyMap = {
  github: 'user_github',
  discord: 'user_discord',
  twitter: 'user_x',
};

const specialTextMap = {
  linkedin: 'LinkedIn',
};

function filterExistsInOpenBuild(links, social) {
  return Object.entries(links).filter(([k]) => !socialKeyMap[k] || !(socialKeyMap[k] in social));
}

function resolveLinks({ social, web3Bio = [] }) {
  return web3Bio.reduce((p, c) => [].concat(p, filterExistsInOpenBuild(c.links, social)), []);
}

function socialsConfig(type) {
  switch (type) {
  case 'farcaster':
    return {
      icon: 'farcaster-purple',
      color: '#8A63D21A',
    };
  case 'lens':
    return {
      icon: 'lens-green',
      color: '#6BC6741A',
    };
  case 'basenames':
    return {
      icon: 'basenames-blue',
      color: '#0052FF1A',
    };
  default:
    return {
      icon: 'link',
      color: '#1A1A1A1A',
    };
  }
}

function Web3BioProfile({ data }) {
  const links = resolveLinks(data);

  return (
    links.length > 0 && (
      <>
        <div className="mt-6 text-xs flex gap-1">
          <p className="uppercase opacity-60 font-bold flex-1">Onchain Identities</p>
          <div className="opacity-40">Built with</div>
          <a className="" href={`https://web3.bio/${data.social.user_wallet}`} target="_blank" rel="noreferrer">
            web3.bio
          </a>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {links.map(([k, profile]) => (
            <a
              key={`web3bio-social-${k}`}
              className="flex gap-1 rounded-[6px] px-1 h-7 text-sm border items-center"
              style={{
                borderColor: socialsConfig(k).color,
                backgroundColor: socialsConfig(k).color,
              }}
              href={profile.link}
              target="_blank"
              rel="noreferrer"
            >
              <SvgIcon name={socialsConfig(k).icon} size={16} />
              {specialTextMap[k] || capitalize(k)}
            </a>
          ))}
        </div>
      </>
    )
  );
}

export default Web3BioProfile;
