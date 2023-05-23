import { FileExtensions } from 'src/enums'

export const isMedia = (type: FileExtensions) =>
  [
    FileExtensions.PNG,
    FileExtensions.JPEG,
    FileExtensions.JPG,
    FileExtensions.GIF,
  ].includes(type)
