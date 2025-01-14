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

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'

import { post } from '@/utils/request'
import { Button } from '@/components/Button'

import { fetchAnsweredResult } from '../../repository'
import FeedbackDialog from '../../widgets/feedback-dialog'

import AnswerRecordDrawer from './AnswerRecordDrawer'
import { QuizCore } from './QuizCore'

function resolveAnsweredQuiz(quiz, answered, overridable = false) {
  return answered.quiz_user_answer.map((i, k) => ({
    ...quiz[k],
    answer: overridable ? i.answer : quiz[k].answer,
    judgment: i.judgment,
    correct: i.correct_answer,
  }))
}

export function QuizComponents({ id, version, data }) {
  const [page, setPage] = useState(1)
  const [quiz, setQuiz] = useState()
  const [submiting, setSubmiting] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [submitData, setSubmitData] = useState(version ? {} : undefined)

  useEffect(() => {
    const initialQuiz = data && (data.quiz_body || []).map(i => ({ ...i, answer: [] }))

    if (!initialQuiz) {
      return
    }

    setQuiz(initialQuiz)

    if (version) {
      setSubmiting(true)
      fetchAnsweredResult({ id, quid: version })
        .then(res => {
          if (res.success) {
            setSubmitData(res.data)
            setQuiz(resolveAnsweredQuiz(initialQuiz, res.data, true))
          }
        })
        .finally(() => setSubmiting(false))
    }
  }, [data, id, version])

  const _progress = useMemo(() => {
    const noAnswer = quiz?.filter(f => f.answer?.length !== 0)
    return noAnswer ? (noAnswer.length / quiz.length) * 100 : 0
  }, [quiz])

  const handleAnsweredCheck = idx => {
    setPage(idx + 1)
  }

  const submit = async () => {
    const sendParams = quiz?.map(i => ({ 'quiz_body_id': i.id, 'quiz_item_id': i.answer }))
    setSubmiting(true)
    const res = await post(`ts/v1/quiz/${id}/answer`, {data: sendParams})
    setSubmiting(false)
    if (res.code === 200) {
      setSubmitData(res.data)
      setOpenModal(true)
      setQuiz(resolveAnsweredQuiz(quiz, res.data))
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      <div className="flex items-center justify-end md:justify-between mb-[24px] md:mb-[64px]">
        <Link href={`/quiz/${id}`} className="opacity-60 text-xs hidden md:flex items-center">
          <XMarkIcon className="h-4 w-4 mr-2" /> Close
        </Link>
        <div className="flex items-center">
          <AnswerRecordDrawer questions={quiz} result={submitData} submitting={submiting} onCheck={handleAnsweredCheck} onSubmit={submit} />
          {!submitData && <Button className="min-w-[120px] ml-3" onClick={submit} loading={submiting}>Submit</Button>}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="md:w-[680px]">
          <QuizCore quiz={quiz} setQuiz={setQuiz} page={page} submitData={submitData} marked={!!version} />
          <div className="absolute bottom-0 md:bottom-14 max-md:left-0 max-md:right-0 md:flex md:items-center md:justify-between md:w-[680px]">
            <div className="flex items-center max-md:justify-center max-md:mb-4">
              <progress class="progress w-56" value={_progress.toFixed(0)} max="100"></progress>
              <span className="text-xs ml-2">{_progress.toFixed(0)}%</span>
            </div>
            <div className="flex items-center max-md:h-24 max-md:px-6 max-md:shadow-[0_-4px_14px_rgba(0,0,0,0.08)]">
              {page > 1 && <Button variant="outlined" onClick={() => setPage(page - 1)}><ChevronLeftIcon className="w-5 h-5" /></Button>}
              {page < data?.quiz_body?.length && <Button className="ml-2 px-12 max-md:flex-1" onClick={() => setPage(page + 1)}>Next</Button>}
            </div>
          </div>
        </div>
      </div>
      <FeedbackDialog
        openModal={openModal}
        result={submitData}
        setOpenModal={setOpenModal}
        quiz={data}
      />
    </>
  )
}
