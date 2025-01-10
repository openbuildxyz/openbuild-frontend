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

import { useState } from 'react'
import { EditorBubble } from 'novel'

import { ColorSelector } from './ColorSelector'
import { LinkSelector } from './LinkSelector'
import { NodeSelector } from './NodeSelector'
import { MathSelector } from './MathSelector'
import { TextButtons } from './TextButtons'
import { Separator } from './Separator'

function BlockEditorBubble({ className }) {
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)

  return (
    <EditorBubble className={className}>
      <Separator orientation="vertical" />
      <NodeSelector open={openNode} onOpenChange={setOpenNode} />
      <Separator orientation="vertical" />

      <LinkSelector open={openLink} onOpenChange={setOpenLink} />
      <Separator orientation="vertical" />
      <MathSelector />
      <Separator orientation="vertical" />
      <TextButtons />
      <Separator orientation="vertical" />
      <ColorSelector open={openColor} onOpenChange={setOpenColor} />
    </EditorBubble>
  )
}

export default BlockEditorBubble
