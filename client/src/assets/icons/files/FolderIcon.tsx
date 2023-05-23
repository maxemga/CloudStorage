import { SvgProps } from 'src/types'
import { useTheme } from 'styled-components'

export const FolderIcon = (props: SvgProps) => {
  const AppTheme: any = useTheme()

  return (
    <svg
      width={props.size || 100}
      height={props.size || 100}
      viewBox="0 0 48 48"
      {...props}>
      <path
        fill={AppTheme.icons.folder.second}
        d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"
      />
      <path
        fill={AppTheme.icons.folder.main}
        d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"
      />
    </svg>
  )
}
