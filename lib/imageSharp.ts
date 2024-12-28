import sharp from 'sharp'

export class ImageSharp {
  async createImage(buffer: ArrayBuffer, w: number, h: number, fit: 'cover' | 'contain' | 'fill') {
    sharp(buffer).resize(w, h, { fit: fit, kernel: sharp.kernel.nearest, position: 'center' }).toBuffer()
  }

  async resizedImage(buffer: ArrayBuffer, w: number, h: number, fit: 'cover' | 'contain' | 'fill') {
    return sharp(buffer).resize(w, h, { fit: fit, kernel: sharp.kernel.nearest }).toBuffer()
  }

  async rotateImage(buffer: ArrayBuffer, angle: number) {
    return sharp(buffer).rotate(angle).toBuffer()
  }
}
