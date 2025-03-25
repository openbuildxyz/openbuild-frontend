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
import Image from 'next/image';
import { useState } from 'react';

import CountrySelect from '@/components/control/country-select';
import Loader from '@/components/Loader';
import Switch from '@/components/Switch';
import { BASE_INPUT_STYLE } from '@/constants/config';
import { classNames } from '@/utils';

import FileUploadWidget from '../../../oss/widgets/file-upload';
import { ProfileLabel } from '../../widgets/blocks';

type BasicSectionProps = {
  className?: string;
  forms: any;
  formsError: any;
  onFieldChange: (fieldName: string, value: any) => void;
  onUpload: (url: string) => void;
}

function BasicSection({
  className,
  forms,
  formsError,
  onFieldChange,
  onUpload,
}: BasicSectionProps) {
  const [uploading, setUploading] = useState(false);
  const [userAvatarLoaded, setUserAvatarLoaded] = useState(false);

  return (
    <div className={className}>
      <ProfileLabel className="text-gray-50">Avatar</ProfileLabel>
      <div className="flex items-center">
        {!userAvatarLoaded && (
          <span className="mr-9 inline-block h-[96px] w-[96px] rounded-full bg-gray-400" />
        )}
        <Image
          width={96}
          height={96}
          className={clsx('mr-9 h-[96px] w-[96px] rounded-full', {
            hidden: !userAvatarLoaded,
          })}
          src={forms.showavatar}
          alt=""
          onLoad={() => {
            setTimeout(() => setUserAvatarLoaded(true), 1000);
          }}
        />
        <div>
          <button className="mb-2 block h-9 w-[100px] rounded-full bg-gray-1200 text-sm hover:bg-[#e0e0e0]">
            <FileUploadWidget
              className="flex items-center justify-center"
              intent="avatar"
              type="image"
              size="2MB"
              onUploading={setUploading}
              onChange={onUpload}
            >
              {uploading && <Loader color={'#1a1a1a'} classname="mr-1" />}
              <span className="cursor-pointer">Upload</span>
            </FileUploadWidget>
          </button>
          <span className="text-xs opacity-60">
            Support PNG, JPG, or GIF, recommended size 400x400px, size within 2M
          </span>
        </div>
      </div>

      <ProfileLabel className="mt-9 text-gray-50 flex items-center justify-between">
        <span>E-mail</span>
        <Switch checked={forms.emailVisible} onChange={(checked: boolean) => onFieldChange('emailVisible', checked)} />
      </ProfileLabel>
      <input
        type="text"
        value={forms.email}
        readOnly
        // onChange={e => onFieldChange('email', e.target.value)}
        className={`${BASE_INPUT_STYLE}`}
      />
      <div>
        <ProfileLabel className="mt-9 flex justify-between text-gray-50">
          <span>
            Full Name <span className="text-red">*</span>
          </span>
          <span className="text-xs opacity-80">{forms.fullName.length}/50</span>
        </ProfileLabel>
        <input
          type="text"
          value={forms.fullName}
          maxLength={50}
          onChange={e => onFieldChange('fullName', e.target.value)}
          className={classNames(BASE_INPUT_STYLE, formsError && forms.fullName === '' && 'border-red')}
        />
      </div>
      <ProfileLabel className="mt-9 text-gray-50">
        Username<span className="text-red"> *</span><span className="text-xs opacity-60"> (Allows input of uppercase and lowercase letters plus numbers and _-)</span>

      </ProfileLabel>
      <input
        type="text"
        value={forms.userHandle}
        onChange={e => {
          const pattern = /^([a-zA-Z0-9]([-_]?[a-zA-Z0-9])*)?$/;
          const r = pattern.test(e.target.value);
          console.log(r);
          if (r) {
            onFieldChange('userHandle', e.target.value);
          }

        }}
        placeholder={'Please enter your username'}
        className={classNames(BASE_INPUT_STYLE, formsError && forms.userHandle === '' && 'border-red')}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <ProfileLabel className="mt-9 text-gray-50">
            Country/Area <span className="text-red">*</span>
          </ProfileLabel>
          <CountrySelect
            className={classNames(BASE_INPUT_STYLE, formsError && forms.country === '' && 'border-red')}
            value={forms.country}
            onChange={s => onFieldChange('country', s)}
          />
        </div>
        <div>
          <ProfileLabel className="mt-9 text-gray-50">
            City/State <span className="text-red">*</span>
          </ProfileLabel>
          <input
            type="text"
            value={forms.city}
            onChange={e => onFieldChange('city', e.target.value)}
            className={classNames(BASE_INPUT_STYLE, formsError && forms.city === '' && 'border-red')}
          />
        </div>
      </div>
      <ProfileLabel className="mt-9 text-gray-50">Your Bio</ProfileLabel>
      <textarea
        value={forms.bio}
        onChange={e => onFieldChange('bio', e.target.value)}
        placeholder={'Brief description for your profile.'}
        className={classNames(BASE_INPUT_STYLE, 'h-14 pt-2 focus:!ring-0')}
      />
    </div>
  );
}

export default BasicSection;
