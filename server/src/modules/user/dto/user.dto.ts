import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ example: 'string', description: '' })
  id: string

  @ApiProperty({ example: 'string', description: 'Почта' })
  email: string

  @ApiProperty({ example: 'string', description: 'Логин' })
  login: string

  @ApiProperty({ example: 'string', description: 'Пароль' })
  password: string

  @ApiProperty({ example: 'string', description: 'Имя' })
  first_name: string

  @ApiProperty({ example: 'string', description: 'Фамилия' })
  last_name: string

  @ApiProperty({ example: 'number', description: 'Фамилия' })
  usedStorage: number

  @ApiProperty({ example: 'boolean', description: '' })
  isVerify: boolean

  @ApiProperty({ example: 'string', description: '' })
  createdAt: Date

  @ApiProperty({ example: 'string', description: '' })
  updatedAt: Date
}
