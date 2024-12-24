import sharp from 'sharp'

export class ImageSharp {
  async createImage(buffer: Buffer, w: number, h: number, fit: 'cover' | 'contain' | 'fill') {
    sharp(buffer).resize(w, h, { fit: fit, kernel: sharp.kernel.nearest, position: 'center' }).toBuffer()
  }
}
