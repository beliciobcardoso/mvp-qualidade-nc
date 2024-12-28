'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ColorHighlighter } from './ColorHighlighter'
import { Toolbar } from './ToolBar'

export default function Tiptap({
  description,
  onChange,
}: {
  description: string
  onChange: (richText: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure(), ColorHighlighter.configure()],
    content: description,
    editorProps: {
      attributes: {
        class:
          'rounded-md border min-h-[50px] min-w-[100px] border-input p-2 ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
      console.log(editor.getHTML())
    },
  })
  return (
    <div className="flex min-h-[60px] min-w-[450px] flex-col justify-stretch">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
