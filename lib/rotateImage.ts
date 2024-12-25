'use server'

import { ImageSharp } from './imageSharp'

const imageSharp = new ImageSharp()

export async function rotateImaged(buffer: ArrayBuffer, angle: number) {
  return await imageSharp.rotateImage(buffer, angle)
}
