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

import { Modal } from '@/components/Modal'
import React, { useState, useMemo } from 'react'
import { formatTime } from '@/utils/date'
import clsx from 'clsx'
import { enroolStatus } from '#/services/creator'
import { toast } from 'react-toastify'
import { useConfig } from '#/state/application/hooks'
import { NoData } from '@/components/NoData'
import { ChallengesExportModal } from './learn/[type]/ChallengesExportModal'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { CommonListSkeleton } from '@/components/Skeleton/CommonListSkeleton'
import useSWR from 'swr'
import { fetcher } from '@/utils/request'
import { Button } from '@/components/Button'
import { isAgreeable, isDeclinable, isBeDeclined, getStatusLabel } from '#/domain/challenge/helper'
import { updateMultipleApplicantStatus } from '#/domain/challenge/repository'

function resolveValidUserIds(userMap, targetStatus) {
  return Object.values(userMap).filter(cache => {
    if (!cache.checked) {
      return false
    }

    if (isBeDeclined(targetStatus)) {
      return cache.declinable
    }

    return cache.agreeable
  }).map(({ id }) => id)
}

export function UsersModal({ open, closeModal, id, type, challenges }) {
  const config = useConfig()

  const { data, isLoading, mutate } = useSWR(`v1/learn/creator/series/${id}/enrool?&skip=${0}&take=${2000}`, fetcher)
  const [challengesExportModalOpen, setChallengesExportModalOpen] = useState(false)
  const [surveyStr, setSurveyStr] = useState('')
  const [surveyResult, setSurveyResult] = useState()
  const [selected, setSelected] = useState({})

  const [agreeLoading, setAgreeLoading] = useState(false)
  const [declineLoading, setDeclineLoading] = useState(false)
  const [operationAgreeLoading, setOperationAgreeLoading] = useState()
  const [operationDeclineLoading, setOperationDeclineLoading] = useState()

  const challengeViewing = type === 'challenges'
  const title = challengeViewing ? 'Registered' : 'Completed / Registered'
  const allOpts = config?.find(f => f.config_id === 3)?.config_value

  const rolesOpts = useMemo(() => {
    return allOpts?.roles?.map(i => ({
      key: i.id,
      name: i.name,
    }))
  }, [allOpts])

  const skillOpts = useMemo(() => {
    return allOpts?.skills?.map(i => ({
      key: i.id,
      name: i.name,
    }))
  }, [allOpts])

  const handleStatusChanged = (res, userIds, status) => {
    if (res.code === 200) {
      const _list = data.list.map(i => {
        if (userIds.includes(i.base.user_id)) {
          i.base.course_user_permission_status = status
          return { ...i }
        } else {
          return { ...i }
        }
      })
      mutate({...data, list: _list})
    } else {
      toast.error(res.message)
    }
  }

  const changeStatus = async (id, status, uid) => {
    status === 1 ? setOperationAgreeLoading(uid) : setOperationDeclineLoading(uid)
    const res = await enroolStatus({ id, status, uid })
    handleStatusChanged(res, [uid], status)
    setOperationAgreeLoading(9999999999)
    setOperationDeclineLoading(9999999999)
  }

  const changeMultipleStatus = status => {
    if (isBeDeclined(status)) {
      setDeclineLoading(true)
    } else {
      setAgreeLoading(true)
    }

    const userIds = resolveValidUserIds(selected, status);

    updateMultipleApplicantStatus(id, { userIds, status })
      .then(res => {
        handleStatusChanged(res, userIds, status)
        setSelected({
          ...selected,
          ...userIds.reduce((prev, userId) => ({
            ...prev,
            [userId]: {
              ...selected[userId],
              checked: false,
              agreeable: isAgreeable(status),
              declinable: isDeclinable(status),
            }
          }), {}),
        })
      })
      .finally(() => {
        setAgreeLoading(false)
        setDeclineLoading(false)
      })
  }

  const handleChecked = ({ base }) => {
    const prev = selected[base.user_id] || { checked: false }
    const status = base.course_user_permission_status

    setSelected({
      ...selected,
      [base.user_id]: {
        id: base.user_id,
        checked: !prev.checked,
        agreeable: isAgreeable(status),
        declinable: isDeclinable(status),
      }
    })
  }

  const handleExport = () => {
    setChallengesExportModalOpen(true)
    setSurveyStr(challenges.challenges_extra.course_challenges_extra_check_schema)
    const results = data?.list.map(i => i.base.course_user_permission_extra_data)
    setSurveyResult(results)
  }

  const batchAgreeable = Object.values(selected).filter(({ checked, agreeable }) => checked && agreeable).length > 0 && !agreeLoading && !declineLoading
  const batchDeclinable = Object.values(selected).filter(({ checked, declinable }) => checked && declinable).length > 0 && !agreeLoading && !declineLoading

  return (
    <Modal isOpen={open} title={title} closeModal={closeModal} big={true} closeExplicitly>
      {challengeViewing && (
        <div className="flex items-center gap-2 mb-4">
          <Button className="h-9" loading={agreeLoading} disabled={!batchAgreeable} onClick={() => changeMultipleStatus(1)}>Agree</Button>
          <Button className="h-9" variant="outlined" loading={declineLoading} disabled={!batchDeclinable} onClick={() => changeMultipleStatus(-2)}>Decline</Button>
          <Button className="h-9" variant="outlined" onClick={handleExport}>
            <ArrowDownTrayIcon className="h-4 w-4" /> Export
          </Button>
        </div>
      )}

      <div className="w-full bg-white">
        <ul
          className={clsx('grid h-10 items-center text-xs font-bold', {
            'grid-cols-7': !challengeViewing,
            'grid-cols-10': challengeViewing,
          })}
        >
          {challengeViewing && <li className="w-5" />}
          <li>Name</li>
          <li className="text-center">Company</li>
          <li className="text-center">Role</li>
          <li className="text-center">Skills</li>
          <li className="text-center">Registration time</li>
          <li className="text-center">Progress</li>
          {challengeViewing && (
            <>
              <li className="text-center">Status</li>
              <li className="text-center col-span-2">Operation</li>
            </>
          )}
        </ul>
      </div>
      <div className="max-h-[400px] overflow-auto">
        {data?.list.map((i, k) => (
          <ul
            key={`UsersModal-list-${k}`}
            className={clsx('mb-4 grid h-10 items-center text-xs [&>li]:h-10 [&>li]:leading-10', {
              'grid-cols-10': challengeViewing,
              'grid-cols-7': !challengeViewing,
            })}
          >
            {challengeViewing && (
              <li className="w-5 text-center">
                <input
                  type="checkbox"
                  checked={!!selected[i.base.user_id] && selected[i.base.user_id].checked}
                  disabled={!(isAgreeable(i.base.course_user_permission_status) || isDeclinable(i.base.course_user_permission_status))}
                  onChange={handleChecked.bind(null, i)}
                />
              </li>
            )}
            <li>{i.base.user_nick_name}</li>
            <li className="text-center">{i.base.user_company}</li>
            <li className="text-center">{rolesOpts?.find(f => f.key === Number(i.base.user_roles))?.name}</li>
            <li className="text-center truncate">
              {`${i.base.user_skills && i.base.user_skills.map(i => ' '+skillOpts?.find(f => f.key === i)?.name)}`}
            </li>
            <li className="text-center">{formatTime(Number(i.base.user_created_at) * 1000, 'MMM D, YYYY HH:mm')}</li>
            <li className="text-center">
              {i.analytics.analytice_estimated_time === 0 ? 0 : ((i.analytics.analytice_user_time / i.analytics.analytice_estimated_time) * 100).toFixed(0)} %
            </li>
            {challengeViewing && (
              <>
                <li className="text-center">{getStatusLabel(i.base.course_user_permission_status)}</li>
                <li className="text-center col-span-2">
                  {i.base.course_user_permission_status === -1 && (
                    <div className="flex justify-center items-center h-10">
                      <Button
                        loading={operationAgreeLoading === i.base.user_id}
                        size="sm"
                        onClick={() => changeStatus(i.base.course_user_permission_extra_id, 1, i.base.user_id)}
                      >
                        Agree
                      </Button>
                      <Button
                        variant="outlined"
                        size="sm"
                        className="ml-2"
                        loading={operationDeclineLoading === i.base.user_id}
                        onClick={() => changeStatus(i.base.course_user_permission_extra_id, -2, i.base.user_id)}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                  {i.base.course_user_permission_status === -2 && (
                    <div>
                      <Button
                        loading={operationAgreeLoading === i.base.user_id}
                        size="sm"
                        onClick={() => changeStatus(i.base.course_user_permission_extra_id, 1, i.base.user_id)}
                      >
                        Agree
                      </Button>
                    </div>
                  )}
                  {i.base.course_user_permission_status !== -1 && i.base.course_user_permission_status !== -2 && (
                    <div>--</div>
                  )}
                </li>
              </>
            )}
          </ul>
        ))}
        {isLoading && <CommonListSkeleton height={40} />}
        {(data?.list.length === 0 || !data) && !isLoading && (
          <div className="flex justify-center">
            <NoData />
          </div>
        )}
      </div>
      {challengesExportModalOpen && (
        <ChallengesExportModal
          challenges={challenges}
          result={surveyResult}
          json={surveyStr}
          open={challengesExportModalOpen}
          closeModal={() => setChallengesExportModalOpen(false)}
        />
      )}
    </Modal>
  )
}
