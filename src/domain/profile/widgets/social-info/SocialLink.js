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

import { SvgIcon } from '@/components/Image';

function SocialLink({ url, icon, extra, children }) {
  return (
    <a className="h-9 flex justify-between items-center px-4 border-b border-gray-600 last:border-0 hover:bg-gray-1000" href={url} target="_blank" rel="noreferrer">
      <div className="flex justify-between items-center" style={{ flexGrow: 1, paddingRight: '8px' }}>
        <div className="flex items-center">
          <SvgIcon name={icon} size={16} />
          <p className="pl-2 pr-1 text-sm font-semibold">{children}</p>
        </div>
        {extra}
      </div>
      <SvgIcon style={{ flexShrink: 0 }} name="share" size={14} />
    </a>
  );
}

export default SocialLink;
