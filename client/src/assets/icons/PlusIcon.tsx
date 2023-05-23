import { SvgProps } from 'src/types'

export const PlusIcon = (props: SvgProps) => (
  <svg
    width={props.size || 20}
    height={props.size || 20}
    viewBox="0 -0.5 21 21"
    {...props}>
    <title>{'plus [#1512]'}</title>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M21 9v2h-9.45v9h-2.1v-9H0V9h9.45V0h2.1v9z"
    />
  </svg>
)
