export const formatSize = (size: number, format = '') => {
  if (format === 'GB' || format === '') {
    if (size > 1024 * 1024 * 1024 || format === 'GB') {
      return (size / (1024 * 1024 * 1024)).toFixed(1) + 'GB'
    }
  }
  if (format === 'MB' || format === '') {
    if (size > 1024 * 1024 || format === 'MB') {
      return (size / (1024 * 1024)).toFixed(1) + 'MB'
    }
  }
  if (format === 'KB' || format === '') {
    if (size > 1024 || format === 'KB') {
      return (size / 1024).toFixed(1) + 'KB'
    }
  }

  return size + 'B'
}
