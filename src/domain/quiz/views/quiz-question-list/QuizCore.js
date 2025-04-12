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

import { generateRandomId } from '@/utils';

import RadioIcon from './RadioIcon';

export function QuizCore({
  quiz,
  setQuiz,
  page,
  submitData,
  marked = false,
}) {
  if (!quiz || quiz.length === 0) {
    return;
  }

  const multiple = quiz[page - 1].type === 2;

  const checkAnswer = item => {
    if (submitData) {
      return;
    }

    const _quiz = [...quiz];

    if (multiple) {
      const answerIndex = _quiz[page - 1].answer.indexOf(item.id);

      if (answerIndex !== -1) {
        _quiz[page - 1].answer.splice(answerIndex, 1);
      } else {
        _quiz[page - 1].answer.push(item.id);
      }
    } else {
      _quiz[page - 1].answer = [item.id];
    }

    setQuiz(_quiz);
  };

  return (
    <>
      <p className="text-[14px] max-md:leading-[32px] md:text-sm mb-3 md:mb-4">Question {page} / {quiz?.length}</p>
      <div>
        {quiz && (
          <>
            <h2 className="text-2xl">
              <span className={clsx('rounded relative top-[-3px] px-2 py-1 mr-2 font-normal text-sm', {
                'bg-[rgba(58,171,118,0.1)] text-[#3AAB76]': !multiple,
                'bg-[rgba(118,82,237,0.1)] text-[#7652ED]': multiple,
              })}>{multiple ? 'Multiple' : 'Single'}</span>
              {quiz[page - 1].question}
            </h2>
            {quiz[page - 1].quiz_item.map(item => {
              const checked = quiz[page - 1].answer?.includes(item.id);
              const markable = checked && marked;
              const correct = quiz[page - 1].correct?.includes(item.id);

              return (
                <button
                  key={generateRandomId()}
                  type="button"
                  className={clsx('flex items-center gap-x-4 md:block min-h-[48px] py-3 border text-[15px] transition-all rounded mt-6 w-full text-left px-4 border-gray-600 hover:border-gray', {
                    '!border-gray': checked,
                    '!border-green': markable && correct,
                    '!border-red': markable && !correct,
                  })}
                  onClick={() => checkAnswer(item)}
                >
                  <RadioIcon className="flex-shrink-0 md:hidden" checked={checked} />
                  {item.item_text}
                </button>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

