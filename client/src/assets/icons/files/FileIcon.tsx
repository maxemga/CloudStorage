import { SvgProps } from 'src/types'
import { useTheme } from 'styled-components'

export const FileIcon = (props: SvgProps) => {
  const AppTheme: any = useTheme()

  return (
    <svg
      xmlSpace="preserve"
      width={props.size || 20}
      height={props.size || 20}
      fill={props.color || AppTheme.home.sidebar.nav.icon}
      viewBox="0 0 48 48"
      {...props}>
      <path
        d="M12 42h24a3 3 0 0 0 3-3V18a1 1 0 0 0-.29-.71l-11-11A1.06 1.06 0 0 0 27 6H12a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3zM28 9.41 35.59 17H29a1 1 0 0 1-1-1z"
        data-original="#000000"
      />
    </svg>
  )
}
