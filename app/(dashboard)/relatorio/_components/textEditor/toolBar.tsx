'use client'
import { Toggle } from '@/components/ui/toggle'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  EraserIcon,
  Highlighter,
  Italic,
  Palette,
  Strikethrough,
  Underline,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Editor } from '@tiptap/react'
import { useState } from 'react'

export default function ToolBar({ editor }: { editor: Editor }) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  if (!editor) return null

  const colors = [
    '#FF0000', // Vermelho
    '#00FF00', // Verde
    '#0000FF', // Azul
    '#FFFF00', // Amarelo
    '#FF00FF', // Magenta
    '#00FFFF', // Ciano
    '#000000', // Preto
    '#FFFFFF', // Branco
  ]

  const setColor = (color: string | null) => {
    if (color) {
      editor.chain().focus().setColor(color).run()
    } else {
      editor.chain().focus().unsetColor().run()
    }
    setShowColorPicker(false) // Fecha o seletor após selecionar uma cor
  }

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
      icon: <Underline className="size-4" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      preesed: editor.isActive('underline'),
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
      icon: <Highlighter className="size-4 text-blue-500" />,
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHighlight({
            color: 'blue',
          })
          .run(),
      preesed: editor.isActive('highlight'),
    },
    {
      icon: <Highlighter className="size-4 text-yellow-500" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive('highlight'),
    },
    {
      icon: <Palette className="size-4" />,
      onClick: () => setShowColorPicker(!showColorPicker),
    },
  ]

  return (
    <div className="sticky top-5 z-50 mb-1 space-x-1 rounded-md border bg-slate-50 p-1.5">
      {/* Paleta de cores */}
      {showColorPicker && (
        <div className="absolute mt-2 flex items-center justify-center space-x-2 rounded border bg-white p-2 shadow">
          {colors.map((color) => (
            <Button
              key={color}
              onClick={() => setColor(color)}
              style={{
                backgroundColor: color,
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
          ))}
          <Button
            onClick={() => setColor(null)}
            className="ml-2 h-6 w-6 rounded bg-gray-300 text-sm hover:bg-red-400"
          >
            <EraserIcon />
          </Button>
        </div>
      )}

      {/* Botões de formatação */}
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
