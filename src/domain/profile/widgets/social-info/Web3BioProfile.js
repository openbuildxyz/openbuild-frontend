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

import clsx from 'clsx';

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

const socialsConfig = {
  farcaster: {
    icon: 'farcaster-purple',
    class: 'bg-[#8A63D2]/10 border-[#8A63D2]/10',
  },
  lens: {
    icon: 'lens-green',
    class: 'bg-[#6BC674]/10 border-[#6BC674]/10',
  },
  basenames: {
    icon: 'basenames-blue',
    class: 'bg-[#0052FF]/10 border-[#0052FF]/10',
  },
  default: {
    icon: 'link',
    class: 'bg-[#1A1A1A]/10 border-[#1A1A1A]/10',
  },
};

function filterExistsInOpenBuild(links, social) {
  return Object.entries(links).filter(([k]) => !socialKeyMap[k] || !(socialKeyMap[k] in social));
}

function resolveLinks({ social, web3Bio = [] }) {
  return web3Bio.reduce((p, c) => [].concat(p, filterExistsInOpenBuild(c.links, social)), []);
}

function Web3BioProfile({ data }) {
  const links = resolveLinks(data);

  return (
    links.length > 0 && (
      <>
        <div className="mt-6 text-xs flex gap-1">
          <p className="uppercase opacity-60 font-bold flex-1">Onchain Identities</p>
          <div className="opacity-40">Built with</div>
          <a href={`https://web3.bio/${data.social.user_wallet}`} target="_blank" rel="noreferrer">
            Web3.bio
          </a>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {links.map(([k, profile]) => {
            const socialConfig = socialsConfig[k] ?? socialsConfig.default;
            return (
              <a
                key={`web3bio-social-${k}`}
                className={clsx(socialConfig.class, 'flex gap-1 rounded-[6px] px-1 h-7 text-sm border items-center')}
                href={profile.link}
                target="_blank"
                rel="noreferrer"
              >
                <SvgIcon name={socialConfig.icon} size={16} />
                {specialTextMap[k] || capitalize(k)}
              </a>
            );
          })}
        </div>
      </>
    )
  );
}

export default Web3BioProfile;
