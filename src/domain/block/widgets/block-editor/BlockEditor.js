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

import { isFunction } from 'lodash'
import { EditorRoot, EditorContent } from 'novel'

import { defaultExtensions } from './helper'

function BlockEditor({ data, onChange, editable = false }) {
  const handleUpdate = ({ editor }) => {
    isFunction(onChange) && onChange(editor.getJSON())
  }

  return data ? (
    <div>
      <EditorRoot>
        <EditorContent
          className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:rounded-lg sm:border sm:shadow-lg"
          immediatelyRender={false}
          initialContent={data}
          extensions={defaultExtensions}
          editorProps={{
            attributes: {
              class: 'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
            }
          }}
          editable={editable}
          onUpdate={handleUpdate}
        />
      </EditorRoot>
    </div>
  ) : (
    <div>Empty</div>
  )
}

export default BlockEditor
