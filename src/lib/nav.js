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

import CoursesIcon from 'public/images/svg/courses.svg'
import GrowthPathIcon from 'public/images/svg/path.svg'
import QuizIcon from 'public/images/svg/quiz.svg'
// import CareerIcon from 'public/images/svg/folder.svg'
import ChallengesIcon from 'public/images/svg/challenges.svg'
import GithubIcon from 'public/images/svg/github_l.svg'
import TwitterIcon from 'public/images/svg/twitter_l.svg'
import DiscordIcon from 'public/images/svg/discord-outlined.svg'
import TelegramIcon from 'public/images/svg/telegram.svg'
import LinkedInIcon from 'public/images/svg/linkedin-outlined.svg'
import SubstackIcon from 'public/images/svg/substack-outlined.svg'
// import BountyIcon from 'public/images/svg/bounty.svg'
// import ShillingIcon from 'public/images/svg/shilling.svg'

export const homeNavs = [
  {
    name: 'Offer',
    link: '/offer',
    slug: 'offer',
  },
  {
    name: 'Cooperation',
    link: '/cooperation',
    slug: 'cooperation',
  },
  {
    name: 'Contact',
    link: '/contact',
    slug: 'contact',
  },
  {
    name: 'Partners',
    link: '/partners',
    slug: 'partners',
  },
]

export const LEARN_NAVS = [
  {
    name: 'Open Courses',
    link: '/learn/courses',
    slug: 'learn',
    icon: CoursesIcon,
    desc: 'Carefully selected open courses for anyone',
  },
  // {
  //   name: 'Growth Paths',
  //   link: '/learn/growth',
  //   slug: 'learn',
  //   icon: GrowthPathIcon,
  //   desc: 'Learning paths designed for different levels of builder',
  //   type: 'Soon',
  // },
  // {
  //   name: 'Career Certification',
  //   link: '/learn/career',
  //   slug: 'learn',
  //   icon: CareerIcon,
  //   desc: 'Practical courses recognized by companies',
  //   type: 'Soon',
  // },
  {
    name: 'Challenges',
    link: '/learn/challenges',
    slug: 'learn',
    icon: ChallengesIcon,
    desc: 'Hands-on bootcamp, Workshop or Hackathon',
  },
]

export const APP_NAVS = [
  {
    name: 'Learn',
    slug: 'learn/courses',
    link: '/learn/courses',
    children: [
      {
        desc: 'Carefully selected open courses for anyone',
        name: 'Open Courses',
        link: '/learn/courses',
        slug: 'learn',
        icon: CoursesIcon,
      },
      {
        desc: 'Learning paths designed for different levels of builder',
        link: '/learn/career_path',
        slug: 'learn',
        icon: GrowthPathIcon,
        name: 'Career Path',
      },
      {
        desc: 'Learn & Earn',
        link: '/quiz',
        slug: 'learn',
        icon: QuizIcon,
        name: 'Quiz',
      },
    ],
  },
  {
    name: 'Challenges',
    slug: 'learn/challenges',
    link: '/learn/challenges',
  },
  {
    name: 'Bounties',
    slug: 'bounties',
    link: '/bounties',
  },
  {
    name: 'SkillHub',
    slug: '/shilling',
    link: '/shilling',
  },
  {
    name: 'Community',
    link: '/community ',
    slug: 'community ',
    target: 'blank',
    children: [
      {
        desc: 'Follow and retweet us on Twitter!',
        name: 'Twitter',
        link: 'https://twitter.com/OpenBuildxyz',
        slug: 'community',
        icon: TwitterIcon,
      },
      {
        desc: 'Join the community, make friends, and get more surprise!',
        link: 'https://discord.gg/cbmteR7yRN',
        slug: 'community',
        icon: DiscordIcon,
        name: 'Discord',
      },
      {
        desc: 'Talk is cheap, show me the code!',
        link: 'https://github.com/openbuildxyz',
        slug: 'community',
        icon: GithubIcon,
        name: 'GitHub',
      },
      {
        desc: 'Join the community and get our latest updates!',
        link: 'https://t.me/OpenBuildxyz/1',
        slug: 'community',
        icon: TelegramIcon,
        name: 'Telegram',
      },
      {
        desc: 'Link with us and lock in!',
        link: 'https://www.linkedin.com/company/openbuildxyz',
        slug: 'community',
        icon: LinkedInIcon,
        name: 'LinkedIn',
      },
      {
        desc: 'Subscribe and get the weekly newsletter!',
        link: 'https://openbuildxyz.substack.com',
        slug: 'community',
        icon: SubstackIcon,
        name: 'Substack',
      },
    ],
  },
]
