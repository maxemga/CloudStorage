import { ApiProperty } from '@nestjs/swagger'
import { DataType } from 'sequelize-typescript'

export class AuthGoogleCheckDto {
  @ApiProperty({ type: DataType.STRING, example: 'string' })
  email: string

  @ApiProperty({ type: DataType.STRING, example: 'string' })
  given_name: string

  @ApiProperty({ type: DataType.STRING, example: 'string' })
  family_name: string
}
