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

import Link from 'next/link';

import { Button } from '@/components/Button';
import Avatar from '@/components/Avatar';

function FeedbackDetail({ result = {} }) {
  const { quiz_user = {} } = result;

  return (
    <>
      <div className="mt-7 mb-2 flex items-center">
        {quiz_user.user_avatar && (
          <Avatar
            className="mr-2"
            size={20}
            alt={quiz_user.user_nick_name}
            src={quiz_user.user_avatar}
          />
        )}
        <p className="opacity-90 text-sm">
          <a href={`/u/${quiz_user?.user_handle}`}>{quiz_user.user_nick_name}</a>
        </p>
      </div>
      <h4>{result?.quiz_info.title}</h4>
      <p className="text-sm opacity-60 mt-1">Reach {result?.quiz_info.pass_score} to complete the challenge</p>
      <div className="mt-6">
        <Link href={`/quiz/${result?.quiz_id}`}>
          <Button fullWidth>View challenge details</Button>
        </Link>
      </div>
    </>
  );
}

export default FeedbackDetail;
