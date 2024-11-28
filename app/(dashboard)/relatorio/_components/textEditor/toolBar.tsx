'use client'
import { Toggle } from '@/components/ui/toggle'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from 'lucide-react'

import { Editor } from '@tiptap/react'

export default function ToolBar({ editor }: { editor: Editor }) {
  if (!editor) return null

  const Options = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive('bold'),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive('italic'),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive('strike'),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      preesed: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      preesed: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      preesed: editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive('orderedList'),
    },
    {
      icon: <Highlighter className="size-4 text-green-500" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHighlight({
            color: 'green',
          })
          .run(),
      preesed: editor.isActive('highlight'),
    },
    {
      icon: <Highlighter className="size-4 text-red-500" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHighlight({
            color: 'red',
          })
          .run(),
      preesed: editor.isActive('highlight'),
    },
    {
      icon: <Highlighter className="size-4 text-yellow-500" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive('highlight'),
    },
  ]

  return (
    <div className="sticky top-10 z-50 mb-1 space-x-1 rounded-md border bg-slate-50 p-1.5">
      {Options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  )
}
