import { Loader } from 'src/components'
import styled from 'styled-components'

interface Props {
  onChange: (value: string) => void
  value: string
  loading: boolean
}

export const InputListModal = ({ onChange, value, loading }: Props) => {
  return (
    <Block>
      <Input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        autoFocus
      />
      {loading && (
        <Submit>
          <Loader />
        </Submit>
      )}
    </Block>
  )
}

const Block = styled.div`
  position: relative;
  margin-top: 36px;
`

const Input = styled.input`
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  outline: none;
  border: 2px solid ${({ theme }) => theme.input.border.pale};
  transition: 0.2s;

  &:focus {
    border: 2px solid ${({ theme }) => theme.input.border.focus};
    transition: 0.2s;
  }
`

const Submit = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`
