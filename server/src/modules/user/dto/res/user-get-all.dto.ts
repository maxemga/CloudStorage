import { ApiProperty } from '@nestjs/swagger'

export class UserGetAllDto {
  @ApiProperty({ example: 'string' })
  id: string

  @ApiProperty({ example: 'string', description: 'Почта' })
  email: string

  @ApiProperty({ example: 'string', description: 'Логин' })
  login: string

  @ApiProperty({ example: 'string', description: 'Пароль' })
  password: string

  @ApiProperty({ example: 'string', description: 'Имя' })
  firstName: string

  @ApiProperty({ example: 'string', description: 'Фамилия' })
  lastName: string

  @ApiProperty({ example: 'string', description: 'Фамилия' })
  isVerify: boolean

  @ApiProperty({ example: 'string' })
  createdAt: string

  @ApiProperty({ example: 'string' })
  updatedAt: string
}
