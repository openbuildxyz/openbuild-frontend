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

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import QuizBannerPic from 'public/images/quiz-banner.png';
import { useMemo, useState } from 'react';

import { Button } from '@/components/Button';
import { ArrowUturnLeftIcon } from '@/components/icon/solid';
import { HistoryIcon } from '@/components/Icons';
import { OViewer } from '@/components/MarkDown';
import useMounted from '@/hooks/useMounted';
import { noop } from '@/utils';

import { useMediaUrl } from '#/state/application/hooks';

import { fetchList as fetchChallengeList } from '../../../challenge/repository';
import ChallengeListViewWidget from '../../../challenge/views/challenge-list';
import { fetchList as fetchCourseList } from '../../../course/repository';
import CourseListViewWidget from '../../../course/views/course-list';
import { fetchOne } from '../../repository';
import QuizLimiterWidget from '../../widgets/quiz-limiter';
import RankList from './RankList';
import RankListModal from './RankListModal';
import RecordListModal from './RecordListModal';

function QuizDetailView({ quizId }) {
  const mediaUrl = useMediaUrl();
  const [openChallenge, setOpenChallenge] = useState(false);
  const [openRankList, setOpenRankList] = useState(false);
  const [checkLimit, setCheckLimit] = useState(false);
  const [checkedAt, setCheckedAt] = useState(0);
  const [data, setData] = useState();
  const [coursesList, setCoursesList] = useState();
  const [challengeList, setChallengeList] = useState();
  const { status } = useSession();
  const router = useRouter();

  useMounted(() => {
    Promise.all([
      fetchOne(quizId),
      fetchCourseList({ skip: 0, take: 2, quiz_bind_id: quizId }),
      fetchChallengeList({ skip: 0, take: 2, quiz_bind_id: quizId }),
    ])
      .then(([quizDetailRes, courseListRes, challengeListRes]) => {
        setData(quizDetailRes.data);
        setCoursesList(courseListRes.data);
        setChallengeList(challengeListRes.data);
      });
  });

  const bannerImage = data?.background_img ? `${mediaUrl}${data?.background_img}` : QuizBannerPic.src;

  const challengeButtonProps = useMemo(() => {
    const now = Date.now();
    const nowSeconds = now / 1000;

    let content = 'Challenge now';

    let handleClick = () => {
      setCheckLimit(true);
      setCheckedAt(now);
    };

    if (data?.date_limit) {
      if (nowSeconds < data?.start_time) {
        content = 'Waiting to start';
        handleClick = noop;
      } else if (nowSeconds > data?.end_time) {
        content = 'End';
        handleClick = noop;
      }
    }

    return { content, handleClick };
  }, [data]);

  return (
    <QuizLimiterWidget
      id={quizId}
      limit={data?.limit}
      check={checkLimit}
      quiz
      onReset={() => setCheckLimit(false)}
      checkedAt={checkedAt}
    >
      <div className="max-md:flex max-md:flex-col max-md:gap-y-4 h-[250px] md:h-[360px] bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${bannerImage})`  }}>
        <div className="md:absolute flex items-center mt-[15px] md:mt-6 mx-4 md:mx-14">
          <span
            onClick={() => window.history.back()}
            className="transition-all hidden md:flex items-center cursor-pointer text-sm opacity-80 rounded py-2 px-3 border border-gray-1100 text-black mr-2 hover:border-gray">
            <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />Return
          </span>
          <span onClick={() => {
            if (status !== 'authenticated') {
              router.push(`/signin?from=/quiz/${quizId}`);
            } else {
              setOpenChallenge(true);
            }
          }} className="cursor-pointer transition-all flex text-sm items-center opacity-80 rounded py-2 px-3 border border-gray-1100 text-black hover:border-gray">
            <HistoryIcon className="mr-2" />Challenge Record
          </span>
        </div>
        <div className="flex items-center justify-center md:pt-9 md:pb-4">
          {data?.quiz_user?.user_avatar && mediaUrl && (
            <Image
              className="h-7 w-7 rounded object-cover mr-2"
              height={24}
              width={24}
              alt={'user_avatar'}
              src={mediaUrl + data?.quiz_user?.user_avatar}
            />
          )}
          <p className="opacity-90 max-md:text-[18px]">by <a href={`/u/${data?.quiz_user?.user_handle}`}><strong>{data?.quiz_user?.user_nick_name}</strong></a></p>
        </div>
        <h1 className="text-[28px] md:text-[42px] leading-[32px] md:leading-[52px] text-center max-md:px-6 md:max-w-[692px] mx-auto">{data?.title}</h1>
      </div>
      <div className="max-w-[800px] mx-auto bg-white rounded-xl p-6 md:px-9 md:pt-10 md:pb-6  relative z-[2] md:top-[-155px]">
        <h5 className="text-lg mb-4 md:mb-3">Quiz Describe</h5>
        <OViewer value={data?.describe} />
        <Button
          className="mt-4 md:mt-6 mb-9 md:mb-10 !font-bold px-[64px] !text-base max-md:w-full"
          onClick={challengeButtonProps.handleClick}
        >
          {challengeButtonProps.content}
        </Button>
        <RankList rank={data?.my_rank} list={data?.rank}/>
        <p className="text-sm text-center mt-6 cursor-pointer" onClick={()=>{setOpenRankList(true);}}><strong>{data?.user_num}</strong> builders have participated</p>
      </div>
      {
        coursesList?.count > 0 && (
          <div className="max-w-[800px] mb-9 max-md:mt-9 mx-6 md:mx-auto relative md:top-[-105px] max-md:pb-14">
            <h3 className="text-[18px] max-md:leading-[24px] md:text-lg mb-6">Related courses</h3>
            <CourseListViewWidget className="gap-y-6 md:gap-4 md:grid-cols-2" data={coursesList?.list} />
          </div>
        )
      }
      {
        challengeList?.count > 0 && (
          <div className="max-w-[800px] max-md:mt-9 mx-6 md:mx-auto relative md:top-[-105px] max-md:pb-14">
            <h3 className="text-[18px] max-md:leading-[24px] md:text-lg mb-6">Related challenges</h3>
            <ChallengeListViewWidget className="!gap-y-6 md:!gap-4 md:!grid-cols-2" data={challengeList?.list} />
          </div>
        )
      }
      <RankListModal quizId={quizId} shown={openRankList} onClose={() => setOpenRankList(false)}  rank={data?.my_rank}/>
      <RecordListModal quizId={quizId} shown={openChallenge} onClose={() => setOpenChallenge(false)} />
    </QuizLimiterWidget>
  );
}

export default QuizDetailView;
