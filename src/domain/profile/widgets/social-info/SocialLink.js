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

import Image from 'next/image';
import Web3BioIcon from 'public/images/svg/web3bio-2.svg';

import { SvgIcon } from '@/components/Image';

function SocialLink({ url, icon, showWeb3Bio, children }) {
  return (
    <a
      className="h-9 flex justify-between gap-2 items-center px-4 border-b border-gray-600 last:border-0 hover:bg-gray-1000"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex justify-between items-center flex-1">
        <div className="flex items-center">
          {icon && <SvgIcon name={icon} size={16} />}
          <p className="pl-2 pr-1 text-sm font-semibold">{children}</p>
        </div>
        {showWeb3Bio && (
          <div className="border border-gray-600 rounded-md p-0.5 pt-1 shrink-0">
            <Image src={Web3BioIcon} alt="web3bio" />
          </div>
        )}
      </div>
      <SvgIcon className="shrink-0" name="share" size={14} />
    </a>
  );
}

export default SocialLink;
