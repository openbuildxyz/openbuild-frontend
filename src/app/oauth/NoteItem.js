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

import { SvgIcon } from '@/components/Image'

export default function NoteItem({title, description, icon}) {
  return (
    <div className="flex items-start gap-3">
      <SvgIcon name={icon} size={24} className="mt-1" />
      <div className="leading-6">
        <div className="text-base font-bold">{title}</div>
        <div className="text-sm text-[#1A1A1ACC]">{description}</div>
      </div>
    </div>
  )
}