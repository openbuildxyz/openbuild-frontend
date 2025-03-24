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

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/Button';

import { useUser } from '#/state/application/hooks';
import { useConfig } from '#/state/application/hooks';

import { updateUser } from '../../repository';
import { ProfileTitle } from '../../widgets/blocks';
import SocialSettingsFormView from '../social-settings-form';
import BasicSection from './BasicSection';
import { getDefaultFormValue, resolveFormValueFromUser, isFormValueModified } from './helper';
import { MySkill } from './MySkill';
import { ProfileNav } from './Navs';
import { Setting } from './Setting';

function ProfileFormView() {
  const info = useUser();
  const config = useConfig();
  const [showSave, setShowSave] = useState(false);
  const [formsError, setFormError] = useState(false);
  const mediaUrl = config?.find(f => f.config_id === 2);
  const [forms, setForms] = useState(getDefaultFormValue());

  useEffect(() => {
    if (info !== null) {
      setForms(resolveFormValueFromUser(info, mediaUrl?.config_value.url));
    }
  }, [info, mediaUrl?.config_value.url, mediaUrl]);

  const changeForms = (type, value) => {
    const _forms = Object.assign({ ...forms }, {});
    _forms[type] = value;
    setForms(_forms);
  };

  const save = async () => {
    if (
      forms.country === '' ||
      forms.city === '' ||
      forms.company === '' ||
      forms.fullName === '' ||
      forms.userHandle === '' ||
      forms.roles === null ||
      forms.skills === null ||
      forms.skills?.length === 0 ||
      forms.experience === 0
    ) {
      setFormError(true);
    } else {
      const res = await updateUser(info?.base.user_id, forms);
      if (res.success) {
        toast.success('Saved successfully');
        setShowSave(false);
      }
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (info) {
      setLoading(false);
      setShowSave(isFormValueModified(forms, info.base));
    }
  }, [forms, info, showSave]);

  const handleAvatarUpload = url => {
    const _forms = Object.assign({ ...forms }, {});
    _forms.showavatar = mediaUrl?.config_value.url + url;
    _forms.avatar = url;
    setForms(_forms);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen px-4 pb-12 md:px-[67px]">
      {loading && <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-[999999999] bg-gray-1100">
        <span className="loading loading-spinner loading-lg" />
      </div>}
      <ProfileNav />
      <div className="mb-14 mt-2 max-w-[736px] flex-1 md:pl-10">
        <div id="about">
          <ProfileTitle>About Me</ProfileTitle>
          <BasicSection
            className="mt-6"
            forms={forms}
            formsError={formsError}
            onFieldChange={changeForms}
            onUpload={handleAvatarUpload}
          />
        </div>
        <MySkill formsError={formsError} forms={forms} set={(type, val) => changeForms(type, val)} />
        <SocialSettingsFormView
          id="social"
          className="mt-14"
          binds={info?.binds}
          values={forms}
          onFieldChange={changeForms}
        />
        <Setting />
      </div>
      {showSave && (
        <div className="fixed bottom-0 left-0 flex h-[100px] w-full items-center justify-center bg-white">
          <Button variant="contained" onClick={save} className="h-[48px] w-[142px]">
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfileFormView;
