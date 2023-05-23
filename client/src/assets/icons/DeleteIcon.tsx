import { colors } from 'src/theme'
import { SvgProps } from 'src/types'

export const DeleteIcon = (props: SvgProps) => (
  <svg
    xmlSpace="preserve"
    width={props.size || 20}
    height={props.size || 20}
    viewBox="0 0 24 24"
    fill={props.color || colors.white}
    {...props}>
    <path
      fillRule="evenodd"
      d="M10.111 2c-.736 0-1.333.597-1.333 1.333A.667.667 0 0 1 8.11 4H5a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2h-3.112a.667.667 0 0 1-.666-.667c0-.736-.597-1.333-1.333-1.333zM6 8a1 1 0 0 0-.997 1.083l.771 9.25A4 4 0 0 0 9.76 22h4.48a4 4 0 0 0 3.986-3.668l.77-9.249A1 1 0 0 0 18 8z"
      clipRule="evenodd"
      data-original="#000000"
    />
  </svg>
)
