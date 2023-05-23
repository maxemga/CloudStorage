import Selecto, { SelectoEvents } from 'react-selecto'
import { useFiles } from 'src/context'

export const FilesSelecter = () => {
  const { onAdd, onRemove } = useFiles()

  const onSelect = (e: SelectoEvents['select']) => {
    e.added.forEach((el) => {
      el.classList.add('selected')
      onAdd(el as HTMLElement)
    })
    e.removed.forEach((el) => {
      el.classList.remove('selected')
      onRemove(el as HTMLElement)
    })
  }

  return (
    <Selecto
      container={document.body}
      selectableTargets={['.el']}
      selectByClick
      selectFromInside
      continueSelect={false}
      toggleContinueSelect={'shift'}
      keyContainer={window}
      hitRate={0}
      onSelect={onSelect}
    />
  )
}
