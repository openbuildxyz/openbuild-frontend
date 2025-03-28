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

import Aos from 'aos';
import Image from 'next/image';
import QuizBannerPic from 'public/images/quiz-banner.svg';
import { useState } from 'react';

import { ArrowRightIcon } from '@/components/Icons';
import useMounted from '@/hooks/useMounted';

import QuizListViewWidget from '#/domain/quiz/views/quiz-list';

import StartOnOpenBuild from '../../components/StartOnOpenBuild';
import QuizS1 from './quiz-s-1.svg';
import QuizS2 from './quiz-s-2.svg';
import QuizS3 from './quiz-s-3.svg';

const Steps = [
  {
    name: 'Learn Courses',
    icon: QuizS1,
  },
  {
    name: 'Complete Quizzes',
    icon: QuizS2,
  },
  {
    name: 'Earn Prizes',
    icon: QuizS3,
  },
];

function QuizListPage() {
  const [activeStep, setActiveStep] = useState(0);

  useMounted(() => {
    Aos.init({
      delay: 100, // values from 0 to 3000, with step 50ms
      duration: 800, // values from 0 to 3000, with step 50ms
    });
  });
  return (
    <div>
      <div className="md:flex bg-white md:justify-center pb-14">
        <div className="md:w-[1200px] md:flex md:justify-between md:pr-[120px] py-6" data-aos="fade-left">
          <div className="md:pt-[58px] md:max-w-[420px]" data-aos="fade-right">
            <h1 className="text-[32px] md:text-[48px] leading-[42px] md:leading-[64px] max-md:text-center mb-3 md:mb-4">
              Learn & Earn
            </h1>
            <p className="max-md:px-6 mx-auto max-md:mb-6 max-md:text-center text-[20px] md:text-[22px] leading-[26px] md:leading-8 font-normal">
              Discover cutting-edge protocols and ecosystems, <strong>earn prizes</strong> and <strong>thrive</strong>{' '}
              in the crypto space!
            </p>
          </div>
          <Image className="max-md:w-[360px] max-md:mx-auto" src={QuizBannerPic} alt="" />
        </div>
      </div>
      <div
        data-aos="fade-bottom"
        className="w-[1200px] h-[110px] mx-auto shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white !translate-y-[-50%] rounded-xl hidden md:flex justify-center items-center gap-[96px]"
      >
        {Steps.map((i, k) => (
          <div key={`quiz-step-${k}`} className="flex gap-[96px] items-center">
            <div className="flex">
              <Image src={i.icon} alt="" />
              <div className="ml-4">
                <p>Step {k + 1}</p>
                <h3>{i.name}</h3>
              </div>
            </div>
            {k < Steps.length - 1 && <ArrowRightIcon className="w-6 h-6" />}
          </div>
        ))}
      </div>
      {/* mobile steps */}
      <div className="md:hidden h-[110px] mx-6 py-6 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white !translate-y-[-50%] rounded-xl">
        {Steps.map((i, k) => {
          const isNotLast = k < Steps.length - 1;
          const isFirst = k === 0;
          return (
            <div key={`quiz-step-${k}`} className={`${activeStep === k ? 'flex' : 'hidden'} gap-[20px] items-center`}>
              <ArrowRightIcon
                className={`w-5 h-5 rotate-180 flex-shrink-0 ${isFirst ? 'opacity-[.2]' : ''}`}
                onClick={() => {
                  if (k > 0) {
                    setActiveStep(k - 1);
                  }
                }}
              />
              <div className="flex flex-1">
                <Image src={i.icon} alt="" className="h-[60px]" />
                <div className="ml-4">
                  <p>Step {k + 1}</p>
                  <h3>{i.name}</h3>
                </div>
              </div>
              <ArrowRightIcon
                className={`w-5 h-5 flex-shrink-0 ${isNotLast ? '' : 'opacity-[.2]'}`}
                onClick={() => {
                  if (isNotLast) {
                    setActiveStep(k + 1);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="md:w-[1200px] mx-6 md:mx-auto mb-14 md:mb-[110px]">
        <QuizListViewWidget />
        <div className="md:flex mt-14">
          <h3 className="md:flex-1 text-[24px] md:text-[32px] max-md:leading-10 max-md:pb-4">Quiz FAQ</h3>
          <div className="md:w-[640px]">
            <div className="collapse rounded-none collapse-plus border-t border-gray-1100">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-bold h-[80px] flex items-center text-xl">
                Who is able to participate in Quiz?
              </div>
              <div className="collapse-content pl-0 opacity-80">
                <p>
                  Anyone can participate in Quiz, and to claim the prize, users must connect their Github account first.
                </p>
              </div>
            </div>
            <div className="collapse rounded-none collapse-plus border-t border-gray-1100">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-bold h-[80px] flex items-center text-xl">
                How do I participate in Quiz?
              </div>
              <div className="collapse-content pl-0 opacity-80">
                <p>1. Enroll in a relative course on the certain Quiz page</p>
                <p>2. Learn and complete the Quiz</p>
                <p>3. Submit your address for the prize</p>
                <p>4. Receive your prize if qualified</p>
              </div>
            </div>
            <div className="collapse rounded-none collapse-plus border-t border-gray-1100">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-bold h-[80px] flex items-center text-xl">
                What are the prizes for Quiz?
              </div>
              <div className="collapse-content pl-0 opacity-80">
                <p>The prizes can be tokens, points, NFTs, souvenirs, etc, and its value is estimated.</p>
              </div>
            </div>
            <div className="collapse rounded-none collapse-plus border-t border-b border-gray-1100">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-bold h-[80px] flex items-center text-xl">
                Can I take the Quiz if it has ended?
              </div>
              <div className="collapse-content pl-0 opacity-80">
                <p>
                  You can always take the Quiz whenever you want. However, the prize is available only when the quiz
                  status is Ongoing.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StartOnOpenBuild />
    </div>
  );
}

export default QuizListPage;
