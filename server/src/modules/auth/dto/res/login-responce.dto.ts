import { ApiProperty } from '@nestjs/swagger'
import { DataType } from 'sequelize-typescript'
import { UserDto } from 'src/modules/user/dto/user.dto'

export class LoginResponceDto {
  @ApiProperty({ type: DataType.STRING, example: 'string' })
  token: string

  @ApiProperty({ type: UserDto })
  user: UserDto
}
