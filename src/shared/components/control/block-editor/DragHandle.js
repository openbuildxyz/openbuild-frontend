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

// import { useEditor } from 'novel';

// function insertNewBlockBelow(editor) {
//   return editor.chain()
//     .focus()
//     .command(({ tr }) => {
//       const { $from } = tr.selection;
//       const insertPos = $from.after($from.depth);
//       tr.insert(insertPos, editor.schema.nodes.paragraph.create());
//       return true;
//     })
//     .run();
// }

// function deleteBlock(editor) {
//   return editor.chain()
//     .focus()
//     .command(({ tr }) => {
//       const { $from } = tr.selection;
//       tr.delete($from.before($from.depth), $from.after($from.depth));
//       return true;
//     })
//     .run();
// }

function DragHandle() {
  // const { editor } = useEditor();

  return (
    <div className="BlockEditor-dragHandle" />
  );
}

export default DragHandle;
