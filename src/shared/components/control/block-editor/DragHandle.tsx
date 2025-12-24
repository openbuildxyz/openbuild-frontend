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

import { useInteractions, useFloating, useClick, useDismiss } from '@floating-ui/react';
import { useEditor } from 'novel';
import { useRef, useState } from 'react';

import type { PropsWithChildren } from 'react';

function DropdownItem({ children, onClick }: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <div className="cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-900" onClick={onClick}>
      {children}
    </div>
  );
}

function DragHandle() {
  const { editor } = useEditor();

  const [open, setOpen] = useState(false);
  const pos = useRef<number | null>(null);

  const getDragHandlePos = () => {
    if (!editor) return null;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { left, top } = refs.reference.current!.getBoundingClientRect();
    // https://github.com/NiclasDev63/tiptap-extension-global-drag-handle/blob/3c327114aa54293392369c6c5bb311f2eabc50bd/src/index.ts#L84-L95
    // add 50px to the left and 1px to the top to make sure the position is inside the editor
    const posAtCoords = editor.view.posAtCoords({ left: left + 50, top: top + 1 });

    return posAtCoords;
  };

  const { refs, floatingStyles, context } = useFloating({
    placement: 'left-start',
    open,
    onOpenChange: open => {
      setOpen(open);

      if (open) {
        const posAtCoords = getDragHandlePos();
        if (!posAtCoords) return;

        pos.current = posAtCoords.pos;
      }
    },
  });
  const click = useClick(context);
  const dismiss = useDismiss(context, {
    ancestorScroll: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const insertNewBlockBelow = () => {
    if (!editor) return;

    return editor
      .chain()
      .focus()
      .command(({ commands, state }) => {
        if (!pos.current) return false;

        const $pos = editor.state.doc.resolve(pos.current);

        const depth = $pos.depth;
        // if depth is 0, we are inserting a new block at the top level
        let insertPos = depth === 0 ? $pos.pos + 1 : $pos.after(depth);

        const node = $pos.node();
        if (node.type.name === 'column') {
          const columnBlock = $pos.node(1);
          if (columnBlock.type.name !== 'columnBlock') return false;
          insertPos = $pos.pos + columnBlock.content.size;
        }

        if (insertPos >= 0 && insertPos <= state.doc.content.size) {
          commands.insertContentAt(insertPos, editor.schema.nodes.paragraph.create());

          setOpen(false);
          return true;
        }

        return false;
      })
      .run();
  };
  const deleteBlock = () => {
    if (!editor) return;

    return editor
      .chain()
      .focus()
      .command(({ state, commands }) => {
        if (!pos.current) return false;

        // Ensure position is within document bounds
        const $pos = state.doc.resolve(Math.min(pos.current, state.doc.content.size));

        // Find the closest parent block node
        const depth = $pos.depth;

        // if depth is 0, we are deleting the block itself
        let start = depth === 0 ? $pos.pos : $pos.before(depth);
        let end = depth === 0 ? $pos.pos + 1 : $pos.after(depth);

        const node = $pos.node();
        if (node.type.name === 'column') {
          const columnBlock = $pos.node(1);

          if (columnBlock.type.name !== 'columnBlock') return false;
          start -= 1;
          end = start + columnBlock.nodeSize;
        }

        // Ensure we're not trying to delete beyond document boundaries
        if (start >= 0 && end <= state.doc.content.size && start < end) {
          commands.deleteRange({ from: start, to: end });

          setOpen(false);
          return true;
        }

        return false;
      })
      .run();
  };

  return (
    <>
      <div className="BlockEditor-dragHandle" ref={refs.setReference} {...getReferenceProps()} />

      {open && (
        <div
          className="flex flex-col gap-2 rounded-md border py-1 px-2 border-gray-300 bg-background shadow-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <DropdownItem onClick={deleteBlock}>Delete</DropdownItem>
          <DropdownItem onClick={insertNewBlockBelow}>Insert</DropdownItem>
        </div>
      )}
    </>
  );
}

export default DragHandle;
