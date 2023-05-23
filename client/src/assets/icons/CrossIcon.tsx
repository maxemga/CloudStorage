import { SvgProps } from 'src/types'
import { useTheme } from 'styled-components'

export const CrossIcon = (props: SvgProps) => {
  const AppTheme: any = useTheme()

  return (
    <svg
      height={props.size || 30}
      width={props.size || 30}
      viewBox="0 0 24 24"
      fill={props.color ?? AppTheme.home.modal.icon}
      {...props}>
      <path
        height={40}
        d="M16.707 8.707 13.414 12l3.293 3.293a1 1 0 1 1-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L10.586 12 7.293 8.707a1 1 0 1 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414Z"
      />
    </svg>
  )
}
