import { ApiProperty } from '@nestjs/swagger'
import { DataType } from 'sequelize-typescript'

export class PassForgoVerifytDto {
  @ApiProperty({ type: DataType.STRING, example: 'string' })
  email: string

  @ApiProperty({ type: DataType.STRING, example: 'string' })
  code: string
}
