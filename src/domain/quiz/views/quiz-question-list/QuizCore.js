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

import { nanoid } from 'nanoid'
import clsx from 'clsx'
// import { OViewer } from '@/components/MarkDown'

export function QuizCore({
  quiz,
  setQuiz,
  page,
  submitData
}) {
  return quiz && quiz.length > 0 ? (
    <>
      <p className="text-[14px] max-md:leading-[32px] md:text-sm mb-3 md:mb-4">Question {page} / {quiz?.length}</p>
      <div>
        {quiz && <h2 className="text-2xl">
          <span className={clsx('rounded relative top-[-3px] px-2 py-1 mr-2 font-normal text-sm', {
            'bg-[rgba(58,171,118,0.1)] text-[#3AAB76]': quiz[page - 1].type !== 2,
            'bg-[rgba(118,82,237,0.1)] text-[#7652ED]': quiz[page - 1].type === 2
          })}>{quiz[page - 1].type === 2 ? 'Multiple' : 'Single'}</span>
          {quiz[page - 1].question}
        </h2>}
        <>
          {
            quiz ? quiz[page - 1].quiz_item.map((item) => {
              const checked = quiz[page - 1].answer?.includes(item.id)
              return (
                <button
                  key={nanoid()}
                  type="button"
                  className={clsx('flex items-center gap-x-4 md:block min-h-[48px] py-3 border text-[15px] transition-all rounded mt-6 w-full text-left px-4 border-gray-600 hover:border-gray', {
                    '!border-gray': checked
                  })}
                  onClick={() => {
                    if (submitData) return
                    const _quiz = [...quiz]
                    if (quiz[page - 1].type === 2) {
                      if (_quiz[page - 1].answer.includes(item.id)) {
                        _quiz[page - 1].answer.splice( _quiz.indexOf(item.id), 1)
                      } else {
                        _quiz[page - 1].answer.push(item.id)
                      }
                    } else {
                      _quiz[page - 1].answer = [item.id]
                    }
                    setQuiz(_quiz)
                  }}
                >
                  <Radio checked={checked} className={'flex-shrink-0 md:hidden'}/>
                  {item.item_text}
                </button>
              )
            }) : null
          }
        </>
      </div>
    </>
  ) : null
}

function Radio({ checked,className }) {
  return checked 
  ? <div className={clsx(className,'w-[18px] h-[18px] rounded-[50%] bg-[#01DB83] flex items-center justify-center')}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 6L5 8.5L10 3.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  </div>
  : (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.1" x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="black"/>
    </svg>
  )
}
