import { ApiProperty } from '@nestjs/swagger'
import { DataType } from 'sequelize-typescript'

export class RenameFileDto {
  @ApiProperty({ type: DataType.UUID, example: 'string' })
  id: string

  @ApiProperty({ type: DataType.STRING, example: 'string' })
  name: string
}
