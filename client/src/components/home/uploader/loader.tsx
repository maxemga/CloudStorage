import styled from 'styled-components'

interface Props {
  progress: number
}

export const UploaderLoader = ({ progress }: Props) => {
  return (
    <Loader>
      <Field />
      <FillField progress={progress} />
    </Loader>
  )
}

const Loader = styled.div`
  position: relative;
  border-radius: 5px;
  width: 100px;
`

const Field = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.uploader.loader.field};
  height: 3px;
  width: 100%;
`

const FillField = styled.div<Props>`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.uploader.loader.fillField};
  height: 3px;
  width: ${({ progress }) => progress}%;
`
