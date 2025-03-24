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
import { MySkill } from './MySkill';
import { ProfileNav } from './Navs';
import { Setting } from './Setting';

function ProfileFormView() {
  const info = useUser();
  const config = useConfig();
  const [showSave, setShowSave] = useState(false);
  const [formsError, setFromError] = useState(false);
  const mediaUrl = config?.find(f => f.config_id === 2);
  const [forms, setForms] = useState({
    showavatar: '',
    avatar: '',
    email: '',
    fullName: '',
    userHandle: '',
    country: '',
    city: '',
    bio: '',
    roles: null,
    skills: [],
    experience: null,
    company: '',
    resume: '',
    twitter: '',
    twitterVisible: false,
    discord: '',
    discordVisible: false,
    walletVisible: false,
    emailVisible: false,
    githubVisible: false,
  });

  useEffect(() => {
    if (info !== null) {
      const email = info.binds.find(f => f.auth_user_bind_type === 'email');
      setForms({
        showavatar: mediaUrl ? mediaUrl.config_value.url + info.base.user_avatar : '',
        avatar: info.base.user_avatar,
        email: email?.auth_user_bind_key || '',
        fullName: info.base.user_nick_name,
        userHandle: info.base.user_handle,
        country: info.base.user_country,
        city: info.base.user_city,
        bio: info.base.user_bio,
        roles: info.base.user_roles,
        skills: info.base.user_skills,
        experience: info.base.user_experience,
        company: info.base.user_company,
        resume: info.base.user_resume,
        twitter: info.base.user_x,
        twitterVisible: info.base.user_show_x,
        discord: info.base.user_discord,
        discordVisible: info.base.user_show_discord,
        walletVisible: info.base.user_show_wallet,
        emailVisible: info.base.user_show_email,
        githubVisible: info.base.user_show_github,
      });
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
      setFromError(true);
    } else {
      const res = await updateUser({
        user_avatar: forms.avatar,
        user_bio: forms.bio,
        user_city: forms.city,
        user_company: forms.company,
        user_country: forms.country,
        user_experience: forms.experience,
        user_handle: forms.userHandle,
        user_id: info?.base.user_id,
        user_nick_name: forms.fullName,
        user_resume: forms.resume,
        user_roles: forms.roles,
        user_skills: forms.skills,
        user_x: forms.twitter,
        user_show_x: forms.twitterVisible,
        user_discord: forms.discord,
        user_show_discord: forms.discordVisible,
        user_show_wallet: forms.walletVisible,
        user_show_email: forms.emailVisible,
        user_show_github: forms.githubVisible,
      });
      if (res.success) {
        toast.success('Saved successfully');
        setShowSave(false);
        // doFetch()
      }
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (info) {
      setLoading(false);
      if (
        forms.avatar !== info.base.user_avatar ||
        forms.bio !== info.base.user_bio ||
        forms.city !== info.base.user_city ||
        forms.company !== info.base.user_company ||
        forms.experience !== info.base.user_experience ||
        forms.country !== info.base.user_country ||
        forms.fullName !== info.base.user_nick_name ||
        forms.resume !== info.base.user_resume ||
        forms.roles !== info.base.user_roles ||
        forms.skills !== info.base.user_skills ||
        forms.userHandle !== info.base.user_handle ||
        forms.twitter !== info.base.user_x ||
        forms.twitterVisible !== info.base.user_show_x ||
        forms.discord !== info.base.user_discord ||
        forms.discordVisible !== info.base.user_show_discord ||
        forms.walletVisible !== info.base.user_show_wallet ||
        forms.emailVisible !== info.base.user_show_email ||
        forms.githubVisible !== info.base.user_show_github ||
        forms.country === ''
      ) {
        setShowSave(true);
      } else {
        setShowSave(false);
      }
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
