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
import { EditorRoot, EditorContent, EditorCommand, EditorCommandEmpty, EditorCommandList, EditorCommandItem } from 'novel'
import { ImageResizer, handleCommandNavigation } from 'novel/extensions'

import { defaultExtensions } from './extensions'
import { slashCommand, suggestionItems } from './slash'

const extensions = [...defaultExtensions, slashCommand]

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
          extensions={extensions}
          editorProps={{
            attributes: {
              class: 'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
            },
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
          }}
          editable={editable}
          onUpdate={handleUpdate}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  ) : (
    <div>Empty</div>
  )
}

export default BlockEditor
