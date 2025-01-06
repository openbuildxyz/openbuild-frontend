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

'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useFooterDisplay } from '@/hooks/useHeaderAndFooterDisplay'

import { GithubSolidIcon, TwitterIcon, YoutobeIcon, DiscordIcon, LinkedInFilled, SubstackFilled } from '@/components/Icons'
import BrandLogo from '@/components/brand-logo'

const mediasLinkStyle =
  '[&>a]:flex [&>a]:h-8 [&>a]:w-8 [&>a]:items-center [&>a]:justify-center [&>a]:rounded [&>a]:bg-gray-700'
const mediasStyle = '[&>a>svg]:h-4 [&>a>svg]:w-4 [&>a>svg]:cursor-pointer'

const menus = [
  {
    name: 'Product',
    items: [
      {
        name: 'Learn',
        link: '/learn/courses',
      },
      {
        name: 'Build',
        link: '/bounties',
      },
      {
        name: 'Developer Profile',
        link: '/profile',
      },
      {
        name: 'On-Chain Contract & Payment',
        link: 'https://bscscan.com/address/0x495e20d29c43753dd3b9587e14cb436e1ed1fbb2',
      },
    ],
  },
  {
    name: 'Community',
    items: [
      {
        name: 'Discord',
        link: 'https://discord.gg/cbmteR7yRN',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/OpenBuildxyz',
      },
      {
        name: 'GitHub',
        link: 'https://github.com/openbuildxyz',
      },
      {
        name: 'Telegram',
        link: 'https://t.me/OpenBuildxyz/1',
      },
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/company/openbuildxyz',
      },
      {
        name: 'Substack',
        link: 'https://openbuildxyz.substack.com',
      },
    ],
  },
  {
    name: 'Company',
    items: [
      // {
      //   name: 'About Us',
      //   link: 'https://www.google.com',
      // },
      {
        name: 'Apply for Cooperation',
        link: 'https://forms.gle/s2tDbixtdqTU8xbp9',
      },
      {
        name: 'Terms of Use Agreement',
        link: 'https://file-cdn.openbuild.xyz/config/openbuild/OpenBuild.Terms.of.Use.Agreement.pdf',
      },
      {
        name: 'Privacy Policy',
        link: 'https://file-cdn.openbuild.xyz/config/openbuild/OpenBuild.Privacy.Policy.pdf',
      },
      {
        name: 'Press Kit',
        link: 'https://logo.openbuild.xyz',
      },
    ],
  },
]
export function Footer() {
  const hidden = useFooterDisplay()
  return (
    <div className={clsx('bg-gray p-6 text-white md:p-14', { hidden })}>
      <div className="mx-auto justify-between pb-0 md:flex md:pb-10">
        <div className="max-md:flex max-md:flex-col max-md:items-center">
          <BrandLogo />
          <div className="mt-3 mb-14 md:mt-[42px] md:mb-[62px]">
            <a className="underline" href="mailto:build@openbuild.xyz">
              build@openbuild.xyz
            </a>
          </div>
          <p className="mb-4 text-sm">Follow us</p>
          <div className={clsx(mediasLinkStyle, mediasStyle, 'flex w-[227px] justify-between max-md:mb-9')}>
            <Link
              href="https://github.com/openbuildxyz"
              target={'_blank'}
              className="flex transition-all duration-300 hover:text-green"
            >
              <GithubSolidIcon />
            </Link>
            <Link
              href="https://twitter.com/OpenBuildxyz"
              target={'_blank'}
              className="transition-all duration-300 hover:text-green [&>svg]:fill-white hover:[&>svg]:fill-green"
            >
              <TwitterIcon className="!h-[14px] !w-[14px]" />
            </Link>
            <Link
              href="https://www.youtube.com/@openbuildxyz"
              target={'_blank'}
              className="transition-all duration-300 hover:text-green"
            >
              <YoutobeIcon />
            </Link>
            <Link
              href="https://discord.gg/cbmteR7yRN"
              target={'_blank'}
              className="transition-all duration-300 hover:text-green"
            >
              <DiscordIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/company/openbuildxyz"
              target={'_blank'}
              className="transition-all duration-300 hover:text-green"
            >
              <LinkedInFilled />
            </Link>
            <Link
              href="https://openbuildxyz.substack.com"
              target={'_blank'}
              className="transition-all duration-300 hover:text-green"
            >
              <SubstackFilled />
            </Link>
          </div>
        </div>
        <div className="flex max-md:flex-col">
          {menus.map((i, k) => (
            <div
              key={`footer-menus-${k}`}
              className="max-md:mb-4 max-md:border-t max-md:border-[rgba(255,255,255,0.06)] max-md:pt-6 md:ml-[64px]"
            >
              <h4 className="mb-0 font-semibold max-md:mb-2 md:mb-12 md:text-lg">{i.name}</h4>
              <ul>
                {i.items.map(subItem => (
                  <li
                    className="leading-7 transition-all duration-300 hover:text-green hover:underline text-sm md:leading-10"
                    key={`footer-menus-sub-${subItem.name}`}
                  >
                    {/* href={subItem.link} */}
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        if (subItem.type !== 'Soon') {
                          window.open(subItem.link, '_blank')
                          // router.push(subItem.link)
                        }
                      }}
                    >
                      {subItem.name}
                      {subItem.type === 'Soon' && (
                        <span className="ml-2 inline-block h-4 w-9 rounded-md bg-yellow text-center text-xs font-normal leading-4 text-gray">
                          Soon
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center border-t border-[rgba(255,255,255,0.06)] pt-6 md:justify-between md:pt-14">
        <p className="text-xs md:text-sm">© 2023 OpenBuild, All rights reserved.</p>
        {/* <div className="flex items-center">
          <p>EN</p>
          <SunIcon className="ml-3 h-5 w-5" />
        </div> */}
      </div>
    </div>
  )
}
