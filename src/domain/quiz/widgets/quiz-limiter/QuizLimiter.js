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
import { useRouter } from 'next/navigation';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Confirm } from '@/components/Modal/Confirm';
import { isFunction } from '@/utils';

import { authWithGoogle, authWithGithub } from '../../../auth/helper';
import { useBindWallet } from '../../../auth/hooks';

const LimitType = {
  Submission: 1,
  Wallet: 2,
  Google: 3,
  GitHub: 4,
  Enrolled: 5,
};

const limitTypeMap = {
  [LimitType.Submission]: 'You have exceeded submission limit.',
  [LimitType.Wallet]: 'Please connect your wallet first.',
  [LimitType.Google]: 'Please connect Google account first.',
  [LimitType.GitHub]: 'Please connect your GitHub account first',
  [LimitType.Enrolled]: 'Please enroll a specific course or challenge first.',
};

function QuizLimiterWidget({
  id,
  type,
  quiz = false,
  check = false,
  children,
  onReset,
}) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const quizPath = useMemo(() => `/quiz/${id}`, [id]);
  const questionsPath = useMemo(() => `${quizPath}/questions`, [quizPath]);
  const gotoQuiz = useCallback(() => router.push(quizPath), [quizPath]);  // eslint-disable-line react-hooks/exhaustive-deps
  const bindWallet = useBindWallet();

  useEffect(() => {
    if (!check) {
      return;
    }

    if (status !== 'authenticated') {
      router.push(`/signin?from=${quizPath}`);
    } else {
      if (type in limitTypeMap) {
        if ([LimitType.Wallet, LimitType.Google, LimitType.GitHub].includes(type)) {
          setDialogVisible(true);
        } else {
          toast.error(limitTypeMap[type]);

          if (!quiz) {
            gotoQuiz();
          }
        }
      } else if (quiz) {
        router.push(questionsPath);
      }
    }
  }, [check]);  // eslint-disable-line react-hooks/exhaustive-deps

  const closeDialog = () => setDialogVisible(false);

  const handleConfirm = () => {
    if (type === LimitType.Wallet) {
      bindWallet(closeDialog);
    } else {
      const redirectPath = quiz ? quizPath : questionsPath;

      if (type === LimitType.Google) {
        authWithGoogle(redirectPath);
      } else if (type === LimitType.GitHub) {
        authWithGithub(redirectPath);
      }
    }
  };

  const handleCancel = source => {
    if (source !== 'Cancel') {
      return;
    }

    if (quiz) {
      closeDialog();
      isFunction(onReset) && onReset();
    } else {
      gotoQuiz();
    }
  };

  return (
    <>
      {children}
      {check && (
        <Confirm
          title="Connect"
          info={limitTypeMap[type]}
          open={dialogVisible}
          confirmEvt={handleConfirm}
          closeModal={handleCancel}
        />
      )}
    </>
  );
}

export default QuizLimiterWidget;
