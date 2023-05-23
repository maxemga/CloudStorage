import { ApiProperty } from '@nestjs/swagger'
import { DataType } from 'sequelize-typescript'

export class CreateFileDto {
  @ApiProperty({ type: DataType.STRING, example: 'string' })
  parentId: string

  @ApiProperty({ type: DataType.STRING, example: 'string' })
  name: string
}
