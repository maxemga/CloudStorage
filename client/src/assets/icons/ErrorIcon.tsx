import { SvgProps } from 'src/types'

export const ErrorIcon = (props: SvgProps) => (
  <svg
    height={props.size || 15}
    width={props.size || 15}
    viewBox="0 0 32 32"
    {...props}>
    <path
      fill="#d85b53"
      d="M16 32c8.836 0 16-7.164 16-16S24.836 0 16 0 0 7.164 0 16s7.164 16 16 16zm2-14a2 2 0 0 1-4 0V8a2 2 0 0 1 4 0v10zm-2 3.968a2 2 0 1 1-.001 4.001A2 2 0 0 1 16 21.968z"
      className="color000000 svgShape"
    />
  </svg>
)
