import { Oval } from 'react-loader-spinner'
import { useTheme } from 'styled-components'

interface Props {
  size?: number
  color?: string
  secondaryColor?: string
  width?: number
}

export const Loader = ({ size, color, secondaryColor, width }: Props) => {
  const AppTheme: any = useTheme()

  return (
    <Oval
      height={size || 25}
      width={size || 25}
      color={color || AppTheme.loader.primary}
      secondaryColor={secondaryColor || AppTheme.loader.secondaryColor}
      strokeWidth={width || 5}
      strokeWidthSecondary={width || 5}
    />
  )
}
