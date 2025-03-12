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

import { useInteractions, useFloating, useClick } from '@floating-ui/react';
import { useEditor } from 'novel';
import { useState } from 'react';

import type { EditorInstance} from 'novel';
import type { ReactNode } from 'react';

function Item({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <div className="cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-900" onClick={onClick}>
      {children}
    </div>
  );
}

function DragHandle() {
  const { editor } = useEditor();

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'left-start',
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  const getDragHandlePos = (editor: EditorInstance) => {
    const { left, top } = refs.reference.current!.getBoundingClientRect();
    const posAtCoords = editor.view.posAtCoords({ left: left + 50, top: top + 1 });

    return posAtCoords;
  };

  const insertNewBlockBelow = () => {
    if (!editor) return;

    return editor
      .chain()
      .focus()
      .command(({ tr }) => {
        const posAtCoords = getDragHandlePos(editor);
        if (!posAtCoords) return false;

        const $pos = editor.state.doc.resolve(posAtCoords.pos);
        const insertPos = $pos.after($pos.depth);
        tr.insert(insertPos, editor.schema.nodes.paragraph.create());

        setIsOpen(false);
        return true;
      })
      .run();
  };
  const deleteBlock = () => {
    if (!editor) return;

    return editor
      .chain()
      .focus()
      .command(({ tr }) => {
        const posAtCoords = getDragHandlePos(editor);
        if (!posAtCoords) return false;

        const $pos = editor.state.doc.resolve(posAtCoords.pos);
        const from = $pos.before($pos.depth);
        const to = $pos.after($pos.depth);
        tr.delete(from, to);

        setIsOpen(false);
        return true;
      })
      .run();
  };

  return (
    <>
      <div className="BlockEditor-dragHandle" ref={refs.setReference} {...getReferenceProps()} />

      {isOpen && (
        <div
          className="flex flex-col gap-2 rounded-md border py-1 px-2 border-gray-300 bg-background shadow-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <Item onClick={deleteBlock}>Delete</Item>
          <Item onClick={insertNewBlockBelow}>Insert</Item>
        </div>
      )}
    </>
  );
}

export default DragHandle;
