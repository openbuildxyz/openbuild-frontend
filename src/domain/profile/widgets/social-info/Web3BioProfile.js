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

import { capitalize } from '@/utils';

import SocialLink from './SocialLink';

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

function Web3BioProfile({ data }) {
  const links = resolveLinks(data);

  return links.length > 0 && (
    <>
      <p className="mt-6 uppercase text-xs opacity-60 font-bold">More from <a className="underline" href={`https://web3.bio/${data.social.user_wallet}`} target="_blank" rel="noreferrer">web3.bio</a></p>
      <div className="border border-gray-600 rounded overflow-hidden mt-2">
        {links.map(([k, profile]) => (
          <SocialLink key={`web3bio-social-${k}`} icon="link" url={profile.link}>{specialTextMap[k] || capitalize(k)}</SocialLink>
        ))}
      </div>
    </>
  );
}

export default Web3BioProfile;
