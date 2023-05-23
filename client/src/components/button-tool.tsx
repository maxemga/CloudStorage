import styled from 'styled-components'

interface Props {
  onPress: () => void
  title: string
}

export const ToolButton = ({ onPress, title }: Props) => {
  return (
    <Button onClick={onPress}>
      <Title>{title}</Title>
    </Button>
  )
}

const Button = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.button.tool};
  display: flex;
  align-items: center;
  padding: 6px 13px;
  border-radius: 8px;
  border: 1px solid #cfcece;
`

const Title = styled.span`
  font-family: ${({ theme }) => theme.roboto700};
  font-size: 14px;
  color: #383838;
`

// '#222222', '#383838'
