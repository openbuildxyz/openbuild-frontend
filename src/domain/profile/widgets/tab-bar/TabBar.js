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

import { Button } from '@/components/Button';
import { isPlainObject } from '@/utils';

function TabBar({ className, tabs, tabClassName, current, onChange }) {
  const tabBarWrapperMobileClassName = 'justify-center border-b-1 border-b-[#d9d9d9]';
  const tabBarWrapperDesktopClassName = 'md:justify-start md:border-b-0';

  const tabBarItemMobileClassName = 'px-0 border-b-2 rounded-none';
  const tabBarItemDesktopClassName = 'md:px-3 md:border-b-1 md:rounded';

  return (
    <div className={clsx('flex', tabBarWrapperMobileClassName, tabBarWrapperDesktopClassName, className)}>
      <div className="flex gap-6 -mb-px md:gap-2 md:mb-0">
        {tabs.map((tab, idx) => {
          let flag, node;

          if (isPlainObject(tab)) {
            flag = tab.text;
            node = tab.node || tab.text;
          } else {
            flag = node = tab;
          }

          return (
            <Button
              key={`activity-type-${encodeURIComponent(flag)}`}
              variant="text"
              size="sm"
              className={clsx(
                tabBarItemMobileClassName,
                tabBarItemDesktopClassName,
                {
                  'border-b-black md:border-b-transparent md:bg-primary md:hover:bg-primary md:text-white': idx === current,
                },
                tabClassName
              )}
              onClick={() => onChange(idx)}
            >
              {node}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default TabBar;
