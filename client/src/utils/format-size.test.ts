import { formatSize } from './format-size'

describe('isMedia', () => {
  test('test with round GB', () => {
    expect(formatSize(1500000000)).toBe('1.4GB')
  })
  test('test with round MB', () => {
    expect(formatSize(1000000000)).toBe('953.7MB')
  })
  test('test with round KB', () => {
    expect(formatSize(1000000)).toBe('976.6KB')
  })
  test('test with round GB', () => {
    expect(formatSize(100)).toBe('100B')
  })

  test('test with argument GB', () => {
    expect(formatSize(100, 'GB')).toBe('0.0GB')
  })
  test('test with argument MB', () => {
    expect(formatSize(100, 'MB')).toBe('0.0MB')
  })
  test('test with argument KB', () => {
    expect(formatSize(100, 'KB')).toBe('0.1KB')
  })
})
