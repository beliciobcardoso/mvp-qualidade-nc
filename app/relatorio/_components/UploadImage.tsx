'use client'
import Image from 'next/image'

import DefaultUploadImage from '@/assets/image.svg'
import { useState } from 'react'

export function UploadImage() {
  const [isDragging, setIsDragging] = useState(false)

  function validateImageType(file: File) {
    if (file.type.startsWith('image/')) return true
    console.log('Please select a valid image')
    return false
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setIsDragging(false)

    file && (await handleUploadImage(file))
  }

  async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    file && (await handleUploadImage(file))
  }

  async function handleUploadImage(file: File) {
    try {
      if (validateImageType(file)) {
        const formData = new FormData()
        formData.append('file', file)

        console.log('File:', file)

        // const response = await fetch('/api/upload', {
        //   method: 'POST',
        //   body: formData,
        // })

        // const { imageUrl, error } = await response.json()

        // if (error) throw new Error(error)
      }
    } catch (error) {
      console.error(error)
      console.log('An error happened while uploading the image')
    } finally {
      console.log('Image uploaded successfully')
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-start">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`bg-gray-50 ${
          isDragging ? 'border-green' : 'border-light-blue'
        } border-2 border-dashed rounded-xl p-10 flex items-center flex-col w-full justify-center gap-10`}
      >
        <Image
          src={DefaultUploadImage}
          alt="Default image"
          width={115}
          height={100}
          priority
        />
        <h3 className="text-sm">
          {!isDragging && 'Arraste e solte sua imagem aqui'}
        </h3>
      </div>

      <p className="text-sm">Or</p>

      <div className="bg-primary hover:brightness-90 text-xs text-white rounded-lg">
        <label className="py-3 px-5 cursor-pointer block" htmlFor="fileInput">
          Choose a file
        </label>
        <input
          onChange={handleFileInput}
          type="file"
          className="hidden"
          id="fileInput"
        />
      </div>
    </div>
  )
}
