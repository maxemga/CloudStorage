import { ApiProperty } from '@nestjs/swagger'

export class UserCreateDto {
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

  @ApiProperty({ required: false })
  isVerify?: boolean
}
