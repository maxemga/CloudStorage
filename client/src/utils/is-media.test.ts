import { FileExtensions } from './../enums'
import { isMedia } from './is-media'

describe('isMedia', () => {
  test('test', () => {
    expect(isMedia(FileExtensions.PNG)).toBe(true)
  })
})
