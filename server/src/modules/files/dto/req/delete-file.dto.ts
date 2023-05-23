import { ApiProperty } from '@nestjs/swagger'
import { DataType } from 'sequelize-typescript'

export class DeleteFileDto {
  @ApiProperty({ type: DataType.ARRAY, example: 'string' })
  ids: string[]
}
