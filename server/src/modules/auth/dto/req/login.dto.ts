import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'string', description: 'Почта' })
  email: string

  @ApiProperty({ example: 'string', description: 'Пароль' })
  password: string
}
