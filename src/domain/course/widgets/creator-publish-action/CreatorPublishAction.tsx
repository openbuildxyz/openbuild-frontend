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
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/icon/outlined';
import { CheckCircleIcon } from '@/components/icon/solid';
import { Modal } from '@/components/Modal';

import type { CreatorPublishActionWidgetProps } from './typing';

import { InitForms, InitChallengesForms } from './init';
import { SelectItemModal } from './SelectItemModal';

function CreatorPublishAction({ type, insertAction }: CreatorPublishActionWidgetProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectActive, setSelectActive] = useState(0);
  const [selectItemModalOpen, setSelectItemModalOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const publishOptions = [
    {
      title: `Publish New ${type === 'opencourse' ? 'Course' : 'Challenge'}`,
      description: `Create a new ${type === 'opencourse' ? 'course' : 'challenge'}`,
    },
    {
      title: `Reuse and Sync ${type === 'opencourse' ? 'Challenge' : 'Course'}'s Content`,
      description: `Shared ${type === 'opencourse' ? 'challenge' : 'course'} content and speaker data, synchronized viewing progress. Exercise caution when copying.`,
    },
  ];

  return (
    <>
      <Button onClick={() => setSelectModalOpen(true)} className="h-10">
        <PlusIcon className="h-4 w-4" />
        Publish
      </Button>
      {/* </Link> */}
      <Modal isOpen={selectModalOpen} title={'Please Select Publish Content'} closeModal={() => setSelectModalOpen(false)} mode={'base'}>
        <div className="flex flex-col gap-4">
          {publishOptions.map((opt, idx) => (
            <div
              key={`publish-opt-${idx}`}
              className={clsx('cursor-pointer flex-1 flex items-center px-5 py-4 border border-gray-400 rounded', {'!border-gray': idx === selectActive})}
              onClick={() => setSelectActive(idx)}
            >
              <div className="flex-shrink-0 pr-4">
                {idx === selectActive ? (
                  <CheckCircleIcon className="h-6 w-6" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-slate-200" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-bold mb-1">{opt.title}</p>
                <p className="text-sm text-gray-100">{opt.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          loading={confirming}
          onClick={async () => {
            if (selectActive === 0) {
              setConfirming(true);
              const _forms = { ...InitForms };
              const _challengesForms = { ...InitChallengesForms };
              const learnType = type === 'opencourse' ? 'open_course' : 'challenges';
              _forms.course_series_type = learnType;
              let res;
              if (type === 'challenges') {
                res = await insertAction({ base: _forms, challenges_extra: { ..._challengesForms } });
              } else {
                res = await insertAction({ base: _forms });
              }
              setConfirming(false);
              if (res.success) {
                const _id = res.data.base.course_series_id;
                push(`${pathname}/${_id}`);
              }
            } else {
              setSelectItemModalOpen(true);
              setSelectModalOpen(false);
            }
          }} fullWidth className="mt-4 font-bold">
          Confirm
        </Button>
      </Modal>
      <SelectItemModal
        type={type}
        open={selectItemModalOpen}
        close={() => setSelectItemModalOpen(false)}
        back={() => {
          setSelectModalOpen(true);
          setSelectItemModalOpen(false);
        }}
        insertAction={insertAction}
      />
    </>
  );
}

export default CreatorPublishAction;
