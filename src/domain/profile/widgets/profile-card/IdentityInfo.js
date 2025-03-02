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

import { usePathname } from 'next/navigation';

function IdentityInfo({ className, userName }) {
  const pathname = usePathname();

  const identityLinks = [
    { text: 'User', url: `/u/${userName}` },
    { text: 'Creator', url: `/u/${userName}/creator` },
  ].filter(({ url }) => url !== pathname);

  return (
    <div className={className}>
      <p className="mt-6 uppercase text-xs opacity-60 font-bold">Identity Profiles</p>
      <div className="border border-gray-600 rounded overflow-hidden mt-2">
        {identityLinks.map(link => (
          <a key={link.url} className="h-9 flex justify-between items-center px-4 border-b border-gray-600 last:border-0 hover:bg-gray-1000" href={link.url}>
            <div className="flex justify-between items-center" style={{ flexGrow: 1, paddingRight: '8px' }}>
              <div className="flex items-center">
                <p className="pl-2 pr-1 text-sm font-semibold">{link.text}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default IdentityInfo;
