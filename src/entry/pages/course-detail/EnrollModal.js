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
import React, { useEffect, useMemo, useState } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

import { Modal } from '@/components/Modal';

import { enrollOne } from '#/domain/challenge/repository';

export default function EnrollModal({ open, closeModal, json, id, successCallback }) {
  const { status } = useSession();
  const [requested, setRequested] = useState(false);
  const survey = useMemo(() => {
    return new Model(JSON.parse(json));
  }, [json]);

  useEffect(() => {
    setTimeout(() => {
      const btn = document.querySelector('.sd-navigation__complete-btn');
      if (btn !== null) {
        btn.innerHTML = 'Submit';
        btn.setAttribute('value', 'Submit');
      }
    }, 100);
  }, [open]);
  useMemo(() => {
    survey.onComplete.add(async sender => {
      if (requested) return;
      setRequested(true);
      const res = await enrollOne(id, { data: JSON.stringify(sender.data), code: window.localStorage.getItem('shareCode') || '' });
      closeModal();
      setRequested(true);
      if (res.success) {
        successCallback();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Modal isOpen={open} closeModal={closeModal}>
      <div className="survey-container max-h-[500px] overflow-y-auto overflow-x-hidden">
        {status === 'authenticated' && <Survey model={survey} />}
      </div>
    </Modal>
  );
}
