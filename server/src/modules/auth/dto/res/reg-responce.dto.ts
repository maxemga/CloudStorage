import { ApiProperty } from '@nestjs/swagger'
import { DataType } from 'sequelize-typescript'

export class RegResponceDto {
  @ApiProperty({ type: DataType.STRING, example: 'string' })
  message: string
}
