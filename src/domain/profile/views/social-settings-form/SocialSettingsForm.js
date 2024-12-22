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

import { useMemo } from 'react'
import { ProfileTitle, ProfileLabel } from '#/styleds'
import WalletIcon from './wallet.svg'
// import StackoverflowIcon from 'public/images/svg/stackoverflow.svg'
import DiscordIcon from './discord.svg'
import GoogleIcon from './google_p.svg'
import GithubIcon from 'public/images/svg/github_p.svg'
import TwitterIcon from 'public/images/svg/x-black.svg'
// import { useSearchParams } from 'next/navigation'
import Switch from '@/components/Switch'

import InputField from './InputField'
import BindableField from './BindableField'

function SocialSettingsFormView({ id, className, binds, values, onFieldChange }) {
  // const searchParams = useSearchParams()

  const list = useMemo(() => {
    const [wallet, github, google] = ['wallet', 'github', 'google'].map(type => binds?.find(f => f.auth_user_bind_type === type))

    return [
      {
        name: 'Wallet',
        showName: 'Wallet (ERC20)',
        icon: WalletIcon,
        value: wallet?.auth_user_bind_key || '',
        bindInfo: wallet,
        bindable: true,
        unbindable: true,
        enableBy: 'walletVisible',
      },
      {
        name: 'Github',
        showName: 'GitHub Account',
        icon: GithubIcon,
        value: github?.auth_user_bind_key || '',
        bindInfo: github,
        bindable: true,
        enableBy: 'githubVisible',
      },
      {
        name: 'Google',
        showName: 'Google Account',
        icon: GoogleIcon,
        value: google?.auth_user_bind_key || '',
        bindInfo: google,
        bindable: true,
      },
      {
        name: 'Twitter',
        showName: 'X (Twitter)',
        icon: TwitterIcon,
        value: values.twitter,
        field: 'twitter',
        placeholder: 'Please enter X (Twitter) handle',
        enableBy: 'twitterVisible',
      },
      {
        name: 'Discord',
        icon: DiscordIcon,
        value: values.discord,
        field: 'discord',
        placeholder: 'Please enter Discord handle',
        enableBy: 'discordVisible',
      },
    ]
  }, [binds, values])

  return (
    <div id={id} className={className}>
      <ProfileTitle>Social Profiles</ProfileTitle>
      <div className="mt-6">
        {list.map(i => (
          <div key={`profile-social-${i.name}`}>
            <ProfileLabel className="flex items-center justify-between">
              <span>{i.showName || i.name}</span>
              {i.enableBy && <Switch checked={values[i.enableBy]} onChange={onFieldChange.bind(null, i.enableBy)} />}
            </ProfileLabel>
            {i.bindable ? (
              <BindableField data={i} />
            ) : (
              <InputField data={i} onChange={value => i.field && onFieldChange(i.field, value)} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SocialSettingsFormView
