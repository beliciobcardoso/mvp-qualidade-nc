'use client'
import { Toggle } from '@/components/ui/toggle'
import type { Editor } from '@tiptap/core'
import { Bold, CircleDot, Heading2, Italic, List, ListOrdered, Palette, Strikethrough } from 'lucide-react'

type Props = {
  editor: Editor | null
}

export function Toolbar({ editor }: Props) {
  if (!editor) return null

  return (
    <div className="flex items-center border-b border-gray-200 bg-white p-2">
      <Toggle
        size={'sm'}
        pressed={editor.isActive('heading')}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().setStrike().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('strikethrough')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={editor.isActive('palette')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Palette className="h-4 w-4" />
      </Toggle>
      <Toggle size={'sm'} pressed={editor.isActive('circleDot')} onPressedChange={() => {}}>
        <CircleDot className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
