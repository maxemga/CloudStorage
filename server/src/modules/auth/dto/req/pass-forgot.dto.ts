import { ApiProperty } from '@nestjs/swagger'
import { DataType } from 'sequelize-typescript'

export class PassForgotDto {
  @ApiProperty({ type: DataType.STRING, example: 'string' })
  email: string
}
