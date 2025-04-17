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

import type { SegmentedFormProps } from './typing';

import SegmentedAside from './SegmentedAside';

function SegmentedForm({
  id,
  className,
  loading = false,
  label,
  segments,
  actionBar,
  onBack,
}: SegmentedFormProps) {
  return (
    <div id={id} className={clsx('relative flex w-full', className)}>
      {loading && <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-[999999999] bg-gray-1100">
        <span className="loading loading-spinner loading-lg" />
      </div>}
      <SegmentedAside label={label} segments={segments} onBack={onBack} />
      <div className="flex-1 p-8 max-w-3xl w-full min-h-screen pr-14 border-r border-gray-400 pb-[120px]">
        {segments.map(({ key, render: renderContent }) => (
          <section key={key} id={key} className="pb-[100px] mb-[100px] border-b border-gray-600">
            {renderContent(key)}
          </section>
        ))}
      </div>
      {actionBar && (
        <div className="drop-shadow-4xl fixed z-[50] bottom-0 left-0 flex h-[100px] w-full items-center justify-center bg-white">
          {actionBar}
        </div>
      )}
    </div>
  );
}

export default SegmentedForm;
