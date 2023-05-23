import { CloudIcon } from 'src/assets/icons/CloudIcon'
import styled from 'styled-components'

export const UploadPreview = () => {
  return (
    <Preview>
      <CloudIcon />
      <Title>Upload to CloudStorage</Title>
    </Preview>
  )
}

const Preview = styled.div`
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const Title = styled.p`
  pointer-events: none;
  font-size: 50px;
  font-family: ${({ theme }) => theme.roboto500};
  color: #635dff;
`
