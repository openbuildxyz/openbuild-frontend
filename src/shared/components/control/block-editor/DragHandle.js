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

import { Menu } from '../headlessui';

function deleteBlockNode(editor) {
  return editor.chain()
    .focus()
    .command(({ tr }) => {
      const { $from } = tr.selection;
      tr.delete($from.before($from.depth), $from.after($from.depth));
      return true;
    })
    .run();
}

function insertNewBlockBelow(editor) {
  return editor.chain()
    .focus()
    .command(({ tr }) => {
      const { $from } = tr.selection;
      const insertPos = $from.after($from.depth);
      tr.insert(insertPos, editor.schema.nodes.paragraph.create());
      return true;
    })
    .run();
}

function DragHandle({ className, editor }) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={clsx(
          'BlockEditor-dragHandle',
          'flex h-5 w-5 items-center justify-center rounded-md',
          'hover:bg-gray-100 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          className
        )}
        aria-label="打开操作菜单"
      >
        <svg className="h-3.5 w-3.5 text-gray-600" viewBox="0 0 16 16">
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      </Menu.Button>
      <Menu.Items
        className={clsx(
          'absolute left-0 mt-2 min-w-[120px] origin-top-right rounded-md',
          'bg-white shadow-lg ring-1 ring-black/5 focus:outline-none',
          'animate-in fade-in zoom-in-95'
        )}
      >
        <div className="p-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => deleteBlockNode(editor)}
                className={clsx(
                  'flex w-full items-center rounded-md px-2 py-1.5 text-sm',
                  active && 'bg-red-50 text-red-700'
                )}
              >
                Delete
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => insertNewBlockBelow(editor)}
                className={clsx(
                  'flex w-full items-center rounded-md px-2 py-1.5 text-sm',
                  active && 'bg-green-50 text-green-700'
                )}
              >
                Insert below
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default DragHandle;
