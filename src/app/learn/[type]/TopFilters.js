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

'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FeaturedActiveIcon from 'public/images/svg/featured_active.svg';
import FeaturedIcon from 'public/images/svg/featured.svg';
import { useMemo } from 'react';

import { ReactSelect } from '@/components/Select/ReactSelect';
import useMounted from '@/hooks/useMounted';

import BasicSearch from '#/entry/components/basic-search';

const tabStyle = 'inline-block border-gray-600 px-4 h-10 leading-10 text-gray-500 cursor-pointer';

const langOptions = [
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
];

const storageKey = 'ob_userLang';

function getBrowserLanguage() {
  return navigator.language.startsWith('zh') ? 'zh' : 'en';
}

function TopFilters({ type }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const recommendType = useMemo(() => {
    return searchParams?.get('recommend_type') || null;
  }, [searchParams]);

  const bodyType = useMemo(() => {
    return searchParams?.get('body_type') || null;
  }, [searchParams]);

  const lang = useMemo(() => {
    return searchParams?.get('lang') || null;
  }, [searchParams]);

  const changeParams = (type, value) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value === null) {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useMounted(() => {
    if(!lang){
      const defaultLang = localStorage.getItem(storageKey) || getBrowserLanguage();
      changeParams('lang', defaultLang);
    }
  });

  const handleLangChange = e => {
    const chosen = e ? e.value : null;

    localStorage.setItem(storageKey, chosen);
    changeParams('lang', chosen);
  };

  return (
    <div className="flex gap-2 items-center max-md:flex-wrap">
      {type === 'courses' && (
        <div className="flex gap-2 max-md:flex-wrap">
          <button
            onClick={() => changeParams('recommend_type', recommendType === 'choice' ? null : 'choice')}
            className={clsx(
              'group border border-gray-600 text-sm h-10 px-4 flex items-center rounded hover:border-gray',
              { '!border-gray': recommendType === 'choice' },
            )}
          >
            <Image
              src={FeaturedIcon}
              alt=""
              className={clsx('group-hover:hidden', { '!hidden': recommendType === 'choice' })}
            />
            <Image
              src={FeaturedActiveIcon}
              alt=""
              className={clsx('group-hover:block hidden', { '!block': recommendType === 'choice' })}
            />
            <span className="ml-2 opacity-80 group-hover:opacity-100">Featured</span>
          </button>
          <div className="group border border-gray-600 text-sm h-10 flex items-center rounded">
            <span
              onClick={() => changeParams('body_type', null)}
              className={clsx('rounded-l hover:!text-gray', tabStyle, { '!text-gray bg-gray-800': !bodyType })}
            >
              All
            </span>
            <span
              onClick={() => changeParams('body_type', 'video')}
              className={clsx('border-r border-l hover:!text-gray', tabStyle, {
                '!text-gray bg-gray-800': bodyType === 'video',
              })}
            >
              Video
            </span>
            <span
              onClick={() => changeParams('body_type', 'text')}
              className={clsx('rounded-r hover:!text-gray', tabStyle, {
                '!text-gray bg-gray-800': bodyType === 'text',
              })}
            >
              Text
            </span>
          </div>
          <div className="w-[140px]">
            <ReactSelect
              isSearchable={false}
              value={langOptions.find(f => f.value === lang)}
              className="no-bg showDropdownIndicator w-full bg-transparent height-sm"
              onChange={handleLangChange}
              options={langOptions}
              placeholder={'Language'}
            />
          </div>
        </div>
      )}
      <BasicSearch />
    </div>
  );
}

export default TopFilters;
