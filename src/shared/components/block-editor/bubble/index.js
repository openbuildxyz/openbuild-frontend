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
