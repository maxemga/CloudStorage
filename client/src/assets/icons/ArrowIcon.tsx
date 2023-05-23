import { SvgProps } from 'src/types'

export const ArrowIcon = (props: SvgProps) => (
  <svg
    xmlSpace="preserve"
    height={props.size || 15}
    width={props.size || 15}
    viewBox="0 0 29 29"
    transform="rotate(270)"
    {...props}>
    <path
      fill="none"
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="m20.5 11.5-6 6-6-6"
    />
  </svg>
)
