import { random } from 'lodash'

export const generateCode = () => {
  return random(100000, 999999)
}
