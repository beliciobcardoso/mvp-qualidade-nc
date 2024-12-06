'use client'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image'
import ToolBar from './toolBar'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      TextStyle.configure(),
      StarterKit.configure(),
      Underline.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'font-bold py-1 p-2 my-2 rounded-md',
        },
      }),
      Color.configure(),
      Image,
      ImageResize,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'border rounded-md bg-slate-50 py-2 my-2 px-3',
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML())
      if (editor.getHTML() === '<p></p>') {
        onChange('')
      } else {
        onChange(editor.getHTML())
      }
    },
  })

  return (
    <div>
      {editor && <ToolBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
