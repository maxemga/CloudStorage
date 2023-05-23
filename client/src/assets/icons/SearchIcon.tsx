import { SvgProps } from 'src/types'

export const SearchIcon = (props: SvgProps) => (
  <svg
    xmlSpace="preserve"
    width={props.size || 20}
    height={props.size || 20}
    fill={props.color}
    viewBox="0 0 32 32"
    {...props}>
    <path
      d="m27.414 24.586-5.077-5.077A9.932 9.932 0 0 0 24 14c0-5.514-4.486-10-10-10S4 8.486 4 14s4.486 10 10 10a9.932 9.932 0 0 0 5.509-1.663l5.077 5.077a2 2 0 1 0 2.828-2.828zM7 14c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7z"
      data-original="#000000"
    />
  </svg>
)
